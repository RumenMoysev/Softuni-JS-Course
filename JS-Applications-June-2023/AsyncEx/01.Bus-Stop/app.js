function getInfo() {
    let input = document.getElementById('stopId').value

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${input}`)
    .then(data => data.json())
    .then(x =>  {
        document.getElementById('stopName').textContent = x.name

        for(let [bus, time] of Object.entries(x.buses)) {
            let li = document.createElement('li')
            li.textContent = `Bus ${bus} arrives in ${time} minutes`
            document.getElementById('buses').appendChild(li)
        };
    })
    .catch(e => document.getElementById('stopName').textContent = 'Error')
}