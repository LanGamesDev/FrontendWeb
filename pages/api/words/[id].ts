import type { NextApiRequest, NextApiResponse } from 'next'
import { Word } from '../../../types/words/Word';
import axios from 'axios';
 
type ResponseData = Word[]
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  if (req.method === 'PUT') {

    const words: Word[] = await axios.put(`http://localhost:8080/words/${req.body.id}`, req.body).then(resp => {
      return resp.data;
    });
    res.status(200).json(words)

  } else {
    // Handle any other HTTP method
  }

}