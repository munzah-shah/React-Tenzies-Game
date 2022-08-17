import React from 'react'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"
import Die from './Die'
import './style.css'

export default function App() {

    /* function to generate random numbers between 1 and 6 for 10 times (1 random number for for each button) */
    function allNewDice() {
        const newDice = []
        let randomDice
        
        for(let i = 0; i < 10; i++) {
            randomDice = {
                value: Math.ceil( Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }
            newDice.push(randomDice)
        }
        return newDice;
    }

    
    /* state to hold the array of random numbers of dice */
    const [dice, setDice] = React.useState(allNewDice())


    /* map the state to generate a new array and render that on our 10 buttons so that each can have its own random number  */
    /* Die is the individual number | Dice Element is the array that renders 10 React components each with a random number (die) */ 
    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
    ))



    /* function to generate new numbers on the "roll" button click */
    function rollDice() {

        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : { value: Math.ceil( Math.random() * 6), isHeld: false, id: nanoid() }
            }))
        }
        else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }

    /* Function to hold dice */
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }


    /* State to check whether or not the player has won the game */
    const [tenzies, setTenzies] = React.useState(false)


    React.useEffect(() => {

        const allHeld = dice.every(die => die.isHeld === true)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)

        if(allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])  

    return (
        <div className='outer-container'>
            {tenzies && <Confetti width={600} height={500} />}
            <main className='inner-container'>
                <h1 className='heading'>Tenzies</h1>
                <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className='dice-container'>
                    {diceElements}
                </div>
                <button className='roll-btn' onClick={rollDice}>{tenzies === true ? "Restart Game" : "Roll"}</button>
            </main>
            <p className='credits'>Developed By: Munzah Shah </p>
        </div>
    ) 
}