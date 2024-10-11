# LitGO | Frontend

This is a frontend part of [LitGO ecosystem](https://github.com/reversersed/LitGO)

## Table of contents
- [System purpose](#system-purpose)
- [Functional](#functional)
- [Frontend stack](#frontend-stack)
- [Backend stack](#backend-stack)
- [Interface prototype](#interface-prototype)

## System purpose

The main purpose of system is to provide to users functional that allows to read books, search them and save to personal lists (as favourites).

## Functional

System is planned to has:

1. Book search
    - Search bar
    - Dynamic search suggestions
    - Search page with filters
2. Genre/category catalogue
    - Short category list
    - Extended information about each category
    - Fulfilled page with information about every category and genre
3. UI/UX
4. Books and authors data
5. Built-in book reader

## Frontend stack

Frontend part of system is progressive web application (PWA) deploying as standalone application on desktop, web and mobile devices.

Stack:
  - `Angular v18`
  - `Tailwind`
  - `Karma (for testing)`
  - `Docker Compose (deploying)`
  - `Nginx (docker routing)`

## Backend stack

[Backend](https://github.com/reversersed/LitGO-backend) is written in `Golang v1.22.5` in microservices architecture.<br>

Stack:
  - `Golang v1.12.5`
  - `RESTful gateway + gRPC`
  - `RabbitMQ`
  - `MongoDB`
  - `Gin router (gateway)`

## Interface prototype

Here's examples of interface prototype made in [Figma](https://figma.com)

![Main page](https://i.imgur.com/YewJ6uN.png)<br>
![Catalogue](https://i.imgur.com/PsNILSb.png)<br>
![Extended category information](https://i.imgur.com/PeAU1nC.png)<br>
![Category's page](https://github.com/user-attachments/assets/1f277b52-ae3a-46e2-b573-bbcd6182d366)<br>
![404 page](https://github.com/user-attachments/assets/b0a91657-ca74-4bf2-b7ad-5e09b9c63e00)<br>
![Side menu](https://github.com/user-attachments/assets/276f5887-33eb-430c-92e2-bedc5a943c89)<br>
