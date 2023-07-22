import React from 'react';
import { ShopLayout } from '../../components/layouts';
import { Typography } from '@mui/material';
import { useProducts } from '../../hooks';
import { Loading } from '../../components/ui';
import { ProductList } from '../../components/products';

const Women = () => {

  const { products, isLoading, isError } = useProducts('/products?gender=women');

  return (
    <ShopLayout title="Teslo-shop Women" pageDescription="Las mejores prendas de Mujer" >
      <Typography variant="h2" component="h2" >Women</Typography>
      <Typography variant="h2" sx={{ mgb: 1 }} >Productos para Mujeres</Typography>

      {
        isLoading
          ? <Loading/>
          : <ProductList products={products} />
      }

    </ShopLayout>
  );
};

export default Women;