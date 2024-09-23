const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');



async function createuser(req, res) {
    try {
      const { nombreCompleto, usuario, password, Edad } = req.body;
  
      // Validar que todos los campos están presentes
      if (!nombreCompleto || !usuario || !password || !Edad) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Verificar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({
        where: { usuario }
      });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear el usuario
      const user = await prisma.user.create({
        data: {
          nombreCompleto,
          usuario,
          password: hashedPassword, // Guardar la contraseña hasheada
          Edad
        }
      });
  
      // Responder con el usuario creado
      res.status(201).json(user);
    } catch (error) {
      console.error(error); // Log de errores para el desarrollador
      res.status(500).json({ message: 'Internal server error' });
    }
  }


async function getUser(req,res){
try {
    const user = await prisma.user.findMany();
    res.status(200).json({ user });
} catch (error) {
    res.status(500).json({ message: "Error fetching user" });
}


    
}






module.exports = {
    getUser,
    createuser,
    
}