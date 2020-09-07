---
title: Servicios
description: Crear servicios de la aplicación
position: 5
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
│   app.py
│   requirements.txt

```

Crea un archivo `/services/users/users.py` el cual contiene la logica de los controladores de usuario de nuestra aplicación.

```python

# services/users/users.py

"""Servicios para el controlador de usuarios"""


def get_by_id_db(user_id):
    """Encontrar un usuario en base a un identificador

    :param user_id: Identificador del usuario
    """

    """Realizar la busqueda"""
    user = {
        u"username": "Retic",
        u"id": user_id
    }

    """Retornar información"""
    return user

```

Actualiza el controlador `controllers/users.py` y agrega el servicio creado:

```python

# controllers/users.py

# Retic
from retic import Request, Response, Next

# Services
from services.users import users


def get_by_id(req: Request, res: Response, next: Next):
    """Obtener un usuario por su identificador"""

    """Obtener usuario en base a su id"""
    user = users.get_by_id_db(req.param("id"))

    """Transformar información de respuesta"""
    response = {
        u"valid": True,
        u"msg": "Usuario encontrado.",
        u"data": user
    }

    """Retornar una respuesta al cliente"""
    res.ok(response)

```

Visita el siguiente enlace [http://localhost:1801/users/1234](http://localhost:1801/users/1234) para ver el resultado.

![alt text](/images/api_rest_app_4.png "API REST")

Para más detalles visita la [guía de servicios](/manual/es/fundamentals/services "/manual/[lang]/[section]/[slug]").
