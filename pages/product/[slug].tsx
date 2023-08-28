import { useContext, useState } from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getAllProductsSlugs, getProductBySlug } from '../../database';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { ShopLayout } from '../../components/layouts';
import { ICartProduct, IProduct, ISize } from '../../interface';
import { useRouter } from 'next/router';
import { CartContext } from '../../context';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._index,
    images: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    inStock: product.inStock,
    quantity: 1,
  });

  const router = useRouter();
  const { addNewProduct } = useContext(CartContext);

  const selectedSize = (size: ISize) => {
    setTempCartProduct({ ...tempCartProduct, size });
  };

  const setQuantityProduct = (quantity: number) => {
    setTempCartProduct({ ...tempCartProduct, quantity });
  };

  const addCartProduct = () => {
    if(tempCartProduct.size !== undefined){
      addNewProduct(tempCartProduct);
      router.push('/cart');
    }
  };

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

            <Box sx={{ my: 2 }} >
              <Typography variant="subtitle2" >Cantidad</Typography>

              {/* Quantity */}
              <ItemCounter
                quantity={tempCartProduct.quantity}
                setQuantity={setQuantityProduct}
                stock={tempCartProduct.inStock}
              />
              {/* Sizes */}
              <SizeSelector
                sizes={product.sizes}
                onSelectedSize={selectedSize}
                isSelect={tempCartProduct.size}
              />
            </Box>

            {/* Agregar al carrito */}
            {
              product.inStock > 0
                ? (
                  <Button
                    color="secondary"
                    className="circular-btn"
                    onClick={addCartProduct}
                  >
                    {
                      tempCartProduct.size
                        ? 'Agregar al carrito'
                        : 'Seleccione una talla'
                    }
                  </Button>
                )
                : (
                  <Chip
                    label="No hay disponibles"
                    color="error" variant="outlined"
                    sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                  />
                )
            }

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

  if (!product) {
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