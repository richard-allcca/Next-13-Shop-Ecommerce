import { ISize, IUser } from './';

export interface IOrder {

  // user
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentResult?: string;

  // cart
  numberOfItems: number;
  subTotal     : number;
  tax          : number;
  total        : number;

  // pay
  isPaid : boolean;
  paidAt?: string ;
}


export interface IOrderItem {
  _id     : string;
  title   : string;
  size    : ISize;
  quantity: number;
  slug    : string;
  image   : string;
  price   : number;
  gender  : string;
}

export interface IShippingAddress {
  firstName: string;
  lastName : string;
  address  : string;
  address2 ?: string;
  zip      : string;
  city     : string;
  country  : string;
  phone    : string;
}