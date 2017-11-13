import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import DeckImages from './DeckImages'

const setStyle = (padWeight, topMargin) => {
    const padding = padWeight * 12
    const CardStyling = styled.div`
                        margin-top: ${topMargin}%;
                        padding-left: 25%;
                        width: 5%;
                        height: 5%;
                        position: absolute;
                        z-index: 5;
                        margin-left: ${padding}%`
    return CardStyling
}
                    

const GameCard = (props) => {
const CardStyle = setStyle(props.padWeight, props.topMargin)
console.log(props.cardFace)
    return (
        <CardStyle>
            <img src={DeckImages[props.cardFace][props.cardSuit]}/>
        </CardStyle>
    )
}

export default GameCard