import { html } from "../api/loadLibs.js";

export const userNav = (logout) => html`
  <li><a href="/">Home</a></li>
  <li><a href="/dashboard">Dashboard</a></li>
  <li><a href="/create">Create Postcard</a></li>
  <li><a href="javascript:void(0)" @click=${logout}>Logout</a></li>`;

export const guestNav = html`<li><a href="/">Home</a></li>
  <li><a href="/dashboard">Dashboard</a></li>
  <li><a href="/login">Login</a></li>
  <li><a href="/register">Register</a></li>`;