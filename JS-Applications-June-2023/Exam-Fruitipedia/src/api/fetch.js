export async function internalFetch(url, settings) {
    if(settings == undefined) {
        settings = {method:"GET"}
    }

    let url1 = 'http://localhost:3030' + url

    let x = await fetch(url1, settings)
    if (settings.method == 'DELETE') {
        return x
    }
    if (url1 == 'http://localhost:3030/users/logout') {
        return x
    }
    if (x.ok) {
        return await x.json()
    } else {
        let y = await x.json()
        throw new Error(y.message)
    }
}