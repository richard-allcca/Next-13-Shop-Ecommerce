import React, { FC } from 'react';
import { ShopLayout } from '../../components/layouts';
import { Link as MuiLink, Grid, Typography, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Link from 'next/link';

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interface';

interface Props {
  orders: IOrder[]
}

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
        <Link href={`/orders/${params.row.orderId}`}>
          <MuiLink component="span">Ver orden</MuiLink>
        </Link>
      );
    },
  },
];

// STUB - hardcode
// const rows = [
//   { id: 1, paid: true, fullname: 'Richard Allcca1' },
//   { id: 2, paid: false, fullname: 'Amaia Allcca' },
// ];

const history: FC<Props> = ({ orders }) => {

  const rows = orders.map( (orden, index) => {
    const { shippingAddress } = orden;
    const { firstName, lastName } = shippingAddress;
    return {
      id: index + 1, paid: orden.isPaid, fullname: `${firstName} ${lastName}`, orderId: orden._id
    };
  });

  return (
    <ShopLayout title="Historial de ordenes" pageDescription="Historial de ordenes del cliente">
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

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
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;

  const session: any = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/history`,
        permanent: false
      }
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders
    }
  };
};

export default history;
