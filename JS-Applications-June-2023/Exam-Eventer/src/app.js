import { internalFetch } from "./api/fetch.js";
import { page, render } from "./api/loadLibs.js";
import { getAccessToken, getUserId, isUserLoggedIn } from "./api/sessionStorageController.js";
import { userNav, guestNav } from "./templates/navTemp.js";
import { logout } from "./utils/logout.js";
import { showAdd } from "./views/add-event.js";
import { showEvents } from "./views/dashboard.js";
import { showEdit } from "./views/edit-event.js";
import { showDetails } from "./views/eventDetails.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";

page(decorateContext)
page(showNav)

page('/index.html', '/')
page('/', showHome)
page('/dashboard', showEvents)
page('/register', showRegister)
page('/login', showLogin)
page('/add-event', showAdd)
page('/:id', showDetails)
page('/:id/edit', showEdit)
page.start()

function decorateContext(ctx, next) {
    let output = document.getElementById('main')
    ctx.render = function (content) {
        render(content, output)
    }
    ctx.internalFetch = internalFetch
    ctx.accessToken = getAccessToken()
    ctx.userId = getUserId()
    next()
}

function showNav(ctx, next) {
    let output = document.getElementById('navBar')
    isUserLoggedIn() ? render(userNav(logout), output) : render(guestNav, output)
    next()
}