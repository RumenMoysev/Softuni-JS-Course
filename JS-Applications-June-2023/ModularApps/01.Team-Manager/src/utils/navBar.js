import { html } from "../api/loadLibs.js";

export let guestNav = () => html`<a href="/browse-teams" class="action">Browse Teams</a>
                <a href="/login" class="action">Login</a>
                <a href="/register" class="action">Register</a>`

export let userNav = () => html`<a href="/browse-teams" class="action">Browse Teams</a>
                <a href="/my-teams" class="action">My Teams</a>
                <a href="/logout" class="action">Logout</a>`