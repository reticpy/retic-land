---
title: Configuración
description: Configuración
position: 5
---

## Clase Config

La clase **Config** permite establecer valores en la aplicación para ser utilizados en las diferentes secciones de la misma.

### Funciones

La clase **Config** utiliza las siguientes funciones para manipulación de su información.

#### set(_key: str_, _value: dict_)

Retic permite definir los valores de configuración de la aplicación de forma dinamica.

**Parámetros:**

- **key**: Nombre de la variable a asignar.

- **value**: Valor a asignar.

```python

# settings.py

# Retic
from retic import App as app

"""Asignar ruta de variables de entorno"""
app.env.read_env('.env.development', override=True)

"""Asignar variables de configuracion"""
app.config.set("default_port", 1801)

```

#### get(_key: str_, _default_value: dict_ = None, _callback: any_ = None)

Las variables de configuración se pueden utilizar en cualquier parte de la aplicación utilizando la instancia `app`.

**Parámetros:**

- **key**: Nombre de la variable a buscar.

- **default_value**: Valor por defecto si la variable no existe.

- **callback**: Función que se ejecuta luego de obtener el valor.

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

#### from_object(*settings: dict*)

Establece la configuración basado en un diccionario.

**Parámetros:**

- **settings**: Objeto de tipo diccionario que contiene la configuración.

```python

# settings.py

# Retic
from retic import App as app

"""Asignar ruta de variables de entorno"""
app.env.read_env('.env.development', override=True)

"""Crear diccionario de congfiguración"""
config = {
    u"default_port": 1801
}

"""Configuración basada en un objeto"""
app.config.from_object(config)

```

#### clear()

Borra todas las variables de configuración, sin embargo, las variables de entorno no son eliminadas.

```python

# settings.py

# Retic
from retic import App as app

"""Asignar ruta de variables de entorno"""
app.env.read_env('.env.development', override=True)

"""Crear diccionario de congfiguración"""
config = {
    u"default_port": 1801
}

"""Configuración basada en un objeto"""
app.config.from_object(config)

"""Eliminar variables de configuracion"""
app.config.clear()

```

## Variables de entorno

Retic proporciona fácil acceso a las variables del sistema. Se utiliza la clase `Env` de la biblioteca `environs` para definir sus rutas en la aplicación. Consulte la [documentación oficial](https://github.com/sloria/environs) para conocer todas las posibles combinaciones y cómo acceder a las variables de entorno de la mejor forma.

### Funciones de la clase Env

#### env.read_env(*path: str* = None, _recurse: bool_ = True, _verbose: bool_ = False, _override: bool_)

Por defecto se buscan variables en el archivo `.env` si este existe. Sin embargo, en algunas ocaciones es necesario tener más de un archivo de entorno. Esta función permite leer tantos archivos de entorno como se le indique.

```bash

# .env.development

#App
APP_HOSTNAME                    =localhost
APP_PORT                        =1801
APP_ENV                         =development

```

**Parámetros:**

- **path**: Directorio donde se encuentra el archivo de enterno.

- **recurse**: Realiza una busqueda de forma recursiva desde la raiz.

- **verbose**: Define si se deben mostar las advertencias cuando un archivo no existe. El valor predeterminado es `False`.

- **override**: Sobreescribe las variables actuales en el sistema operativo. El valor predeterminado es `False`.

```python

# settings.py

# Retic
from retic import App as app

"""Asignar ruta de variables de entorno"""
app.env.read_env('.env.development', override=True)

```

##### Tipos soportados

Por defecto Retic retorna el valor en formato `str`, sin embargo, se permite realizar el casteo automatico de las variables de entorno a un tipo especifico. A continuación se presenta los posibles formatos de salida al consultar una variable de entorno:

- env.str
- env.bool
- env.int
- env.float
- env.decimal
- env.list (accepts optional subcast keyword argument)
- env.dict (accepts optional subcast keyword argument)
- env.json
- env.datetime
- env.date
- env.timedelta (assumes value is an integer in seconds)
- env.url
- env.uuid
- env.log_level
- env.path (casts to a pathlib.Path)

##### Uso básico

La busqueda de una variable de entorno se realiza por su nombre, de no existir, se puede asignar un valor por defecto, caso contrario devolverá una excepción que indica que la variable no existe en el sistema.

```bash

# .env.development

#App
APP_HOSTNAME                    =localhost
APP_PORT                        =1801
APP_ENV                         =development

```

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
        port=app.env.int("APP_PORT", 1801),
    )

```
