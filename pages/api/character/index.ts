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
