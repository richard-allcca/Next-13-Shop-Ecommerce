import { NextApiRequest, NextApiResponse } from 'next';
import { SHOP_CONSTANTS, db } from '../../../database';
import { Product } from '../../../models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {

  const { slug } = req.query;

  await db.connect();

  const product = await Product
    .find({ slug })
    // .select('title images price inStock slug -_id')
    .lean();

  await db.disconnect();

  if( !product ){
    return res.status(400).json({
      message: 'Producto no encontrado',
    });
  }

  return res.status(200).json(product);
};
