import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Your API logic goes here

        // Example: Return a JSON response
        res.status(200).json({ message: 'API route is working!' });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Internal Server Error' });
    }
}