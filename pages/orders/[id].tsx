import React, { FC } from 'react';

import { ShopLayout } from '../../components/layouts';

import { CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';

import { CartList, OrderSummary } from '../../components/cart';

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interface';

interface Props {
  order: IOrder;
}

const order: FC<Props> = ({ order }) => {

  const {
    isPaid, _id, numberOfItems, shippingAddress, orderItems, subTotal, tax, total
  } = order;

  const {
    address, country, city, firstName, lastName, phone, zip, address2
  } = shippingAddress;

  const getTitleResumen = () => {
    return `Resumen (${numberOfItems} ${numberOfItems > 1 ? 'productos' : 'producto'})`;
  };

  return (
    <ShopLayout title="Resumen de la orden 123" pageDescription="Resumen de la orden">
      <Typography variant="h1" component="h1" > Orden {_id} </Typography>
      {
        isPaid
          ? (
            <Chip
              sx={{ mt: 2 }}
              label="Orden Pagada"
              variant="outlined"
              color="success"
              icon={<CreditScoreOutlined />}
            />
          )
          : (
            <Chip
              sx={{ mt: 2 }}
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
                      <h1>Pagar</h1>
                    )
                }
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

export default order;