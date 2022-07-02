// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Character } from '../../types/character'

const characters =
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
  _req: NextApiRequest,
  res: NextApiResponse<Array<Character>>
) {
  res.status(200).json(characters)
}
