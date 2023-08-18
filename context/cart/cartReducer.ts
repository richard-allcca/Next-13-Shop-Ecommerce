import { ICartProduct } from '../../interface';
import { CartState } from './';


type CartctionType =
  | { type: 'Cart - [Cart] - load from cookies | storage', payload: ICartProduct[] }
  | { type: 'Cart - Add Product', payload: ICartProduct }


export const cartReducer = (state: CartState, action: CartctionType): CartState => {

  switch (action.type) {
    case 'Cart - [Cart] - load from cookies | storage':
      return {
        ...state,
      };

    default:
      return state;
  }
};