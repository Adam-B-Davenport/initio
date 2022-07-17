// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Character } from '../../../types/character'
import '../../../utils/db'
import { AddCharacter, DeleteCharacter, GetAllCharacters } from '../../../utils/db'
import prisma from '../../../utils/prisma'

let characters =
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Character> | number>
) {
  switch (req.method) {
    case "POST":
      //AddCharacter(req.body as Character)
      // const char = req.body as Character
      // prisma.character.create({
      //   data: {
      //     name: char.name,
      //     initiative: char.initiative
      //   }
      // }).then(x => console.log(x))
      // prisma.character.findMany().then(x => console.log(x))
      const id = AddCharacter(req.body as Character)
      res.status(200).send(id)
      break
    case "GET":
      res.status(200).json(GetAllCharacters())
      break
  }
}
