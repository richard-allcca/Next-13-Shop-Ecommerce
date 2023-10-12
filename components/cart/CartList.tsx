
import { Box, Button, CardActionArea, CardMedia, Grid, Link as MuiLink, Typography } from '@mui/material';
import Link from 'next/link';
import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interface';

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {

  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const setQuatityProduct = (product: ICartProduct, newQuantity: number) => {
    product.quantity = newQuantity;
    updateCartQuantity(product);
  };

  const productsToShow = products ? products : cart;

  const getUrlImage = (image: string) => {
    return image.startsWith('http')
      ? image :
      `${process.env.NEXT_PUBLIC_HOST_NAME}/products/${image}`;
  };

  return (
    <>
      {
        productsToShow.map((product, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 1 }} >

            <Grid item xs={3} >
              <Link href={`/product/${product.slug}`} >
                <MuiLink component={'div'} >
                  <CardActionArea>
                    <CardMedia
                      // image={ product.image.startsWith('http') ? product.image : `/products/${product.image}`}
                      image={getUrlImage(product.image)}
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
                      setQuantity={(value) => setQuatityProduct(product as ICartProduct, value)}
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
                    onClick={() => removeCartProduct(product as ICartProduct)}
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
