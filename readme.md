# **User Management API**

## **Overview**
The **User Management API** is a backend service built with **Node.js**, **TypeScript**, **Express**, and **MongoDB**. It allows users to perform CRUD operations, retrieve paginated user data, and perform dynamic aggregations. It includes Swagger documentation for easy testing and integration.

---

## **Features**
- **CRUD Operations**: Create, Read, Update, and Delete users.
- **Pagination**: Paginate and sort user data.
- **Dynamic Aggregation**: Aggregate user data dynamically based on query parameters.
- **Validation**: Request validation with **Joi**.
- **Error Handling**: Centralized error responses for consistency.
- **API Documentation**: Interactive **Swagger UI**.

---

## **Endpoints**

### **CRUD Operations**
| **Endpoint**   | **Method** | **Description**         |
|-----------------|------------|-------------------------|
| `/users`        | `POST`     | Create a new user.      |
| `/users`        | `GET`      | Get all users.          |
| `/users/:id`    | `GET`      | Get user by ID.         |
| `/users/:id`    | `PUT`      | Update user by ID.      |
| `/users/:id`    | `DELETE`   | Delete user by ID.      |

### **Additional Features**
| **Endpoint**       | **Method** | **Description**                                           |
|---------------------|------------|-----------------------------------------------------------|
| `/users/aggregate`  | `GET`      | Aggregate users dynamically (e.g., by age, city, or both). |

---

## **Improvements**
Potential enhancements include:
- **Authentication and Authorization** for securing endpoints.
- **Rate Limiting** and **Throttling** to prevent abuse.
- Adding **unit tests** and **integration tests**.
- Deploying the API to **cloud platforms** like AWS, Heroku, or Azure.
- Extending aggregation to include more advanced metrics.
- Supporting **GraphQL** for flexible queries.

---

## **Running the App Without Docker**

### **Prerequisites**
- Install [Node.js](https://nodejs.org/) (v18 or higher).
- Install [Yarn](https://yarnpkg.com/).
- Set up a MongoDB instance (local or cloud).

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-management-api.git
   cd user-management-api
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory:
   ```plaintext
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/user-management
   ```

4. Build the application:
   ```bash
   yarn build
   ```

5. Start the server:
   ```bash
   yarn start
   ```

6. Access the API at `http://localhost:3000`.

---

## **Running the App With Docker**

### **Prerequisites**
- Install [Docker](https://www.docker.com/).

### **Steps**
1. Build the Docker image:
   ```bash
   docker build -t user-management-api .
   ```

2. Run the container:
   ```bash
   docker run -d -p 3000:3000 --name user-management-api user-management-api
   ```

3. Access the API at `http://localhost:3000`.

---

## **Accessing API Documentation**

### **Swagger Documentation**
Once the server is running, access the Swagger UI at:

```
http://localhost:3000/api-docs
```

Here, you can:
- View all available endpoints.
- Test each API interactively.

---

## **License**
This project is licensed under the [MIT License](LICENSE).