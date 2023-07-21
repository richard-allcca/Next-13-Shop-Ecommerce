import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';
import { Typography } from '@mui/material';
import { initialData } from '../database/products';
import { ProductList } from '../components/products';

const Home: NextPage = () => {
  return (
    <ShopLayout title="Teslo-shop - Home" pageDescription="Ecuentra los mejores productos de teslaShop" >
      <Typography variant="h1" component="h1" >Tienda</Typography>
      <Typography variant="h2" sx={{ mgb: 1 }} >Todos los productos</Typography>

      <ProductList
        products={initialData.products}
      />

    </ShopLayout>
  );
};

export default Home;
