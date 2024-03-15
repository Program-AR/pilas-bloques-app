import { useEffect } from "react"

/**
 * Loads a custom plain js script from public folder.
 * Makes sure it also works in tests.
 * @param url the relative path to the script
 * @returns 
 */
export const useScript = (url: string, onLoad?: (e:any) => {}) => {
    useEffect(() => {
        // If it has been loaded, don't load it again.
        if(document.getElementById(url)) return () => {};
        
        const script = document.createElement("script")
        script.id = url
        script.src = adaptURL(url)
        script.async = true
        if(onLoad) script.onload = onLoad
        document.body.appendChild(script)
        return () => document.body.removeChild(script)
    }, [url, onLoad])
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