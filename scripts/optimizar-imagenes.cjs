// Script de un solo uso (2026-11-10): redimensiona y comprime las imágenes ya subidas a Storage (ERR-021).
// Las nuevas ya se optimizan al subirlas desde el admin (utils/image-compress.js).
//
// Qué hace, por cada imagen de images/ en JPEG, PNG o BMP de más de 300 KB:
//   1. Copia el original a gs://<PROJECT_ID>-respaldos/imagenes-originales-2026-11-10/ (privado).
//   2. Lo descarga y lo redimensiona (lado mayor 1920 px) con .NET System.Drawing: JPEG calidad 82,
//      o PNG si tiene transparencia. Respeta la rotación EXIF de las fotos del celular.
//   3. Lo sube encima del mismo objeto, con el mismo token de descarga: las URLs guardadas en
//      Firestore (images, projects, achievements, team) siguen funcionando sin tocar ningún documento.
//   Si el resultado no ahorra al menos un 10 %, deja el original.
//
// Requisitos: Windows (usa PowerShell + System.Drawing), gcloud con sesión del dueño del proyecto,
// .env con VITE_FIREBASE_PROJECT_ID y VITE_FIREBASE_STORAGE_BUCKET, y el bucket de respaldos creado.
// Uso, desde la raíz del repo:
//   node scripts/optimizar-imagenes.cjs .            → simulación: lista qué haría, sin cambiar nada
//   node scripts/optimizar-imagenes.cjs . --aplicar  → respalda y reemplaza
// Restaurar un original: gcloud storage cp gs://<PROJECT_ID>-respaldos/imagenes-originales-2026-11-10/images/<archivo> gs://<BUCKET>/images/<archivo>
// (tras restaurar, volver a poner el token: subir de nuevo desde el admin es más simple).
const { execSync, execFileSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

const repo = process.argv[2]
const APPLY = process.argv.includes('--aplicar')
const env = fs.readFileSync(path.join(repo, '.env'), 'utf8')
const envVar = (k) => env.match(new RegExp(`^${k}=(.*)$`, 'm'))[1].trim().replace(/"/g, '')
const PID = envVar('VITE_FIREBASE_PROJECT_ID')
const BUCKET = envVar('VITE_FIREBASE_STORAGE_BUCKET')
const BACKUP_BUCKET = `${PID}-respaldos`
const BACKUP_PREFIX = 'imagenes-originales-2026-11-10/'
const TOKEN = execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim()
const H = { Authorization: `Bearer ${TOKEN}` }
const API = 'https://storage.googleapis.com/storage/v1'
const UPLOAD = 'https://storage.googleapis.com/upload/storage/v1'

const MIN_SIZE = 300 * 1024
const TYPES = ['image/jpeg', 'image/png', 'image/bmp']
const enc = encodeURIComponent
const kb = (n) => `${Math.round(n / 1024)} KB`
const hide = (s) => s.split(PID).join('<PID>')

async function api(method, url, body, headers = {}) {
  const r = await fetch(url, { method, headers: { ...H, ...headers }, body })
  if (!r.ok) throw new Error(`${method} ${hide(url)} → ${r.status} ${hide((await r.text()).slice(0, 300))}`)
  return r
}

async function listImages() {
  const items = []
  let pageToken = ''
  do {
    const r = await api('GET', `${API}/b/${BUCKET}/o?prefix=images/&maxResults=1000${pageToken ? `&pageToken=${enc(pageToken)}` : ''}`)
    const j = await r.json()
    items.push(...(j.items || []))
    pageToken = j.nextPageToken
  } while (pageToken)
  return items
}

// Copia del lado del servidor al bucket de respaldos (rewrite puede requerir varias llamadas)
async function backup(obj) {
  const dest = `${API}/b/${BUCKET}/o/${enc(obj.name)}/rewriteTo/b/${BACKUP_BUCKET}/o/${enc(BACKUP_PREFIX + obj.name)}`
  let token = ''
  for (;;) {
    const r = await api('POST', dest + (token ? `?rewriteToken=${enc(token)}` : ''), '{}', { 'Content-Type': 'application/json' })
    const j = await r.json()
    if (j.done) return
    token = j.rewriteToken
  }
}

// Redimensiona con .NET (PowerShell 5.1 trae System.Drawing). Imprime "jpeg|png ancho alto".
const PS_HELPER = String.raw`
param([string]$In, [string]$Out, [int]$Max, [long]$Quality)
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System; using System.Drawing; using System.Drawing.Imaging; using System.Drawing.Drawing2D; using System.Runtime.InteropServices;
public static class Optimizer {
  public static string Run(string input, string output, int max, long quality) {
    using (var src = Image.FromFile(input)) {
      foreach (var id in src.PropertyIdList) {
        if (id != 0x0112) continue;
        switch (src.GetPropertyItem(id).Value[0]) {
          case 2: src.RotateFlip(RotateFlipType.RotateNoneFlipX); break;
          case 3: src.RotateFlip(RotateFlipType.Rotate180FlipNone); break;
          case 4: src.RotateFlip(RotateFlipType.Rotate180FlipX); break;
          case 5: src.RotateFlip(RotateFlipType.Rotate90FlipX); break;
          case 6: src.RotateFlip(RotateFlipType.Rotate90FlipNone); break;
          case 7: src.RotateFlip(RotateFlipType.Rotate270FlipX); break;
          case 8: src.RotateFlip(RotateFlipType.Rotate270FlipNone); break;
        }
      }
      double scale = Math.Min(1.0, (double)max / Math.Max(src.Width, src.Height));
      int w = (int)Math.Round(src.Width * scale), h = (int)Math.Round(src.Height * scale);
      // La transparencia se mira en el original: al redimensionar, GDI+ mezcla los bordes con transparente
      bool alphaFormat = Image.IsAlphaPixelFormat(src.PixelFormat);
      bool transparent = alphaFormat && HasTransparency(src);
      using (var dst = new Bitmap(w, h, alphaFormat ? PixelFormat.Format32bppArgb : PixelFormat.Format24bppRgb)) {
        using (var g = Graphics.FromImage(dst)) {
          g.InterpolationMode = InterpolationMode.HighQualityBicubic;
          g.PixelOffsetMode = PixelOffsetMode.HighQuality;
          g.CompositingQuality = CompositingQuality.HighQuality;
          using (var wrap = new ImageAttributes()) {
            wrap.SetWrapMode(WrapMode.TileFlipXY); // evita el borde semitransparente del bicúbico
            g.DrawImage(src, new Rectangle(0, 0, w, h), 0, 0, src.Width, src.Height, GraphicsUnit.Pixel, wrap);
          }
        }
        if (transparent) { dst.Save(output, ImageFormat.Png); return "png " + w + " " + h; }
        var codec = Array.Find(ImageCodecInfo.GetImageEncoders(), c => c.MimeType == "image/jpeg");
        var p = new EncoderParameters(1); p.Param[0] = new EncoderParameter(Encoder.Quality, quality);
        if (alphaFormat) {
          using (var flat = new Bitmap(w, h, PixelFormat.Format24bppRgb)) {
            using (var g = Graphics.FromImage(flat)) { g.Clear(Color.White); g.DrawImage(dst, 0, 0, w, h); }
            flat.Save(output, codec, p);
          }
        } else { dst.Save(output, codec, p); }
        return "jpeg " + w + " " + h;
      }
    }
  }
  static bool HasTransparency(Image img) {
    var bmp = (Bitmap)img;
    var data = bmp.LockBits(new Rectangle(0, 0, bmp.Width, bmp.Height), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
    try {
      var bytes = new byte[Math.Abs(data.Stride) * bmp.Height];
      Marshal.Copy(data.Scan0, bytes, 0, bytes.Length);
      for (int i = 3; i < bytes.Length; i += 4) if (bytes[i] < 255) return true;
      return false;
    } finally { bmp.UnlockBits(data); }
  }
}
'@
[Optimizer]::Run($In, $Out, $Max, $Quality)
`

async function main() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'optimizar-imagenes-'))
  const helper = path.join(tmp, 'optimizar.ps1')
  fs.writeFileSync(helper, PS_HELPER)

  const all = await listImages()
  const targets = all.filter((o) => TYPES.includes(o.contentType) && Number(o.size) > MIN_SIZE)
  const total = targets.reduce((s, o) => s + Number(o.size), 0)
  console.log(`${all.length} archivos en images/; ${targets.length} superan ${kb(MIN_SIZE)} (${(total / 1048576).toFixed(1)} MB en total)`)
  if (!APPLY) {
    for (const o of targets) console.log(`  ${kb(Number(o.size)).padStart(9)}  ${o.name}`)
    console.log('\nSimulación: no se cambió nada. Para aplicar: node scripts/optimizar-imagenes.cjs . --aplicar')
    return
  }

  // El bucket de respaldos tiene que existir antes de tocar nada
  await api('GET', `${API}/b/${BACKUP_BUCKET}`)

  let before = 0
  let after = 0
  let done = 0
  for (const o of targets) {
    const size = Number(o.size)
    try {
      await backup(o)
      const input = path.join(tmp, 'in')
      const output = path.join(tmp, 'out')
      const media = await api('GET', `${API}/b/${BUCKET}/o/${enc(o.name)}?alt=media`)
      fs.writeFileSync(input, Buffer.from(await media.arrayBuffer()))
      const [format, w, h] = execFileSync('powershell', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', helper, input, output, '1920', '82'], { encoding: 'utf8' }).trim().split(/\s+/)
      const data = fs.readFileSync(output)
      if (data.length > size * 0.9) {
        console.log(`  =  ${o.name}: sin ahorro suficiente, se deja igual`)
        continue
      }

      // Mismo objeto y mismos metadatos (incluido firebaseStorageDownloadTokens): la URL no cambia.
      // ifGenerationMatch evita pisar un archivo que se haya cambiado mientras corre el script.
      const contentType = format === 'png' ? 'image/png' : 'image/jpeg'
      const meta = { name: o.name, contentType, cacheControl: 'public, max-age=31536000', metadata: o.metadata || {} }
      const boundary = 'tcs' + Date.now()
      const body = Buffer.concat([
        Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(meta)}\r\n--${boundary}\r\nContent-Type: ${contentType}\r\n\r\n`),
        data,
        Buffer.from(`\r\n--${boundary}--`),
      ])
      await api('POST', `${UPLOAD}/b/${BUCKET}/o?uploadType=multipart&ifGenerationMatch=${o.generation}`, body, { 'Content-Type': `multipart/related; boundary=${boundary}` })

      before += size
      after += data.length
      done++
      console.log(`  ✓  ${o.name}: ${kb(size)} → ${kb(data.length)} (${format}, ${w}×${h})`)
    } catch (e) {
      console.log(`  ✗  ${o.name}: ${e.message}`)
    }
  }
  fs.rmSync(tmp, { recursive: true, force: true })
  console.log(`\n${done} de ${targets.length} optimizadas: ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB`)
  console.log(`Originales en gs://<PID>-respaldos/${BACKUP_PREFIX}`)
}

main().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
