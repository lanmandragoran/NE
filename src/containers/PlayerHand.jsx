import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import GameCard from '../components/GameCard'

class PlayerHand extends Component {
    constructor(props){
        super(props)
        this.state = {
            isTurn: this.props.turn,
            cardsInHand: this.props.cards,
            numCards: this.props.cards.length,
            jackScore: 0,
            busted: false,
        }
    }

    render(){
        const playerWillHit = this.props.wantHit
        const playerWillStay = this.props.turnDone
        const cards = this.state.cardsInHand
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