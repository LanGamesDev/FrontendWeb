import type { NextApiRequest, NextApiResponse } from 'next'
import { Word } from '../../../types/words/Word';
import axios from 'axios';
 
type ResponseData = Word
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const urlBaseApi = process.env.URL_BASE_API;

  if (req.method === 'PUT') {

    const words: Word = await axios.put(`${urlBaseApi}/words/${req.body.id}`, req.body).then(resp => {
      return resp.data;
    });
    res.status(200).json(words)

  } else if (req.method === 'DELETE') {

    const idWord: number = await axios.delete(`${urlBaseApi}/words/${req.query.id}`).then(resp => {
      return resp.data;
    });
    res.status(200).json({id: idWord})

  } else {
    // Handle any other HTTP method
  }

}