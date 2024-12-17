export const getBaseUrl = () => {
    // Default to localhost in client-side rendering
    if (typeof window !== 'undefined') {
        return window.location.origin
    }
    return 'http://localhost:3000'
}

export const MEDIA_PATH = '/api/media/file/'

export const getMediaUrl = (path: string) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    return `${getBaseUrl()}${MEDIA_PATH}${path}`
}