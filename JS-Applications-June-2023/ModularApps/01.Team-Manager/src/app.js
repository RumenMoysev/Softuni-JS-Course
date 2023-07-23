import { isUserLoggedIn } from "./api/sessionStorageController.js";
import { page } from "./api/loadLibs.js";
import { html, render } from "./api/loadLibs.js";
import { guestNav, userNav } from "./utils/navBar.js";
import { showRegister } from "./utils/register.js";
import { logout } from "./utils/logout.js";
import { showHome } from "./utils/showHome.js";
import { showLogin } from "./utils/login.js";
import { showBrowse } from "./utils/browseTeams.js";
import { showCreate } from "./utils/createATeam.js";
import { showDetails } from "./utils/detailsHandler.js";
import { showEdit } from "./utils/edit.js";
import { showMyTeams } from "./utils/myteams.js";

page('/index.html', '/')
page('/', showNav, showHome)
page('/register', showNav, showRegister)
page('/logout', showNav, logout)
page('/login', showNav, showLogin)
page('/browse-teams',showNav, showBrowse)
page('/create-a-team', showNav, showCreate)
page('/my-teams', showNav, showMyTeams)
page('/:id', showNav, showDetails)
page('/:id/edit', showNav, showEdit)
page.start()

function showNav(ctx, next) {
    let output = document.getElementById('nav')
    isUserLoggedIn() ? render(userNav(), output) : render(guestNav(), output)
    next()
}