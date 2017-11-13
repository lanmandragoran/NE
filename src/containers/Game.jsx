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
        let fullDeck = ['2H', '4D', '6H', '3S', '2D', '5C', '7H', '6D', '2S', '3D']
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

        this.setState(prevState => ({
            gameOver: prevState.gameOver,
            gameStart: prevState.gameStart,
            deck: {
                ...prevState.deck,
                cards: newDeck   
            },
            opponentHand: {
                ...prevState.opponentHand,
                cards: opponentFirstHand,
                cardVals: tempOpponentVal
            },
            playerHand: {
                ...prevState.playerHand,
                cards: playerFirstHand,
                cardVals: tempPlayerVal,
                isTurn: true
            }
        }))

    }

    shouldHitPlayer(willHit){
        if(willHit){
            let tempOldHand = this.state.playerHand.cards
            let tempPlayerDeal = Deal(this.state.deck.cards, false)
            let tempDeck = tempPlayerDeal.fullDeck
            let tempCard = tempPlayerDeal.cardArr.pop()
            let tempPlayerVal = CardValCalc(tempCard, this.state.playerHand.cardVals, false)
            tempOldHand.push(tempCard)
            
        this.setState(prevState => ({
                gameOver: prevState.gameOver,
                gameStart: prevState.gameStart,
                deck: {
                    ...prevState.deck,
                    cards: tempDeck
                },
                playerHand: {
                    ...prevState.playerHand,
                    cards: tempOldHand,
                    cardVals: tempPlayerVal
                },
                opponentHand: {
                    ...prevState.opponentHand
                }
            }))
        }
    }

    shouldHitOpponent(willHit){
        if(willHit){
            let tempOldHand = this.state.opponentHand.cards
            let tempOpponentDeal = Deal(this.state.deck.cards, false)
            let tempDeck = tempOpponentDeal.fullDeck
            let tempCard = tempOpponentDeal.cardArr.pop()
            let tempOpponentVal = CardValCalc(tempCard, this.state.opponentHand.cardVals, false)
            tempOldHand.push(tempCard)
            
            this.setState(prevState => ({
                gameOver: prevState.gameOver,
                gameStart: prevState.gameStart,
                deck: {
                    ...prevState.deck,
                    cards: tempDeck
                },
                opponentHand: {
                    ...prevState.opponentHand,
                    cards: tempOldHand,
                    cardVals: tempOpponentVal
                },
                playerHand: {
                    ...prevState.playerHand
                }
            }))
        }
    }

    playersTurnDone(){
        this.setState(prevState => ({
            gameStart: false,
            gameOver: prevState.gameOver,
            playerHand: {
                ...prevState.playerHand,
                isTurn: false
            },
            opponentHand: {
                ...prevState.opponentHand,
                isTurn: true
            }
        }))
    }

    opponentsTurnDone(){
        this.setState(prevState => ({
            gameStart: false,
            gameOver: prevState.gameOver,
            playerHand: {
                ...prevState.playerHand,
                isTurn: true
            },
            opponentHand: {
                ...prevState.opponentHand,
                isTurn: false
            }
        }))
    }


    render() {
        const firstHand = this.state.gameStart
        const playersTurn = this.state.playerHand.isTurn
        const playersCards = this.state.playerHand.cards 
        const opponentsCards = this.state.opponentHand.cards
        const shouldHitPlayer = this.shouldHitPlayer.bind(this)
        const playersTurnDone = this.playersTurnDone.bind(this)
        const shouldHitOpponent = this.shouldHitOpponent.bind(this)
        const opponentsTurnDone = this.opponentsTurnDone.bind(this)
        const opponentCardVals = this.state.opponentHand.cardVals
        const opponentsTurn = this.state.opponentHand.isTurn

        return(
            <div>
                <Table/>
                    <div>
                        <PlayerHand cards={playersCards} wantHit={shouldHitPlayer} turnDone={playersTurnDone} isTurn={playersTurn}/> 
                        <OpponentHand cards={opponentsCards} wantHit={shouldHitOpponent} cardVals={opponentCardVals} turnDone={opponentsTurnDone} isTurn={opponentsTurn}/> 
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