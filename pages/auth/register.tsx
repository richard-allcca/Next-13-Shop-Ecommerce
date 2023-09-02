import React, { useContext, useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Link as MuiLink, Box, Grid, Typography, TextField, Button, Chip } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts';
import { isEmail } from '../../utils';

type IFormData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [showError, setShowError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { registerUser } = useContext(AuthContext);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormData>();

  const destination = router.query.p?.toString() || '/';

  const onRegisterUser = async (props: IFormData) => {
    const { name, email, password } = props;

    setShowError(false);
    setDisabled(true);

    const { hasError, message } = await registerUser(name,email,password);

    if( hasError ){
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      setDisabled(false);
      return;
    }

    router.replace(destination);

    // try { // NOTE -  METODO SIN CONTEXT
    //   const { data } = await tesloApi.post('/user/register', { name, email, password });
    //   console.log(data); // TODO - extraer la data de respuesta
    //   setDisabled(false);
    // } catch (error) {
    //   setShowError(true);
    //   console.log('Error al registrar Usuario');
    //   setTimeout(() => setShowError(false), 3000);
    //   setDisabled(false);
    // }
  };

  return (
    <AuthLayout title="Ingresar" >
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>

        <Box sx={{ width: 350, padding: '10px 20px' }} >

          <Grid container spacing={2} >
            <Grid item xs={12} >
              <Typography variant="h1" component="h1" >Crear Cuenta</Typography>
              {
                showError &&
                <Chip
                  label="Error al registrar usuario "
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                />
              }
            </Grid>

            <Grid item xs={12} >
              <TextField
                label="Nombre"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'ESte campo es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'ESte campo es requerido',
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
                Crear
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end" >
              <Link href={`/auth/login?p=${destination}`} >
                <MuiLink component="span" >
                  ¿Ya tienes cuenta?
                </MuiLink>
              </Link>
            </Grid>
          </Grid>

        </Box>

      </form>
    </AuthLayout>
  );
};

export default Register;