import { internalFetch } from "./api/fetch.js";
import { page, render } from "./api/loadLibs.js";
import {getAccessToken,getUserId,isUserLoggedIn,} from "./api/sessionStorageController.js";
import { userNav, guestNav } from "./templates/navTemp.js";
import { logout } from "./utils/logout.js";
import { showCreate } from "./views/createPostcard.js";
import { showDashboard } from "./views/dashboar.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showHome } from "./views/homePage.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";

page(decorateContext)
page(showNav)

page('/index.html', '/')
page('/', showHome)
page('/register', showRegister)
page('/login', showLogin)
page('/dashboard', showDashboard)
page('/create', showCreate)
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
  ctx.isUserLoggedIn = isUserLoggedIn()
  next();
}

function showNav(ctx, next) {
  let output = document.getElementById("navBar");
  isUserLoggedIn() ? render(userNav(logout), output) : render(guestNav, output);
  next();
}