import React, { FC, useMemo, useState } from 'react';
import { Link as MuiLink,Grid, Card, CardActionArea, CardMedia, Box, Typography } from '@mui/material';
import { IProduct } from '../../interface';
import Link from 'next/link';

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
        <Link href='/product/slug' prefetch={false} >
          <MuiLink underline='always' component={'span'} >
            <CardActionArea>
              <CardMedia
                component='img'
                image={productImage}
                alt={product.title}
                className='fadeIn'
                // onLoad={() => console.log('cargo')}
              />
            </CardActionArea>
          </MuiLink>
        </Link>
      </Card>

      <Box sx={{ mt: 1 }} className='fadeIn' >
        <Typography fontWeight={700} >{product.title}</Typography>
        <Typography fontWeight={500} >{product.price}</Typography>
      </Box>

    </Grid>
  );
};
