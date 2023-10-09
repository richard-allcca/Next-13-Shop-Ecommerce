import type { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from '../../../interface';
import { db } from '../../../database';
import { Product } from '../../../models';
import { isValidObjectId } from 'mongoose';

type Data =
  | { name: string; }
  | { message: string; }
  | IProduct[]
  | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getProducts(req, res);

    case 'PUT':
      return updateProducts(req, res);

    case 'POST':
      return createProduct(req, res);

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

const updateProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { _id = '', images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({
      message: 'El producto no tiene un Id valido'
    });
  };

  if (images.length < 2) {
    return res.status(400).json({
      message: 'El Producto necesita 2 imagenes'
    });
  };

  try {
    await db.connect();
    const product = await Product.findById(_id);

    if (!product) {
      await db.disconnect();
      return res.status(400).json({
        message: `No existe un producto con el id: ${_id}`
      });
    }

    // TODO - Eliminar imagenes en cloudinary

    await product?.updateOne(req.body);
    await db.disconnect();

    return res.status(200).json(product!);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: 'Revisar la consola del servidor' });
  }
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { images = [] } = req.body as IProduct;

  if (images.length > 2) {
    return res.status(400).json({
      message: 'El producto necesita mínimo 2 imagenes'
    });
  }

  try {
    await db.connect();

    const productInDb = await Product.findOne({ slug: req.body.slug });
    if (productInDb) {
      await db.disconnect();
      return res.status(400).json({ message: 'Ya existe un producto con ese slug' });
    }

    const product = new Product(req.body);
    await product.save();
    await db.disconnect();

    res.status(201).json(product);
  } catch (error) {
    await db.disconnect();
    return res.status(400).json({ message: 'Revisar los logs del servidor' });
  }
};

