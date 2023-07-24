function Delimiter(input, a) {
    console.log(input.join(a))
}

Delimiter(['One',
'Two',
'Three',
'Four',
'Five'],
'-')

function NthElement(input, size){
    let newArr = []


    for(let i = 0; i<input.length; i+= size) {
        newArr.push(input[i])
    }

    console.log(newArr)
}

NthElement(['5',
'20',
'31',
'4',
'20'],
2)

function addRemove(input) {
    const obj = {
        add: (x) => newArr.push(x),
        remove: (x) => newArr.pop()
    }

    let n = 1
    let newArr = []

    for (const el of input) {
        obj[el](n)
        n++ 
    }

    if(newArr.length==0) {
        return 'Empty'
    } else {
        return newArr.join('\n')
    }
}

console.log(addRemove(['add',
'add',
'remove',
'add',
'add',]))

function Rotation(input, n) {
    for(let i = 0; i<n; i++) {
        let l = input.pop()
        input.unshift(l)
    }

    return input.join(' ')
}

console.log(Rotation(['Banana',
'Orange',
'Coconut',
'Apple'],
15
))

function extract(input) {
    let newArr = []
    let currNum = 0

    for(let i = 0; i<input.length; i++) {
        if(Number(input[i]) >= currNum) {
            currNum = Number(input[i])
            newArr.push(currNum)
        }
    }

    return newArr
}

console.log(extract([1,
    2,
    3,
    4, 5, 6, 4, 6, 8]))

function ListNames(input) {
    const newArr = input.sort((a,b) => a.localeCompare(b))
    let i = 1

    newArr.forEach(element => { 
        console.log(`${i}.${element}`)
        i++
    });
}

ListNames(["John",
"Bob",
"Christina",
"Ema"])

function sortingNums(input) {
    let newArr = input.map(Number).sort((a,b) => a-b)
    let newArr1 = newArr.slice(newArr.length/2).sort((a,b) => b-a)
    let newest = newArr.slice(0, newArr.length/2)

    let finised = []

    if(newArr1.length >= newest.length) {
        for(let i = 0; i<newArr1.length; i++) {
            if(newest[i] !== undefined) {
                finised.push(newest[i])
            }

            finised.push(newArr1[i])
        }
    } else {
        for(let i = 0; i<newest.length; i++) {
            if(newArr1[i] !== undefined) {
                finised.push(newArr1[i])
            }

            finised.push(newest[i])
        }
    }

    return finised
}

sortingNums([1, 65, 3, 52, 48, 63, 31, -3, 18, 56] )

function sortBy2Criteria(input) {
        input.sort((a,b) =>  {
        if(a.length - b.length <0 ) {
            return - 1
        } else if(a.length - b.length == 0) {
            return a.localeCompare(b)
        } else {
            return 1
        }

    })

    return input.join('\n')
}

console.log(sortBy2Criteria(['Isacc',
'Theodor',
'Jack',
'Harrison',
'George']))

function MagicMatrices(input) {
    let sum = 0
    let sum1 = 0

    for(const el of input) {
        for(const el1 of el) {
            sum += Number(el1)
        }
    }

    for(i = 0; i<=0; i++) {
        for(let el of input[i]) {
            sum1 += Number(el)
        }
    }
    
    
    return sum/sum1 == input.length
}

console.log(MagicMatrices([[4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]]
))

function MagicMatrices1(input) {
    let bool = false
    let sum = 0
    
    for(let el of input) {
        for(let el1 of el) {
            sum+=Number(el1)
        }

    }
}