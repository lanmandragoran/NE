import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import GameCard from '../components/GameCard'

class PlayerHand extends Component {
    constructor(props){
        super(props)
            this.isTurn = this.props.isTurn,
            this.cardsInHand = this.props.cards,
            this.numCards = this.props.cards.length,
            this.jackScore = 0,
            this.busted = false,
            this.wantHit = this.props.wantHit
            this.turnDone = this.props.turnDone
        }

    render(){
        const playerWillHit = this.wantHit
        const playerWillStay = this.turnDone
        const cards = this.cardsInHand
        return (
            <div>
            {cards.map(function (card, index) {
                return ([ 
                    <div key={`${card.charAt(0)}-${card.charAt(1)}`}><GameCard cardFace={card.charAt(0)} cardSuit={card.charAt(1)} topMargin={35} padWeight={index}/> </div> 
                ]);
              })}
              <button onClick={() => playerWillHit(true)}>Want Hit</button>
              <button onClick={() => playerWillStay()}>Will Stay </button>
            </div>    
        )
    }
}

export default PlayerHand