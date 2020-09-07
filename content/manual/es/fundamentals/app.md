---
title: Archivo principal
description: Archivo principal de la Aplicación
position: 6
---

## Clase App

La clase **App** contiene la instancia principal de la aplicación.

**Parámetros:**

- **env**: Variables de entorno de la aplicación.

### Propiedades

#### apps

Contiene las referencias a las aplicaciones como: aplicaciones externas, etc.

```python

# apps/urls.py

# Retic
from retic import App as app

"""Define otras aplicaciones"""
BACKEND_EXAMPLE= {
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

El codigo anterior guarda la referencias a las aplicaciones externas utilizadas en la aplicación. A continuación se muestra como obtener los valores.

```python

# services\users\users.py

"""Servicios para el controlador de usuarios"""

# Retic
from retic import App as app

# Requests
import requests

# Constants
URL_USERS = app.apps['backend']['example']['base_url'] + \
    app.apps['backend']['example']['users']

```

#### config

Guarda la configuración de la apliacción. Ver [Configuración](/manual/es/fundamentals/settings "/manual/[lang]/[section]/[slug]") para más detalles.

#### router

Instancia de la clase [Router](/manual/es/fundamentals/routing "/manual/[lang]/[section]/[slug]").

### Funciones

#### use(_item: any_, _name: str_ = "")

Configuración de los middleware de la apliacción, y permite importar otras configuración como rutas de acceso de la aplicación.

**Parámetros:**

- **item**: Elemento a importar a la apliación. Si es de tipo **Router** se almacena en la propiedad **router** de la aplicación. De lo contrario se almancena en la propiedad **apps**

- **name**: Nombre del elemento a guardar.

```python

# apps/urls.py

# Retic
from retic import App as app

"""Define otras aplicaciones"""
BACKEND_EXAMPLE= {
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

#### application(environ, start_response)

Aplicación para enviar una respuesta a las peticiones del cliente. Se utiliza en despliegues de la aplicación con [WSGI](https://en.wikipedia.org/wiki/Web_Server_Gateway_Interface).

**Parámetros:**

- **environ**: Define el [Request](/manual/es/api/request "/manual/[lang]/[section]/[slug]") de la petición.

- **start_response**: Define el [Response](/manual/es/api/response "/manual/[lang]/[section]/[slug]") de la petición.

```python

# app.py

"""Main app"""

# Retic
from retic import App as app

# Settings
import settings

# Apps
from apps import urls

# Routes
from routes import router

# Agregar las rutas a la aplicación
app.use(router)


def application(req, res):
    """Despliegue de la aplicación

    Interface entre WSGI y la aplicación, utiliza passenger_wsgi.py
    """
    return app.application(req, res)


if __name__ == "__main__":
    # Create web server
    app.listen(
        # Obtener la variable de entorno APP_HOSTNAME en el formato por defecto (str)
        hostname=app.env("APP_HOSTNAME"),
        # Obtener la variable de entorno APP_PORT en formato númerico. De no existir, retorna 1801.
        port=app.env.int("APP_PORT", app.config.get("default_port"))
    )

```

#### clear()

Reinicia la aplicación a su estado inicial, borra la configuración, las rutas y las apps.

```python

# app.py

"""Main app"""

# Retic
from retic import App as app

# Settings
import settings

# Apps
from apps import urls

# Routes
from routes import router

# Eliminar información previa en la aplicación
app.clear()

# Agregar las rutas a la aplicación
app.use(router)

if __name__ == "__main__":
    # Create web server
    app.listen(
        # Obtener la variable de entorno APP_HOSTNAME en el formato por defecto (str)
        hostname=app.env("APP_HOSTNAME"),
        # Obtener la variable de entorno APP_PORT en formato númerico. De no existir, retorna 1801.
        port=app.env.int("APP_PORT", app.config.get("default_port"))
    )

```

#### listen(_hostname: str_ = "localhost", _port: int_ = 1801, _application: any_ = None, _use_reloader: bool_ = False, _use_debugger: bool_ = False, _use_evalex: bool_ = True, _extra_files: any_ = None, _reloader_interval: int_ = 1, _reloader_type: str_ = 'auto', _threaded: bool_ = False, _processes: int_ = 1, _request_handler: any_ = None, _static_files: any_ = None, _passthrough_errors=False_, _ssl_context: any_ = None)

Crea un servidor web basado en parametros de configuracion.

**Parámetros:**

- **environ**: Define el [Request](/manual/es/api/request "/manual/[lang]/[section]/[slug]") de la petición.

- **hostname**: El host a enlazar, por ejemplo `localhost`. Si inicia con `unix://` se utiliza un socket de Unix en lugar de un socket de tipo TCP.
- **port**: Puerto del servidor. Ejemplo: `8080`.
- **application**: Aplicación WSGI a ejecutar.
- **use_reloader**: Reinicia el servidor automaticamente si se realizan cambios en la aplicación.
- **use_debugger**: Crea el servidor en modo debugger.
- **use_evalex**: Habilita la evaluación de excepsiones de la aplicación.
- **extra_files**: Una lista de archivos a cargar al inicio del servidor. Por ejemplo configuración extras del servidor.
- **reloader_interval**: Asigna el intervalo de reinico del servidor en segundos.
- **reloader_type**: El tipo de reinicio. Por defecto utiliza la detección automatica. Otros valores: `stat` y `watchdog`.
- **threaded**: Aislas las peticiones en hilos individuales.
- **processes**: Si es mayor que 1, maneja cada solicitud en un nuevo proceso hasta el número máximo de procesos concurrentes definido.
- **request_handler**: Parámetro opcional que se puede utilizar para anular la clase **Request** predeterminada.
- **static_files**: Una lista o diccionario de rutas para archivos estaticos.
- **passthrough_errors**: Deshabilita el manejo de excepciones, lo que significa que el servidor dejará de funcionar cuando suceda un error.
- **ssl_context**: Un contexto SSL para la conexión. Puede ser una clase `ssl.SSLContext`, una tupla con el formato`(cert_file, pkey_file)`, una cadena` 'adhoc'` si el servidor debe crear uno automáticamente, o `None` para deshabilitar SSL (que es el defecto).

```python

# app.py

"""Main app"""

# Retic
from retic import App as app

# Settings
import settings

# Apps
from apps import urls

# Routes
from routes import router

# Agregar las rutas a la aplicación
app.use(router)

if __name__ == "__main__":
    # Create web server
    app.listen(
        # Obtener la variable de entorno APP_HOSTNAME en el formato por defecto (str)
        hostname=app.env("APP_HOSTNAME"),
        # Obtener la variable de entorno APP_PORT en formato númerico. De no existir, retorna 1801.
        port=app.env.int("APP_PORT", app.config.get("default_port"))
    )

```
