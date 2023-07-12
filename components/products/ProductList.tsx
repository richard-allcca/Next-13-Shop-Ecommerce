import React, { FC } from 'react';
import { Card, CardActionArea, CardMedia, Grid } from '@mui/material';
import { IProduct } from '../../interface';
import { ProductCard } from './ProductCard';

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4} >
      {
        products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))
      }
    </Grid>
  );
};
