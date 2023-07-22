export async function internalFetch(url, settings) {
    let x = await fetch(url, settings)
    if (settings.method == 'DELETE') {
        return x
    }
    if (url == 'http://localhost:3030/users/logout') {
        return x
    }
    if (x.ok) {
        return await x.json()
    } else {
        let y = await x.json()
        throw new Error(y.message)
    }
}