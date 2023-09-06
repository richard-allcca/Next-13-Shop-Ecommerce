import React, { useContext, useEffect, useState } from 'react';
import { ShopLayout } from '../../components/layouts';
import { Link as MuiLink, Box, Card, CardContent, Divider, Grid, Typography, Button, Chip } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import Link from 'next/link';

import { countries } from '../../utils';
import { CartContext } from '../../context';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Summary = () => {
  const router = useRouter();

  const [isPositing, setIsPositing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address');
    }
  }, [router]);

  const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);

  if (!shippingAddress) return <></>;
  const { firstName, lastName, address, address2, zip, city, country, phone } = shippingAddress;

  const onCreateOrder = async () => {
    setIsPositing(true);

    const { hasError, message } = await createOrder();

    if(hasError){
      setIsPositing(false);
      setErrorMessage(message);
      return;
    }

    router.replace(`/orders/${message}`);
  };


  return (
    <ShopLayout title="Resumen de la orden" pageDescription="Resumen de la orden" >
      <Typography variant="h1" component="h1" >
        Resumen de la orden
      </Typography>

      <Grid container >

        <Grid item xs={12} sm={7} >
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5} >
          <Card className="summary-card" >
            <CardContent>

              <Typography variant="h2" >{`Resumen (${numberOfItems} productos)`}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                <Typography variant="subtitle1" >Direccion de entrega</Typography>

                <Link href="/checkout/address" >
                  <MuiLink component="span" underline="always" >
                    Editar
                  </MuiLink>
                </Link>
              </Box>

              <Typography>{`${firstName} ${lastName}`}</Typography>
              <Typography>{address2 ? `${address} - ${address2}` : address}</Typography>
              <Typography>{`${city} - ${zip}`}</Typography>
              <Typography>{countries.filter(c => c.code === country)[0].name}</Typography>
              {/* <Typography>{ countries.find(c => c.code === country)?.name }</Typography> */}
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'end' }} >
                <Link href="/cart" >
                  <MuiLink component="span" underline="always" >
                    Editar
                  </MuiLink>
                </Link>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }} display={'flex'} flexDirection={'column'} >
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPositing}
                >
                  Confirmar Orden
                </Button>
              </Box>

              <Chip
                color="error"
                label={errorMessage}
                sx={{ display: errorMessage ? 'block' : 'none', mt: 2 }}
              />

            </CardContent>
          </Card>

        </Grid>

      </Grid>

    </ShopLayout>
  );
};

export default Summary;