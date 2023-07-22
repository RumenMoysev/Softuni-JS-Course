import {page, render} from './api/loadLibs.js'
import { isUserLoggedIn } from './api/sessionStorageController.js'
import { guestNav, userNav } from './templates/navBarTemp.js'
import { showAdd } from './utils/addPair.js'
import { showDashboard } from './utils/dashboard.js'
import { showDetails } from './utils/details.js'
import { showEdit } from './utils/edit.js'
import { showHome } from './utils/home.js'
import { showLogin } from './utils/login.js'
import { logout } from './utils/logout.js'
import { showRegister } from './utils/register.js'
import { showSearch } from './utils/search.js'

page('/index.html', '/')
page('/', showNav, showHome)
page('/register', showNav, showRegister)
page('/login', showNav, showLogin)
page('/logout', logout)
page('/dashboard', showNav, showDashboard)
page('/add-pair', showNav, showAdd)
page('/search', showNav, showSearch)
page('/:id', showNav, showDetails)
page('/:id/edit', showNav, showEdit)
page.start()

function showNav(ctx, next) {
    let output = document.getElementById('navBar')
    isUserLoggedIn() ? render(userNav(), output) : render(guestNav(), output)
    next()
}