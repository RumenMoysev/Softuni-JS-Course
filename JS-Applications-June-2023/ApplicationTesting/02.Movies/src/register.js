import { homePage } from "./home.js"
import { showHide } from "./utilities.js"

export function registerPage() {
    console.log('register page')

    let registerForm = document.getElementById('form-sign-up')
    showHide(registerForm)
    registerForm.addEventListener('submit', onClickRegister)
}

async function onClickRegister(e) {
    e.preventDefault()

    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
    let form = e.target
    let formData = new FormData(form)

    let registerData = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    let rePass = formData.get('repeatPassword')

    if(regex.test(registerData.email) && registerData.password.length >= 6 && rePass == registerData.password) {
        let settings = {
            method: 'POST', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(registerData)
        }

        let response = await fetch('http://localhost:3030/users/register', settings)
        try{
            if(!response.ok) {
                let responseData = await response.json()
                throw new Error(responseData.message)
            }
            
            let responseData = await response.json()

            sessionStorage.setItem('user', JSON.stringify(responseData))

            form.reset()
            homePage()
        }catch(e) {
            alert(e)
        }
    }else if(!regex.test(registerData.email)) {
        alert("Invalid email!")
    } else if(registerData.password.length < 6) {
        alert("Password should be at least 6 characters long!")
    } else if(registerData.password !== rePass) {
        alert("Passwords don't match!")
    }
}