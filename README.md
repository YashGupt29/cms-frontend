# Contact Management Service (CMS)

## Overview

The Contact Management Service (CMS) is a full-stack web application designed to manage contacts. It allows users to create, read, update, and delete contact information through an intuitive interface. The app is built using ReactJS for the frontend, Node.js for the backend, and MongoDB for data storage.

## Tech Stack

- **Frontend**: ReactJS, Material UI (MUI), Axios, React Query, Formik, Zod
- **Backend**: Node.js, Express, MongoDB
- **Dev Tools**: Vite, ESLint

## Features

- **Create**: Add new contacts with details like name, email, phone, etc.
- **Read**: View contacts in a paginated and sortable table.
- **Update**: Edit existing contact details.
- **Delete**: Remove contacts from the system.

## Installation

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd cms-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the frontend in development mode:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5174/`.

### Backend Setup

1. Navigate to the backend folder (assuming it is in a separate directory):

   ```bash
   cd cms-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB URI in a `.env` file:

   ```bash
   MONGODB_URI=<your-mongodb-uri>
   ```

4. Start the backend server:

   ```bash
   node server.js
   ```

   The backend will run on `http://localhost:5000`.

## API Endpoints

- **GET /contacts**: Fetch all contacts.
- **POST /contacts**: Create a new contact.
- **PUT /contacts/:id**: Update an existing contact.
- **DELETE /contacts/:id**: Delete a contact.

## Frontend Operations

The frontend uses ReactJS with Material UI (MUI) components and provides a user-friendly interface for managing contacts:

- **Add Contact**: Use the contact form to create a new contact.
- **Contact Table**: Displays the list of contacts in a table with pagination and sorting.
- **Edit Contact**: Modify contact details by clicking the "Edit" button next to a contact.
- **Delete Contact**: Remove a contact by clicking the "Delete" button.

### Dependencies Used

- **@mui/material**: For Material UI components.
- **axios**: For making HTTP requests to the backend.
- **formik**: For managing form state and validation.
- **react-toastify**: For displaying notifications.
- **@tanstack/react-query**: For managing data fetching and caching.
- **zod**: For schema validation of the form data.

## License

This project is open-source and available under the MIT License.

```

```
