import React from 'react';
import { AdminLayout } from '../../components/layouts';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link as MuiLink } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { IProduct } from '../../interface';
import Link from 'next/link';

const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Foto',
    renderCell: ({ row }: GridRenderCellParams) => {
      const getUrl = row.img.startsWith('http') ? row.img : `${process.env.NEXT_PUBLIC_HOST_NAME}/products/${row.img}`;
      // console.log(row.img.startsWith('http'));

      return (
        <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer" >
          <CardMedia
            component={'img'}
            className="fadein"
            image={getUrl}
          />
        </a>
      );
    }
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <Link href={`/admin/products/${row.slug}`} >
          <MuiLink component={'span'}>
            {row.title}
          </MuiLink>
        </Link>
      );
    }
  },
  { field: 'gender', headerName: 'Género' },
  { field: 'type', headerName: 'Tipo' },
  { field: 'inStock', headerName: 'Inventario' },
  { field: 'price', headerName: 'Precio' },
  { field: 'sizes', headerName: 'Tallas', width: 250 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  // if(!data && !error) return (<></>); // REVIEW -  puede fallar
  if (!data && !error) return (<></>);

  const rows = data!.map(product => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(', '),
    slug: product.slug,
  }));



  const customRowStyle = () => {
    return 'custom-row';
  };

  return (
    <AdminLayout
      title={`Productos (${data?.length})`}
      subTitle="Mantenimiento de productos"
      icon={<CategoryOutlined />}
    >

      <Box display="flex" justifyContent={'end'} sx={{ mb: 2 }} >
        <Button
          startIcon={ <AddOutlined /> }
          color="secondary"
          href="/admin/products/new"
        >
          Crear producto
        </Button>

      </Box>

      <Grid container className="fadeIn" >
        <Grid item xs={12} sx={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20, 30]}
            getRowClassName={() => customRowStyle()}
          />
        </Grid>
      </Grid>

    </AdminLayout>
  );
};

export default ProductsPage;