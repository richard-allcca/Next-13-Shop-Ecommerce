import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import { isValidToken, signToken } from '../../../utils';

type Data =
  | {
    ok: boolean;
    message: string;
  }
  | {
    token: string;
    user: {
      email: string;
      role: string;
      name: string;
    };
  };


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return checkJWT(req, res);

    default:
      res.status(400).json({
        ok: false,
        message: 'Bad request'
      });
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { token = '' } = req.cookies;

  let userId = '';

  try {
    userId = await isValidToken(token);
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: 'Token de autorización no es válido',
    });
  }

  db.connect();
  const user = await User.findById(userId);
  db.disconnect();

  if (!user) {
    return res.status(400).json({
      ok: false,
      message: 'El usuario con ese id no exite'
    });
  }

  const { role, name, _id, email } = user;

  return res.status(200).json({
    token: signToken(_id, email),
    user: {
      email, role, name
    }
  });

};
