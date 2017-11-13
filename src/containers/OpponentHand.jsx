import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import GameCard from '../components/GameCard'

class OpponentHand extends Component {
    constructor(props){
        super(props)
            this.cardsInHand = this.props.cards,
            this.jackScore = 0,
            this.busted = false,
            this.cardVals = this.props.cardVals
            this.isTurn = this.props.isTurn
            this.turnDone = this.props.turnDone
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isTurn){
            this.isTurn = true
            const turnDone = this.turnDone
            if(this.isTurn){
                const calcHit = AICalcHit(this.cardVals)
                const willHit = this.props.wantHit
                if(calcHit){
                    willHit(true)
                }
                else {
                    this.isTurn = false
                    turnDone()
                }
            }
        }
    }

    render(){
        const cards = this.cardsInHand        
        return (
            <div>
            {cards.map(function (card, index) {
                return ([ 
                    <div key={`${card.charAt(0)}-${card.charAt(1)}`}><GameCard cardFace={card.charAt(0)} cardSuit={card.charAt(1)} topMargin={5} padWeight={index}/> </div> 
                ]);
              })}
            </div>    
        )
    }
}


const AICalcHit = (cardVals) => {
    let totalValsAceOne = 0
    let totalValsAceEleven = 0
    let haveAce = false
    let totalCardVals = 0
    let probOfBust = 0
    let decideHit = false

    for(let i = 0; i < cardVals.length; i++){
        if(typeof cardVals[i] !== 'number'){
            haveAce = true
            decideHit = this.AIHaveAce(cardVals)
        }
    }

    let cardsTotalVal = cardVals.reduceRight((totalVal, cardVal) => {
        totalVal += cardVal
        return totalVal
    })

    if(cardsTotalVal <= 17) {
        decideHit = true
    }
    return decideHit
}

const AIHaveAce = (cardVals) => {
    return false
}

export default OpponentHand