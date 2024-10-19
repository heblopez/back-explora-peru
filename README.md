# 📞 Explora Peru API - Backend with TypeScript and Express

The backend of the ExploraPerú project, designed to promote tourism in Peru, was developed using Node.js, Express, and TypeScript. This system provides a RESTful API to manage a list of tours, enabling create, read, update, and delete (CRUD) operations. It also handles information about users, travel agencies, bookings, payments, reviews, and more, utilizing PostgreSQL as the database. With this infrastructure, tourists can book tours offered by certified agencies, enhancing their exploration experience in the country.

## 📑 Table of Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Project Structure](#-project-structure)
- [Installation](#️-installation)
- [Available Scripts](#-available-scripts)
- [API Routes](#-api-routes)
- [Contributions](#-contributions)
- [License](#-license)
- [Authors](#-authors)
- [Acknowledgment](#-acknowledgment)

## 🚀 Features

- CRUD operations for contacts: create, read, update, and delete persons.
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
📁 persons-api/
├── 📁 src/
│   ├── 📄 index.ts            # Application entry point
│   ├── 📁 controllers/        # Controllers for managing persons
│   │   └── 📄 info.controller.ts
│   │   └── 📄 persons.controller.ts
│   ├── 📁 data/
│   │   └── 📄 persons.ts      # Mock data
│   └── 📁 routes              # Server route definitions
│       └── 📄 info.routes.ts
│       └── 📄 person.routes.ts
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
git clone https://github.com/heblopez/persons-api.git
cd persons-api
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

### Users
| Method | Route                   | Description                                       |
| ------ | ----------------------- | ------------------------------------------------- |
| GET    | `/users/:id`           | Get user information.                            |
| PUT    | `/users/:id`           | Update user information.                         |
| DELETE | `/users/:id`           | Delete a user account.                           |

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
| PUT    | `/tours/:id`           | Update a tour.                                  |
| DELETE | `/tours/:id`           | Delete a tour.                                  |

### Bookings
| Method | Route                   | Description                                       |
| ------ | ----------------------- | ------------------------------------------------- |
| GET    | `/bookings`            | List all bookings (requires authentication).     |
| POST   | `/bookings`            | Create a new tour booking.                       |
| PUT    | `/bookings/:id`        | Update an existing booking.                      |
| DELETE | `/bookings/:id`        | Cancel a booking.                                |

### Payments
| Method | Route                   | Description                                       |
| ------ | ----------------------- | ------------------------------------------------- |
| POST   | `/payments`            | Process a payment.                               |
| GET    | `/payments/:id`        | Get details of a payment.                        |

### Reviews
| Method | Route                   | Description                                       |
| ------ | ----------------------- | ------------------------------------------------- |
| POST   | `/reviews`             | Add a review for a tour.                         |
| GET    | `/reviews/:tourId`     | Get reviews for a specific tour.                 |

### Chat and Messaging
| Method | Route                   | Description                                       |
| ------ | ----------------------- | ------------------------------------------------- |
| GET    | `/chat/:touristId/:agencyId` | Get chat history between a tourist and an agency. |
| POST   | `/messages`            | Send a message in a chat.                        |

### Additional Routes
| Method | Route                   | Description                                       |
| ------ | ----------------------- | ------------------------------------------------- |
| GET    | `/regions`             | List all regions available for tours.            |
| GET    | `/languages`           | Get the available languages for tour guides.     |

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

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## ✉️ Contact

If you have any questions or suggestions, feel free to contact me at [heberth.lopez.19@gmail.com](mailto:heberth.lopez.19@gmail.com).

## 👩‍💻 Authors

Full stack Developers:

- Jaqueline Rocio - [@JaquelineRocio](https://github.com/JaquelineRocio)
- Heberth López - [@heblopez](https://github.com/heblopez)
- Victor Ramirez - [@Victormrl17](https://github.com/Victormrl17)
- Juan Alva - [@jlac8](https://github.com/jlac8)

## 🙏 Acknowledgment

A special thanks to Make it Real, especially [@khriztianmoreno](https://github.com/khriztianmoreno) for the valuable feedback during daily meetings and demos, and to [@nayruthCalla](https://github.com/nayruthCalla) for the support and review.

