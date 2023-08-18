import { FC, PropsWithChildren, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '../../interface';

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};


export const CartProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {

  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const data = {
    ...state,
  };


  return (
    <CartContext.Provider value={data} >
      {children}
    </CartContext.Provider>
  );
};