---
title: Controladores
description: Controladores
position: 3
---

Los controladores están vinculados a las rutas de su aplicación. Gestionan las solicitudes HTTP entrantes y deciden que servicios deben realizar el trabajo para dar una respuesta correcta al cliente.

Por ejemplo, la ruta GET `/users/:id` en su aplicación podría estar vinculada a un controlador como:

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

Por defecto el controlador retorna una respuesta con código de estado 200.

```python

# controllers/users.py

# Retic
from retic import Request, Response, Next

# Services
from services.users import users


def get_by_id(req: Request, res: Response, next: Next):
    """Obtener un usuario por su identificador"""

    print("Controlador sin respuesta especifica.")

```

Cada controlador recibe los siguientes parametros:

- [Request](/manual/es/api/request "/manual/[lang]/[section]/[slug]"): Representa una solicitud HTTP hacia el servidor.
- [Response](/manual/es/api/response "/manual/[lang]/[section]/[slug]"): Representa una respuesta al cliente desde el servidor.
- [Next](/manual/es/api/next "/manual/[lang]/[section]/[slug]"): Permite pasar el control de la petición al siguiente controlador.
