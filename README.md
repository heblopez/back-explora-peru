# 💼🎒 Explora Peru API - Backend with TypeScript and Express

The backend of the ExploraPerú project, designed to promote tourism in Peru, was developed using Node.js, Express, and TypeScript. This system provides a RESTful API to manage a list of tours, enabling create, read, update, and delete (CRUD) operations. It also handles information about users, travel agencies, bookings and more, utilizing PostgreSQL as the database. With this infrastructure, tourists can book tours offered by certified agencies, enhancing their exploration experience in the country.

## 📑 Table of Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Project Structure](#-project-structure)
- [Installation](#️-installation)
- [Available Scripts](#-available-scripts)
- [API Routes](#-api-routes)
- [Contributions](#-contributions)
- [Authors](#-authors)
- [Acknowledgment](#-acknowledgment)

## 🚀 Features

- CRUD operations for contacts: create, read, update, and delete tours.
- Uses TypeScript for safe typing and better code maintenance.
- Organized project structure for easy scalability.
- Input data validation.

## 📋 Requirements

- **Node.js** version `20.x` or higher.
- **npm** (comes with Node.js).
- **Express** version `4.21.1`.
- **TypeScript** version `5.5.3`.
- **@types/express** version `4.17.21` for Express types.
- **PostgreSQL** `v12` or higher
- **Prisma ORM**
- **JWT para autenticación**

## 📂 Project Structure

```bash
📁src/
├── 📁controllers/             # Handle incoming requests
│   ├── auth.controller.ts   # Authentication-related logic
│   ├── booking.controller.ts # Booking-related logic
│   ├── session.controller.ts # Session-related logic
│   └── tour.controller.ts    # Tour-related logic
├── 📁middlewares/             # Middleware functions
│   ├── validateRequest.ts   # Request validation logic
│   └── verifyAuthRequest.ts # Authorization middleware
├── 📁routes/                  # Route definitions
│   ├── auth.routes.ts       # Auth routes
│   ├── booking.routes.ts    # Booking routes
│   ├── session.routes.ts    # Session routes
│   └── tour.routes.ts       # Tour routes
├── 📁schemas/                 # Data validation schemas
│   ├── agency.schema.ts     # Schema for agencies
│   ├── login.schema.ts      # Schema for login
│   └── tourist.schema.ts    # Schema for tourists
├── 📁services/                # Business logic
│   ├── agency.services.ts   # Agency-related logic
│   ├── auth.services.ts     # Authentication-related logic
│   ├── booking.services.ts  # Booking-related logic
│   ├── session.services.ts  # Session-related logic
│   ├── tour.services.ts     # Tour-related logic
│   └── user.services.ts     # User-related logic
├── 📄 .gitignore             # Git ignore file
├── 📄 .prettierrc            # Prettier configuration
├── 📄 eslint.config.mjs       # ESLint configuration
├── 📄 README.md               # Project documentation
├── 📄 package.json            # Project dependencies and scripts
└── 📄 tsconfig.json           # TypeScript configuration
```


## ⚙️ Installation

1. Clone this repository:

```bash
git clone (https://github.com/heblopez/back-explora-peru.git)
```

2. Install the dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start    # The server will be available at http://localhost:3000 by default.
```

## 📌 Available Scripts

- `npm run build`: Compiles TypeScript code to JavaScript.
- `npm run lint`: Runs ESLint to check for code style and linting issues.
- `npm run lint:fix`: Runs ESLint with the `--fix` flag to automatically fix linting issues.
- `npm run format`: Runs Prettier to format the code.
- `npm run dev`: Starts the server in development mode using ts-node with auto-reloading.
- `npm start`: Starts the server using the compiled JavaScript code.

## 🚦 API Routes

### Authentication
| Method | Route                   | Description                                       |
| ------ | ----------------------- | ------------------------------------------------- |
| POST   | `/auth/login`          | Log in a user.                                   |
| POST   | `/auth/register`       | Register a new user (tourist or travel agency).  |
| POST   | `/auth/logout`         | Log out a user.                                  |


### Travel Agencies
| Method | Route                   | Description                                       |
| ------ | ----------------------- | ------------------------------------------------- |
| GET    | `/agencies`            | List all travel agencies.                        |
| GET    | `/agencies/:id`        | Get information for a specific agency.          |
| POST   | `/agencies`            | Register a new travel agency (requires authentication). |

### Tours
| Method | Route                   | Description                                       |
| ------ | ----------------------- | ------------------------------------------------- |
| GET    | `/tours`                | List all available tours.                        |
| GET    | `/tours/:id`           | Get details for a specific tour.                |
| POST   | `/tours`               | Create a new tour (requires agency authentication). |
| PATCH    | `/tours/:id`           | Update a tour.                                  |
| DELETE | `/tours/:id`           | Delete a tour.                                  |

### Bookings
| Method | Route                   | Description                                       |
| ------ | ----------------------- | ------------------------------------------------- |
| GET    | `/bookings`            | List my bookings as tourist user(requires authentication).     |
| POST   | `/bookings`            | Make a new booking.                       |



## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Server framework for building APIs easily.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **ts-node**: Run TypeScript directly without prior compilation (useful for development).

## 🤝 Contributions

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the project.
2. Create a branch for your feature (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push the changes to your branch (`git push origin feature/new-feature`).
5. Open a pull request.

## 👩‍💻 Authors

Full stack Developers:

- Jaqueline Rocio - [@JaquelineRocio](https://github.com/JaquelineRocio)
- Heberth López - [@heblopez](https://github.com/heblopez)
- Victor Ramirez - [@Victormrl17](https://github.com/Victormrl17)
- Juan Alva - [@jlac8](https://github.com/jlac8)

## 🙏 Acknowledgment

A special thanks to Make it Real, especially [@khriztianmoreno](https://github.com/khriztianmoreno) for the valuable feedback during daily meetings and demos, and to [@nayruthCalla](https://github.com/nayruthCalla) for the support and review.

