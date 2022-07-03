import { ChangeEvent, useState } from 'react'
import type { Character } from '../types/character'

const EditorRow = ({ character, update }: { character: Character, update: () => void }) => {
  const [name, setName] = useState(`${character.name}`)
  const [initiative, setInitiative] = useState(`${character.initiative}`)

  const nameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    character.name = event.target.value
    update()
  }

  const initiativeChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      console.log(event.target.value)
      const val = parseInt(event.target.value)
      setInitiative(event.target.value)
      if (val) {
        character.initiative = val
        update()
      }
    }
    catch (e) {
      console.log(e)

    }
  }
  return (
    [
    <div className={`${character.isPlayer ? "player" : "enemy"} character`} >
      <div className='charGrid'>
        <div className='charName'>
          <input value={name} onChange={nameChange} />
        </div>
        <div className='initiative'>
          <input typeof='number' value={initiative} onChange={initiativeChange} />
        </div>
      </div>
    </div >,
    <div className='outerCol'>
      <input type='button' className='deleteButton' value='X'/>
    </div>
    ]
  )

}

const Editor = ({ characters, startInitiative }: { characters: Array<Character>, startInitiative: (chars: Array<Character>) => void }) => {
  characters = characters.sort((a, b) => a.name.localeCompare(b.name))
  const players = characters.filter(char => char.isPlayer)
  const npc = characters.filter(char => !char.isPlayer)
  const update = () => {
    startInitiative(characters)
  }
  return (
    <div className='initiativeList'>
      {players.map((character: Character) => <EditorRow character={character} key={character.id} update={update} />)}
      {npc.map((character: Character) => <EditorRow character={character} key={character.id} update={update} />)}
    </div>
  )
}
export default Editor
