import { internalFetch } from "./api/fetch.js";
import { page, render } from "./api/loadLibs.js";
import { getAccessToken, getUserId, isUserLoggedIn } from "./api/sessionStorageController.js";
import { guestNav, userNav } from "./templates/navTemp.js";
import { logout } from "./utils/logout.js";
import { showAdd } from "./views/addFruit.js";
import { showFruits } from "./views/fruits.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showSearch } from "./views/search.js";
import { showDetails } from "./views/showDetails.js";
import { showEdit } from "./views/showEdit.js";


page(decorateContext)
page(showNav)
page('/index.html', '/')
page('/', showHome)
page('/register', showRegister)
page('/login', showLogin)
page('/fruits', showFruits)
page('/add-fruit', showAdd)
page('/search', showSearch)
page('/:id', showDetails)
page('/:id/edit', showEdit)

page.start()

function decorateContext(ctx, next) {
    let output = document.getElementById('main')
    ctx.render = function(content) {
        render(content, output)
    }
    ctx.internalFetch = internalFetch
    ctx.accessToken = getAccessToken()
    ctx.userId = getUserId()
    next()
}

function showNav(ctx, next) {
    let output = document.getElementById('navBar')
    isUserLoggedIn() ? render(userNav(logout), output) : render(guestNav(), output)
    next()
}