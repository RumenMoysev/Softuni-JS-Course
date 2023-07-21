import { internalFetch } from "./fetch.js"
import { setItem } from "./sessionStorage.js"
import { showNav } from "./showCorrectNav.js"
import { loadElems, showHide } from "./showHide.js"

let registerPage = document.getElementById('registerPage')
let form = document.getElementById('registerForm')
let homePage = document.getElementById('homePage')

let loginPage = document.getElementsByClassName('nav-link')[3]
let alreadyUser1 = form.getElementsByClassName('alreadyUser')[0]
let alreadyUser = alreadyUser1.children[0]
alreadyUser.addEventListener('click', function(e) {e.preventDefault(); loginPage.click()})

export function showRegister() {
    console.log('Regiser page')
    loadElems()
    showHide(registerPage)
    showNav()
    form.addEventListener('submit', register)
}

async function register(e) {
    e.preventDefault()
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/

    let formData = new FormData(form)

    let regData = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    let rePass = formData.get('repeatPassword')

    if(regex.test(regData.email) && regData.password.length >= 3 && regData.password === rePass) {
        let settings = {
            method: 'POST',
            headers: {"Content-type": 'application/json'},
            body: JSON.stringify(regData)
        }

        let url = 'http://localhost:3030/users/register'

        try {
            let response = await internalFetch(url, settings)
            setItem('user', JSON.stringify(response))
            form.reset()
            loadElems()
            showHide(homePage)
        } catch(e) {
            alert(e.message)
        }
        
    }
}