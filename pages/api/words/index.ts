import type { NextApiRequest, NextApiResponse } from 'next'
import { Word } from '../../../types/words/Word';
import axios from 'axios';
import { ROUTE_API_SERVER } from '../../../constants/general/ConstantsRoutes';
 
type ResponseData = Word[]
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  if (req.method === 'POST') {
    
    const words: Word[] = await axios.post(`${ROUTE_API_SERVER}words`, req.body).then(resp => {
      return resp.data;
    });
    res.status(200).json(words)

  } else if(req.method === 'GET') {    

    const words: Word[] = await axios.get(`${ROUTE_API_SERVER}words`).then(resp => {
      return resp.data;
    });
    res.status(200).json(words)

  } else {
    // Handle any other HTTP method
  }

}