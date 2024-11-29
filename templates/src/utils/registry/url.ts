const REGISTRY_URL = process.env.REGISTRY_URL ?? "https://payloadbase.com/registry"


const getRegistryUrl = (path: string) => {
    if (isUrl(path)) {
        // If the url contains /chat/b/, we assume it's the v0 registry.
        // We need to add the /json suffix if it's missing.
        const url = new URL(path)
        if (url.pathname.match(/\/chat\/b\//) && !url.pathname.endsWith("/json")) {
            url.pathname = `${url.pathname}/json`
        }

        return url.toString()
    }

    return `${REGISTRY_URL}/${path}`
}

const isUrl = (path: string) => {
    try {
        new URL(path)
        return true
    } catch (error) {
        return false
    }
}

export default getRegistryUrl;