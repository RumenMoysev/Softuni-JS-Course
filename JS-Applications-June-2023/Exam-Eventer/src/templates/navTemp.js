import { html } from "../api/loadLibs.js";

export const userNav = (logout) => html`<div>
            <a href="/dashboard">Events</a>
          </div>

          <div class="user">
            <a href="/add-event">Add Event</a>
            <a href="javascript:void(0)" @click=${logout}>Logout</a>
          </div>`
export const guestNav =  html`<div>
            <a href="/dashboard">Events</a>
          </div>

          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`