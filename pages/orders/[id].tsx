import React from 'react';
import { ShopLayout } from '../../components/layouts';
import { Link as MuiLink, Box, Button, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import Link from 'next/link';
import { CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';

const order = () => {
  return (
    <ShopLayout title='Resumen de la orden 123' pageDescription='Resumen de la orden' >
      <Typography variant='h1' component='h1' > Orden abc123 </Typography>

      <Chip
        sx={{ my: 2 }}
        label='Resumen del pago'
        variant='outlined'
        color='error'
        icon={<CreditCardOutlined />}
      />
      <Chip
        sx={{ my: 2 }}
        label='Orden Pagada'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />

      <Grid container >

        <Grid item xs={12} sm={7} >
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5} >
          <Card className='summary-card' >
            <CardContent>

              <Typography variant='h2' >Resumen (3 productos)</Typography>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                <Typography variant='subtitle1' >Direccion de entrega</Typography>

                <Link href='/checkout/adress' >
                  <MuiLink component='span' underline='always' >
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
                <Link href='/cart' >
                  <MuiLink component='span' underline='always' >
                    Editar
                  </MuiLink>
                </Link>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }} >
                <h1>Pagar</h1>
                <Chip
                  sx={{ my: 2 }}
                  label='Orden Pagada'
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
              </Box>

            </CardContent>
          </Card>

        </Grid>

      </Grid>

    </ShopLayout>
  );
};

export default order;