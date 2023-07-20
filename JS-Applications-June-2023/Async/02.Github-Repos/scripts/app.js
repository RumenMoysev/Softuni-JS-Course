function loadRepos() {
	let username = document.getElementById('username')
	let output = document.getElementById('repos')
	
	fetch(`https://api.github.com/users/${username.value}/repos`)
	.then(data => data.json())
	.then(x => {
		for(let el1 of x) {
			let li = document.createElement('li')
			let el = createElement1('a', `${el1.full_name}`, li)
			el.href = el1.html_url
			output.appendChild(li)
		}
	})
	.catch(x => {
		let li = document.createElement('li')
		let el = createElement1('a', `Error: 404`, li)
		output.appendChild(li)
	})

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