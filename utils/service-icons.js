// Íconos de línea (path SVG, viewBox 0 0 24 24) por tipo de servicio: campo `icon` del admin
export const SERVICE_ICONS = {
  web: 'M3 5h18v11H3z M8 20h8 M12 16v4',
  mobile: 'M8 3h8v18H8z M11 18h2',
  ai: 'M7 7h10v10H7z M10 3v4 M14 3v4 M10 17v4 M14 17v4 M3 10h4 M3 14h4 M17 10h4 M17 14h4',
  systems: 'M12 3l9 5-9 5-9-5z M3 13l9 5 9-5',
  consulting: 'M4 5h16v11H9l-5 4z',
}

export function serviceIconPath(icon) {
  return SERVICE_ICONS[icon] || SERVICE_ICONS.web
}
