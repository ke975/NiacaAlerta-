-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreCompleto" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Edad" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "incident" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NombreCiudad" TEXT NOT NULL,
    "NombreIncidencia" TEXT NOT NULL,
    "IconoIncident" TEXT NOT NULL,
    "fotoLugar" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "incident_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_usuario_key" ON "User"("usuario");
