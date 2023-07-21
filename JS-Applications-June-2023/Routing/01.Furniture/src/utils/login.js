import { render } from "./test.js";
import { internalFetch } from "./fetch.js";
import {page} from "./test.js"
import { loginTemplate } from "./templates.js";

let parent = document.getElementById('container')

export function showLogin() {
    render(loginTemplate(loginLogic), parent)
}

async function loginLogic(e) {
    e.preventDefault()

    let data1 = new FormData(document.getElementById('loginForm'))
    let data = {
        email: data1.get('email'),
        password: data1.get('password')
    }
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/

    if (regex.test(data.email) && data.password) {
        let settings = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        }
        try {
            let response = await internalFetch('http://localhost:3030/users/login', settings)
            sessionStorage.setItem('accessToken', response.accessToken)
            sessionStorage.setItem('UserId', response._id)
            page('/')
        } catch(e) {
            alert(e.message)
        }
    }
}