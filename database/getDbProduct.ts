
import { db } from '.';
import { Product } from '../models';
import { IProduct } from './../interface/products';

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
  await db.connect();

  const product = await Product.findOne({ slug }).lean();

  await db.disconnect();

  if (!product) return null;

  // TODO - procesar imagenes en subida al server

  return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
  slug: string;
}

export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();

  // Selecciona todos los productos por slug restando el _id
  const slugs = await Product.find().select('slug -_id').lean();

  await db.disconnect();

  return slugs;
};

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
  db.connect();

  const products = await Product.find({
    $text: { $search: term }
  })
    .select('title images price inStock slug -_id')
    .lean();

  db.disconnect();

  return products;
};

export const getAllProducst = async (): Promise<IProduct[]> => {
  db.connect();

  const products = await Product.find().lean();

  db.disconnect();

  return JSON.parse(JSON.stringify(products));
};