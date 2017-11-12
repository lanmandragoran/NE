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
            busted: false
        }
    }

    render(){
        const cards = this.state.cardsInHand
        return (
            <div>
            {cards.map(function (card, index) {
                return ([ 
                    <div key={`${card.face}-${card.suit}`}><GameCard cardFace={card.face} cardSuit={card.suit} topMargin={35} padWeight={index}/> </div> 
                ]);
              })}
            </div>    
        )
    }
}

export default PlayerHand