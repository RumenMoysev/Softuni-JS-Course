function echoFunction(input) {
    console.log(input.length)
    console.log(input)
}

echoFunction('asdad')

function stringLength(one, two, three) {
    console.log(one.length + two.length + three.length)
    console.log(Math.floor((one.length + two.length + three.length)/3))
}

stringLength('chocolate', 'ice cream', 'cake' )

function maxValues(input1, in2, in3) {
    console.log(`The largest number is ${Math.max(input1, in2, in3)}.`)
} 

maxValues(5, -3, 16)

function circleArea(input) {
    let typeOf = typeof(input)
    if(typeOf == "number") {
        console.log((input**2*Math.PI).toFixed(2))
    } else {
        console.log(`We can not calculate the circle area, because we receive a ${typeOf}.`)
    }
}
circleArea(1)

function mathOperations(num1, num2, action) {
    switch(action) {
        case '+': {
            console.log(num1+num2)
        } break;

        case '-': {
            console.log(num1-num2)
        }break;

        case '*': {
            console.log(num1*num2)
        }break;

        case '/': {
            console.log(num1/num2)
        }break;

        case '%': {
            console.log(num1%num2)
        }break;

        case '**': {
            console.log(num1**num2)
        }break;
    }
}

mathOperations(5, 6, '+' )

function SumOfNtoM(num1, num2) {
    let result = 0
    for(let  i = Number(num1); i <= Number(num2); i++) {
        result += i
    }

    console.log(result)
}

SumOfNtoM('1', '5')

function DayofWeek(input) {
    switch(input) {
        case 'Monday' : console.log(`1`);
        break;
        case 'Tuesday' : console.log(`2`);
        break;
        case 'Wednesday' : console.log(`3`);
        break;
        case 'Thursday' : console.log(`4`);
        break;
        case 'Friday' : console.log(`5`);
        break;
        case 'Saturday' : console.log(`6`);
        break;
        case 'Sunday' : console.log(`7`);
        break;
        default: console.log(`error`)
    }
}

function SquareOfStars(input) {
    let i = 5
    let print2 = ''

    if(input) {
        i = input
    }
    
    for(let n = 0; n < i; n++) {
        print2 = ''
        for(let m = 0; m<i; m++) {
            print2 += '* '
        }
        console.log(print2)
    }
}

SquareOfStars()

function aggregateElements(input) {
    let sum1 = 0
    let sum2 = 0
    let concat = ''

    for(let el of input) {
        sum1 += el
        sum2 += 1/el
        concat += String(el)
    }

    return sum1 + '\n' + sum2 + '\n' + concat
}

console.log(aggregateElements([2, 4, 8, 16]))