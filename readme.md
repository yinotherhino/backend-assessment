User Management API
Overview
The User Management API is a backend service built using Node.js, TypeScript, Express, and MongoDB. It provides CRUD operations for managing users, as well as additional functionalities like paginated listing, sorting, and dynamic aggregation based on user attributes. The API includes well-documented Swagger (OpenAPI) specifications for ease of testing and integration.

Features
CRUD Operations: Create, Read, Update, and Delete users.
Pagination: Retrieve users with paginated results and optional sorting.
Dynamic Aggregation: Perform aggregate queries based on user attributes like age or city.
Validation: Request validation using Joi to ensure data integrity.
Error Handling: Centralized error handling for meaningful and consistent responses.
API Documentation: Interactive Swagger UI for testing endpoints.
Endpoints
Endpoint	Method	Description
/users	POST	Create a new user.
/users	GET	Get all users.
/users/:id	GET	Get a specific user by ID.
/users/:id	PUT	Update a specific user by ID.
/users/:id	DELETE	Delete a specific user by ID.
/users/paginated	GET	Retrieve users with pagination.
/users/aggregate	GET	Perform dynamic aggregation on users based on query parameters.
Improvements
Add authentication and authorization to secure endpoints.
Implement rate limiting and request throttling to prevent abuse.
Introduce unit tests and integration tests for enhanced reliability.
Deploy the API to a cloud platform (e.g., AWS, Heroku).
Extend the aggregation functionality to include more complex metrics.
Add GraphQL support for flexible query capabilities.
Running the App Without Docker
Prerequisites
Install Node.js (v18 or higher).
Install Yarn.
Set up a MongoDB instance (local or cloud).
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/user-management-api.git
cd user-management-api
Install dependencies:

bash
Copy code
yarn install
Create a .env file in the project root with the following variables:

env
Copy code
PORT=3000
MONGO_URI=mongodb://localhost:27017/user-management
Build the project:

bash
Copy code
yarn build
Start the server:

bash
Copy code
yarn start
Access the API at http://localhost:3000.

Running the App With Docker
Prerequisites
Install Docker.
Steps
Build the Docker image:

bash
Copy code
docker build -t user-management-api .
Run the container:

bash
Copy code
docker run -d -p 3000:3000 --name user-management-api user-management-api
Access the API at http://localhost:3000.

Accessing API Documentation
The API documentation is available through Swagger UI. After running the application (with or without Docker), navigate to the following URL:

bash
Copy code
http://localhost:3000/api-docs
Here, you can explore and test all the available endpoints interactively.