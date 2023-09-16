import type { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from '../../../interface';
import { db } from '../../../database';
import { Product } from '../../../models';

type Data =
  | { name: string; }
  | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getProducts(req, res);

    default:
      res.status(400).json({ name: 'Bad Request' });
  }

}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  await db.connect();

  const products = await Product.find().sort({ title: 'asc' }).lean();

  await db.connect();

  // TODO - tendremos que actualizar las imagenes

  res.status(200).json(products);
};
