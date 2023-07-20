function loadCommits() {
    let username = document.getElementById('username')
    let repo = document.getElementById('repo')
    let output = document.getElementById('commits')

    fetch(`https://api.github.com/repos/${username.value}/${repo.value}/commits`)
    .then(data => {
        if(!data.ok) {
            throw new Error(`${data.status} ${data.statusText}`)
        };
        return data.json()})
    .then(x => {
        for(let el1 of x) {
           createElement1('li', `${el1.commit.author.name}: ${el1.commit.message}`, output) 
        }
    })
    .catch(e =>  {let li = document.createElement('li')
        li.textContent = e.message
        output.appendChild(li)    
    }
    )
        

    function createElement1(type, text, parent, className) {
        let element = document.createElement(type)
        element.textContent = text
      
        if(className !== undefined) {
          element.classList.add(className)
        }
        parent.appendChild(element)
      
        return element
    }
}