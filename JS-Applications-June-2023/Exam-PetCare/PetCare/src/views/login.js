import { html,page } from "../api/loadLibs.js";

const loginTemp = (internalFetch) => html` <section id="loginPage">
  <form class="loginForm">
    <img src="./images/logo.png" alt="logo" />
    <h2>Login</h2>

    <div>
      <label for="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        placeholder="steven@abv.bg"
        value=""
      />
    </div>

    <div>
      <label for="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="********"
        value=""
      />
    </div>

    <button class="btn" type="submit" @click=${(e) => loginHandler(e, internalFetch)}>Login</button>

    <p class="field">
      <span>If you don't have profile click <a href="/register">here</a></span>
    </p>
  </form>
</section>`;

export function showLogin(ctx) {
    ctx.render(loginTemp(ctx.internalFetch))
}

async function loginHandler(e, internalFetch) {
    e.preventDefault() 

    let form = document.querySelector('.loginForm')
    let formData = new FormData(form)

    let data = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/

    if(regex.test(data.email) && data.password) {
        try {
            let settings = {
                method:"POST",
                headers:{'Content-type':'application/json'},
                body: JSON.stringify(data)
            }

            let response = await internalFetch("/users/login", settings);
            form.reset()
            sessionStorage.setItem('accessToken', response.accessToken)
            sessionStorage.setItem('userId', response._id)
            page('/')
        }catch(e) {
            alert(e.message)
        }
    } else {
        alert('Please fill all inputs!')
    }
}