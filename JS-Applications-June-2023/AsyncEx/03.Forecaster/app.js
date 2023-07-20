function attachEvents() {
    let input = document.getElementById('location')

    let btn = document.getElementById('submit')
    btn.addEventListener('click', onclick)

    async function onclick() {
        let code

        await fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
        .then(data => data.json())
        .then(x => {

            for(let el of x) {
                if(el.name == input.value) {
                    code = el.code
                }
            }

            fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
            .then(data => data.json())
            .then(x => {
                document.getElementById('forecast').style.display = 'block'
                console.log(x)
                let symbol
                let div1 = document.createElement('div')
                div1.classList.add('forecasts')

                switch(x.forecast.condition) {
                    case 'Sunny': {symbol = '☀'}; break;
                    case 'Partly sunny': {symbol = '⛅'}; break;
                    case 'Overcast': {symbol = '☁'}; break;
                    case 'Rain': {symbol = '☂'}; break;
                }

                createElement1('span', symbol, div1, 'condition symbol')

                let span = document.createElement('span')
                span.classList.add('condition')

                createElement1('span', x.name, span, 'forecast-data')
                createElement1('span', `${x.forecast.low}°/${x.forecast.high}°`, span, 'forecast-data')
                createElement1('span', x.forecast.condition, span, 'forecast-data')

                div1.appendChild(span)
                document.getElementById('current').appendChild(div1)
            })
            .catch(e  => {
                document.getElementById('forecast').style.display = 'block'
                let p = document.createElement('p')
                p.textContent = 'Error'
                document.getElementById('forecast').appendChild(p)
            })
        
            fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
            .then(data => data.json())
            .then(x => {
                console.log(x)

                let symbol
                let div1 = document.createElement('div')
                div1.classList.add('forecast-info')

                for(let el of x.forecast) {
                    console.log(el)
                    switch(el.condition) {
                        case 'Sunny': {symbol = '☀'}; break;
                        case 'Partly sunny': {symbol = '⛅'}; break;
                        case 'Overcast': {symbol = '☁'}; break;
                        case 'Rain': {symbol = '☂'}; break;
                    }
                    let span = document.createElement('span')
                    span.className = 'upcoming'
                    
                    createElement1('span', symbol, span, 'symbol')
                    createElement1('span', `${el.low}°/${el.high}°`, span, 'forecast-data')
                    createElement1('span', el.condition, span, 'forecast-data')

                    div1.appendChild(span)
                    document.getElementById('upcoming').appendChild(div1)
                }
            } )
        })
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

attachEvents();