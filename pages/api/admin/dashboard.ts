import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Product, User } from '../../../models';
import Order from '../../../models/Order';

type Data =
  | {
    numberOfOrders: number;
    paidOrders: number; // isPaid true
    notPaidOrders: number;
    numberOfClients: number; // role client
    numberOfProducts: number;
    productsWithNoInventory: number; // 0
    lowInventory: number; // products con 10 o menos
  }
  | {
    message: string;
  };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getGeneralStatisitcs(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getGeneralStatisitcs = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const [
    numDbOrders,
    numDbPaidOrders,
    numDbClients,
    numDbProducts,
    numDbProductsOutStock,
    numDbProductsLittleStock
  ] = await Promise.all([
    Order.count(),
    Order.find({ isPaid: true }).count(),
    User.find({ role: 'client' }).count(),
    Product.count(),
    Product.find({ inStock: { $eq: 0 } }).count(),
    Product.find({ inStock: { $gt: 0, $lt: 10 } }).count(),

  ]);

  await db.disconnect();

  const data  = {
    numberOfOrders: numDbOrders,
    paidOrders: numDbPaidOrders,
    notPaidOrders: numDbOrders - numDbPaidOrders,
    numberOfClients: numDbClients,
    numberOfProducts: numDbProducts,
    productsWithNoInventory: numDbProductsOutStock,
    lowInventory: numDbProductsLittleStock,

  };

  return res.status(200).json(data);
};
