import { Character } from "../types/character"

let g = global as any

if (!g.characters) {
  g.characters =
    [

      {
        id: 1,
        name: "Alduin",
        initiative: 0,
        isPlayer: true
      },
      {
        id: 2,
        name: "Asma",
        initiative: 0,
        isPlayer: true
      },
      {
        id: 3,
        name: "Adira",
        initiative: 0,
        isPlayer: true
      },
      {
        id: 4,
        name: "Dugrin",
        initiative: 0,
        isPlayer: true
      },
      {
        id: 5,
        name: "Yemdu",
        initiative: 0,
        isPlayer: true
      }
    ]
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
