[//]: # @param group $$ Kadabra backlog
[//]: # @param title $$ Backlog
[//]: # @param author $$ Iván D. Sánchez

# Backlog

Generar una tabla de contenido de tipo sticky que se arme en funcion de los elementos h1,h2,h3 de la página y genere marcadores automáticos basado en un id del tipo title + número

Cerrar tabla de contenido al seleccionar un marcador

Cambiar el titulo del tab con el nombre del curso al que se ingresó

Volver al inicio desde la tabla de contenido y/o Menu

Version mobile

Refactorización

Temas y lenguaje cookie preferences

Reglas de compilacion errores fatales

creacion de dependencia kadabra cambio de arquitectura

TypeScript

Nuevo Kadabra para organización de ejercicios de entrenamiento JS, busca entre carpetas los ejercicios segun un filtro alimentado por un scrapping de archivos que contiene un array con tags que clasifican el ejercicio segun los topics que maneje

Se puede crear un script en el package.json para determinar si kadabra se carga accediendo a archivos estáticos o en su nueva version haciendo scrapping basado en un array de direcciones a repos publicos accediendo a sus readme.md

Hay un bug cuando se carga directamente una nota sin pasar por el home, la tabla de contenido toma el local storage de la sesion anterior y no se actualiza, solo se refresca si va al home y se vuelve a entrar el contenido
