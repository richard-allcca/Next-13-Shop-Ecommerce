
import { Box, Button, CardActionArea, CardMedia, Grid, Link as MuiLink, Typography } from '@mui/material';
import Link from 'next/link';
import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { CartContext } from '../../context';
import { ICartProduct } from '../../interface';

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable }) => {

  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const setQuatityProduct = (product: ICartProduct, newQuantity: number) => {
    product.quantity = newQuantity;
    updateCartQuantity(product);
  };

  return (
    <>
      {
        cart.map((product, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 1 }} >

            <Grid item xs={3} >
              <Link href={`/product/${product.slug}`} >
                <MuiLink component={'div'} >
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.image}`}
                      component="img"
                      sx={{ borderRadius: '5px' }}
                    />
                  </CardActionArea>
                </MuiLink>
              </Link>
            </Grid>

            <Grid item xs={7} >
              <Box display="flex" flexDirection="column" >
                <Typography variant="body1" >{product.title}</Typography>
                <Typography variant="body1" >Talla: <strong>{product.size}</strong></Typography>

                {
                  editable ? (
                    <ItemCounter
                      quantity={product.quantity}
                      stock={10}
                      setQuantity={(value) => setQuatityProduct(product, value)}
                    />
                  ) : <Typography variant="h5" >
                    {product.quantity}
                    {product.quantity > 1 ? 'Productos' : 'producto'}
                  </Typography>
                }

              </Box>
            </Grid>

            <Grid item xs={2} >
              <Typography variant="subtitle1" >c/u ${product.price}</Typography>
              {
                editable && (
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => removeCartProduct(product)}
                  >
                    Remover
                  </Button>
                )
              }
            </Grid>

          </Grid>
        ))
      }
    </>
  );
};
