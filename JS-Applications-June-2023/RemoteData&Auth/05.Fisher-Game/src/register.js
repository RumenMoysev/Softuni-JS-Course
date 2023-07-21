console.log('TODO:// Implement Register functionality');
let x = document.getElementById('register-view')
let form1 = x.getElementsByTagName('form')[0]

document.getElementById('logout').style.display = 'none'

let regBtn = document.getElementsByTagName('button')[0]
regBtn.addEventListener('click', onclick)

async function onclick(e) {
    e.preventDefault()

    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/

    let form = new FormData(form1)

    let regData = {
        email: form.get('email'),
        password: form.get('password')
    }

    let rePass = form.get('rePass')

    if(regex.test(regData.email) && regData.password && regData.password === rePass) {
        let settings = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(regData)
        }

        try{
            let a = await fetch('http://localhost:3030/users/register', settings)
            let x = await a.json()

            if(!a.ok) {
                throw new Error(a.statusText)
            }

            sessionStorage.setItem('accessToken', x.accessToken)
            sessionStorage.setItem('email', x.email)
            sessionStorage.setItem('_id', x._id)

            let labels = document.getElementsByTagName('input')

            for(let el of Array.from(labels)) {
                el.value = ''
            }

            document.getElementById('home').click()
        } catch(e) {
            let p = document.getElementsByClassName('notification')[0]
            p.textContent = e
        }
        
    } else if (!regex.test(regData.email)){
        let p = document.getElementsByClassName('notification')[0]
        p.textContent = 'Error: Email required.'
    } else if(!regData.password) {
        let p = document.getElementsByClassName('notification')[0]
        p.textContent = 'Error: Password required.'
    } else if( regData.password !== rePass) {
        let p = document.getElementsByClassName('notification')[0]
        p.textContent = `Error: Passwords don't match.`
    }
}