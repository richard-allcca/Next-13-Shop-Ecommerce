import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';

import { ShopLayout } from '../../components/layouts';
import {
  Link as MuiLink, Box, FormControl, Grid, MenuItem, Select, TextField, Typography, Button
} from '@mui/material';

import Link from 'next/link';

import { StyleBtn, countries } from '../../utils';

type IFormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const defaultValues = {
  firstName: '',
  lastName: '',
  address: '',
  address2: '',
  zip: '',
  city: '',
  country: countries[0].code,
  phone: '',
};

const Address = () => {
  const [
    showError, setShowError] = useState(false);
  // const [errorMessage, seterrorMessage] = useState('');

  // const { register, handleSubmit, formState: { errors } } = useForm<IFormData>();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormData>({ defaultValues });

  const onAddress = (data: IFormData) => {
    // const { firstName, lastName, address, address2, zip, city, country, phone } = props;
    console.log(data);
  };

  return (
    <ShopLayout title="Dirección" pageDescription="Confirmar dirección de destino">

      <form onSubmit={handleSubmit(onAddress)}>

        <Typography variant="h1" component="h1">
          Dirección
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              {...register('firstName', {
                required: 'ESte campo es requerido',
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              {...register('lastName', {
                required: 'ESte campo es requerido',
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección"
              variant="filled"
              fullWidth
              {...register('address', {
                required: 'ESte campo es requerido',
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección 2 (opcional)"
              variant="filled"
              fullWidth
              {...register('address2')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Código Postal"
              variant="filled"
              fullWidth
              {...register('zip', {
                required: 'ESte campo es requerido',
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              {...register('city', {
                required: 'ESte campo es requerido',
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Select
                variant="filled"
                label="País"
                value={'PER'}
                {...register('country', {
                  required: 'ESte campo es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                })}
                error={!!errors.country}
              >
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono"
              variant="filled"
              fullWidth
              {...register('phone', {
                required: 'ESte campo es requerido',
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, gap: '12px' }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Guardar
          </Button>
          <Button
            color="secondary"
            className="circular-btn"
            size="large"
            // fullWidth
            href="/checkout/address"
            LinkComponent={Link}
          >
            Checkout
          </Button>
        </Box>

      </form>

    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { token = '' } = ctx.req.cookies;
//   let tokenValid = false;

//   try {
//     await isValidToken(token);
//     tokenValid = true;
//   } catch (error) {
//     tokenValid = false;
//   }

//   if (tokenValid) {
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false,
//       }
//     };
//   }

//   return {
//     props: {

//     }
//   };
// };

export default Address;
