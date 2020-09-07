---
title: Aplicaciones externas
description: Aplicaciones externas
position: 7
---

_Estructura de carpetas utilizada:_

```bash

retic-restapi-example
│
└───apps
│   │   urls.py
│   │   ...
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

Retic recomienda realizar un archivo de rutas de aplicaciones externas, de esta forma se asegura la mantenibilidad y escalabilidad de la aplicación. De la misma forma, guardar la información en Retic para ser capaz de utilizarla en toda la aplicación.

Actualiza el archivo de variables de entorno.

```bash

# .env.development

#App
APP_HOSTNAME                     =localhost
APP_PORT                         =1801
APP_ENV                          =development

#Apps
APP_BACKEND_EXAMPLE      =https://jsonplaceholder.typicode.com

```

Crea un archivo `apps/urls.py` y agrega la configuración de las rutas de tus aplicaciones externas.

```python

# apps/urls.py

# Retic
from retic import App as app

"""Define otras aplicaciones"""
BACKEND_EXAMPLE = {
    u"base_url": app.config.get('APP_BACKEND_EXAMPLE'),
    u"users": "/users",
}

"""Crea el objeto referencia de las apps"""
APP_BACKEND = {
    u"example": BACKEND_EXAMPLE,
}

"""Agrega las aplicaciones a Retic"""
app.use(APP_BACKEND, "backend")

```

Instala el paquete `requests` para realizar llamadas HTTP.

```bash

# requiremets.txt

retic==0.1.1
requests==2.24.0

````

Instala las dependencias con el siguiente comando:

```bash

pip install -r requirements.txt

```

Actualiza el servicio `services/users/users.py` realizando el consumo de la apicación externa:

```python

# services/users/users.py

"""Servicios para el controlador de usuarios"""

# Retic
from retic import App as app

# Requests
import requests

# Constants
URL_USERS = app.apps['backend']['example']['base_url'] + \
    app.apps['backend']['example']['users']


def get_by_id_db(user_id):
    """Encontrar un usuario en base a un identificador

    :param user_id: Identificador del usuario
    """

    """Declarar variables"""
    user = None

    """Obtener todos los usuarios"""
    users_req = requests.get(URL_USERS)

    """Transformar en json"""
    users = users_req.json()

    """Realizar la busqueda"""
    for _user in users:
        if _user["id"] == user_id:
            user = _user

    """Retornar información"""
    return user

```

Actualiza el controlador `controllers/users.py` aplicando la validación de que el usuario sí existe:

```python

# controllers/users.py

# Retic
from retic import Request, Response, Next

# Services
from services.users import users


def get_by_id(req: Request, res: Response, next: Next):
    """Obtener un usuario por su identificador"""

    user = users.get_by_id_db(req.param("id", callback=int))

    """Transformar información de respuesta"""
    if user:
        """Retornar una respuesta al cliente"""
        res.ok({
            u"valid": True,
            u"msg": "Usuario encontrado.",
            u"data": user
        })
    else:
        """Retornar un mensaje de error al cliente"""
        res.not_found({
            u"valid": False,
            u"msg": "Usuario no encontrado."
        })

```

Visita el siguiente enlace [http://localhost:1801/users/1](http://localhost:1801/users/1) para ver el resultado.

![alt text](/images/api_rest_app_5.png "API REST")
