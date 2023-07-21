import { html, render } from '../node_modules/lit-html/lit-html.js'

let loadBtn = document.getElementById('loadBooks')
loadBtn.addEventListener('click', getBooks)

let addForm = document.getElementById('add-form')
addForm.addEventListener('submit', onsubmitAdd)

async function getBooks() {
    let response = await fetch("http://localhost:3030/jsonstore/collections/books")
    let data = await response.json()
    data = Object.entries(data)

    let output = document.getElementById('tbody')

    let template = (data) => html`
        <tr>
            <td>${data[1].author}</td>
            <td>${data[1].title}</td>
            <td>
                <button dataset-id=${data[0]} @click = ${edit}>Edit</button>
                <button dataset-id=${data[0]} @click = ${deleteFunc}>Delete</button>
            </td>
</tr>`

    let readyTemp = (data) => html`${data.map(x => template(x))}`
    render(readyTemp(data), output)
}

async function edit() {
    let id = e.target.getAttribute('dataset-id')

    document.getElementById('add-form').style.display = 'none'  
    document.getElementById('edit-form').style.display = 'block'
    let form = document.getElementById('edit-form')
    form.addEventListener('submit', onsubmitEdit)

    let x = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`)
    let y = await x.json()

    document.getElementsByName('title')[1].value = y.title
    document.getElementsByName('author')[1].value = y.author

    function onsubmitEdit(e) {
        e.preventDefault()
        
        let data = {
            title: document.getElementsByName('title')[1].value,
            author: document.getElementsByName('author')[1].value
        }
        console.log(data)
        
        if(data.author && data.title) {
            let settings = {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            }

            fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, settings)

            form.reset()
        };
    }
}

async function deleteFunc(e) {
    let id = e.target.getAttribute('dataset-id')

    let settings = {
        method: 'DELETE'
    }

    await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, settings)
}

async function onsubmitAdd(e) {
    e.preventDefault()
    let formData = new FormData(addForm)

    let data = {
        author: formData.get('author'),
        title: formData.get('title')
    }

    if(data.author && data.title) {
        let settings = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        }

        fetch('http://localhost:3030/jsonstore/collections/books', settings)

        addForm.reset()
    }
}