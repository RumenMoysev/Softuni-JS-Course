import { internalFetch } from "../api/fetch.js"
import { html, render } from "../api/loadLibs.js"
import { page } from "../api/loadLibs.js"
let template = (loginHandler) => html`<section id="login">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Login</h1>
                    </header>
                    <form id="login-form" class="main-form pad-large">
                        <div class="error" style='display: none' id="error">Error message.</div>
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <input class="action cta" type="submit" value="Sign In" @click=${loginHandler}>
                    </form>
                    <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
                    </footer>
                </article>
            </section>`

let output = document.getElementById('main')

export function showLogin() {
    render(template(loginHandler), output)
}

async function loginHandler(e) {
    e.preventDefault()
    let form = document.getElementById('login-form')
    let data1 = new FormData(form)

    let data = {
        email: data1.get('email'),
        password: data1.get('password')
    }
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/

    if(regex.test(data.email) && data.password.length >=3) {
        let settings = {
            method:'POST', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        }
        try {
            let response = await internalFetch('http://localhost:3030/users/login', settings)
            form.reset()
            sessionStorage.setItem('accessToken', response.accessToken)
            sessionStorage.setItem('userId', response._id)
            sessionStorage.setItem('username', response.username)
            page('/')
        } catch(e) {
            let errorDiv = document.getElementById('error')
            errorDiv.textContent = e.message
            errorDiv.style.display = 'block'
        }

        
    } else if (!regex.test(data.email)) {
        let errorDiv = document.getElementById('error')
        errorDiv.textContent = "Please provide a correct email."
        errorDiv.style.display = 'block'
    } else {
        document.getElementById('error').textContent = 'Please fill all inputs.'
        document.getElementById('error').style.display = 'block'
    }
}