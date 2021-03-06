import { Character } from "../types/character"
import { Game } from "../types/game"

let g = global as any
if (!g.games) {
  g.games =
    [
      {
        id: 1,
        round: 1,
      }
    ]
}

if (!g.characters) {
  g.characters =
    [
      {
        id: 1,
        name: "Miyamoto",
        initiative: 0,
        isPlayer: true,
        isDone: false
      },
      {
        id: 2,
        name: "Rothomir",
        initiative: 0,
        isPlayer: true,
        isDone: false
      },
      {
        id: 3,
        name: "Valen",
        initiative: 0,
        isPlayer: true,
        isDone: false
      },
      {
        id: 4,
        name: "Da'Jerra",
        initiative: 0,
        isPlayer: true,
        isDone: false
      },
      {
        id: 5,
        name: "Aloxine",
        initiative: 0,
        isPlayer: true,
        isDone: false
      }
    ]
}

export const UpdateGame = (data: Game) => {
  const idx = g.games.findIndex((game: Game) => game.id == game.id)
  g.game[idx] = data
}

export const GetAllGames = () => {
  return g.characters.map((game: Game) => ({ ...game }))
}

export const GetAllCharacters = () => {
  return g.characters.map((char: Character) => ({ ...char }))
}

export const UpdateCharacter = (char: Character) => {
  const idx = g.characters.findIndex((c: Character) => c.id == char.id)
  g.characters[idx] = char
}

export const AddCharacter = (char: Character) => {
  const id = Math.floor(Math.random() * 99999) + 5
  char.id = id
  g.characters = g.characters.concat(char)
  return char.id
}

export const DeleteCharacter = (id: Number) => {
  g.characters = g.characters.filter((c: Character) => c.id != id)
}
