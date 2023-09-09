import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { CartContext } from '../../context';
import { format } from './../../utils/currency';

interface Props {
  orderValues?: {
    numberOfItems: number;
    subTotal: number;
    total: number;
    tax: number;
  };
}

export const OrderSummary = (props: Props) => {

  const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

  const getValues = props.orderValues || { numberOfItems, subTotal, total, tax };

  const getTextCountItems =  getValues.numberOfItems > 1 ? 'Productos' : 'Producto';

  return (
    <Grid container >
      <Grid item xs={6} >
        <Typography >N°. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" >
        <Typography>{getValues.numberOfItems} {getTextCountItems}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" >
        <Typography>{format(getValues.subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ({process.env.NEXT_PUBLIC_TAX_RATE})%</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" >
        <Typography>{format(getValues.tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }} >
        <Typography variant="subtitle1" >Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }} >
        <Typography variant="subtitle1" >{format(getValues.total)}</Typography>
      </Grid>
    </Grid>
  );
};
