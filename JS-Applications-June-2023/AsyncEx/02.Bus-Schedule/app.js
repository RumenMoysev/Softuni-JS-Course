function solve() {

    let data
    let next = 'depot'

    function depart() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${next}`)
        .then(data => data.json())
        .then(x => {
            data = x
            console.log(data)
            document.querySelector('.info').textContent = `Next stop ${data.name}`
            document.getElementById('depart').disabled = true
            document.getElementById('arrive').disabled = false
        })
        .catch(e =>  {
            document.querySelector('.info').textContent = `Error`
            document.getElementById('depart').disabled = true
            document.getElementById('arrive').disabled = true
        })
    }

    function arrive() {
        

        fetch(`http://localhost:3030/jsonstore/bus/schedule/${next}`)
        .then(data => data.json())
        .then(x => {
            data = x
            console.log(data)
            document.querySelector('.info').textContent = `Arrived at ${data.name}`
            document.getElementById('depart').disabled = false
            document.getElementById('arrive').disabled = true
        })
        next = data.next
    }

    return {
        depart,
        arrive
    };
}

let result = solve();