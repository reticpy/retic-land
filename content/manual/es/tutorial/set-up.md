---
title: Configurar entorno de desarrollo
description: Instalar Retic y configurar el archivo requirements.txt
position: 1
---

_Puedes encontrar el código en el siguiente [repositorio](https://github.com/reticpy/retic-restapi-example)._

Para comenzar crea un [entorno virtual](/manual/es/getting-started/virtual-environments "/manual/[lang]/[section]/[slug]") para el proyecto.

```bash

# Crear la carpeta del proyecto
mkdir retic-restapi-example

# Ingresar a la carpeta
cd retic-restapi-example

# Crear entorno virtual
python -m venv venv

# Actualizar el paquete pip a la última versión
python -m pip install --upgrade pip

```

Crea un archivo `requirements.txt` para agregar los paquetes del proyecto.

```bash

# requirements.txt

retic==0.1.1

```

Instala las dependencias con el siguiente comando:

```bash

pip install -r requirements.txt

```
