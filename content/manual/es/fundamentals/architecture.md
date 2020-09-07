---
title: Arquitectura
description: Estructura inicial del proyecto
position: 1
---

Retic es un marco de trabajo para crear **aplicaciónes del lado del servidor**. Retic está escrito en Python. Utiliza Werkzeug como servidor.

Una aplicación se define por **rutas, controladores y servicios**. Retic provee la clase **Router** que ayuda a definir los puntos de acceso de la aplicación.

Retic recomienda la siguiente estructura de directorios para una fácil escalabilidad y mantenibilidad de la aplicación.

```bash

retic-restapi-example
│
└───apps
│   │   urls.py
│   │   ...
|
└───controllers
│   │   controller1.py
│   │   controller2.py
│   │   ...
│
└───models
│   │   __init__.py
│   │   model1.py
|   │   model2.py
|   │   ...
│
└───routes
│   │   routes.py
|   │   ...
│
└───services
│   │
│   └───service1
│       │   service1.py
│       │   service2.py
│       │   ...
|   │   ...
│
│   .env.development
│   .env.staging
│   .env.production
│   app.py
│   requirements.txt
│   settings.py

```
