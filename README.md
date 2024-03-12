# Employee Management Backend

This repository contains the backend code for an Employee Management System implemented using Express.js and AWS DynamoDB. It provides RESTful API endpoints for managing employee data, seamlessly integrating with a frontend application built using React.js.

## Features

- Retrieve all employees
- Get details of a specific employee
- Add a new employee
- Update existing employee details
- Delete an employee

## Usage

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Configure your AWS credentials and region in `app.js`.
4. Run the server using `npm start`.
5. Integrate the provided API endpoints with your React.js frontend application.

## Endpoints

- GET `/employees` - Retrieves all employees.
- GET `/getemployee/:index` - Retrieves details of a specific employee by index.
- POST `/employees` - Adds a new employee.
- PUT `/employees/:index` - Updates details of an existing employee by index.
- DELETE `/employees/:index` - Deletes an employee by index.

## Technologies Used

- Express.js - Web application framework for Node.js.
- AWS DynamoDB - Fully managed NoSQL database service provided by Amazon Web Services.
- CORS - Express middleware for enabling Cross-Origin Resource Sharing.
- Body-parser - Express middleware for parsing request bodies.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
