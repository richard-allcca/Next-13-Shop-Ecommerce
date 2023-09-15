import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Orders } from '../../../models';
import { IOrder } from './../../../interface/order';

type Data =
  | { message: string; }
  | IOrder[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getOrders(req, res);

    default:
      res.status(400).json({ message: 'Bad request' });
  }

}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  db.connect();

  const orders = await Orders.find()
    .sort({ createdAt: 'desc' })
    .populate('user', 'name email') // Junto con la 'orden' Trae del Usuario
    .lean();

  db.disconnect();

  res.status(200).json(orders);

};
