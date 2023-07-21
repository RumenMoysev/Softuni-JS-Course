console.log('TODO:// Implement Login functionality');

let x = document.getElementById('login-view')
let form1 = x.getElementsByTagName('form')[0]

document.getElementById('logout').style.display = 'none'

let btnLogIn = document.getElementsByTagName('button')[0]
btnLogIn.addEventListener('click', onclickLogIn)

async function onclickLogIn(e) {
    e.preventDefault()

    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/

    let form = new FormData(form1) 

    let data = {
        email: form.get('email'),
        password: form.get('password')
    }

    if(regex.test(data.email) && data.password) {
        let settings = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        }

        let url = 'http://localhost:3030/users/login'

        let x = await fetch(url, settings)
        let dataX = await x.json()

        try{
            if(!x.ok) {
                throw new Error(x.statusText)
            }

            sessionStorage.setItem('email', dataX.email)
            sessionStorage.setItem('accessToken', dataX.accessToken)
            sessionStorage.setItem('_id', dataX._id)

            let iputs = document.getElementsByTagName('input')

            for(let el of Array.from(iputs)) {
                el.value = ''
            }

        } catch(e) {
            let p = document.querySelector('.notification')
            p.textContent = e
        }

        window.location = './index.html'
    }
}