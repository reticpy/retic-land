---
title: Instalación
description: Instalar Retic Windows, Linux, MacOS.
position: 3
---

Retic recomienda utilizar un [entorno virutal](/manual/es/getting-started/virtual-environments "/manual/[lang]/[section]/[slug]") para trabajar.

```bash

# Instalar la última versión estable de Retic
pip install -U retic

```

Las notas de lanzamiento detalladas para cada versión están disponibles en [GitHub](https://github.com/reticpy/retic/releases).

## Archivo requirements.txt

Retic recomienda utilizar un archivo ``requirements.txt``. Facilita el control de la versión de cada paquete e instalar únicamente los que sean necesarios.

Es similar al archivo ``package.json`` de **Node.js** en su sección de ``dependences``.


```bash

# requirements.txt

retic==0.1.1
requests==2.24.0
SQLAlchemy==1.3.18
mysql-connector-python==8.0.19
PyMySQL==0.9.
SQLAlchemy-serializer==1.3.4.2

```

Para instalar las dependencias de la aplicación en **node** se utiliza ``npm install`` o ``yarn install``, el equivalente en **python** es el siguiente comando:

```bash

pip install -r requirements.txt

```