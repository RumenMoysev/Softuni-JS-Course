function attachEvents() {
    let author1 = document.getElementsByName('author')[0]
    let content1 = document.getElementsByName('content')[0]
    let submitBtn = document.getElementById('submit')
    submitBtn.addEventListener('click', onclickSubmit)
    let next = document.getElementById('refresh')
    next.addEventListener('click', onclickNext)


    async function onclickSubmit(e) {
        let author = author1.value
        let content = content1.value

        let settings = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({author,content})
        }
        let url = 'http://localhost:3030/jsonstore/messenger'

        await fetch(url, settings)
    }

    async function onclickNext(e) {
        let output = document.getElementById('messages')
        output.value = ''
        let x = await fetch('http://localhost:3030/jsonstore/messenger')
        let data = await x.json()

        let arr = []

        for(let el of Object.values(data)) {
            arr.push(`${el.author}: ${el.content}`) 
        }

        output.value = arr.join('\n')
    }
}

attachEvents();