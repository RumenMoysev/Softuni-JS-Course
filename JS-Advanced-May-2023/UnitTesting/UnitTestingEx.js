function requestValidator(input) {
    let arr = ['GET', "POST", 'DELETE', 'CONNECT']
    let regex = /[^A-Za-z0-9\.\*]+/
    let verisons = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0']
    let regex1 = /[<>\\\&\'\"]+/

    if(!arr.includes(input.method) || input.method == undefined) {
        throw new Error('Invalid request header: Invalid Method')
    }
    if(!regex.test(input.uri) || input.uri == undefined) {
        throw new Error('Invalid request header: Invalid URI')
    }
    if(!verisons.includes(input.version) || input.version == undefined) {
        throw new Error("Invalid request header: Invalid Version")
    }
    if(!regex1.test(input.message) || input.message == undefined) {
        throw new Error('Invalid request header: Invalid Message')
    }

    console.log(input) 
}

requestValidator({
    method: 'GET',
    uri: 'git.massater213213(@',
    version: 'HTTP/1.1',
    message: '-recursive'
})