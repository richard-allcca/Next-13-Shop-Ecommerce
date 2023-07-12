import React, { FC, useMemo, useState } from 'react';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography } from '@mui/material';
import { IProduct } from '../../interface';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `products/${product.images[1]}`
      : `products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      key={product.slug}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <CardActionArea>
          <CardMedia
            component='img'
            image={productImage}
            alt={product.title}
            className='fadeIn'
            // onLoad={() => console.log('cargo')}
          />
        </CardActionArea>
      </Card>

      <Box sx={{ mt: 1 }} className='fadeIn' >
        <Typography fontWeight={700} >{product.title}</Typography>
        <Typography fontWeight={500} >{product.price}</Typography>
      </Box>

    </Grid>
  );
};
