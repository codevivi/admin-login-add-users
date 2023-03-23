# 🪧 Express admin

2023-03-17 & 2023-03-22 workshop tasks

## 📋 About

This is simple admin page made with node express server.

Login, logout with express-session.

Add more admin users, edit, delete users.

Database - json file;

Validation: do not allow duplicate emails;

🎯 **Goals:**

[link to task (lt)](./README-task-lt.md)

### Task 1

Create login page with a form of two fields: email and password.

Pass form data to separate route using POST method.
Check if login data match email: admin@bit.lt and password: 1234

If login details did not mach redirect user back to login page.

If login successful - redirect user to new route '/admin';

### Task 2

Add functionality to add new users on admin page by entering their name, surname, email and password.

Save data in JSON database.

New created users must be able to login as admin;

### Task 3

_On original task [code for deleting users](https://github.com/viliusramulionis/Javascript-23-01-09/tree/master/2023-03-22) was already given_

Do not allow admin to delete his own account.

### Task 4

Add functionality to edit users, do not allow duplicate emails.

### 🏁 Getting started

**Must have [Node.js](https://nodejs.org)** installed

1. Clone the repo
2. Go into project directory and Install NPM packages

   ```sh
   npm install
   ```

3. use application:

   ```sh
   npm start
   ```

![gif app screenshot](./img/admin-users.gif)
