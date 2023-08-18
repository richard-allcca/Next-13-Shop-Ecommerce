import React from 'react';
import { ShopLayout } from '../../components/layouts';
import { Link as MuiLink, Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import Link from 'next/link';

const summary = () => {
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

              <Typography variant="h2" >Resumen (3 productos)</Typography>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                <Typography variant="subtitle1" >Direccion de entrega</Typography>

                <Link href="/checkout/adress" >
                  <MuiLink component="span" underline="always" >
                    Editar
                  </MuiLink>
                </Link>
              </Box>

              <Typography>Richard Allcca</Typography>
              <Typography>234 algun lugar</Typography>
              <Typography>Ica - Chincha</Typography>
              <Typography>Perú</Typography>
              <Typography>051 987520453</Typography>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'end' }} >
                <Link href="/cart" >
                  <MuiLink component="span" underline="always" >
                    Editar
                  </MuiLink>
                </Link>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }} >
                <Button color="secondary" className="circular-btn" >
                  Checkout
                </Button>
              </Box>

            </CardContent>
          </Card>

        </Grid>

      </Grid>

    </ShopLayout>
  );
};

export default summary;