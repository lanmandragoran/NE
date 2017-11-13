import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Table from '../components/Table'
import PlayerHand from './PlayerHand'
import OpponentHand from './OpponentHand'
import {CardValCalc, CardValue} from '../helpers/CardValue'

class Game extends Component{
    constructor(){
        super()
        this.state = {
            gameOver: false,
            gameStart: true,
            deck: {
                id: 0,
                cards: []
            },
            opponentHand: {
                cards: [],
                cardVals: [],
                hasBusted: false,
                isTurn: false
            },
            playerHand: {
                cards: [],
                cardVals: [],
                hasBusted: false,
                isTurn: false
            },
            
        }
    }

    componentWillMount(){
        let fullDeck = ['AH', '8D', 'KH', 'KS', 'AD', 'AC', '1H', '1D', '2S', '3D']
        let playerFirstHand = [] 
        let opponentFirstHand = []
        let newDeck = []
        
        let tempPlayerDeal = Deal(fullDeck, true)
        newDeck = tempPlayerDeal.fullDeck 
        playerFirstHand = tempPlayerDeal.cardArr
        
        let tempOpponentDeal = Deal(newDeck, true)
        newDeck = tempOpponentDeal.fullDeck
        opponentFirstHand = tempOpponentDeal.cardArr

        let tempOpponentVal = CardValCalc(opponentFirstHand, this.state.opponentHand.cardVals, true)
        let tempPlayerVal = CardValCalc(playerFirstHand, this.state.playerHand.cardVals, true)

        this.setState({
            deck: {
                cards: newDeck
            },
            opponentHand: {
                cards: opponentFirstHand,
                cardVals: tempOpponentVal
            },
            playerHand: {
                cards: playerFirstHand,
                cardVals: tempPlayerVal,
                isTurn: true
            }
        })

    }

    shouldHitPlayer(willHit){
        if(willHit){
            let tempOldHand = this.state.playerHand.cards
            let tempPlayerDeal = Deal(this.state.deck.cards, false)
            let tempDeck = tempPlayerDeal.fullDeck
            let tempCard = tempPlayerDeal.cardArr.pop()
            let tempPlayerVal = CardValCalc(tempCard, this.state.playerHand.cardVals, false)
            tempOldHand.push(tempCard)
            
            this.setState({
                deck: {
                    cards: tempDeck
                },
                playerHand: {
                    cards: tempOldHand,
                    cardVals: tempPlayerVal
                }
            })
        }
    }

    shouldHitOpponent(){
        if(willHit){
            let tempOldHand = this.state.opponentHand.cards
            let tempOpponentDeal = Deal(this.state.deck.cards, false)
            let tempDeck = tempOpponentDeal.fullDeck
            let tempCard = tempOpponentDeal.cardArr.pop()
            let tempOpponentVal = CardValCalc(tempCard, this.state.opponentHand.cardVals, false)
            tempOldHand.push(tempCard)
            
            this.setState({
                deck: {
                    cards: tempDeck
                },
                opponentHand: {
                    cards: tempOldHand,
                    cardVals: tempOpponentVal
                }
            })
        }
    }

    playersTurnDone(){
        this.state.playerHand.isTurn = false
        this.state.opponentHand.isTurn = true
        console.log(this.state)
    }

    opponentsTurnDone(){
        this.state.opponentHand.isTurn = false
        this.state.playerHand.isTurn = true
    }


    render() {

        console.log(this.state)

        const firstHand = this.state.gameStart
        const playersTurn = this.state.playerHand.isTurn
        const playersCards = this.state.playerHand.cards 
        const opponentsCards = this.state.opponentHand.cards
        const shouldHitPlayer = this.shouldHitPlayer.bind(this)
        const playersTurnDone = this.playersTurnDone.bind(this)
        const shouldHitOpponent = this.shouldHitOpponent.bind(this)
        const opponentsTurnDone = this.opponentsTurnDone.bind(this)

        return(
            <div>
                <Table/>
                    <div>
                    {firstHand ? <div> <PlayerHand cards={playersCards} wantHit={shouldHitPlayer.bind(this)} turnDone={playersTurnDone.bind(this)}/> <OpponentHand cards={opponentsCards} wantHit={shouldHitOpponent.bind(this)} turnDone={opponentsTurnDone.bind(this)}/> </div> : <div></div>}
                    {playersTurn && !firstHand ? <PlayerHand cards={playerCards} wantHit={shouldHitPlayer.bind(this)} turnDone={playersTurnDone.bind(this)} isTurn={playersTurn}/> : <div></div> }
                    {!playersTurn && !firstHand ? <OpponentHand cards={opponentsCards} wantHit={shouldHitOpponent.bind(this)} turnDone={opponentsTurnDone.bind(this)}/> : <div></div> }
                    </div>
            </div>
        )
    }
}

    const Deal = (fullDeck, firstRound) => {
        let cardArr = []
        if(firstRound){
            cardArr[0] = fullDeck.pop()
            cardArr[1] = fullDeck.pop()
        }
        else {
            cardArr[0] = fullDeck.pop() 
        }
        return {
            fullDeck: fullDeck,
            cardArr: cardArr
        }
    }

export default Game