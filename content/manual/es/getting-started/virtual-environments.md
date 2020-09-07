---
title: Entorno virtual
description: Crear entorno virtual en Python
position: 2
---

Un [virtualenv](https://docs.python.org/3/library/venv.html#module-venv) permite aislar recursos como **librerías y entornos de ejecución** del sistema principal. Es decir, poder utilizar **diferentes versiones** de un mismo paquete para cada proyecto.


## Instalar virtualenv

Virtualenv es una herramienta que permite crear entornos de Python aislados entre sí.

```bash

# Opción con pip
pip install virtualenv

# Opción con pip3
sudo pip3 install virtualenv

```

## Crear un entorno virtual

Crea un directorio para el proyecto y un directorio para el entorno virtual.

```bash

# Crear la carpeta del proyecto
mkdir retic-restapi-example

# Ingresar a la carpeta
cd retic-restapi-example

# Crear entorno virtual
# Opción 1
python -m venv venv

# Opción 2
python3 -m venv venv

```

## Activar un entorno virtual

Cada vez que trabajes en tu proyecto, activa tu entorno virtual primero.

En Linux/MacOS:

```bash

# Ejecutar el script de activación
. venv/bin/activate

# Ver versión de pip instalada en el entorno virtual
pip --version

```

En Windows:

```bash

# Ejecutar el script de activación
venv\Scripts\activate

# Ver versión de pip instalada en el entorno virtual
pip --version

```

### Actualizar paquete Pip

Por defecto se instala una versión antigua de Pip, por lo que se recomienta actualices a la última versión estable con el siguiente comando:

```bash

# Actualizar el paquete pip a la última versión

# Opción 1
python -m pip install --upgrade pip

# Opción 2
python3 -m pip install --upgrade pip

```
