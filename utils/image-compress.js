// Redimensiona y comprime una imagen en el navegador antes de subirla a Storage (ERR-021).
// Sin dependencias: canvas nativo. Lado mayor hasta MAX_SIDE px; JPEG si es opaca,
// WebP si tiene transparencia (PNG si el navegador no codifica WebP).
// Devuelve el archivo original si no es una imagen compatible, si ya es liviana o si
// el resultado no ahorra al menos un 10 %.
const MAX_SIDE = 1920
const QUALITY = 0.82
const SMALL_ENOUGH = 300 * 1024
const COMPRESSIBLE = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp']

export async function compressImage(file) {
  if (!COMPRESSIBLE.includes(file.type)) return file // GIF (animación), SVG, etc. se suben tal cual

  // imageOrientation respeta la rotación EXIF de las fotos del celular
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' }).catch(() => null)
  if (!bitmap) return file

  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
  if (scale === 1 && file.size <= SMALL_ENOUGH) {
    bitmap.close()
    return file
  }

  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  const transparent = file.type !== 'image/jpeg' && hasTransparency(ctx, canvas.width, canvas.height)
  let blob
  if (transparent) {
    blob = await toBlob(canvas, 'image/webp', QUALITY)
    if (blob?.type !== 'image/webp') blob = await toBlob(canvas, 'image/png')
  } else {
    blob = await toBlob(canvas, 'image/jpeg', QUALITY)
  }
  if (!blob || blob.size > file.size * 0.9) return file

  const ext = { 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/png': 'png' }[blob.type]
  const name = file.name.replace(/\.[^.]+$/, '') + '.' + ext
  return new File([blob], name, { type: blob.type, lastModified: file.lastModified })
}

function hasTransparency(ctx, width, height) {
  const data = ctx.getImageData(0, 0, width, height).data
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) return true
  }
  return false
}

function toBlob(canvas, type, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality))
}
