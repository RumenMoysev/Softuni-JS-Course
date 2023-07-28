function subSum(arr, startIndex, endIndex) {
    let sum = 0
    let starIndex1 = 0
    let endIndex1 = 0

    if(!Array.isArray(arr)) {
        return NaN
    }

    if(startIndex < 0) {
        starIndex1 = 0
    } else {
        starIndex1 = startIndex
    }

    if(endIndex >= arr.length) {
        endIndex1 = arr.length - 1
    } else {
        endIndex1 = endIndex
    }

    for(starIndex1; starIndex1<=endIndex1; starIndex1++) {
        sum += Number(arr[starIndex1])
    }

    return sum
}

console.log(subSum('text', 0, 2  ))


function playingCards(face, suit){
    let suits = {
        '2': true,
        '3': true,
        '4': true,
        '5': true,
        '6': true,
        '7': true,
        '8': true,
        '9': true,
        '10': true,
        'J': true,
        'Q': true,
        'K': true,
        'A':true
    }

    let faces = {
        'S': '\u2660',
        'H': "\u2665",
        'D': "\u2666",
        'C': "\u2663"
    }
 
    if(suits.hasOwnProperty(face) && faces.hasOwnProperty(suit)) {
        return `${face}${faces[suit]}`
    } else {
        throw new TypeError('Invalid input')
    }
}


console.log(playingCards('A', 'S' ))


function printDeckOfCards(cards) {
    function createCard (face, suit){
        let suits = {
            '2': true,
            '3': true,
            '4': true,
            '5': true,
            '6': true,
            '7': true,
            '8': true,
            '9': true,
            '10': true,
            'J': true,
            'Q': true,
            'K': true,
            'A':true
        }
    
        let faces = {
            'S': '\u2660',
            'H': "\u2665",
            'D': "\u2666",
            'C': "\u2663"
        }
     
        if(suits.hasOwnProperty(face) && faces.hasOwnProperty(suit)) {
            return `${face}${faces[suit]}`
        } else {
            return `Invalid card: ${face}${suit}`
        }
    }
    
    let arr = []
    for(let el of cards) {
        let arrOfInput = el.split('')
        let suit = arrOfInput.pop()
        let face = arrOfInput.join('')
        let result = createCard(face, suit)
        if(result == `Invalid card: ${face}${suit}`) {
            return `Invalid card: ${face}${suit}`
        }
        arr.push(createCard(face,suit))
    }

    return arr.join(' ')
}

console.log(printDeckOfCards(['AS', '10D', 'KH', '2C']))