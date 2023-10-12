/* eslint-disable max-len */

import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );

type Data = {
  message: string
};

export const config = { // Explicación al final
  api: {
    bodyParser: false
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return uploadFile(req, res);

    default:
      res.status(400).json({ message: 'Bad request' });
  }
}

const saveFile = async (file: formidable.File): Promise<string> => {
  //  STUB - save into public
  // const data = fs.readFileSync( file.filepath);
  // fs.writeFileSync(`./public/${file.originalFilename}`, data);
  // fs.unlinkSync(file.filepath); // delete temporary file
  // return;

  const data = await cloudinary.uploader.upload(file.filepath);

  return data.secure_url;
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {

  return new Promise((resolve, reject) => {

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      console.log({ err, fields, files });

      if(err) return reject(err);

      const file = Array.isArray(files.file) ? files.file[0] : files.file;

      const imgPathCloudinary = await saveFile( file as formidable.File );

      resolve(imgPathCloudinary);
    });
  });
};

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const imgeUrl = await parseFiles(req);

  return res.status(200).json({ message: imgeUrl });
};

/* NOTE - config
se utiliza para configurar ciertos comportamientos de las API routes. En este caso, estás deshabilitando el análisis del cuerpo (body parsing) de la petición HTTP.

Explicando en detalle:

bodyParser: Es una configuración que determina si el cuerpo de la petición HTTP debe ser analizado o no. Cuando está habilitado, Next.js analiza automáticamente el cuerpo de la petición y lo hace disponible en req.body para que puedas acceder a los datos enviados por el cliente (por ejemplo, en una solicitud POST o PUT).

Al establecerlo como false, estás indicando que no quieres que Next.js analice el cuerpo de la petición automáticamente. Esto puede ser útil si estás manejando la solicitud de una manera diferente o si no necesitas acceder al cuerpo de la petición en tu API route.

Por ejemplo, si estás manejando datos de formularios usando formidable u otra biblioteca de manejo de formularios, puedes desactivar el análisis del cuerpo para evitar que Next.js intente analizarlo dos veces.

api: Indica que estas configuraciones específicas se aplican a las API routes en Next.js. Puedes tener diferentes configuraciones para las API routes y las páginas regulares de Next.js.

En resumen, al establecer bodyParser: false, estás desactivando el análisis automático del cuerpo de la petición en esta API route específica. Esto te da más control sobre cómo manejas los datos en tu API route, permitiéndote utilizar bibliotecas como formidable para procesar los datos de la petición a tu manera.
*/