import { internalFetch } from "../api/fetch.js";
import { html, render } from "../api/loadLibs.js";
import { page } from "../api/loadLibs.js";

let temp = (loginHandler) => html`<section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit" @click=${loginHandler}>login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>`
let output =document.getElementById('main')
export function showLogin() {
    render(temp(loginHandler), output)
}

async function loginHandler(e) {
    e.preventDefault()
    let form = document.querySelector('.login-form')
    let data1 = new FormData(form)

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

        try{
            let response = await internalFetch('http://localhost:3030/users/login', settings)
            form.reset()
            sessionStorage.setItem('accessToken', response.accessToken)
            sessionStorage.setItem('userId', response._id)
            page('/')
        } catch(e) {
            alert(e.message)
        }
        
    } else {
        alert('Please fill all input fields.')
    }
}