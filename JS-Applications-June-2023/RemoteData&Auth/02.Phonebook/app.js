function attachEvents() {
    let loadBtn = document.getElementById('btnLoad')
    loadBtn.addEventListener('click', onclickLoad)

    let createBtn = document.getElementById('btnCreate')
    createBtn.addEventListener('click', onclickCreate)

    async function onclickLoad(e) {
        let output = document.getElementById('phonebook')
        for(let el of Array.from(output.children)){
            el.remove()
        }

        let url = 'http://localhost:3030/jsonstore/phonebook'

        let x = await fetch(url)
        let data = await x.json()
        
        for(let el of Object.values(data)) {
            let li  = createElement1('li', `${el.person}: ${el.phone}`, output)
            li.dataset.id = el._id
            let delBtn = createElement1('button', 'Delete', li)
            delBtn.addEventListener('click', onclickDel)
        }
    }

    async function onclickCreate(e) {
        let person = document.getElementById('person').value
        let phone = document.getElementById('phone').value

        let url = 'http://localhost:3030/jsonstore/phonebook'

        let settings = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({person, phone})
        }

        await fetch(url, settings)

        document.getElementById('person').value = ''
        document.getElementById('phone').value = ''

        loadBtn.click()
    }

    async function onclickDel(e) {
        let id = e.target.parentElement.getAttribute('data-id')

        let url = `http://localhost:3030/jsonstore/phonebook/${id}`
        let settings = {
            method: "DELETE"
        }

        await fetch(url, settings)
    }


    function createElement1(type, text, parent, className) {
        let element = document.createElement(type)
        element.textContent = text
      
        if(className !== undefined) {
          element.className = (className)
        }
        parent.appendChild(element)
      
        return element
    }
}

attachEvents();