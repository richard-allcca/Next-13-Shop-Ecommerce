import { FC, PropsWithChildren, useEffect, useReducer } from 'react';

import { CartContext, cartReducer } from './';
import { ICartProduct, IOrder, IShippingAddress } from '../../interface';

import Cookie from 'js-cookie';
import { tesloApi } from '../../api';
import axios from 'axios';

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: IShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,

  shippingAddress: undefined
};

export const CartProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  // Cookies charge inicial
  useEffect(() => {
    try {
      const cookieProduct = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
      dispatch({ type: 'Cart - load from cookies | storage', payload: cookieProduct });
    } catch (error) {
      dispatch({ type: 'Cart - load from cookies | storage', payload: [] });
    }
  }, []);

  useEffect(() => {
    if (Cookie.get('firstName')) {

      const shippingAddress = {
        firstName: Cookie.get('firstName') || '',
        lastName: Cookie.get('lastName') || '',
        address: Cookie.get('address') || '',
        address2: Cookie.get('address2') || '',
        zip: Cookie.get('zip') || '',
        city: Cookie.get('city') || '',
        country: Cookie.get('country') || '',
        phone: Cookie.get('phone') || '',
      };

      dispatch({ type: 'Cart - LoadAddress from Cookies', payload: shippingAddress });
    }


  }, []);

  // Cookies update
  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart), { sameSite: 'none', secure: true });
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce((acc, current) => current.quantity + acc, 0);
    const subTotal = state.cart.reduce((acc, current) => current.price * current.quantity + acc, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({ type: 'Cart - Update order summary', payload: orderSummary });
  }, [state.cart]);


  const addNewProduct = (product: ICartProduct) => {
    const isProductInCart = state.cart.some((p) => p._id === product._id);
    const isSizeMatch = (p: ICartProduct) => p._id === product._id && p.size === product.size;

    // Producto nuevo
    if (!isProductInCart) {
      const updatedCart = [...state.cart, product];
      dispatch({ type: 'Cart - Update Product in cart', payload: updatedCart });
      return;
    }

    const updatedCart = state.cart.map((item) => {
      if (!isSizeMatch(item)) return item;
      item.quantity += product.quantity;
      return item;
    });

    // si no exite un producto con el _id y el size
    if (!updatedCart.some(isSizeMatch)) {
      updatedCart.push(product);
    }

    dispatch({ type: 'Cart - Update Product in cart', payload: updatedCart });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Change cart quantity', payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {

    dispatch({ type: 'Cart - Remove product in cart', payload: product });
  };

  const updateAddress = (address: IShippingAddress) => {
    dispatch({ type: 'Cart - Update Address', payload: address });
  };

  const createOrder = async (): Promise<{ hasError: boolean; message: string; }> => {

    if (!state.shippingAddress) throw new Error('No hay dirección de entrega');

    const body: IOrder = {
      orderItems: state.cart.map(p => ({
        ...p,
        size: p.size! // fix falla de size opcional
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false
    };

    try {
      const { data } = await tesloApi.post<IOrder>('/orders', body);
      console.log(data);
      
      // dispatch({ type: 'Cart - Order Complete' });

      return {
        hasError: false,
        message: data._id!
      };

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message
        };
      }

      return {
        hasError: true,
        message: 'Error no controlado hable con el administrador'
      };
    }
  };

  const data = {
    ...state,
    addNewProduct,
    updateCartQuantity,
    removeCartProduct,
    updateAddress,
    createOrder,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};
