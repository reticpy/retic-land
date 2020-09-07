---
title: Controladores
description: Crear controladores de la aplicación
position: 4
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
│   ...
│   app.py
│   requirements.txt

```

Gestionan las solicitudes HTTP entrantes y deciden que servicios deben realizar el trabajo para dar una respuesta correcta al cliente.

Crea un archivo `/controllers/users.py` el cual gestiona la logica de los servicios de usuario de nuestra aplicación.

```python

# controllers/users.py

# Retic
from retic import Request, Response, Next


def get_by_id(req: Request, res: Response, next: Next):
    """Obtener un usuario por su identificador"""

    response = {
        u"valid": True,
        u"msg": "Usuario encontrado.",
        u"data": {
            u"username": "Retic",
            u"id": req.param("id")
        }
    }

    res.ok(response)

```

Actualiza el archivo principal `routes/routes.py` de la aplicación y agrega los controladores de la aplicación:

```python

# routes/routes.py

# Retic
from retic import Router

# Controllers
import controllers.users as users

"""Definir la instancia Router"""
router = Router()

"""Definir las rutas de la apliación"""
router\
    .get("/", lambda req, res, next: res.ok({"msg": "Hello world! - HTTP GET"})) \
    .post("/", lambda req, res, next: res.ok({"msg": "Hello world! - HTTP POST"}))

"""Definir las rutas de la apliación - users"""
router.get("/users/:id", users.get_by_id)

```

Visita el siguiente enlace [http://localhost:1801/users/123](http://localhost:1801/users/123) para ver el resultado.

![alt text](/images/api_rest_app_3.png "API REST")

Para más detalles visita la [guía de controladores](/manual/es/fundamentals/controllers "/manual/[lang]/[section]/[slug]").
