import React from 'react';
import { ShopLayout } from '../../components/layouts';
import { Link as MuiLink, Grid, Typography, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Link from 'next/link';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden o no',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No Pagada" variant="outlined" />
      );
    },
  },
  {
    field: 'orden',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Link href={`/orders/${params.row.id}`}>
          <MuiLink component="span">Ver orden</MuiLink>
        </Link>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: 'Richard Allcca1' },
  { id: 2, paid: false, fullname: 'Amaia Allcca' },
  { id: 3, paid: true, fullname: 'Abdiel Allcca' },
  { id: 4, paid: false, fullname: 'Avrill Allcca' },
  { id: 5, paid: false, fullname: 'Cristina villa' },
  { id: 6, paid: true, fullname: 'Nayara villa' },
];

const history = () => {
  return (
    <ShopLayout title="Historial de ordenes" pageDescription="Historial de ordenes del cliente">
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container>
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
    </ShopLayout>
  );
};

export default history;
