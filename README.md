# Guía Instalación
* Instalar mysql-server
* Crear base de datos con nombre videos1
* Crear usuario de gestión y otorgar permisos sobre videos1
* Copiar repositorio desde [link al repositorio](https://github.com/cslab-upm/TFG_Deteccion.git)
* Importar dump.mysql
#### Cambiar datos de conexión a la base de datos
* Para poder cambiar los parametros de conexión se ha de modificar el siguiente fichero, ubicado en *config/default.json _Conexionbasededatos_*
#### Cambiar puerto de escucha para el backend en la aplicación frontend
* Modificar el fichero *src/environments/environment.prod.ts* y cambiar el puerto y/o el servidor
* Ejecutar desde línea de comandos *ng build --prod*
#### Creacion de vídeos y entradas en la BBDD
* Añadir a cron una entrada que se ejecute cada 24 horas (u otro período de actualización) con el siguiente fichero *crearYSubirvideo.js*
* Para modificar la ubicación de los videos y/o de las imagenes modificar el fichero *rutasImagenesYVideos.js*
#### Ejecutar servicio y asegurar uptime
* Añadir un cron que se ejecute cada 1 minuto el fichero *comprobarEjecucion.sh*
* Las salidas generadas por el servidor se almacenaran en el fichero *logs.txt*



