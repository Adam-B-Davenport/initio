
import type { NextApiRequest, NextApiResponse } from 'next'
import { Character } from '../../../types/character'
import '../../../utils/db'
import { DeleteCharacter, UpdateCharacter } from '../../../utils/db'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Character>
) {
  switch (req.method) {
    case "PUT":
      UpdateCharacter(req.body as Character)
      res.status(204)
      break
    case "DELETE":
      DeleteCharacter(parseInt((req.query.id as string)))
      res.status(204)
      break
  }
}
