import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';
import { Typography } from '@mui/material';
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';
import { Loading } from './../components/ui/Loading';


const Home: NextPage = () => {

  const { products, isLoading, isError } = useProducts('/products');


  return (
    <ShopLayout title="Teslo-shop - Home" pageDescription="Ecuentra los mejores productos de teslaShop" >
      <Typography variant="h1" component="h1" >Tienda</Typography>
      <Typography variant="h2" sx={{ mb: 1 }} >Todos los productos</Typography>

      {
        isLoading
          ? <Loading/>
          : <ProductList products={products} />
      }

    </ShopLayout>
  );
};

export default Home;
