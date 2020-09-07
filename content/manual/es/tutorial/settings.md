---
title: Archivo de configuración
description: Archivo de configuración
position: 6
---

_Estructura de carpetas utilizada:_

```bash

retic-restapi-example
│   ...
|
└───controllers
│   │   users.py
│   │   ...
│
└───routes
│   │   __init__.py
│   │   routes.py
|   │   ...
|
└───services
│   │
│   └───users
│       │   users.py
│       │   ...
│   ...
│   .env.development
│   .env.staging
│   .env.production
│   app.py
│   requirements.txt
│   settings.py

```

Muchas veces es necesario declarar valores constantes al inicio de cada archivo `.py` y estos pueden depender de otras variables dentro de la aplicación, por ejemplo, valores que se obtienen del archivo de variables de entorno (.env).

Por tal razón, Retic recomienda utilizar un archivo `settings.py` donde se importen todas estás variables y sean agregadas a la configuración de Retic para poder ser utilizadas dentro de toda la aplicación.

Crea un archivo `settings.py` y agrega la carga del archivo de variables de entorno.

```python

# settings.py

# Retic
from retic import App as app

"""Set environment file path"""
app.env.read_env('.env.development', override=True)

```

Por defecto la función `read_env()` realiza una busqueda del archivo `.env`, sin embargo, la ruta del archivo puede ser diferente. Se recomienda cargar las variables directamente desde el sistema en un entorno de producción.

Crea el archivo de variables de entorno `.env.development` de desarrollo.

```bash

# .env.development

#App
APP_HOSTNAME                    =localhost
APP_PORT                        =1801
APP_ENV                         =development

```

Crea el archivo de variables de entorno `.env.staging` de staging.

```bash

# .env.staging

#App
APP_HOSTNAME                    =localhost
APP_PORT                        =1801
APP_ENV                         =staging

```

Crea el archivo de variables de entorno `.env.production` de producción.

```bash

# .env.production

#App
APP_HOSTNAME                    =localhost
APP_PORT                        =1801
APP_ENV                         =production

```

Actualiza el archivo principal `app.py` y agrega el archivo de configuración:

```python

# app.py

"""Main app"""

# Retic
from retic import App as app

# Settings
import settings

# Routes
from routes import router

# Agregar las rutas a la aplicación
app.use(router)

if __name__ == "__main__":
    # Crear servidor web
    app.listen(
        # Obtener la variable de entorno APP_HOSTNAME en el formato por defecto (str)
        hostname=app.env("APP_HOSTNAME"),
        # Obtener la variable de entorno APP_PORT en formato númerico. De no existir, retorna 1801.
        port=app.env.int("APP_PORT", 1801),
    )


```

Para más información visita la sección de [configuración](/manual/es/fundamentals/settings "/manual/[lang]/[section]/[slug]").
