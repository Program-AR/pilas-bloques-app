/**
 * Loads a custom plain js script from public folder asynchronously.
 * Makes sure it also works in tests.
 * @param url the relative path to the script
 * @returns 
 */
export const loadScript = (url: string) => {
    return new Promise<void>(resolve => {
        // If it has been loaded, don't load it again.
        if(document.getElementById(url)) return resolve()
        
        const script = document.createElement("script")
        script.id = url
        script.src = adaptURL(url)
        script.async = true
        script.onload = () => { resolve() }
        document.body.appendChild(script)
    })
}

/**
 * If needed, transforms relative URLs to absolute paths within public folder
 * @param url the relative URL
 * @returns a full path
 */
export const adaptURL = (url: string) => {
    const basePath = process.env.NODE_ENV === 'test' ? 'file://' + process.env.INIT_CWD + '/public/' : ''
    return basePath + url
}