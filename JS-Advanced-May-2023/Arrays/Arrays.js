function evenPosition(input) {
    let arr = []

    for(let i = 0; i<input.length; i+=2) {
        arr.push(input[i])
    }

    console.log(arr.join(' '))
}

evenPosition(['20', '30', '40', '50', '60'])

function lastKNums(n, k) {
    let arr = [1]

    for(let i = 1; i<=n; i++) {
        let j = i

        let sum = 0

        for(j; j>0; j--) {
            sum += arr[j-1]
        }

        arr.push(sum)
    }

    console.log(arr.join(' '))
}

lastKNums(6, 3)

function sumFirstAndLast(input) {
    console.log(Number(input[0]) + Number(input[input.length-1]))
}

sumFirstAndLast(['20', '30', '40'])

function negativePosiive(input) {
    let arr = []

    for(const el of input) {
        if(el >= 0) {
            arr.push(el)
        } else {
            arr.unshift(el)
        }
    }

    console.log(arr.join('\n'))
}

negativePosiive([7, -2, 8, 9])

function smallestNums(input) {
    let arr = []

    for(let i = 0; i<2; i++) {
        let smallest = Math.min(...input) 
        const index = input.indexOf(smallest)
        input.splice(index,1)
        arr.push(smallest)
    }

    console.log(arr.join(' '))
}

smallestNums([30, 15, 50, 5])

function biggerHalf(input) {
    const newArr = input.sort((a,b) => b - a) 
    const arrLength = Math.ceil(newArr.length/2)
    const newest = newArr.slice(0, arrLength)
    const newestArr = newest.sort((a,b) => a-b)

    // for(let i = 0; i<arrLength; i++) {
    //     newestArr.push(newArr[i])
    // }

    console.log(newestArr)
}

biggerHalf([3, 19, 14, 7, 2, 19, 6])

function pieceOfPie (input, start, end ) {
    let starIndex = input.indexOf(start)
    const endIndex = input.lastIndexOf(end) +1

    console.log(input.slice(starIndex, endIndex))
}

pieceOfPie(['Pumpkin Pie',
'Key Lime Pie',
'Cherry Pie',
'Lemon Meringue Pie',
'Sugar Cream Pie'],
'Key Lime Pie',
'Lemon Meringue Pie')

function processOldPositions(input) {
    let newArr = input.filter((a,b) => b % 2 === 1).map((x) => x*2).reverse()

    console.log(newArr)
}

processOldPositions([10, 15, 20, 25])

function BiggesrElement(input) {
    let biggest = 0

    for(const el of input) {
        for(const el1 of el) {
            if(Number(el1) > biggest) {
                biggest = Number(el1)
            }
        }
    }

    return biggest
}

console.log(BiggesrElement([[3, 5, 7, 12],
    [-1, 4, 33, 2],
    [8, 3, 0, 4]]))

