window.onload = async function solution() {
    let main = document.getElementById('main')

    let serverResponse = await fetch('http://localhost:3030/jsonstore/advanced/articles/list')
    let data = await serverResponse.json()

    console.log(data)
    data.forEach(element => {
        let div1 = document.createElement('div')
        div1.classList.add('accordion')

        let divhead = document.createElement('div')
        divhead.classList.add('head')
        createElement1('span', element.title, divhead)
        let button = createElement1('button', 'More', divhead, 'button')
        button.id = element._id

        button.addEventListener('click', onclick)
        div1.appendChild(divhead)

        let divExtra = document.createElement('div')
        divExtra.classList.add('extra')
        let p = document.createElement('p')
        divExtra.appendChild(p)
        div1.appendChild(divExtra)

        main.appendChild(div1)
    });    

    async function onclick(e) {
        let target = e.target
        let p = target.parentElement.parentElement.children[1].children[0]

        await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${target.id}`)
        .then(a => a.json())
        .then(data => p.textContent = data.content)

        target.parentElement.parentElement.children[1].style.display = 'block'
        target.removeEventListener('click', onclick)
        target.addEventListener('click', onclick1)
    }

    function onclick1(e) {
        let target = e.target

        target.parentElement.parentElement.children[1].style.display = 'none'
        target.removeEventListener('click', onclick1)
        target.addEventListener('click', onclick)
    }

    function createElement1(type, text, parent, className) {
        let element = document.createElement(type)
        element.textContent = text
      
        if(className !== undefined) {
          element.className = (className)
        }
        parent.appendChild(element)
      
        return element
    }
}

