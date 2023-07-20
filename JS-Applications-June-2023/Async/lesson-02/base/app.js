window.onload = function() {
    
    fetch('http://localhost:3030/jsonstore/cookbook/recipes')
    .then(data => data.json())
    .then(x => {
        for(let el of Object.values(x)) {
            console.log(el)
            let article = document.createElement('article')
            article.classList.add('preview')
            let div1 = document.createElement('div')
            div1.classList.add('title')
            let h2 = document.createElement('h2')
            h2.textContent = el.name
            div1.appendChild(h2)

            let div2 = document.createElement('div')
            div2.classList.add('small')
            let img = document.createElement('img')
            img.src = el.img
            div2.appendChild(img)

            article.appendChild(div1)
            article.appendChild(div2)
            article.addEventListener('click', onclick)
            document.getElementById('main').appendChild(article)
        }
    })


    function onclick(e) {
        let id = '0' + e.target.children[0].children[0].textContent.split(' ')[1]

        for(let el of Array.from(e.target.children)) {
            el.remove()
        }

        fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`)
        .then(data => data.json())
        .then(x => {
            e.target.classList.remove('preview')
            let h2 = document.createElement('h2')
            h2.textContent = x.name
            e.target.appendChild(h2)
            
            let div1 = document.createElement('div')
            div1.classList.add('band')

            let div2 = document.createElement('div')
            div2.classList.add('thumb')
            let img = document.createElement('img')
            img.src = x.img

            div2.appendChild(img)
            div1.appendChild(div2)

            let div3 = document.createElement('div')
            div3.classList.add('ingredients')
            let h3 = document.createElement('h3')
            h3.textContent = 'Ingredients:'
            div3.appendChild(h3)

            let ul = document.createElement('ul')

            for(let el of x.ingredients) {
                let li = document.createElement('li')
                li.textContent = el
                ul.appendChild(li)
            };
            div3.appendChild(ul)
            div1.appendChild(div3)

            let div4 = document.createElement('div')
            div4.classList.add('description')
            let h31 = document.createElement('h3')
            h31.textContent = 'Preparation:'
            div4.appendChild(h31)

            for(let el of x.steps) {
                let p = document.createElement('p')
                p.textContent = el
                div4.appendChild(p)
            };

            e.target.appendChild(div1)
            e.target.appendChild(div4)
            e.target.removeEventListener('click', onclick)
        })     
    }

    function createElement1(type, text, parent, className) {
        let element = document.createElement(type)
        element.textContent = text
      
        if(className !== undefined) {
          element.classList.add(className)
        }
        parent.appendChild(element)
      
        return element
    }
};