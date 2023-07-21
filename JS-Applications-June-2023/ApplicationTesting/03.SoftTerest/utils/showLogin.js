import { internalFetch } from "./fetch.js"
import { setItem } from "./sessionStorage.js"
import { showNav } from "./showCorrectNav.js"
import { loadElems, showHide } from "./showHide.js"

let loginPage = document.getElementById('loginPage')
let form = document.getElementById('loginForm')
let registerPage = document.getElementsByClassName('nav-link')[4]
let alreadyUser1 = form.getElementsByClassName('alreadyUser')[0]
let alreadyUser = alreadyUser1.children[0]
alreadyUser.addEventListener('click', function(e) {e.preventDefault(); registerPage.click()})

export function showLogin() {
    loadElems()
    showHide(loginPage)
    showNav()
    form.addEventListener('submit', login)
}

async function login(e) {
    e.preventDefault()

    let formData = new FormData(form)
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/

    let loginData = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    if(regex.test(loginData.email) && loginData.password) {
        let settings = {
            method: 'POST',
            headers: {"Content-type": 'application/json'},
            body: JSON.stringify(loginData)
        }

        let url = 'http://localhost:3030/users/login'

        try {
            let response = await internalFetch(url, settings)
            setItem('user', JSON.stringify(response))
            form.reset()
            loadElems()
            showHide(homePage)
        } catch(e) {
            alert(e.message)
            form.reset()
        }
    }
}