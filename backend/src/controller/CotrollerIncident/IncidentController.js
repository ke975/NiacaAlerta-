const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createIncident(req, res) {
  try {
    const { NombreCiudad, NombreIncidencia, IconoIncident, fotoLugar,userId} = req.body;

    // Validar que todos los campos requeridos están presentes
    if (!NombreCiudad || !NombreIncidencia || !IconoIncident || !fotoLugar) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Suponiendo que el ID del usuario está en el token JWT o se obtiene de alguna otra manera
    

    // Crear el incidente en la base de datos
    const incident = await prisma.incident.create({
      data: {
        NombreCiudad,
        NombreIncidencia,
        IconoIncident,
        fotoLugar,
        createdAt: new Date(), // Fecha de creación actual
        updatedAt: new Date(), // Fecha de actualización actual
        userId // ID del usuario asociado
      }
    });

    // Responder con el incidente creado
    res.status(201).json(incident);
  } catch (error) {
    console.error(error); // Registro de errores para depuración
    res.status(500).json({ message: 'Internal server error', error });
  }
}

async function InicidentUser(req,res){
    try{
        const {username} = req.body;
        const incidents = await prisma.incident.findMany({
            include:{
              user: {
                where: {
                  username
                }
              }
            }
        });
        res.status(200).json(incidents);
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Internal server error', error});
    }
}

module.exports = {
    createIncident,
    InicidentUser
}