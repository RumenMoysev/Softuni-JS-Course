function fruit(fruit, weight, ppkg) {
    return `I need $${((weight/1000)*ppkg).toFixed(2)} to buy ${(weight/1000).toFixed(2)} kilograms ${fruit}.`
}

console.log(fruit('apple', 1563, 2.35))

function GreatestCommonDiviser(a,b) {
    let divisor = 0
    let i = 0

    if(a>=b) {
        i = a
    } else {
        i = b
    }
    
    for(i; i>=1; i--) {
        if(a%i == 0 && b%i == 0) {
            divisor = i
            return divisor
        }
    }
}

console.log(GreatestCommonDiviser(2154, 458))

function previousDay(year, month, day) {
    let date = new Date(year, month - 1, day) 
    let Date2 = date.getDate()

    date.setFullYear(year, month - 1, Date2 - 1)

    console.log(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
}

previousDay(2016, 9, 30)

function SameNumbers(input) {
    let numArr = String(input).split('').map(Number)
    let firstNum = numArr.shift()
    let isSame = true
    let sum = firstNum

    for(const el of numArr) {
        sum += el
        if(el !== firstNum) {
            isSame = false
        }
    }

    console.log(`${isSame} \n${sum}`)
}

SameNumbers(2222222)

function timeToWalk(steps, footprintLength, speedKmH) {
    let distance = steps * footprintLength;
    let speed = speedKmH * 1000 / 3600;
    let restTime = Math.floor(distance / 500) * 60;
    let totalTime = (distance / speed) + restTime;
 
    let hours = Math.floor(totalTime / 3600).toFixed(0).padStart(2, '0');
    let minutes = Math.floor(totalTime / 60).toFixed(0).padStart(2, '0');
    let seconds = (totalTime % 60).toFixed(0).padStart(2, '0');
    console.log(`${hours}:${minutes}:${seconds}`);
}

timeToWalk(4000, 0.60, 5)

function roadRadar(speed, zone) {
    let speedLimit = {
        motorway: 130,
        interstate: 90,
        city: 50,
        residential: 20
    }
    
    const difference = speedLimit[zone] - speed

    if(difference>= 0 && difference < 20) {
        return `Driving ${speed} km/h in a ${speedLimit[zone]} zone`
    } else if(difference >= -20) {
        return `The speed is ${Math.abs(difference)} km/h faster than the allowed speed of ${speedLimit[zone]} - speeding`
    } else if(difference < -20 && difference >= -40) {
        return `The speed is ${Math.abs(difference)} km/h faster than the allowed speed of ${speedLimit[zone]} - excessive speeding`
    } else {
        return `The speed is ${Math.abs(difference)} km/h faster than the allowed speed of ${speedLimit[zone]} - reckless driving`
    }
}

console.log(roadRadar(120, 'interstate' ))

function cookingByNumbers(...params) {
    const obj = {
        chop: (x) => x/2,
        dice: (x) => Math.sqrt(x),
        spice: (x) => x+1,
        bake: (x) => x*3,
        fillet: (x) => {
            const percent20 = x/5
            return x - percent20
        }
    }
    let x = Number(params.shift())

    for(const command of params) {
        console.log(obj[command](x))
        x = obj[command](x)
    }
}

cookingByNumbers('9', 'dice', 'spice', 'chop', 'bake',
'fillet')

function validitiChecker(x1, y1, x2, y2) {
    const result = (x1, y1, x2, y2) => {
        const distance = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1,2))

        const status = Number.isInteger(distance) ? 'valid' : 'invalid'

        return `{${x1}, ${y1}} to {${x2}, ${y2}} is ${status}`
    }

    console.log(result(x1, y1, 0, 0))
    console.log(result(x2, y2, 0, 0))
    console.log(result(x1,y1,x2,y2))
}

validitiChecker(3, 0, 0, 4)

function wordsUppercase(input) {
    const regex = /\w+/gm

    const match = input.matchAll(regex)
    let arr = []

    for(const el of match) {
        arr.push(el[0].toUpperCase())
    }

    console.log(arr.join(', '))
}

wordsUppercase('Hi, how are you?')