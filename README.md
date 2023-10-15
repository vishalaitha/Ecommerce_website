# Project Name: Ecommerce_website

## Welcome to the README file for the Ecommerce_website project. This document provides an overview of the project's main routes, their purposes, and how to use them.
## Feel free to check this video to see how it is working
https://www.youtube.com/watch?v=<https://youtu.be/H2aBeIF3wYY>

## Project Description
This project is a backend web application developed as part of an assignment. It provides a range of API endpoints that allow users to interact with the system. Below are the key endpoints that you can use to access different features of the application:

## Website Link
The main link for accessing the website is: https://vishalaithaplotline.cyclic.cloud/auth/

## Installation
1. Clone the repository to your local machine:
```bash
git clone <repository_url>
```

2. Navigate to the project directory:
```bash
cd Ecommerce_website
```

3. Install the required dependencies:
```bash
npm install
```
4. Start the server:
```
bash npm start
```

## API Routes
Below are the main API routes available in this project:

### Show Menu
```bash
Endpoint: /showmenu
```
Description: Fetches and displays the menu items.
HTTP Method: GET


### Get All Users
```bash
Endpoint: /getallusers
``````
Description: Retrieves a list of all users.
HTTP Method: POST


## Get Bill
```bash
Endpoint: /getbill
```
Description: Calculates and returns the bill for a user's order.
HTTP Method: POST


## Get Cart
```bash
Endpoint: /getcart
```
Description: Retrieves the items currently in the user's cart.
HTTP Method: POST


## Signup User
```bash
Endpoint: /signup
```
Description: Registers a new user.
HTTP Method: POST


## Login User
```bash
Endpoint: /login
```
Description: Logs in a user.
HTTP Method: POST


## Add to Cart
```bash
Endpoint: /addtocart
```
Description: Adds an item to the user's cart.
HTTP Method: POST


## Place Order
```bash 
Endpoint: /placeorder
```
Description: Places an order for the items in the user's cart.
HTTP Method: POST



## Remove from Cart
```bash
Endpoint: /removefromcart
```
Description: Removes an item from the user's cart.
HTTP Method: DELETE


## Clear Cart
```bash
Endpoint: /clearcart
```
Description: Clears all items from the user's cart.
HTTP Method: DELETE


## Get All Orders (Admin)
```bash
Endpoint: /getallorders
```
Description: Fetches all orders (Admin only).

HTTP Method: POST

How to Use
Make sure the server is running.
Use a tool like Postman or any HTTP client to send requests to the provided API endpoints.
Depending on the route, use the appropriate HTTP method and provide required parameters in the request body or URL.
Refer to the descriptions above for each route's purpose and expected inputs/outputs.
Contact
For any questions or issues, please contact [vishalaitha07@gmail.com](mailto:vishalaitha007@gmail.com)
