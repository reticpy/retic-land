---
title: Paquetes necesarios
description: Instalar paquetes necesarios
position: 1
---

## Instalar Python

Retic es compatible con la versión 2.7 de [Python](https://www.python.org/downloads/) y superiores, sin embargo, se recomienda utilizar la última versión de Python 3.

## Instalar Pip

Pip es un instalador de paquetes para Python. A continuación se muestra cómo instalarlo en los sistemas operativos más populares.

Instalación en MacOS:

```bash

# Instalación del paquete
sudo easy_install pip

# Ver la versión instalada
pip --version

```

Instalación en Linux:

```bash

# Instalación del paquete
sudo apt-get install python-pip
sudo apt-get install python3-pip

# Ver la versión instalada
pip --version

```

Instalación en Windows:

- Descarga la ultima versión desde [get-pip.py](https://bootstrap.pypa.io/get-pip.py)
- Dentro de la carpeta donde se encuentre el archivo **get-pip.py** ejecuta:

```bash

# Instalación del paquete
python get-pip.py

# Ver la versión instalada
pip --version

```