import { createContext } from 'react';
import { ICartProduct, IShippingAddress } from '../../interface';


interface ContextProps {
  isLoaded    : boolean;
  cart        : ICartProduct[];
  numberOfItem: number;
  subTotal    : number;
  tax         : number;
  total       : number;

  shippingAddress?: IShippingAddress ;

  addNewProduct     : (product: ICartProduct)=>void;
  updateCartQuantity: (product: ICartProduct)=> void;
  removeCartProduct : (product: ICartProduct) => void;
  updateAddress     : (address: IShippingAddress) => void;
  createOrder       : () => void;
}


export const CartContext = createContext({} as ContextProps);