import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Table from '../components/Table'
import PlayerHand from './PlayerHand'
import OpponentHand from './OpponentHand'

class Game extends Component{
    constructor(){
        super()
        this.state = {
            gameOver: false,
            gameStart: true,
            currentTurn: '',
            hitPlayer: false,
            deck: {
                id: 0,
                cards: []
            },
        }
    }

    componentWillMount(){
        const newDeck = {
            id: 1
        }
        this.setState({
            deck: newDeck,
            cards: ['AH'],
            currentTerm: 'player'
        }) 
    }

    shouldHitPlayer(){
        this.setState({
            hitPlayer: true
        })
    }

    render() {
        const cardArr = []
        const cardObjArr = []
        const whoseTurn = this.state.currentTerm
        const firstHand = this.state.gameStart
        while(this.state.cards.length > 0) {
            cardArr.push(this.state.cards.pop())
        }
        for(let i = 0; i < cardArr.length; i++) {
            let cardObj = {
                suit: '',
                face: ''
            }
            let singleCard = cardArr[i]
            if(singleCard.charAt(0) == 'A') {
                cardObj.face = 'Ace'
            }
            if(singleCard.charAt(0) == '8'){
                cardObj.face = 'Eight'
            }
            if(singleCard.charAt(1) == 'S'){
                cardObj.suit = 'Spades'
            }
            if(singleCard.charAt(1) == 'H'){
                cardObj.suit = 'Hearts'
            }
            if(singleCard.charAt(1) == 'D'){
                cardObj.suit = 'Diamonds'
            }
            cardObjArr.push(cardObj)
        }

        return(
            <div>
                <Table/>
                    <div>
                    {firstHand ? <div> <PlayerHand cards={cardObjArr}/> <OpponentHand cards={cardObjArr}/> </div> : <div></div>}
                    {whoseTurn === 'player' && !firstHand ? <PlayerHand cards={cardObjArr}/> : <div></div> }
                    {whoseTurn === 'opponent' && !firstHand ? <OpponentHand cards={cardObjArr}/> : <div></div> }
                    </div>
            </div>
        )
    }
}

export default Game