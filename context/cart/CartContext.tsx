import { createContext } from 'react';
import { ICartProduct } from '../../interface';
import { IShippingAddresss } from './CartProvider';


interface ContextProps {
  isLoaded    : boolean;
  cart        : ICartProduct[];
  numberOfItem: number;
  subTotal    : number;
  tax         : number;
  total       : number;

  shippingAddress?: IShippingAddresss ;

  addNewProduct     : (product: ICartProduct)=>void;
  updateCartQuantity: (product: ICartProduct)=> void;
  removeCartProduct : (product: ICartProduct) => void;
  updateAddress    : (address: IShippingAddresss) => void;
}


export const CartContext = createContext({} as ContextProps);