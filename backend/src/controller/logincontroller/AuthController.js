// controllers/authController.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();


const JWT_SECRET = process.env.JWT_SECRET;

async function loginUser(req, res) {
  try {
    const { usuario, password } = req.body;

    // Validar que se proporcionen el nombre de usuario y la contraseña
    if (!usuario || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { usuario }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generar un JWT
    const token = jwt.sign({ userId: user.id, usuario: user.usuario }, JWT_SECRET, {
      expiresIn: '1h', // El token expira en una hora
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { loginUser };
