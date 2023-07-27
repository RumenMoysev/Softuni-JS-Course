import { html, page } from "../api/loadLibs.js";

const registerTemp = (internalFetch) => html`<section id="registerPage">
  <form class="registerForm">
    <img src="./images/logo.png" alt="logo" />
    <h2>Register</h2>
    <div class="on-dark">
      <label for="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        placeholder="steven@abv.bg"
        value=""
      />
    </div>

    <div class="on-dark">
      <label for="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="********"
        value=""
      />
    </div>

    <div class="on-dark">
      <label for="repeatPassword">Repeat Password:</label>
      <input
        id="repeatPassword"
        name="repeatPassword"
        type="password"
        placeholder="********"
        value=""
      />
    </div>

    <button
      class="btn"
      type="submit"
      @click=${(e) => registerHandler(e, internalFetch)}
    >
      Register
    </button>

    <p class="field">
      <span>If you have profile click <a href="/login">here</a></span>
    </p>
  </form>
</section>`;

export function showRegister(ctx) {
  ctx.render(registerTemp(ctx.internalFetch));
}

async function registerHandler(e, internalFetch) {
  e.preventDefault();
  let form = document.querySelector(".registerForm");
  let formdata = new FormData(form);

  let data = {
    email: formdata.get("email"),
    password: formdata.get("password"),
  };

  const repass = formdata.get("repeatPassword");
  const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
  if (regex.test(data.email) && data.password && data.password == repass) {
    try {
      let settings = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      };
      let response = await internalFetch("/users/register", settings);
      form.reset();
      sessionStorage.setItem("accessToken", response.accessToken);
      sessionStorage.setItem("userId", response._id);
      page('/')
    } catch (e) {
      alert(e.message);
    }
  } else {
    alert("Please fill all inputs or check if both passwords are correct!");
  }
}
