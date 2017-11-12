import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import DeckImages from './DeckImages'

const TableStyle = styled.div`width: 70%;
                    height: 10%;
                    margin-left: 15%;
                    margin-right: 15%;
                    margin-bottom: 0%;
                    padding-bottom: 0%;
                    background: no-repeat;
                    z-index: 0;
                    position: absolute;
                    margin-top: .5%;`

const Table = () => {
    return (
        <TableStyle>
            <img src={DeckImages.Table}/>
        </TableStyle>
    )
}

export default Table