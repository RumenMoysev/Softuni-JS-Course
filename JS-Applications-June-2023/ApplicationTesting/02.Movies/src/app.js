let navBar = document.getElementsByClassName('navbar navbar-expand-lg navbar-dark bg-dark')[0]
navBar.addEventListener('click', onclick)

import { homePage } from "./home.js"
import { loginPage } from "./login.js"
import { logout } from "./logout.js"
import { registerPage } from "./register.js"
import { correctNavBar } from "./utilities.js"

let paths = {
    '/': homePage,
    '/login': loginPage,
    '/register': registerPage,
    '/logout': logout
}

function onclick(e) {
    e.preventDefault()

    if(e.target.tagName == 'A' && e.target.href) { 
        let url = new URL(e.target)

        const view = paths[url.pathname]()
    }
}

homePage()