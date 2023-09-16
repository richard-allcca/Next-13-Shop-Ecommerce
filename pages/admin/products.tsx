import React from 'react';
import { AdminLayout } from '../../components/layouts';
import { CategoryOutlined } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { IProduct } from '../../interface';

const columns: GridColDef[] = [
  { field: 'img', headerName: 'Foto' },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'gender', headerName: 'Género' },
  { field: 'type', headerName: 'Tipo' },
  { field: 'inStock', headerName: 'Inventario' },
  { field: 'price', headerName: 'Precio' },
  { field: 'sizes', headerName: 'Tallas', width: 250 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  // if(!data && !error) return (<></>); // REVIEW -  puede fallar
  if(!data && !error) return (<></>);

  const rows = data!.map( product => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes,
  }));

  return (
    <AdminLayout
      title={`Productos (${data?.length})`}
      subTitle="Mantenimiento de productos"
      icon={<CategoryOutlined />}
    >


      <Grid container className="fadeIn" >
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Grid>
      </Grid>

    </AdminLayout>
  );
};

export default ProductsPage;