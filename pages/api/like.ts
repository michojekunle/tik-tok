// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4';
import { client } from '../../utils/client';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === 'PUT') {
        const { postId, userId, like } = req.body;
        const data = 
            like ? await client
                    .patch(postId)
                    .setIfMissing({ likes: [] })
                    .insert('after', 'likes[-1]', [
                        {
                            _key: uuid(),
                            _ref: userId
                        }
                    ])
                    .commit()
                : await client
                    .patch(postId)
                    .unset([`likes[_ref=="${userId}"]`])
                    .commit();
        res.status(200).json(data)
    }
    
    res.status(200).json({ name: 'Response Success' })
}