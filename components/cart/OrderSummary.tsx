import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { CartContext } from '../../context';
import { format } from './../../utils/currency';

export const OrderSummary = () => {

  const { numberOfItem, subTotal, tax, total } = useContext(CartContext);

  const getCountProducts = `${numberOfItem} ${numberOfItem > 1 ? 'productos': 'productos'}`;

  return (
    <Grid container >
      <Grid item xs={6} >
        <Typography >N°. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" >
        <Typography>{getCountProducts}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" >
        <Typography>{format(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ({process.env.NEXT_PUBLIC_TAX_RATE})%</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" >
        <Typography>{format(tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }} >
        <Typography variant="subtitle1" >Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }} >
        <Typography variant="subtitle1" >{format(total)}</Typography>
      </Grid>
    </Grid>
  );
};
