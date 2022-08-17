import React from 'react'

export default function Die(props) {

    const dynamicStyles = {
        backgroundColor: props.isHeld === true ? "#deadff" : "#FFFFFF" 
    }

    return (
        <button
            className='dice-bg'
            style={dynamicStyles}
            onClick={props.holdDice}
        >
            <h3 className='dice-num'>{props.value}</h3>
        </button>
    )
}