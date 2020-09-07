---
title: Aplicación inicial
description: Crear una aplicación inicial
position: 4
---

Dentro de la carpeta principal de tu proyecto crea el archivo `app.py` con el siguiente codigo:

```python

# Retic
from retic import App as app

# Crear el servidor
app.listen()

```

Inicia tu servidor con el siguiente comando:

```bash

# Opción 1
python app.py

# Opción 2
python3 app.py

```

Listo, has creado tu primera API. Visita el siguiente enlace [http://localhost:1801/](http://localhost:1801/) para ver el resultado.

![alt text](/images/api_rest_app.png "API REST")