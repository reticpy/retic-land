---
title: Next
description: Next
position: 3
---

La clase ``Next`` permite pasar el control de la petición al siguiente controlador. Con frecuencia se utiliza en el desarrollo de *middlewares*.
  
```python

# Retic
from retic import Request, Response, Next
from retic.services.responses import error_response
from retic.services.validations import validate_obligate_fields

# Services
from services.users.users as users

def oauth(req: Request, res: Response, next:Next):

    """Autentificar usuario"""
    _user = users.validate(req.headers.get('authorization'))

    if _user["valid"] is False:
        return res.forbidden()

    # Continuar con el siguiente middleware
    next()

```
