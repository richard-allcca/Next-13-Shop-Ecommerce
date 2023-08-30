import { NextApiResponse, NextApiRequest } from 'next';
import { db, seedDatabase } from '../../database';
import { Product, User } from '../../models';

type Data = {
  ok: boolean;
  message: string;
};

// IMPORTANT - DO NOT USE THIS FILE - IT IS ONLY FOR DEVELOPMENT - CHARGE FIRST DATA IN DDBB

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if (process.env.NODE_ENV === 'production') {
    return res
      .status(401)
      .json({ ok: false, message: 'No tiene acceso a este servicio' });
  }

  db.connect();

  await User.deleteMany();
  await User.insertMany(seedDatabase.initialData.users);

  await Product.deleteMany();
  await Product.insertMany(seedDatabase.initialData.products);

  db.disconnect();

  res.status(200).json({
    ok: true,
    message: 'Proceso terminado correctamente',
  });
}
