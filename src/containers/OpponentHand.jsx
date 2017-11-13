import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import GameCard from '../components/GameCard'

class OpponentHand extends Component {
    constructor(props){
        super(props)
        this.state = {
            isTurn: this.props.turn,
            cardsInHand: this.props.cards,
            numCards: this.props.cards.length,
            jackScore: 0,
            busted: false
        }
    }

    render(){
        const cards = this.state.cardsInHand
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

export default OpponentHand