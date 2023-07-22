import { internalFetch } from "../api/fetch.js";
import { html, render } from "../api/loadLibs.js";
import { page } from "../api/loadLibs.js";

let temp = (registerHandler) => html`<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="login-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit" @click = ${registerHandler}>login</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>`

let output = document.getElementById('main')
export function showRegister() {
    render(temp(registerHandler), output)
}

async function registerHandler(e) {
    e.preventDefault()
    let form = document.querySelector('.login-form')
    let data1 = new FormData(form)

    let data = {
        email: data1.get('email'),
        password: data1.get('password')
    }
    let rePass = data1.get('re-password')
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/

    if (regex.test(data.email) && data.password && data.password == rePass) {
        let settings = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        };

        try{
            let response = await internalFetch('http://localhost:3030/users/register', settings)
            sessionStorage.setItem('accessToken', response.accessToken)
            sessionStorage.setItem('userId', response._id)
            page('/')
            form.reset()
        } catch(e) {
            alert(e.message)
        }
        
    } else {
        alert('You need to fill all inputs.')
    }
}