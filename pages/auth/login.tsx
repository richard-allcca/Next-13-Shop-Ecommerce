import React, { useContext, useState } from 'react';

import { AuthContext } from '../../context';

import { AuthLayout } from '../../components/layouts';

import { Link as MuiLink, Box, Grid, Typography, TextField, Button, Chip } from '@mui/material';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { isEmail } from '../../utils';
import { tesloApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';

type IFormData = {
  email: string;
  password: string;
};

const Login = () => {

  const router = useRouter();

  const { loginUser } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm<IFormData>();

  const [showError, setShowError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  
  const destination = router.query.p?.toString() || '/';

  const onLoginUser = async ({ email, password }: IFormData) => {

    setShowError(false);
    setDisabled(true);

    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      setDisabled(false);
      return;
    }

    router.replace(destination);

    // NOTE - Método sin contexto
    // try {
    //   const { data } = await tesloApi.post('/user/login', { email, password });
    //   const { token, user } = data;
    //   setDisabled(false);

    // } catch (error) {
    //   setShowError(true);
    //   console.log('Error en las credenciales');
    //   setTimeout(() => setShowError(false), 3000);
    //   setDisabled(false);
    // }
  };

  return (
    <AuthLayout title="Ingresar" >

      <form onSubmit={handleSubmit(onLoginUser)} noValidate>

        <Box sx={{ width: 350, padding: '10px 20px' }} >

          <Grid container spacing={2} >
            <Grid item xs={12} >
              <Typography variant="h1" component="h1" >Iniciar Seción</Typography>
              {
                showError &&
                <Chip
                  label="No reconocemos ese usuario / contraseña"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                />
              }
            </Grid>

            <Grid item xs={12} >
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  // validate: (val) => isEmail(val)
                  validate: isEmail // método abreviado
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                type="password"
                label="Contraseña"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12} >
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                disabled={disabled}
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end" >
              <Link href={`/auth/register?p=${destination}`}>
                <MuiLink component="span" >
                  ¿No tienes cuenta?
                </MuiLink>
              </Link>
            </Grid>
          </Grid>

        </Box>

      </form>

    </AuthLayout>
  );
};

export default Login;