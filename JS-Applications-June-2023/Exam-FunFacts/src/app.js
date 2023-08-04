import { internalFetch } from "./api/fetch.js";
import { page, render } from "./api/loadLibs.js";
import {
  getAccessToken,
  getUserId,
  isUserLoggedIn,
} from "./api/sessionStorageController.js";
import { guestNav, userNav } from "./templates/navBar.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { logout } from "./utils/logout.js";
import { showHome } from "./views/home.js";
import { showDashboard } from "./views/dashboard.js";
import { showCreate } from "./views/addFact.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";

page(decorateContext)
page(showNav)

page('/index.html','/')
page('/', showHome)
page('/register', showRegister)
page('/login', showLogin)
page('/facts', showDashboard)
page('/addFact', showCreate)
page('/:id/edit', showEdit)
page('/:id', showDetails)
page.start()

function decorateContext(ctx, next) {
  let output = document.getElementById("main");
  ctx.render = function (content) {
    render(content, output);
  };
  ctx.internalFetch = internalFetch;
  ctx.accessToken = getAccessToken();
  ctx.userId = getUserId();
  ctx.isUserLoggedIn = isUserLoggedIn();
  next();
}

function showNav(ctx, next) {
  let output = document.getElementById("navBar");
  isUserLoggedIn() ? render(userNav(logout), output) : render(guestNav, output);
  next();
}