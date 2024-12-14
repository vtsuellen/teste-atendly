import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../database/models/user';
import { statusCode } from '../utils/statusCode';
import variables from '../../config/variables';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ message: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(statusCode.CREATED)
      .json({ message: 'Usuário cadastrado com sucesso', userId: newUser.id });
  } catch (error) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'Erro no servidor', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ message: 'Email ou senha inválidos' });
    }

    const isMatch = user.checkPassword(password);
    if (!isMatch) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ message: 'Email ou senha inválidos' });
    }

    const token = jwt.sign(
      { userId: user.id },
      variables.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'Erro no servidor', error });
  }
};

export const profile = (req: Request, res: Response) => {
  if (!req.user || typeof req.user === 'string' || !('userId' in req.user)) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json({ message: 'Usuário não encontrado' });
  }

  const userId = req.user.userId;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(statusCode.NOT_FOUND)
          .json({ message: 'Usuário não encontrado' });
      }
      res.json({ name: user.name, email: user.email });
    })
    .catch((error) => {
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro no servidor', error });
    });
};
