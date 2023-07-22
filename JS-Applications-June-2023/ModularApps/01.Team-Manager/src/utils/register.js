import { internalFetch } from "../api/fetch.js";
import { html, render } from "../api/loadLibs.js";
import { page } from "../api/loadLibs.js";

let template = (registerHandler) => html`<section id="register">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Register</h1>
                    </header>
                    <form id="register-form" class="main-form pad-large">
                        <div class="error" id="errorDiv" style="display: none;">Error message.</div>
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Username: <input type="text" name="username"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <label>Repeat: <input type="password" name="repass"></label>
                        <input class="action cta" type="submit" value="Create Account" @click=${registerHandler}>
                    </form>
                    <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
                    </footer>
                </article>
</section>`
let output = document.getElementById('main')

export function showRegister() {
    render(template(registerHandler), output)
}

async function registerHandler(e) {
    e.preventDefault()
    let form = document.getElementById('register-form')
    let data1 = new FormData(form)

    let data = {
        email: data1.get('email'),
        username: data1.get('username'),
        password: data1.get('password')
    }
    let rePass = data1.get('repass')
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/

    if(regex.test(data.email) && data.username.length >= 3 && data.password.length >=3 && data.password == rePass) {
        let settings = {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(data)
        };

        try {
            let response = await internalFetch('http://localhost:3030/users/register', settings)
            sessionStorage.setItem('accessToken', response.accessToken)
            sessionStorage.setItem('userId', response._id)
            sessionStorage.setItem('username', response.username)
            form.reset()
            page('/')
        } catch(e) {
            let errorDiv = document.getElementById('errorDiv')
            errorDiv.textContent = e.message
            errorDiv.style.display = 'block'
        };
    } else if(data.password != rePass) {
        let errorDiv = document.getElementById('errorDiv')
        errorDiv.textContent = "Passwords don't match"
        errorDiv.style.display = 'block'
    } else if(!regex.test(data.email)) {
        let errorDiv = document.getElementById('errorDiv')
        errorDiv.textContent = "Please provide a correct email."
        errorDiv.style.display = 'block'
    }else {
        document.getElementById('errorDiv').textContent = 'Please fill all inputs.'
        document.getElementById('errorDiv').style.display = 'block'
    }
}