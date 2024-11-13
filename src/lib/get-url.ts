export function getUrl(path?: string) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
    const normalizedPath = path && !path.startsWith('/') ? `/${path}` : path || ''
    console.log(`${baseUrl}${normalizedPath}`)
    return `${baseUrl}${normalizedPath}`
  }