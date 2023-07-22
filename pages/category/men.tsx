import React from 'react';
import { ShopLayout } from '../../components/layouts';
import { Typography } from '@mui/material';
import { useProducts } from '../../hooks';
import { Loading } from '../../components/ui';
import { ProductList } from '../../components/products';

const Men = () => {

  const { products, isLoading, isError } = useProducts('/products?gender=men');

  return (
    <ShopLayout title="Teslo-shop Men" pageDescription="Las mejores prendas para Hombres" >
      <Typography variant="h2" component="h2" >Men</Typography>
      <Typography variant="h2" sx={{ mgb: 1 }} >Productos para Hombres</Typography>

      {
        isLoading
          ? <Loading/>
          : <ProductList products={products} />
      }

    </ShopLayout>
  );
};

export default Men;