function calorieObject(input) {
    let obj = {}
    let i = 0

    while(i<input.length) {
        obj[input[i]] = Number(input[i+1])
        i+=2
    }

    console.log(obj)
}

calorieObject(['Yoghurt', '48', 'Rise', '138',
'Apple', '52'] )

function constructionCrew(input) {
    if(input.dizziness === true) {
        let reqired = (input.experience * input.weight)*0.1
        input.levelOfHydrated += reqired
        input.dizziness = false
    }   

    return input
} 

constructionCrew({ weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true }
)

function carFactory(input) {
    let obj = {}
    let engine
    let carriage
    let arr = new Array(4)

    obj.model = input.model

    if(input.power<=90){
        engine = {
            power: 90,
            volume: 1800
        }
    } else if(input.power>90 && input.power <=120) {
        engine = {
            power: 120,
            volume: 2400
        }
    } else if(input.power>120) {
        engine = {
            power: 200,
            volume: 3500
        }
    }
    obj.engine = engine

    if(input.carriage == 'hatchback') {
        carriage = {
            type: 'hatchback',
            color: input.color
        }
    } else if (input.carriage == 'coupe') {
        carriage = {
            type: 'coupe',
            color: input.color
        } 
    }
    obj.carriage = carriage

    if(input.wheelsize % 2 == 0) {
        let wheel = Math.floor(input.wheelsize-1)
        arr.fill(wheel)
    } else {
        arr.fill(input.wheelsize)
    }

    obj.wheels = arr


    return obj
}

carFactory({ model: 'Opel Vectra',
power: 110,
color: 'grey',
carriage: 'coupe',
wheelsize: 17 }
)

function heroicInventory(input) {
    let arr = []

    for(let el of input) {
        let [name, level, items] = el.split(' / ')
        level = Number(level)
        items = items ? items.split(', ') : []

        arr.push({name, level, items})

    }

    return JSON.stringify(arr)
}

console.log(heroicInventory(['Isacc / 25 / Apple, GravityGun',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara']))

function lowestPricesInCities(input) {
    let obj = {}

    for(const el of input) {
        let [town, product, price] = el.split(' | ')
        price = Number(price)

        if(!obj.hasOwnProperty(product)) {
            obj[product] = {price, town}            
        } else {
            if(obj[product].price > price) {
                obj[product] = {price, town}
            } 
        }
    }

    for(let el of Object.entries(obj)) {
        console.log(el[0] + " -> " + el[1].price + ' (' + el[1].town + ')')
    }
}

lowestPricesInCities(['Sample Town | Sample Product | 1000',
'Sample Town | Orange | 2',
'Sample Town | Peach | 1',
'Sofia | Orange | 3',
'Sofia | Peach | 2',
'New York | Sample Product | 1000.1',
'New York | Burger | 10'])

function storeCatalogue(input) {
    let obj = {}

    for(const el of input) {
        let [product, price] = el.split(' : ') 
        price = Number(price)
        let firstLetter = product[0]

        if(!obj.hasOwnProperty(firstLetter)) {
            obj[firstLetter] = []
            obj[firstLetter].push(`${product}: ${price}`)
        } else {
            obj[firstLetter].push(`${product}: ${price}`)
        }
    }

    let sorted = Object.entries(obj).sort(([aKey, aValue], [bKey, bValue]) => aKey.localeCompare(bKey))
    .sort(([aKey, aValue], [bKey, bValue]) => aValue.sort((a,b) => a.localeCompare(b)))
    .sort(([aKey, aValue], [bKey, bValue]) => bValue.sort((a,b) => a.localeCompare(b)));

    for(let el of sorted) {
        console.log(el[0])
        for(let el1 of el[1]) {
            console.log(`  ${el1}`)
        }
    }
}

storeCatalogue(['Appricot : 20.4', 'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10'])
 
function townsToJSON(input) {
    let arr = []
    input.shift()

    for(const el of input) {
        let [Town, Latitude, Longitude] = el.split(' | ')
        Town = Town.split('| ')
        Town = Town[1]
        Longitude = Longitude.split(' |')
        Longitude = Number(Number(Longitude[0]).toFixed(2))
        Latitude = Number(Number(Latitude).toFixed(2))

        arr.push({Town, Latitude, Longitude})
    }

    console.table(JSON.stringify(arr))
}

townsToJSON(['| Town | Latitude | Longitude |',
'| Sofia | 42.696552 | 23.32601 |',
'| Beijing | 39.913818 | 116.363625 |']
)

function rectangle(width, height, color) {
    let newColor = color.split('')
    let newLetter = newColor.shift().toUpperCase()
    newColor.unshift(newLetter)
    newColor = newColor.join('')

    return {
        width: width,
        height: height,
        color: newColor,
        calcArea: function() {
            return this.width*this.height
        }
    }
}
let rect = rectangle(4, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());

function createSortedList() {
    let arr = []

    return {
        add: (element) => {
            arr.push(element)
            arr.sort((a,b) => a-b)
        },
        remove: (index) => {
            if(arr.length > index) {
                arr.splice(index,1)
                arr.sort((a,b) => a-b)
            }
        },
        get: (index) => {
            return arr[index]
        },
        size: arr.length
    }
}

let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));


function test(input) {
    let arr = [1,3,14,56,12,3]

    console.log(arr.sort((a,b) => a-b))
}

test()

function solve() {
    return {
        mage: function(name) {
            return {
                name: name,
                health: 100,
                mana: 100,
                cast: function(x) {
                    console.log(`${this.name} casts ${x}`)
                    this.mana -= 1
                }
            }
        },
        fighter: function(name) {
            return {
                name: name,
                health: 100,
                stamina:100,
                fight: function(x) {
                    console.log(`${this.name} slashes at foe!`)
                    this.stamina -=1
                }
            }
        }
    }     
}

let create = solve();
const scorcher = create.mage("Scorcher");
console.log(scorcher)
scorcher.cast("fireball")
scorcher.cast("thunder")
scorcher.cast("light")
const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight()
console.log(scorcher2.stamina);
console.log(scorcher.mana);

function janNotation(input) {
    let arr = []

    for(const el of input) {
        if(el == Number(el)) {
            arr.push(el)
        } else {
            let secondNum = arr.pop()
            let firstNum = arr.pop()
            let newNum = 0
            if(firstNum == undefined || secondNum == undefined) {
                return console.log('Error: not enough operands!')
            } else {
                switch(el) {
                    case '+': newNum = firstNum+ secondNum; break;
                    case '-': newNum = firstNum - secondNum; break;
                    case '*': newNum = firstNum * secondNum;break;
                    case '/': newNum = firstNum / secondNum;break;
                }
                arr.push(newNum)
            }

            
        }
    }

    if(arr.length == 1) {
        console.log(arr.join(''))
    } else if(arr.length > 1) {
        console.log('Error: too many operands!')
    }
}

janNotation([3,
    
    '+']
    )