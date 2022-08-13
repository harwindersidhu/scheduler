# Interview Scheduler
Using the latest tools and techniques, we build and test a React application that allows users to book, edit and cancel interviews. We combine a concise API with a WebSocket server to build a realtime experience. We test the project in different environments as stated:

- If we want to manually test our components in isolation: use Storybook.
- If we want to run our entire application in development mode: use webpack-dev-server.
- If we want to run unit or integration tests from the command line: use Jest.
- If we want to run automated end-to-end tests in the browser: use Cypress.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress

```sh
npm run cypress
```
## Dependencies

- React
- Axios
- Node.js
- Storybook
- Jest
- Cypress

## Screenshots

- We can book a new interview or edit an existing interview.
  - !["scheduler_create"](./docs/scheduler_create.png)

- After booking an interview, our page will be updated with a new interview. We can also see spots remaining for that day on the left side.
  - !["scheduler_home"](./docs/scheduler_home.png)

- We can also delete the appointment.
  - !["scheduler_delete"](./docs/scheduler_delete.png)

- After deleting an appointment, our main page will be updated and we can also see the updation in spots remaining for that day. 
  - !["scheduler_update"](./docs/scheduler_update.png)
