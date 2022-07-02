import type { NextPage } from 'next'
import type { Character } from '../types/character'
import { useState, useEffect } from 'react';
import axios from 'axios'
import CharacterDisplay from '../components/CharacterDisplay';
import Editor from '../components/Edit';
//import styles from '../styles/Home.module.css'

const InitComp = (a: Character, b: Character) => {
  return b.initiative - a.initiative

}

const Home: NextPage = () => {

  const [currentTurn, setCurrent] = useState(Array<Character>())
  const [nextTurn, setNext] = useState(Array<Character>())
  const [turn, setTurn] = useState(1)
  const [edit, setEdit] = useState(false)

  const startInitiative = (chars: Array<Character>) => {
    setCurrent(chars.sort(InitComp))
    setNext(new Array<Character>())
  }

  const addChar = () => {
    const id = Math.floor(Math.random() * 99999) + 5
    setCurrent(currentTurn.concat({
      id: id,
      name: "npc",
      initiative: 0,
      isPlayer: false,
    })
    .sort(InitComp)
    )
  }

  const hook = () => {
    axios.get('/api/characters').then(
      response => {
        startInitiative(response.data)
      }
    )
  }

  const toggleEdit = () => {
    setEdit(!edit)
    startInitiative(currentTurn.concat(nextTurn))
  }

  const startOver = () => {
    setEdit(false)
    startInitiative(currentTurn.concat(nextTurn))
    setTurn(1)
  }

  useEffect(hook, [])

  const next = () => {
    if (currentTurn.length > 1) {
      let newCur = currentTurn
      setNext(nextTurn.concat(newCur.splice(0, 1)))
      setCurrent(newCur)
    }
    else {
      setCurrent(nextTurn.concat(...currentTurn).sort(InitComp))
      setNext(new Array<Character>())
      setTurn(turn + 1)
    }
  }
  const prev = () => {
    if (nextTurn.length > 0 || turn > 1) {
      if (nextTurn.length > 0) {
        let newNext = nextTurn
        setCurrent(newNext.splice(newNext.length - 1, 1).concat(currentTurn))
        setNext(newNext)
      }
      else {
        let newCurrent = currentTurn
        setNext(newCurrent.splice(0, newCurrent.length - 1))
        setCurrent(newCurrent)
        setTurn(turn - 1)
      }
    }
  }

  if (!edit) {
    return (
      <div className="App">
        <h1>Turn {turn}</h1>
        <div className='initiativeList'>
          {currentTurn.map(char => <CharacterDisplay character={char} key={char.id} />)}
          <hr className='turnDivider' />
          {nextTurn.map(char => <CharacterDisplay character={char} key={char.id} />)}
        </div>
        <div className='controls'>

          <button className='btn' onClick={prev}>&lt;=</button>
          <button className='btn' onClick={next}>=&gt;</button>
          <button className='btn' onClick={() => setEdit(!edit)}>≡</button>
        </div>
      </div>
    );

  }
  else {
    return (
      <div className="App">
        <h1>Turn {turn}</h1>
        <div className='initiativeList'>
          <Editor characters={currentTurn.concat(nextTurn)} startInitiative={startInitiative} />
        </div>
        <div className='controls'>
          <button className='btn' onClick={addChar}>+</button>
          <button className='btn' onClick={toggleEdit}>≡</button>
          <button className='btn' onClick={startOver}>Reset</button>
        </div>
      </div>
    );
  }
}


export default Home
