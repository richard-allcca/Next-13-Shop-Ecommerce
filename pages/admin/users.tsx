import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layouts';
import { PeopleOutline } from '@mui/icons-material';

import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, MenuItem, Select } from '@mui/material';
import useSWR from 'swr';
import { IUser } from '../../interface';
import { tesloApi } from '../../api';

const Users = () => {

  const { data, error, isLoading } = useSWR<IUser[]>('/api/admin/users');
  const [users, setUsers] = useState<IUser[]>([]);


  useEffect(() => {
    if (data) setUsers(data);
  }, [data]);

  if (isLoading) return <></>;

  const onRoleUpdated = async (userId: string, newRole: string) => {

    // NOTE - Romper la referencia para setear 'users' en el error al valor anterior
    const previosUsers = users.map(user => ({ ...user }));

    const updatedUsers = users.map(user => ({
      ...user,
      role: userId === user._id ? newRole : user.role
    }));

    // NOTE - Seteo antes del 'try' para vista del cambio en UI inmediato
    setUsers(updatedUsers);

    try {

      await tesloApi.put('/admin/users', { userId, role: newRole });
      // setUsers(updatedUsers);

    } catch (error) {
      setUsers(previosUsers);
      console.log(error);
      alert('No se pudo actualizar el role del usuario');
    }

  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre completo', width: 300 },
    // { field: 'role', headerName: 'Rol', width: 300 },
    {
      field: 'role',
      headerName: 'Rol',
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            // NOTE - destructuramos el target del 'event' para el valor del select
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            sx={{ width: '300px' }}
          >
            <MenuItem value="admin"> Admin </MenuItem>
            <MenuItem value="client"> Client </MenuItem>
            <MenuItem value="super-user"> Super User </MenuItem>
            <MenuItem value="SEO"> SEO </MenuItem>
          </Select>
        );
      }
    },
  ];

  const rows = users.map(user => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title="Usuarios"
      subTitle="Mantenimiento de usuarios"
      icon={<PeopleOutline />}
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

export default Users;