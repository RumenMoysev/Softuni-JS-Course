function cityRecord(city, population, treasury) {
    let obj = {
        name: city,
        population: population,
        treasury: treasury
    }

    return obj
}

console.log(cityRecord('Tortuga',
7000,
15000))

function townPopulation(input) {
    let obj = {}

    input.forEach(element => {
        let [city, population] = element.split(' <-> ')
        population = Number(population)

        if(!obj.hasOwnProperty(city)) {
            obj[city] = population
        } else {
            obj[city] += population
        }
    });

    for(const [key, value] of Object.entries(obj)) {
        console.log(`${key} : ${value}`)
    }
}

townPopulation(['Sofia <-> 120',
'Montana <-> 20000',
'New York <-> 10000000',
'Washington <-> 2345000',
'Las Vegas <-> 1000000']
)

function cityTaxes(city, population, treasury) {
    let obj = {
        name: city,
        population: population,
        treasury: treasury,
        taxRate:10,
        collectTaxes: () => {
            const increase = obj.taxRate*obj.population

            obj.treasury += increase
        },
        applyGrowth: (x) => obj.population += Math.round(obj.population * (x/100)),
        applyRecession: (x) => obj.treasury -= Math.round(obj.treasury * (x/100))
    }

    return obj
}

const city =
 cityTaxes('Tortuga',
 7000,
 15000);
city.collectTaxes();
console.log(city.treasury);
city.applyRecession(5);
console.log(city.treasury);

function factory(library, orders) {
    let arr = []

    for(let el of orders) {
        let obj = {}
        let name = el.template.name
        let command = el.parts

        if(command.length> 1) {
            for(let el1 of command) {
                obj.name = name
                obj[el1] = library[el1]
            }
        } else {
            obj.name = name
            obj[command[0]] = library[command[0]]
        }

        arr.push(obj)
    }

    return arr
}   

const library = {
    print: function () {
    console.log(`${this.name} is printing a page`);
    },
    scan: function () {
    console.log(`${this.name} is scanning a document`);
    },
    play: function (artist, track) {
    console.log(`${this.name} is playing '${track}' by ${artist}`);
    },
};
   const orders = [
    {
    template: { name: 'ACME Printer'},
    parts: ['print']
    },
    {
    template: { name: 'Initech Scanner'},
    parts: ['scan']
    },
    {
    template: { name: 'ComTron Copier'},
    parts: ['scan', 'print']
    },
    {
    template: { name: 'BoomBox Stereo'},
    parts: ['play']
    }
];

const products = factory(library, orders);
console.log(products);

function createAssemblyLine(){
    return {
        hasClima: (car) => {
            car.temp = 21
            car.tempSettings = 21
            car.adjustTemp = () => {
                if(car.temp < car.tempSettings) {
                    car.temp += 1
                } else if(car.temp > car.tempSettings){
                    car.temp -= 1  
                }
            }
        },
        hasAudio: (car) => {
            car.currentTrack = {'name': '', 'artist': ''};
            
            car.nowPlaying = () => {
              if (car.currentTrack !== null) {
                console.log(`Now playing '${car.currentTrack.name}' by ${car.currentTrack.artist}`);
              }
            };
        },
        hasParktronic: (car) => {
            car.checkDistance = (distance) => {
                if(distance < 0.1) {
                    console.log('Beep! Beep! Beep!')
                } else if(distance>= 0.1 && distance< 0.25) {
                    console.log("Beep! Beep!")
                } else if(distance>= 0.25 && distance<0.5) {
                    console.log("Beep!")
                } else {
                    console.log('')
                }
            }
        }
    }
}

const assemblyLine = createAssemblyLine();
const myCar = {
 make: 'Toyota',
 model: 'Avensis'
};

assemblyLine.hasClima(myCar);
console.log(myCar.temp);
myCar.tempSettings = 18;
myCar.adjustTemp();
console.log(myCar.temp);
assemblyLine.hasAudio(myCar);
myCar.currentTrack = {
 name: 'Never Gonna Give You Up',
 artist: 'Rick Astley'
};   
myCar.nowPlaying();
assemblyLine.hasParktronic(myCar);
myCar.checkDistance(0.4);
myCar.checkDistance(0.2);
console.log(myCar); 

function fromJSONtoHtml(input) {
    const newArr = JSON.parse(input)
    let heading = '   <tr>'
    let i = 0

    let other = ''

    console.log('<table>')
    for(let el of newArr) {
        let name = el['Name']
        let score = el['Score']
        
        if(i== 0) {
            for(let el1 of Object.keys(el)) {
                heading += `<th>${el1.trim()}</th>` 
                i++
            }
        }
        
        other += '   <tr>'
        for(let el2 of Object.values(el)) {
            other += `<td>${el2}</td>`
        }
        other += '</tr>\n'
    }

    console.log(heading+ '</tr>')
    console.log(other)
    console.log('</table>')
}

fromJSONtoHtml(`[{"Name":"Pesho",
"Score":4,
" Grade":8},
{"Name":"Gosho",
"Score":5,
" Grade":8},
{"Name":"Angel",
"Score":5.50,
" Grade":10}]`
)