import type { NextApiRequest, NextApiResponse } from 'next';
import { IOrder } from '../../../interface';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

import { db } from '../../../database';
import { Product } from '../../../models';
import Order from '../../../models/Order';
import User from './../../../models/User';

type Data =
  | {message: string}
  | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: 'Bad request ' });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { orderItems, total } = req.body as IOrder;

  // Verificar la sesion
  const session: any = await getServerSession(req, res, { providers: authOptions.providers });

  if (!session)
    return res.status(401).json({ message: 'Debe estar autenticado' });

  // Crear un arreglo con los ids de los productos
  const productsIds = orderItems.map(product => product._id);


  // Obtener los productos
  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {

    // Validar integridad de productos por id
    const subTotal = orderItems.reduce((acc, current) => {
      const currentPrice = dbProducts.find((p) => p.id.toString() === current._id)?.price;

      if (!currentPrice)
        throw new Error('Verifique el carrito de compras, producto no existe');

      return (currentPrice * current.quantity) + acc;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = subTotal * (taxRate + 1);
    if (total !== backendTotal)
      throw new Error('El total no cuadra con el monto');

    const userId = await User.findOne({ email: session.user.email });

    const newOrder = new Order({ ...req.body, isPaid: false, user: userId?._id });
    await newOrder.save();
    await db.disconnect();

    return res.status(201).json(newOrder);

  } catch (error: any) {

    await db.disconnect();
    console.log(error);
    res.status(400).json({
      message: error.message || 'Revise los logs del servidor'
    });

  }
  // return res.status(201).json(req.body);
};
