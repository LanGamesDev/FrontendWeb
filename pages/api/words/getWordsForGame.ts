import type { NextApiRequest, NextApiResponse } from 'next'
import { Word } from '../../../types/words/Word';
import axios from 'axios';
 
type ResponseData = Word[]
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  if (req.method === 'GET') {
    
    const words: Word[] = await axios.get('http://localhost:8080/words/getWordsForGame', req.body).then(resp => {
      return resp.data;
    });
    res.status(200).json(words)

  } else {
    // Handle any other HTTP method
  }

}