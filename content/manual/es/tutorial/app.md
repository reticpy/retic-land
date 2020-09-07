---
title: Archivo principal
description: Archivo principal de la Aplicación
position: 2
---

_Estructura de carpetas utilizada:_

```bash

retic-restapi-example
│   ...
│   app.py
│   requirements.txt
│   ...

```

El archivo principal únifica los controladores, las rutas, los servicios y crea el servidor de la aplicación.

Crea un archivo `app.py` en el cual se encontrará el servidor de nuestra aplicación.

```python

# app.py

"""Main app"""

# Retic
from retic import App as app

if __name__ == "__main__":
    # Crear servidor web
    app.listen(
        hostname="localhost",
        port=1801,
    )

```

Iniciar nuestro servidor web con el siguiente comando:

```bash

python app.py

```

Visita el siguiente enlace [http://localhost:1801/](http://localhost:1801/) para ver el resultado.

![alt text](/images/api_rest_app.png "API REST")
