This is repo/project is a Work in Progress 🚧

# Load Balancer 🚀

A simple load balancer project where I'm experimenting with proxy servers, load balancing, and adding a touch of Swagger OpenAPI.

## What's the Process?
   1. Incoming Request 
   2. Proxy Server 🔄
   3. Check Server Health ✔️
   4. Assign based on Round-Robin Scheduling 

## Packages and Functionality

- **Round-Robin Load Balancing:**
  - **Package:** `round-robin` (or any other package you used for round-robin load balancing)
  - **Functionality:** Distributes incoming requests across servers in a circular order.

- **Server Health Checks:** 
  - **Package:** `server-health` (or any other package you used for server health checks)
  - **Functionality:** Periodically checks the health of each server and marks them as healthy or unhealthy.

- **Swagger:** 
  - **Packages:**
    - `swagger-jsdoc`
    - `swagger-ui-express`
    - `yamljs`
  - **Functionality:** Generate and serve Swagger/OpenAPI documentation for the API.
  - **can be seen at :**  `http://localhost:3000/api-docs`


Feel free to customize it further based on your preferences and project details.
