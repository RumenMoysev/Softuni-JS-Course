function lockedProfile() {
    let main = document.getElementById('main')
    main.innerHTML = ''

    let html = ''

    fetch('http://localhost:3030/jsonstore/advanced/profiles')
    .then(data => data.json()) 
    .then(x => {
        for(let el of Object.values(x)) {
            html += `<div class="profile">
            <img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="user1Locked" value="lock" checked>
                <label>Unlock</label>
                <input type="radio" name="user1Locked" value="unlock"><br>
                    <hr>
                        <label>Username</label>
                        <input type="text" name="user1Username" value=${el.username} disabled readonly />
                        <div class="user1Username">
                            <hr>
                                <label>Email:</label>
                                <input type="email" name="user1Email" value=${el.email} disabled readonly />
                                <label>Age:</label>
                                <input type="email" name="user1Age" value=${el.age} disabled readonly />
                        </div>
        
                        <button>Show more</button>
                    </div>`
        }

        main.innerHTML = html
        let hide = document.querySelectorAll(`.user1Username`)
        for(let el of Array.from(hide)) {
            el.style.display = 'none'
        }

        let btn = document.getElementsByTagName('button')
        for(let el of Array.from(btn)) {
            el.addEventListener('click', onclick.bind(x))
        }
    })

    function onclick(e) {
        let a = e.target.parentElement
        let radios = a.getElementsByTagName('input')
        let unlock = radios[1]

        if(unlock.checked) {
            a.querySelector(`.user1Username`).style.display = 'block'
            e.target.textContent = 'Hide it'
            e.target.removeEventListener('click', onclick)
            e.target.addEventListener('click', onclickHide)
            console.log(a.querySelector(`input[type="email"]`))
        }
    }

    function onclickHide(e) {
        console.log(e.target)
        let a = e.target.parentElement
        let radios = a.getElementsByTagName('input')
        let unlock = radios[1]

        if(unlock.checked) {
            a.querySelector(`.user1Username`).style.display = 'none'
            e.target.textContent = 'Show more'
            e.target.removeEventListener('click', onclickHide)
            e.target.addEventListener('click', onclick)
        }
    }
}