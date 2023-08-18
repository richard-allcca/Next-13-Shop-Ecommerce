import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { IProduct } from '../../interface';
import { getAllProductsSlugs, getProductBySlug } from '../../database';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {

  // const router = useRouter();

  // const { products: product, isLoading } = useProducts(`/products/${router.query.slug}}`);

  // if(isLoading) return <h1>Cargando...</h1>;

  return (
    <ShopLayout title={product.title} pageDescription={product.description} >

      <Grid container spacing={3} >

        <Grid item xs={12} sm={7} >
          {/* SlideShow */}
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5} >
          <Box display="flex" flexDirection="column" >
            {/* Titulos */}
            <Typography variant="h1" component="h1">{product.title}</Typography>
            <Typography variant="subtitle1" component="h2">${product.price}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }} >
              <Typography variant="subtitle2" >Cantidad</Typography>
              <ItemCounter />
              <SizeSelector
                sizes={product.sizes}
              // selectexSize={product.sizes[0]}
              />
            </Box>

            {/* Agregar al carrito */}
            <Button color="primary" className="circular-btn" >
              Agregar al carrito
            </Button>

            <Chip label="No hay disponibles" color="error" variant="outlined" />

            {/* Description */}
            <Box sx={{ mt: 3 }} >
              <Typography variant="subtitle2" >Descripción</Typography>
              <Typography variant="body2" >{product.description}</Typography>
            </Box>

          </Box>
        </Grid>

      </Grid>

    </ShopLayout>
  );
};


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const data = await getAllProductsSlugs();
  
  return {
    paths: data.map((item) => (
      { params: { slug: item.slug } }
    )),
    fallback: 'blocking' // ISG - incremental static generation, permitido
    // fallback: 'false' // ISG - incremental static generation, no permitido
  };
};


export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as { slug: string; };

  const product = await getProductBySlug(slug);

  if(!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  };
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//   const { slug = '' } = ctx.params as { slug: string; };

//   const product = await getProductBySlug(slug);

//   if(!product){
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     };
//   }

//   return {
//     props: {
//       product
//     }
//   };
// };

export default ProductPage;