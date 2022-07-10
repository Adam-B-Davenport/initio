import type { NextPage } from 'next'
import type { Character } from '../types/character'
import { useState, useEffect } from 'react';
import axios from 'axios'
import CharacterDisplay from '../components/CharacterDisplay';
import Editor from '../components/Edit';
//import styles from '../styles/Home.module.css'

const InitCompare = (a: Character, b: Character) => {
  return b.initiative - a.initiative

}

const Home: NextPage = () => {

  // Todo- merge into one list of charcters and have a bool flag for current turn
  const [currentTurn, setCurrent] = useState(Array<Character>())
  const [nextTurn, setNext] = useState(Array<Character>())
  const [turn, setTurn] = useState(1)
  const [edit, setEdit] = useState(false)

  const updateCharacter = (char: Character) => {
    axios.put(`/api/character/${char.id}`, char)
      .catch(ex => console.log(ex))
  }

  const updateCharacters = () => {
    currentTurn.concat(nextTurn)
      .map(c => updateCharacter(c))
  }

  const startInitiative = (chars: Array<Character>) => {
    setCurrent(chars.sort(InitCompare))
    setNext(new Array<Character>())
  }

  const addChar = () => {
    const char = {
      id: 0,
      name: "npc",
      initiative: 0,
      isPlayer: false,
    }
    axios.post('/api/character', char)
      .then(response => {
        char.id = response.data
        setCurrent(currentTurn.concat(char))
      })
      .catch(() => alert("Failed to add new character."))
  }

  const hook = () => {
    axios.get('/api/character')
      .then(
        response => {
          startInitiative(response.data)
        }
      )
      .catch(ex => console.log(ex))
  }

  const toggleEdit = () => {
    setEdit(!edit)
    updateCharacters()
    setCurrent(currentTurn)
    setNext(nextTurn)
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
      setCurrent(nextTurn.concat(...currentTurn).sort(InitCompare))
      setNext(new Array<Character>())
      setTurn(turn + 1)
    }
    updateCharacters()
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
    updateCharacters()
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
        <Editor characters={currentTurn.concat(nextTurn)} startInitiative={startInitiative} />
        <div className='controls'>
          <button className='btn' onClick={addChar}>+</button>
          <button className='btn' onClick={startOver}>Reset</button>
          <button className='btn' onClick={toggleEdit}>≡</button>
        </div>
      </div>
    );
  }
}


export default Home
