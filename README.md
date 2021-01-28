# Laptoptory

## Member name
- Aisha Satouf
- Aseel Mesmar
- Husam Ajour
- Abdulrahman Al-janabi

## Brief Description of the project & problem domain
Many companies and universities gives laptops to their students or employees to help them in work or education process , those laptops specified by certain requirements & it's hard to keep a track on each laptop either by the requirements or even the status if the company/university get back the laptop when the employee/student dropped off.

Our system is a web application that will track all the student's or employee's laptop status, whether they get one from the inventory, or returns the laptop to it. Also, the user can check the persons information, and the list of laptops in the inventory that matches the specified requirements & assign matched laptops to specific person & gives a tracking informations to the user about all the saved laptops in the database.


## Vision
![Vision](./assets/vision.PNG)

## Wireframe
![Wireframe](./assets/wireframe.PNG)


## Domain Modeling
![UML](./assets/uml.PNG)

## Database Schema
![Schema](./assets/schemadb.PNG)

## User Story
**[Trello Managment Board](https://trello.com/b/Oz51vJqM/laptoptory)**

## Workflow 
**[Trello Board](https://trello.com/b/NQyKS4TG/laptoptory)**


## Stretch Goals
![Stretch Goals](./assets/stretch.PNG)

## Routes
- POST	/signin
- POST /signup
- GET /signout
- GET/users/approve/all
- POST /users/approve/:id
- POST /laptops
- GET /laptops
- PUT /laptops
- DELETE /laptops
- POST /programs
- GET /log
- GET /
- GET /users
- POST /users
- PUT  /users
- DELETE /users
- GET /laptops/
- POST /laptops/
- PUT /laptops/
- DELETE /laptops/
- GET /laptops/search?brand=lenovo
- GET /laptops/search?availability=true
- GET /laptops/search?program=
- GET /programs
- POST /programs
- PUT /programs
- DELETE /programs
- GET /programs-requirements
- POST /programs-requirements
- PUT /programs-requirements
- DELETE /programs-requirements
- GET /students
- POST /students
- PUT /students
- DELETE /students
- GET /students/search?nationality=
- GET /students/search?status=
- GET /students/search?program=”id”
- GET /studentsWithLaptops/search?studentId=
- GET /studentsWithLaptops/search?laptopSerial=
- GET /studentsWithLaptops/search?availability=
- POST students/assignLaptop
- POST students/returnLaptop
- https://pull-stack-laptoptory.herokuapp.com

