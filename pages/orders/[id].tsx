import React, { FC, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { PayPalButtons } from '@paypal/react-paypal-js';

import { ShopLayout } from '../../components/layouts';

import { CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Divider, Grid, Typography, Chip, CircularProgress } from '@mui/material';

import { CartList, OrderSummary } from '../../components/cart';

import { dbOrders } from '../../database';

import { IOrder } from '../../interface';
import { tesloApi } from '../../api';
import { useRouter } from 'next/router';

interface Props {
  order: IOrder;
}

export type OrderResponseBody = {
  id: string;
  status:
  | 'COMPLETED'
  | 'SAVED'
  | 'APPROVED'
  | 'PAYER_ACTION_REQUIRED'
  | 'CREATED'
  | 'VOIDED';
};

const Order: FC<Props> = ({ order }) => {

  const router = useRouter();

  const {
    isPaid, _id, numberOfItems, shippingAddress, orderItems, subTotal, tax, total
  } = order;

  const {
    address, country, city, firstName, lastName, phone, zip, address2
  } = shippingAddress;

  const getTitleResumen = () => {
    return `Resumen (${numberOfItems} ${numberOfItems > 1 ? 'productos' : 'producto'})`;
  };

  const [isPaying, setIsPaying] = useState(false);

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') return alert('No hay pago en PayPal');

    setIsPaying(true);

    try {

      const { data } = await tesloApi.post('/orders/pay/', {
        transactionId: details.id,
        orderId: order._id
      });

      router.reload();

    } catch (error) {
      setIsPaying(false);
      console.log(error);
      alert('Error');
    }

  };

  return (
    <ShopLayout title="Resumen de la orden 123" pageDescription="Resumen de la orden">
      <Typography variant="h1" component="h1" > Orden {_id} </Typography>
      {
        isPaid
          ? (
            <Chip
              sx={{ mt: 2, mb: 2  }}
              label="Orden Pagada"
              variant="outlined"
              color="success"
              icon={<CreditScoreOutlined />}
            />
          )
          : (
            <Chip
              sx={{ mt: 2, mb: 2 }}
              label="Pendiente de pago"
              variant="outlined"
              color="error"
              icon={<CreditCardOutlined />}
            />
          )
      }

      <Grid container className="fadeIn" >

        <Grid item xs={12} sm={7} >
          <CartList products={orderItems} />
        </Grid>

        <Grid item xs={12} sm={5} >
          <Card className="summary-card" >
            <CardContent>

              <Typography variant="h2" >{getTitleResumen()}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                <Typography variant="subtitle1" >Direccion de entrega</Typography>
              </Box>

              <Typography>{firstName} {lastName}</Typography>
              <Typography>{address2 ? `${address} - ${address2}` : `${address}`}</Typography>
              <Typography>{city} - {zip}</Typography>
              <Typography>{country}</Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary
                orderValues={{
                  numberOfItems,
                  subTotal,
                  total,
                  tax
                }}
              />

              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column' }} >

                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  sx={{ display: isPaying ? 'flex' : 'none' }}
                >
                  <CircularProgress />
                </Box>

                <Box
                  sx={{ display: isPaying ? 'none' : 'block', flex: 1 }}
                >
                  {
                    isPaid
                      ? (
                        <Chip
                          sx={{ my: 2 }}
                          label="Orden Pagada"
                          variant="outlined"
                          color="success"
                          icon={<CreditScoreOutlined />}
                        />
                      )
                      : (
                        <PayPalButtons
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: `${order.total}`
                                  }
                                }
                              ]
                            });
                          }}
                          onApprove={(data, actions) => {
                            return actions.order!.capture().then((details) => {
                              // console.log(details);
                              // const name = details.payer.name?.given_name;
                              onOrderCompleted(details);
                            });
                          }}
                        />
                      )
                  }
                </Box>

              </Box>

            </CardContent>
          </Card>

        </Grid>

      </Grid>

    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, query } = ctx;
  const { id = '' } = query;

  const session: any = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false
      }
    };
  }

  const order = await dbOrders.getOrderById(id.toString());
  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false
      }
    };
  }

  // Verifica que la orden sea del usuario
  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false
      }
    };
  }

  return {
    props: {
      order
    }
  };
};

export default Order;