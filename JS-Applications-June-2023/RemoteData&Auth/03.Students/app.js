let btn = document.getElementById('submit')
btn.addEventListener('click', onclickSubmit)

fetch('http://localhost:3030/jsonstore/collections/students')
.then(x => x.json())
.then(data => {
    let output1 = document.getElementsByTagName('tbody')[0]
    for(let el of Object.values(data)) {

        let tr = document.createElement('tr')

        createElement1('td', el.firstName, tr)
        createElement1('td', el.lastName, tr)
        createElement1('td', el.facultyNumber, tr)
        createElement1('td', el.grade, tr)

        output1.appendChild(tr)
    }
})


async function onclickSubmit(e) {
    e.preventDefault()
    let form = document.getElementById('form')
    let data = new FormData(form)

    if(data.get('firstName') !== '' && data.get('lastName') !== '' && data.get('facultyNumber') !== '' && data.get('grade') !== '') {
        let data1 = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            facultyNumber: data.get('facultyNumber'),
            grade: data.get('grade')
        } 

        let settings = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data1)
        }

        let url = 'http://localhost:3030/jsonstore/collections/students'

        await fetch(url, settings)
    }
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

