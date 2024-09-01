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
- agregar la publicacion del evento con su custom hook

## styles

- agregarle margin al header maybe para que este mas centrado? -> molesto para el header del evento, pero no tan malo para header home
