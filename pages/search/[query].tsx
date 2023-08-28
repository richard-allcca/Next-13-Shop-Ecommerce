import type { GetServerSideProps, NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { Box, Typography } from '@mui/material';
import { getAllProducst, getAllProductsSlugs, getProductsByTerm } from '../../database';
import { IProduct } from '../../interface';
import { ProductList } from '../../components/products';

interface Props {
  products: IProduct[];
  term: string;
  foundProducts: boolean;
}

const Search: NextPage<Props> = ({ products, term, foundProducts }) => {

  return (
    <ShopLayout title="Teslo-shop - Seach" pageDescription="Ecuentra los mejores productos de teslaShop" >
      <Typography variant="h1" component="h1" >Buscar producto</Typography>
      {
        foundProducts
          ? <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize"  >Termino: {term}</Typography>
          : (
            <Box display="flex" >
              <Typography variant="h2" sx={{ mb: 1 }} >No encontramos ningún producto</Typography>
              <Typography variant="h2" sx={{ ml: 1 }} color="secondary" textTransform="capitalize" >{term}</Typography>
            </Box>
          )
      }

      <ProductList products={products} />

    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { query } = ctx.params as { query: string; };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    };
  }

  let products = await getProductsByTerm(query);

  const foundProducts = products.length > 0;

  if (!foundProducts) {
    let products = await getAllProducst();
    
    return {
      props: {
        products,
        term: query,
        foundProducts
      }
    };
  }

  return {
    props: {
      products,
      term: query,
      foundProducts
    }
  };
};

export default Search;
