import { page } from "./utils/test.js";
import { render } from "./utils/test.js"
import { showRegister } from "./utils/Register.js";
import { deleteFurniture, editDetails, showDetails, showHome } from "./utils/home.js";
import { showLogin } from "./utils/login.js";
import { isUserLoggedIn } from "./utils/sessionStorageController.js";
import { guestNav, userNav } from "./utils/templates.js";
import { logout } from "./utils/logout.js";
import { showCreate } from "./utils/create.js";
import { showMyFurniture } from "./utils/myFurniture.js";

page('/index.html', '/')
page('/', showNav, showHome)
page('/register', showNav, showRegister)
page('/login', showNav, showLogin)
page('/logout', showNav, logout)
page('/create', showNav, showCreate)
page('/my-furniture', showNav, showMyFurniture)
page('/:id', showNav, detailsHandler)
page('/:id/edit', showNav, editHandler)
page('/:id/delete', showNav, deleteHandler)

page.start()

function showNav(ctx, next) {
    let output = document.getElementById('nav')
    isUserLoggedIn() ? render(userNav(), output) : render(guestNav(), output)
    next()
}

function detailsHandler(ctx, next) {showDetails(ctx.params.id)}
function editHandler(ctx, next) {editDetails(ctx.params.id)}
function deleteHandler(ctx, next) {deleteFurniture(ctx.params.id)}