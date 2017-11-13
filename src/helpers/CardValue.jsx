
export const CardValCalc = (card, cardValArr, deal) => {
    if(deal){
        for(let i = 0; i < 2; i++){
            cardValArr.push(CardValue(card[i]))
        }
    }
    else {
        cardValArr.push(CardValue(card))
    }
    return cardValArr
}   

export const CardValue = (card) => {
    let cardOpt = [1, 11]
    switch(card.charAt(0)) {
        case 'A':
            return (cardOpt)
            break
        case 'K':
            return 10
            break
        case 'Q':
            return 10
            break
        case 'J':
            return 10
            break
        case '1':
            return 10
            break
        case '9':
            return 9
            break
        case '8':
            return 8
            break
        case '7':
            return 7
            break
        case '6':
            return 6
            break
        case '5':
            return 5
            break
        case '4':
            return 4
            break
        case '3':
            return 3
            break
        case '2':
            return 2
            break
        default:
            return 0
            break
    }
}