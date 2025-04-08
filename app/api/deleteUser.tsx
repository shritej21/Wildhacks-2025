// pages/api/deleteUser.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../app/components/lib/prisma'; // Adjust the import based on your project setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const { id } = JSON.parse(req.body);
    if (!id) {
      return res.status(400).json({ message: 'User id is required' });
    }
    // Delete the user from the database
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
