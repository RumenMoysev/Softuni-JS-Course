import { html, page } from "../api/loadLibs.js";

let temp = (registerHandler, internalFetch) => html`<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="register-form">
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
              <button type="submit" @click = ${(e) => registerHandler(e, internalFetch)}>register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>`

export function showRegister(ctx) { ctx.render(temp(registerHandler, ctx.internalFetch)) }

async function registerHandler(e, internalFetch) {
    e.preventDefault()
    let form = document.querySelector('.register-form')
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

        try {
            let response = await internalFetch('/users/register', settings)
            sessionStorage.setItem('accessToken', response.accessToken)
            sessionStorage.setItem('userId', response._id)
            page('/')
            form.reset()
        } catch (e) {
            alert(e.message)
        }

    } else {
        alert('You need to fill all inputs.')
    }
}