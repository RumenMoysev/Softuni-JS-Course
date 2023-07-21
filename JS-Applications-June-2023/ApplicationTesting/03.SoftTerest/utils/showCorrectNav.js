import { isUserLoggedIn } from "./sessionStorage.js";

export function showNav() {
    if(isUserLoggedIn()) {
        document.querySelectorAll('.guest')
        .forEach((x) => x.style.display = 'none')

        document.querySelectorAll('.user')
        .forEach((x) => x.style.display = 'block')
    } else {
        document.querySelectorAll('.user')
        .forEach((x) => x.style.display = 'none')

        document.querySelectorAll('.guest')
        .forEach((x) => x.style.display = 'block')
    }
}