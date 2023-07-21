import { homePage } from "./home.js"
import { correctNavBar, showHide } from "./utilities.js"

export function loginPage(e) {
    console.log('login page')

    let loginElem = document.getElementById("form-login")

    showHide(loginElem)
    correctNavBar()

    let form = document.getElementById('login-form')
    form.addEventListener('submit', login)
}

function login(e) {
    e.preventDefault()

    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/

    let form = document.getElementById('login-form')
    let formData = new FormData(form)

    let data = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    if(regex.test(data.email) && data.password) {
        let options = {
            method: 'POST', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        }

        fetch('http://localhost:3030/users/login', options)
        .then(x => x.json())
        .then(data => {
            if(data.code>300) {
                throw new Error(data.message)
            }

            console.log(data)
            sessionStorage.setItem('user', JSON.stringify(data))
            homePage()
        })
        .catch(e => alert(e.message))


        form.reset()

    } else if(!regex.test(data.email)) {
        alert('Correct email required!')
    } else if (!data.password) {
        alert('Password required!')
    }
}