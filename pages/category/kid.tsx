import React from 'react';
import { ShopLayout } from '../../components/layouts';
import { Typography } from '@mui/material';
import { useProducts } from '../../hooks';
import { Loading } from '../../components/ui';
import { ProductList } from '../../components/products';

const Kid = () => {

  const { products, isLoading, isError } = useProducts('/products?gender=kid');

  return (
    <ShopLayout title="Teslo-shop Kids" pageDescription="Las mejores prendas para Niños" >
      <Typography variant="h2" component="h2" >Kids</Typography>
      <Typography variant="h2" sx={{ mgb: 1 }} >Productos para Niños</Typography>

      {
        isLoading
          ? <Loading />
          : <ProductList products={products} />
      }

    </ShopLayout>
  );
};

export default Kid;