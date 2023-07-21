console.log('TODO:// Implement Home functionality');

let btn1 = document.getElementById("home")
btn1.addEventListener('click', onclickHome)
btn1.click()

let logoutBtn = document.getElementById('logout')
logoutBtn.addEventListener('click', onclickLogout)    

let loadBtn = document.querySelector('.load')
loadBtn.addEventListener('click', onclickLoad)

let addBtn = document.querySelector('.add')
addBtn.addEventListener('click', onclickAdd)

function onclickHome() {
    for(let el of Array.from(document.getElementById('catches').children)) {
        el.remove()
    }

    if(sessionStorage.getItem('email')) {
        document.getElementById('login').style.display = 'none'
        document.getElementById('register').style.display = 'none'

        let p = document.querySelector('.email')
        p.getElementsByTagName('span')[0].textContent = sessionStorage.getItem('email')
        document.querySelector('.add').disabled = false

    } else {    
        document.getElementById('logout').style.display = 'none'
    }
}

async function onclickLoad() {
    let x = await fetch('http://localhost:3030/data/catches')
    let data = await x.json()

    let mainDiv = document.getElementById('catches')
    mainDiv.innerHTML = ''

    for(let el of Object.values(data)) {

        let div = document.createElement('div')
        div.className = 'catch'

        createElement1('label', 'Angler', div)
        let anglerInput = document.createElement('input')
        anglerInput.type = 'text'
        anglerInput.classList.add('angler')
        anglerInput.value = el.angler
        div.appendChild(anglerInput)

        createElement1('label', 'Weight', div)
        let weightInput = document.createElement('input')
        weightInput.type = 'text'
        weightInput.classList.add('weight')
        weightInput.value = el.weight
        div.appendChild(weightInput)

        createElement1('label', 'Species', div)
        let speciesInput = document.createElement('input')
        speciesInput.type = 'text'
        speciesInput.value = el.species
        speciesInput.classList.add('species')
        div.appendChild(speciesInput)

        createElement1('label', 'Location', div)
        let locationInput = document.createElement('input')
        locationInput.type = 'text'
        locationInput.classList.add('location')
        locationInput.value = el.location
        div.appendChild(locationInput)

        createElement1('label', 'Bait', div)
        let baitInput = document.createElement('input')
        baitInput.type = 'text'
        baitInput.classList.add('bait')
        baitInput.value = el.bait
        div.appendChild(baitInput)

        createElement1('label', 'Capture Time', div)
        let captureTimeInput = document.createElement('input')
        captureTimeInput.type = 'number'
        captureTimeInput.classList.add('captureTime')
        captureTimeInput.value = el.captureTime
        div.appendChild(captureTimeInput)

        let updateBtn = createElement1('button', 'Update', div)
        updateBtn.classList.add('update')
        updateBtn.dataset.id = el._id
        updateBtn.addEventListener('click', onclickUpdate)

        let deleteBtn = createElement1('button', 'Delete', div)
        deleteBtn.classList.add('delete')
        deleteBtn.dataset.id = el._id
        deleteBtn.addEventListener('click', onclickDelete)


        if(el._ownerId !== sessionStorage.getItem('_id')) {
            anglerInput.disabled = true
            weightInput.disabled = true
            speciesInput.disabled = true
            locationInput.disabled = true
            baitInput.disabled = true
            captureTimeInput.disabled = true
            
            updateBtn.disabled = true
            deleteBtn.disabled = true

        }
        mainDiv.appendChild(div)
    }

    let nekvilaina = document.querySelectorAll("#catches .catch button")
        let laino = Array.from(nekvilaina).map((s) => s.disabled == true )
        const result = laino.filter((x) => {
            if (x !== true) {
              return true;
            }
        })
        console.log(result)
}

async function onclickUpdate(e) {
    let parentElements = e.target.parentElement

    let angler = parentElements.querySelector('.angler').value
    let weight = parentElements.querySelector('.weight').value
    let species = parentElements.querySelector('.species').value
    let location = parentElements.querySelector('.location').value
    let bait = parentElements.querySelector('.bait').value
    let captureTime = parentElements.querySelector('.captureTime').value

    if(angler && weight && species && location && bait && captureTime) {
        let data = {angler, weight, species, location, bait, captureTime}

        let id = parentElements.querySelector('.update').getAttribute('data-id')

        let settings = {
            method: 'PUT',
            headers: {'Content-type': 'application/json',
            'X-Authorization': sessionStorage.getItem('accessToken')
        },
            body: JSON.stringify(data)
        }

        await fetch(`http://localhost:3030/data/catches/${id}`, settings)
        document.querySelector('.load').click()
    };
}

async function onclickDelete(e) {
    let parentElement = e.target.parentElement

    let id = parentElement.querySelector('.delete').getAttribute('data-id')

    let settings = {
        method: 'DELETE',
        headers: {'X-Authorization': sessionStorage.getItem('accessToken')}
    }

    await fetch(`http://localhost:3030/data/catches/${id}`, settings)

    document.querySelector('.load').click()
}

async function onclickAdd(e) {
    e.preventDefault()

    let form = document.getElementById('addForm')
    let data = new FormData(form)

    let catchData = {
        angler: data.get('angler'),
        weight: data.get('weight'),
        species: data.get('species'),
        location: data.get('location'),
        bait: data.get('bait'),
        captureTime: data.get('captureTime')
    }

    if(catchData.angler !=='' && catchData.weight !== ''&& catchData.species !== ''&& catchData.location !== ''&& catchData.bait !=='' && catchData.captureTime !== '' && Number.isInteger(Number(catchData.captureTime)) == true) {
        let settings = {
            method: 'POST', 
            headers: {'Content-type': 'application/json',
            'X-Authorization': sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(catchData)
        }

        await fetch('http://localhost:3030/data/catches', settings)

        document.getElementsByName('angler')[0].value = ''
        document.getElementsByName('weight')[0].value = ''
        document.getElementsByName('species')[0].value = ''
        document.getElementsByName('location')[0].value = ''
        document.getElementsByName('bait')[0].value = ''
        document.getElementsByName('captureTime')[0].value = ''
        document.querySelector('.load').click()
    }
}


function onclickLogout() {
    if(sessionStorage.getItem('email')) {
        document.getElementById('login').style.display = 'inline'
        document.getElementById('register').style.display = 'inline'

        let p = document.querySelector('.email')
        p.getElementsByTagName('span')[0].textContent = 'guest'

        let settings = {
            method: 'GET',
            headers: {'X-Authorization': sessionStorage.getItem('accessToken')}
        }

        fetch('http://localhost:3030/users/logout', settings)

        sessionStorage.removeItem('email')
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('_id')
        document.getElementById('home').click()
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
