import { html } from "../api/loadLibs.js";

export const guestNav = () => html`<div>
            <a href="/dashboard">Dashboard</a>
            <a href="/search">Search</a>
          </div>

          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`

export const userNav = () => html`<div>
            <a href="/dashboard">Dashboard</a>
            <a href="/search">Search</a>
          </div>

          <!-- Logged-in users -->
          <div class="user">
            <a href="/add-pair">Add Pair</a>
            <a href="/logout">Logout</a>
          </div>`