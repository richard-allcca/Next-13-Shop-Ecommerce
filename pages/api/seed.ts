import { NextApiResponse, NextApiRequest } from 'next';
import { db, seedDatabase } from '../../database';
import { Product } from '../../models';

type Data = {
  ok: boolean;
  message: string;
};

// IMPORTANT - DO NOT USE THIS FILE - IT IS ONLY FOR DEVELOPMENT - CHARGE FIRST DATA IN DDBB

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Evita ejecutar este endopoint en producción y pugar la db
  if (process.env.NODE_ENV === 'production') {
    return res
      .status(401)
      .json({ ok: false, message: 'No tiene acceso a este servicio' });
  }

  db.connect();

  await Product.deleteMany(); // REVIEW - esto elimina toda la base de datos
  await Product.insertMany(seedDatabase.initialData.products);

  db.disconnect();

  res.status(200).json({
    ok: true,
    message: 'Proceso terminado correctamente',
  });
}
