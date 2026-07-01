/** Résout un chemin relatif de public/ (sans slash initial) vers une URL valide en dev comme en build (GitHub Pages). */
export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}
