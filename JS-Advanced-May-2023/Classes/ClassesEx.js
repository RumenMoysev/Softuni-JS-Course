class Rectangle {
    constructor(width, height, color) {
        this.width = width
        this.height = height
        this.color = color
    }

    calcArea() {
        return this.width*this.height
    }
}

let rect = new Rectangle(4, 5, 'Red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());

class Request {
    constructor(method, uri, version, message) {
        this.method = method,
        this.uri = uri,
        this.version = version,
        this.message = message,
        this.response = undefined,
        this.fulfilled = false
    }
}

let myData = new Request('GET',
'http://google.com', 'HTTP/1.1', '')
console.log(myData);

function tickets(arr, criteion) {
    let arr1 = []
    let sorted 

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination,
            this.price = Number(price)
            this.status = status
        }
    }

    for(let el of arr) {
        let [destination, price, status] = el.split('|')

        let ticket = new Ticket(destination, price, status)
        arr1.push(ticket)
    }

    if(criteion == 'price') {
        sorted = arr1.sort((x,y) => x[criteion] - y[criteion])
    } else {
        sorted = arr1.sort((x,y) => x[criteion].localeCompare(y[criteion]))
    }

    return sorted
}

tickets(['Philadelphia|94.20|available',
'New York City|95.99|available',
'New York City|95.99|sold',
'Boston|126.20|departed'],
'price')

class List {
    _arr = []
    add(x) {
        if(typeof x === 'number') {
            this._arr.push(x)
            this._arr = this._arr.sort((a,b) => a-b)
            this.size = this._arr.length
        } else {
            throw new TypeError('Argument should be a number')
        }
    }
    remove(x) {
        if(Number.isInteger(x) && x < this._arr.length && x>=0) {
            this._arr.splice(x, 1)
            this._arr = this._arr.sort((a,b) => a-b)
            this.size = this._arr.length
        } else {
            throw new TypeError('Argument should be an integer')
        }
    }
    get(x) {
        if(Number.isInteger(x) && x < this._arr.length && x>=0) {
            this.size = this._arr.length
            return this._arr[x]
        } else {
            throw new TypeError('Argument should be an integer')
        }
    }

    size = 0
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1)); 
console.log(list.remove(1));
console.log(list.get(1));
console.log(list.size)

class Stringer {
    constructor(string, length) {
        this.innerString = string;
        this.innerLength = length;
    }

    increase(x) {
        if(Number.isInteger(x)) {
            this.innerLength += x
        }
    }

    decrease(x) {
        if(Number.isInteger(x)) {
            this.innerLength -= x
            if(this.innerLength<0) {
                this.innerLength = 0
            }
        }
    }

    toString() {
        if(this.innerString.length > this.innerLength) {
            let arr = this.innerString.split('')
            let newString = []

            for(let i = 0; i<this.innerLength; i++) {
                newString += arr[i]
            }

            newString += '...'
            return newString
        } else {
            return this.innerString
        }
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString()); // Test
test.decrease(3);
console.log(test.toString()); // Te...
test.decrease(5);
console.log(test.toString()); // ...
test.increase(4);
console.log(test.toString()); // Test

console.log('-----------------------------------------------')

class Company {
    departments = {}

    addEmployee(name, salary, positon, department) {
        if(name == '' || name == undefined || name == null || salary == undefined || salary == null || salary <= 0
        || positon == '' || positon == undefined || positon == null || department == '' || department == undefined || department == null) {
            throw new Error('Invalid input!')
        }

        class Employee {
            constructor(name, salary, position, department) {
                this.name = name;
                this.salary = salary;
                this.position = position;
            }
        }

        let employee = new Employee(name, salary, positon, department)
        let departmentsNow = this.departments

        if(!departmentsNow.hasOwnProperty(department)) {
            this.departments[department] = {}
            this.departments[department].employees = []
            this.departments[department].employees.push(employee)
        } else {
            this.departments[department].employees.push(employee)
        }

        return `New employee is hired. Name: ${employee.name}. Position: ${employee.position}`
        
    }

