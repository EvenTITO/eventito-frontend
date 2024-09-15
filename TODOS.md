# TODOs

## Evento

- enchufar, ni bien se obtiene datos del evento, en redux -> also los hooks
- renderizar todo en base a redux
- sidebar aparece solo si el usuario tiene roles (hacer el flujo para ver que boton en caso de distintos roles)

## General

- cambiar a español
- agregar pantalla de fowardeo en caso de 500
- agregar custom hooks de las llamadas al back y consumirlos directo
  - herencia para el http client -> que los cree cada hook
- agregar estilo de contenedores para importarlos directamente
- agregar estado global para mostrar header y sidebar o no en caso de que este cargando la pagina (se declaran en el layout, por eso se muestran)
- codigo duplicado que podria sacar pero hay que abstraer un poco

## My events

- reutilizar cards
- agregar un conversor de roles -> definirlo en utils
- si hay muchos eventos? entonces hacer paginacion / infinite scrolling

## Create event

- agregar x para cerrar
- cuando esta cargando, estaria bueno que no se pueda hacer mas nada, pero no pondria un loader invasivo en toda la pantalla
- tratar errores
  - estaria bueno definirle schemas a los forms para validar las mismas cosas que el back (que el titulo tenga X size, etc)
  - cambiar un poco la estructura para que tenga solo dos pasos

## Administracion de evento

- integrar con el back
- algunas cosas quedaron en ingles por como las defini
- agregar filtro de tipos de eventos y de rol
- agregar ir y volver de home

## styles

- agregarle margin al header maybe para que este mas centrado? -> molesto para el header del evento, pero no tan malo para header home

## chair page
- popup de revisión (pantalla de revisiones):
    - si es de tipo descripción, entonces permitir colapsar la revisión 
    - si es de otro tipo, entonces que figure a la derecha 
