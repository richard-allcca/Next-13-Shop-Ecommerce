import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

import { AdminLayout } from '../../../components/layouts';
import { getProductBySlug } from '../../../database';

import { IProduct } from '../../../interface';
import { tesloApi } from '../../../api';
import { Product } from '../../../models';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
  gender: string;
}

interface Props {
  product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const route = useRouter();

  const [newTagValue, setNewTagValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const refInputFile = useRef<HTMLInputElement>(null);

  const {
    control, register, handleSubmit, formState: { errors }, getValues, setValue, watch
  } = useForm<FormData>({ defaultValues: product });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // console.log(value, name, type);
      if (name === 'title') {
        const newSlug = value.title?.trim()
          .replaceAll(' ', '_')
          .replaceAll('\'', '')
          .replaceAll('’', '')
          .toLocaleLowerCase() || '';
        setValue('slug', newSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);


  const onSubmit = async (form: FormData) => {
    setIsSaving(true);

    if (form.images.length > 2) return alert('Minimo 2 imagenes');

    try {

      const { data } = await tesloApi({
        url: '/admin/products',
        method: form._id ? 'PUT' : 'POST',
        data: form
      });

      console.log(data);
      if (!form._id) {
        // redireccion al pagina de producto con el nuevo slug
        route.replace(`/admin/products/${form.slug}`);
        setIsSaving(false);
      } else {
        setIsSaving(false);
      }


    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }

  };

  const onAddNewTag = () => {
    const newTag = newTagValue.trim().toLocaleLowerCase();
    setNewTagValue('');
    const currentTags = getValues('tags');

    if (currentTags.includes(newTag)) return;

    currentTags.push(newTag);
  };

  const onDeleteTag = (tag: string) => {
    const updateTag = getValues('tags').filter(el => el !== tag);
    setValue('tags', updateTag, { shouldValidate: true });
  };

  const onChangeSize = (size: string) => {
    const currenteSizes = getValues('sizes');
    if (currenteSizes.includes(size)) {
      return setValue('sizes', currenteSizes.filter(s => s !== size), { shouldValidate: true });
    }
    // Las tallas puedes ser ordaenadas aquí o en este caso en el back
    setValue('sizes', [...currenteSizes, size], { shouldValidate: true });
  };

  const onFilesSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if(!target.files || target.files.length === 0){
      return;
    }

    try {

      for (const file of target.files) { // downlevelIteration - no se puede iterar un target
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await tesloApi.post<{ message: string }>('/admin/upload');
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout title={'Producto'} subTitle={`Editando: ${product.title}`} icon={<DriveFileRenameOutline />}>
      <form onSubmit={handleSubmit(onSubmit)} >
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type="submit"
            disabled={isSaving}
          >
            Guardar
          </Button>
        </Box>
        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>

            <TextField
              label="Título"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('title', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <Controller
              name="description"
              rules={{
                required: 'Este campo es requerido',
                minLength: {
                  value: 8,
                  message: 'Debe tener un minimo de 8 caracteres'
                }
              }}
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descripción"
                  variant="filled"
                  fullWidth
                  multiline
                  sx={{ mb: 1 }}
                  {...register('description', {
                    required: 'Este campo es requerido',
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />


            <TextField
              label="Inventario"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('inStock', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Mínimo valor de cero' },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Precio"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('price', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Mínimo valor de cero' },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                row
                value={getValues('type')}
                // onChange={ (event) => setValue('type') }
                onChange={({ target }) => setValue('type', target.value, { shouldValidate: true })}
              >
                {validTypes.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Género</FormLabel>
              <RadioGroup
                row
                value={getValues('gender')}
                onChange={({ target }) => setValue('gender', target.value, { shouldValidate: true })}
              >
                {validGender.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Tallas</FormLabel>
              {validSizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={<Checkbox checked={getValues('sizes').includes(size)} />}
                  label={size}
                  onChange={() => onChangeSize(size)}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Slug - URL y Tags */}

          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug', {
                required: 'Este campo es requerido',
                validate: (val) => (val.trim().includes(' ') ? 'No puede tener espacios en balnco' : undefined),
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Etiquetas"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Presiona [spacebar] para agregar"
              value={newTagValue}
              onChange={({ target }) => setNewTagValue(target.value)}
              onKeyUp={({ code }) => code === 'Space' ? onAddNewTag() : undefined}
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {getValues('tags').map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Imagenes */}

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
              <Button
                color="secondary"
                fullWidth startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
                onClick={() => refInputFile.current?.click()}
              >
                Cargar imagen
              </Button>
              <input
                ref={refInputFile}
                type="file"
                multiple
                accept="image/png, image/git, image/speg"
                style={{ display: 'none' }}
                onChange={onFilesSelected}
              />

              <Chip label="Es necesario al 2 imagenes" color="error" variant="outlined" />

              <Grid container spacing={2}>
                {product.images.map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia component="img" className="fadeIn" image={`/products/${img}`} alt={img} />
                      <CardActions>
                        <Button fullWidth color="error">
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>

      </form>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  let product: IProduct | null;

  if (slug === 'new') {
    // Crear nuevo producto
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    tempProduct.images = ['img1.jpg', 'img2.jpg2'];
    product = tempProduct;
  } else {
    product = await getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;