    bestDepartment() {
        // This function should return the department with the highest average salary rounded to the second digit after the
        // decimal point and its employees sorted by their salary by descending order and by their name in ascending order as
        // a second criterion:
        let print = ''

        for(let [key, value] of Object.entries(this.departments)) {
            this.departments[key].averageSalary = 0
            let allSalary = 0

            for(let value of this.departments[key].employees) {
                allSalary += Number(value.salary)
            }

            this.departments[key].averageSalary = Number((allSalary / this.departments[key].employees.length).toFixed(2))
        }

        let sortedArr = Object.entries(this.departments)
        .sort(([aKey, aValue], [bKey, bValue]) => bValue.averageSalary - aValue.averageSalary)
        
        for(let el of sortedArr) {
            el[1].employees.sort((a,b) => {
                if(b.salary - a.salary > 0) {
                    return 1
                } else if(b.salary == a.salary) {
                    return a.name.localeCompare(b.name)
                } else {
                    return - 1
                }
            })
        }

        print += `Best Department is: ${sortedArr[0][0]}\n`
        print += `Average salary: ${(sortedArr[0][1].averageSalary).toFixed(2)}\n`
        let peopleArr = []
        for(let el of sortedArr[0][1].employees) {
            peopleArr.push(`${el.name} ${el.salary} ${el.position}`)
        }

        print += peopleArr.join('\n')

        return print
    }   
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Alex", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());

console.log(`------------------`)

class Hex {
    constructor(value) {
        this.value = value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return '0x' + this.value.toString(16).toUpperCase()
    }

    plus(number) {
        if(typeof number == 'number') {
            return new Hex(this.value + number)

        } else if(typeof number == 'object') {
            return new Hex(this.value + number.value)
        }
    }

    minus(number) {
        if(typeof number == 'number') {
            return new Hex(this.value - number)
            
        } else if(typeof number == 'object') {
            return new Hex(this.value - number.value)
        }
    }

    parse(x) {
        return parseInt(x, 16)
    }
}

let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString()==='0xF');
console.log(FF.parse('AAA'));


function juice(input) {
    let bottles = {}
    let quantity1 = {}

    for(let el of input) {
        let [flavour, quantity] = el.split(' => ')
        quantity = Number(quantity)
        let numOfBottles = 0
        let leftQuantity = 0

        if(quantity1.hasOwnProperty(flavour)) {
            quantity += Number(quantity1[flavour])
        }

        if(quantity%1000 >= 0 && quantity >= 1000) {
            [numOfBottles, leftQuantity] = calculate(quantity)
        } else {
            leftQuantity = calculate(quantity)
        }

        if(numOfBottles>0) {
            if(!bottles.hasOwnProperty(flavour)) {
                bottles[flavour] = numOfBottles
            } else {
                bottles[flavour] += numOfBottles
            }
        }

        if(leftQuantity>0) {
            if(!quantity1.hasOwnProperty(flavour)) {
                quantity1[flavour] = leftQuantity
            } else {
                quantity1[flavour] += leftQuantity
            }
        }
    }

    function calculate(quantity) {
        if(quantity - 1000 >= 0) {
            let numOfBottles = Math.floor(quantity / 1000)

            let leftQuantity = quantity - 1000* numOfBottles

            return [numOfBottles, leftQuantity]
        } else {
            return quantity
        }
    }

    for(let [key, value] of Object.entries(bottles)) {
        console.log(`${key} => ${value}`)
    }
}

juice(['Kiwi => 234',
'Pear => 2345',
'Watermelon => 3456',
'Kiwi => 4567',
'Pear => 5678',
'Watermelon => 6789'])

console.log('-------------------------------')

function autoComapny(input) {
    let brands = {}

    for(let el of input) {
        let [brand, model, quantity] = el.split(' | ')
        quantity = Number(quantity)

        if(!brands.hasOwnProperty(brand)) {
            brands[brand] = {}
            brands[brand][model] = quantity
        } else {
            if(brands[brand].hasOwnProperty(model)) {
                brands[brand][model] += quantity
            } else {
                brands[brand][model] = quantity
            }
        }
    }

    for(let [key,value] of Object.entries(brands)) {
        let print = ''
        print += key + '\n'

        for(let [key1, value1] of Object.entries(value)) {
            print += `###${key1} -> ${value1}\n`
        }

        let index = print.lastIndexOf('\n')
        let nprint = print.slice(0, index) + print.slice(index+1)

        console.log(nprint)
    }
}

autoComapny(['Audi | Q7 | 1000',
'Audi | Q6 | 100',
'BMW | X5 | 1000',
'BMW | X6 | 100',
'Citroen | C4 | 123',
'Volga | GAZ-24 | 1000000',
'Lada | Niva | 1000000',
'Lada | Jigula | 1000000',
'Citroen | C4 | 22',
'Citroen | C5 | 10'])