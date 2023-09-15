import React from 'react';
import { AdminLayout } from '../../components/layouts';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { IOrder, IUser } from '../../interface';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Orden ID', width: 250 },
  { field: 'email', headerName: 'Correo', width: 250 },
  { field: 'name', headerName: 'Nombre Completo', width: 300 },
  { field: 'total', headerName: 'Monto total', width: 200 },
  {
    field: 'isPaid',
    headerName: 'Pagada',
    width: 150,
    renderCell: ({ row }: GridRenderCellParams) => {

      return row.isPaid
        ? <Chip variant="outlined" label="Pagada" color="success" />
        : <Chip variant="outlined" label="Pendiente" color="error" />;
    }
  },
  { field: 'numProducts', headerName: 'N° Productos', align: 'center' },
  {
    field: 'check',
    headerName: 'Ver Orden',
    // width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank" >
          Ver Orden
        </a>
      );
    }
  },
  { field: 'createdAt', headerName: 'Creada en', width: 300 }
];

const Orders = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

  if(!data) return <></>;

  const rows = data!.map(order => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    numProducts: order.numberOfItems,
    // check: order, // IMPORTANT -  - ¿PORQUE NO ES NECESARIO?
    createdAt: new Date(order.createdAt!).toLocaleDateString(),
  }));

  return (
    <AdminLayout
      title="Ordenes"
      subTitle="Mantenimiento de ordenes"
      icon={<ConfirmationNumberOutlined />}
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

export default Orders;