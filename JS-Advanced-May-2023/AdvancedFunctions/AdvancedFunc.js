// function solution(input) {
//     return function(y) {
//         return input+y
//     }
// }   

// let add5 = solution(5);
// console.log(add5(2));
// console.log(add5(3));

function createFormatter(separator, symbol, symbolFirst, currencyFormatter) {
    return function(price) {
        return currencyFormatter(separator,symbol,symbolFirst, price)
    }
}

function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2,2);
    if (symbolFirst) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}

let dollarFormatter = createFormatter(',', '$', true, currencyFormatter);
console.log(dollarFormatter(5345)); // $ 5345,00
console.log(dollarFormatter(3.1429)); // $ 3,14
console.log(dollarFormatter(2.709)); // $ 2,71

function sort(obj, citeria) {
    obj = JSON.parse(obj)
    let arr = [...obj]
    let counter = 0
    if(citeria !== 'all') {
        let [firstC, secondC] = citeria.split('-')
        for(let el of arr) {
        
        if(el[firstC] == secondC) {
            console.log(`${counter}. ${el.first_name} ${el.last_name} - ${el.email}`)
            counter++
        }

    }
    } else {
        for(let el of arr) {
            console.log(`${counter}. ${el.first_name} ${el.last_name} - ${el.email}`)
            counter++
        }
    }    

}

sort(`[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
    }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
    },
   {
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
    }]`, 'all')

function solution() {
    let str = ''

    let obj = {
        append(x) {str += x},
        removeStart(x) {str = str.substring(x)},
        removeEnd(x) {str = str.substring(0, str.length - x)},
        print() {console.log(str)}
    }

    return obj
}

let firstZeroTest = solution();
firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();

function listProcessor(input) {
    let arr = []
    let obj = {
        add(str) {arr.push(str)},
        remove(str) {
            if(arr.includes(str)) {
                let index = arr.indexOf(str);
                arr.splice(index,1)
            }
            
        },
        print() {console.log(arr.join(','))}
    }

    for(let el of input) {
        let [command, value] = el.split(' ')

        obj[command](value)
    }
}

listProcessor(['add pesho', 'add george', 'add peter', 'remove peter','print'])

function cars(input) {
    let obj = {}
    let functObj = {
        create(name, inherit, parent) {
            if(inherit) {
                obj[name] = Object.create(obj[parent])
            } else {
                obj[name] = {}
            }
        },
        set(name, key, value) {
            obj[name][key] = value
        },
        print(name) {
            let entry = []
            for (let key in obj[name]) {
                entry.push(`${key}:${obj[name][key]}`)
            }
            console.log(entry.join(","))
        }
    }

    for(let el of input) {
        let [name, key, a,b] = el.split(' ')
        functObj[name](key,a,b)
    }
    
}

cars(['create c1',
'create c2 inherit c1',
'set c1 color red',
'set c2 model new',
'print c1',
'print c2'])