import React, { FC } from 'react';
import { GetServerSideProps } from 'next';

import { AirplaneTicketOutlined, CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';

import { IOrder } from '../../../interface';
import { AdminLayout, ShopLayout } from '../../../components/layouts';
import { CartList, OrderSummary } from '../../../components/cart';
import { dbOrders } from '../../../database';

interface Props {
  order: IOrder;
}

const Order: FC<Props> = ({ order }) => {

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
    <AdminLayout 
      title="Resumen de la orden" 
      subTitle={`OrderId: ${order._id}`}
      icon={<AirplaneTicketOutlined/>}
    >

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

                <Box display={'flex'} flexDirection={'column'} >
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
                        <Chip
                          sx={{ mt: 2 }}
                          label="Pendiente de pago"
                          variant="outlined"
                          color="error"
                          icon={<CreditCardOutlined />}
                        />
                      )
                  }
                </Box>

              </Box>

            </CardContent>
          </Card>

        </Grid>

      </Grid>

    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, query } = ctx;
  const { id = '' } = query;

  const order = await dbOrders.getOrderById(id.toString());
  if (!order) {
    return {
      redirect: {
        destination: `/admin/orders`,
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