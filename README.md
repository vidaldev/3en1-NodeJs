# Reto 3en1

Este repositorio pertenece a un reto que consiste en construir la misma aplicación en 3 lenguajes diferentes. Los lenguajes elegidos fueron los siguientes

* Python [ [repositorio](https://github.com/vidaldev/3en1-Python) | [live](https://repl.it/@vidaldev/3en1-Python) ]
* NodeJS [ [repositorio](https://github.com/vidaldev/3en1-NodeJs) | [live](https://repl.it/@vidaldev/3en1-NodeJs) ]
* PHP [ [repositorio](https://github.com/vidaldev/3en1-PHP) ]

>La única regla es que el flujo de tareas y navegación que siguen los usuarios para completar las tareas sea el mismo en los 3 lenguajes. Puedes elegir los que más te gusten. Puedes seguir diferentes paradigmas, principios y buenas prácticas de programación. Pero la aplicación debe verse absolutamente igual en los 3 proyectos.

Link del reto [aqui](https://platzi.com/blog/platziretos-3-languages-challenge/)

## Descripción

Tema principal es un **API REST CRUD** sobre alquiler de vehículos

## Almacenamiento

Toda la data se registra directamente en firebase

## Uso / metodos / parametros

Para todos los request de manera obligatoria deben ir el correo y la contraseña

|               DESCRIPCION               |        URL       | METODO |                                             PARAMETROS                                            |
|:---------------------------------------:|:----------------:|:------:|:-------------------------------------------------------------------------------------------------:|
| Comprobar usuario                       | /login           |   GET  | email, password                                                                                   |
| Crear usuario                           | /createUser      |  POST  | email, password                                                                                   |
| Recuperar Clave                         |  /forgotPassword |  POST  | email                                                                                             |
| Abrir un alquiler                       | /alquilar        |  POST  | email, password, modelo, marca, year, color, responsable                                          |
| Cerrar un alquiler                      | /cerrarAlquiler  |  POST  | email, password, id (Del alquiler abierto), filtro (entregado)                                      |
| Corregir datos del alquiler             | /corregirDatos   |  POST  | email, password, id (Del alquiler), parametros a corregir (modelo, marca, year,color, responsable) |
| Listar todos los alquileres             | /alquileres      |  POST  | email, password, filtro (entregado, pendiente o todo)                                             |
| Listar todos los alquileres del usuario | /alquileres/user |  POST  | email, password, filtro (entregado, pendiente o todo)                                             |
