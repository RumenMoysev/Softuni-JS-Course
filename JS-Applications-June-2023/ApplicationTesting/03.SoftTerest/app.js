import { logout } from "./utils/logout.js"
import { isUserLoggedIn } from "./utils/sessionStorage.js"
import { showNav } from "./utils/showCorrectNav.js"
import { showCreate } from "./utils/showCreate.js"
import { showDashboard } from "./utils/showDashboard.js"
import { loadElems, showHide } from "./utils/showHide.js"
import { showLogin } from "./utils/showLogin.js"
import { showRegister } from "./utils/showRegister.js"

let navBar = document.getElementsByClassName('container')[0]
navBar.addEventListener('click', onclickShowPage)

let dashboard = document.getElementsByClassName('nav-link')[0]
let homePage = document.getElementById('homePage')
showHide(homePage)
showNav()
let btnGetStarted = homePage.getElementsByClassName('btn btn-secondary btn-lg')[0]
btnGetStarted.addEventListener('click', function(e) {e.preventDefault(); isUserLoggedIn() ? dashboard.click() : showRegister()})

let paths = {
    '/dashboard': showDashboard,
    '/create': showCreate,
    '/logout': logout,
    '/login': showLogin,
    '/register': showRegister,
}

function onclickShowPage(e) {
    e.preventDefault()
    let target = e.target
    if(target.tagName == 'IMG') {
        target = target.parentElement
        loadElems()
        showHide(homePage)
        return
    }

    if(target.tagName == 'A' && target.href) {
        let url = new URL(target)
        
        paths[url.pathname]()
    }
}