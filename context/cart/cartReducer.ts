import { ICartProduct } from '../../interface';
import { CartState, IShippingAddresss } from './';

interface IOrderSummary {
  numberOfItem: number;
  subTotal    : number;
  tax         : number;
  total       : number;
}

type CartActionType =
  | { type: 'Cart - load from cookies | storage'; payload: ICartProduct[] }
  | { type: 'Cart - Update Product in cart'; payload: ICartProduct[] }
  | { type: 'Cart - Change cart quantity'; payload: ICartProduct }
  | { type: 'Cart - Remove product in cart'; payload: ICartProduct }
  | { type: 'Cart - Update order summary'; payload: IOrderSummary }
  | { type: 'Cart - LoadAddress from Cookies'; payload: IShippingAddresss }
  | { type: 'Cart - Update Address'; payload: IShippingAddresss };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case 'Cart - load from cookies | storage':
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };
    case 'Cart - Update Product in cart':
      return {
        ...state,
        cart: [...action.payload],
      };
    case 'Cart - Change cart quantity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };
    case 'Cart - Remove product in cart':
      return {
        ...state,
        cart: state.cart.filter(
          (product) => !(product._id === action.payload._id && product.size === action.payload.size),
        ),
      };
    case 'Cart - Update order summary':
      return {
        ...state,
        ...action.payload
      };

    case 'Cart - Update Address':
    case 'Cart - LoadAddress from Cookies':
      return {
        ...state,
        shippingAddress: action.payload
      };

    default:
      return state;
  }
};
