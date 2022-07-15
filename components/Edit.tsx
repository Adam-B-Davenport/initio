import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import type { Character } from '../types/character'

const EditorRow = ({ character, update, deleted }: { character: Character, update: () => void, deleted: (char: Character) => void }) => {
  const [name, setName] = useState(`${character.name}`)
  const [initiative, setInitiative] = useState(`${character.initiative}`)

  const nameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    character.name = event.target.value
    update()
  }

  const deleteCharacter = () => {
    axios.delete(`/api/character/${character.id}`)
      .catch(ex => console.log(ex))
    deleted(character)
  }

  const initiativeChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const val = parseFloat(event.target.value)
      if (val) {
        character.initiative = val
        update()
        setInitiative(event.target.value)
      } else {
        setInitiative(event.target.value)
      }
    }
    catch (e) {
      console.log(e)

    }
  }
  return (
    <>
      <div className={`${character.isPlayer ? "player" : "enemy"} character`} >
        <div className='charGrid'>
          <div className='charName'>
            <input value={name} onChange={nameChange} />
          </div>
          <div className='initiative'>
            <input typeof='number' value={initiative} onChange={initiativeChange} />
          </div>
        </div>
      </div >
      <div className='outerCol'>
        {!character.isPlayer &&
          <input type='button' className='deleteButton' value='X' onClick={deleteCharacter} />
        }
      </div>
    </>
  )

}

const Editor = ({ characters, startInitiative }: { characters: Array<Character>, startInitiative: (chars: Array<Character>) => void }) => {
  characters = characters.sort((a, b) => a.name.localeCompare(b.name))
  const players = characters.filter(char => char.isPlayer)
  const npc = characters.filter(char => !char.isPlayer)
  const update = () => {
    startInitiative(characters)
  }

  const deleted = (char: Character) => {
    startInitiative(characters.filter(c => c.id != char.id))
  }

  return (
    <div className='initiativeList'>
      {players.map((character: Character) => <EditorRow character={character} key={character.id} update={update} deleted={deleted} />)}
      {npc.map((character: Character) => <EditorRow character={character} key={character.id} update={update} deleted={deleted} />)}
    </div>
  )
}
export default Editor
