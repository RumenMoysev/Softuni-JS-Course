import { html, page } from "../api/loadLibs.js";

let loginTemp = (internalFetch, loginHandler) => html`<section id="login">
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
      <button type="submit" @click=${(e) => loginHandler(e,internalFetch)}>login</button>
      <p class="message">Not registered? <a href="/register">Create an account</a></p>
    </form>
  </div>
</section>`;

export function showLogin(ctx) {
  ctx.render(loginTemp(ctx.internalFetch, loginHandler));
}

async function loginHandler(e, internalFetch) {
  e.preventDefault();

  let form = document.querySelector(".login-form");
  let formData = new FormData(form);

  let data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;

  if (regex.test(data.email) && data.password) {
    try {
      let settings = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      };

      let response = await internalFetch("/users/login", settings);
      form.reset();
      sessionStorage.setItem("accessToken", response.accessToken);
      sessionStorage.setItem("userId", response._id);
      page("/");
    } catch (e) {
      alert(e.message);
    }
  } else {
    alert("Please fill all inputs!");
  }
}