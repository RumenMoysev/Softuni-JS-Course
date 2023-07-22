import { isUserLoggedIn, getAccessToken } from './api/sessionStorageController.js'
import {page, render} from './api/loadLibs.js'
import { userNav, guestNav } from './templates/navTemps.js'
import { showRegister } from './views/register.js'
import { showLogin } from './views/login.js'
import { logout } from './utils/logout.js'
import { showHome } from './views/home.js'
import { internalFetch } from './api/fetch.js'
import { showDashboard } from './views/dashboard.js'
import { showDetails } from './views/details.js'
import { showAdd } from './views/addAlbum.js'
import { showEdit } from './views/edit.js'

page(showNav)
page(decorateContext)

page('/index.html', '/')
page('/', showHome)
page('/register', showRegister)
page('/login', showLogin)
page('/dashboard', showDashboard)
page('/add-album', showAdd)
page('/:id', showDetails)
page('/:id/edit', showEdit)
page.start()


function decorateContext(ctx, next) {
    let output = document.getElementById('main')
    ctx.render = function(content) {render(content, output)}
    ctx.internalFetch = internalFetch
    ctx.accessToken = getAccessToken()
    next()
}

function showNav(ctx, next) {
    let output = document.getElementById('navBar')
    isUserLoggedIn() ? render(userNav(logout), output) : render(guestNav(), output)
    next()
}