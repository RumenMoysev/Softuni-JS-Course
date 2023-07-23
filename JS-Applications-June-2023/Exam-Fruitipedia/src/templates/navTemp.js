import { html } from "../api/loadLibs.js";

export const userNav = (logout) => html`<div>
            <a href="/fruits">Fruits</a>
            <a href="/search">Search</a>
          </div>

          <div class="user">
            <a href="/add-fruit">Add Fruit</a>
            <a href="javascript:void(0)" @click=${logout}>Logout</a>
          </div>`

export const guestNav = () => html`<div>
            <a href="/fruits">Fruits</a>
            <a href="/search">Search</a>
          </div>

          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`