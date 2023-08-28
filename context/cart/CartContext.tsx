import { createContext } from 'react';
import { ICartProduct } from '../../interface';


interface ContextProps {
  cart: ICartProduct[];
  numberOfItem: number;
  subTotal: number;
  tax: number;
  total: number;

  addNewProduct: (product: ICartProduct)=>void;
  updateCartQuantity: (product: ICartProduct)=> void;
  removeCartProduct: (product: ICartProduct) => void;
}


export const CartContext = createContext({} as ContextProps);