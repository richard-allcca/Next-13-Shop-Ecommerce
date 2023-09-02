import { useContext, useEffect } from 'react';
import Link from 'next/link';

import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';

import { Link as MuiLink, Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { CartList, OrderSummary } from '../../components/cart';

import { StyleBtn } from '../../utils';

const Index = () => {
  const { isLoaded, cart } = useContext(CartContext);

  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.push('/cart/empty');
    }
  }, [cart, isLoaded, router]);

  if (cart.length === 0) null;

  return (
    <ShopLayout title="Carrito - 3" pageDescription="Carrito de compras de la tienda">
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Link href="/checkout/address">
                  <MuiLink sx={StyleBtn} component="button">
                    Checkout
                  </MuiLink>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default Index;
