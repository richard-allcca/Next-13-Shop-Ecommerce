import mongoose, { Model, Schema, model } from 'mongoose';
import { IProduct } from './../interface/products';


const productSchema = new Schema({
  description: { type: String, required: true, default: '' },
  images: [{ type: String }],
  inStock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  sizes: [{
    type: String,
    enum: {
      values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      message: '{VALUE} Invalid size'
    }
  }],
  slug: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  title: { type: String, required: true, default: '' },
  type: {
    type: String,
    enum: {
      values: ['shirts', 'pants', 'hoodies', 'hats'],
      message: '{VALUE} Invalid type'
    },
    default: 'shirts'
  },
  gender: {
    type: String,
    enum: {
      values: ['men', 'women', 'kid', 'unisex'],
      message: '{VALUE} Invalid gender'
    },
    default: 'women'
  }
}, { timestamps: true }
);

// Agragamos esto para usar el Operador de evaluación e indicarle buscar solo en esos campos
productSchema.index({ title: 'text', tags: 'text' });

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);

export default Product;