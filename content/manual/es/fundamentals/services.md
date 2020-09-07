---
title: Servicios
description: Servicios
position: 4
---

Retic recomienda estructurar la aplicación de forma modular. Independizar el funcionamiento de los controladores de los servicios que realizan su acción. Fácilitando la integración con las diferentes pruebas que la aplicación requiera. Además, de minimizar el código repetido.

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
