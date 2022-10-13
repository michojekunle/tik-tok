// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { postDetailQuery } from '../../../utils/queries';
import { client } from '../../../utils/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === 'GET') {
        const { id } = req.query;
        const query = postDetailQuery(id);

        const data = await client.fetch(query)
        res.status(200).json(data[0])
    }
    
    res.status(200).json({ name: 'Response Success' })
}