# online-courses-api 📚

A simple api that gives to users the ability to select skills and see the courses.

## Features

- Add new skill: `POST /api/v1/skills`
- Edit a skill: `PATCH /api/v1/skills/:id`
- View all skills : `GET /api/v1/skills`
- View single skill : `GET /api/v1/skills/:id`
- Delete skill : `DELETE /api/v1/skills/:id`

- Add new course: `POST /api/v1/courses`
- Edit a course: `PATCH /api/v1/courses/:id`
- View all courses : `GET /api/v1/courses`
- View all courses based on selected skills : `GET /api/v1/courses?ids=[1,2]`
- View single course : `GET /api/v1/courses/:id`
- Delete course : `DELETE /api/v1/courses/:id`
- Toggle favorite a course: `POST /api/v1/courses/favorite/:id`

- favorite a course : `POST /api/v1/course/:id/like`

## Getting Started

- Install NodeJS and yarn on your computer
- Use the .env.sample file to setup your environmental variables
- This projects requires two `.env` files, one for test `.env.test` and the other for development `.env.dev`
- Run `npm install` or `yarn install` to install all dependencies
- Run `npm run db:migrate` or `yarn db:migrate` to migrate the database
- Run `npm run dev` or `yarn dev` to start the server locally
- Run `npm run build` or `yarn build` to build the project for production
- Run `npm start` or `yarn start` to start the server after build
- Interact with localhost:[PORT] in POSTMAN to access the application

## Testing

- run `npm test` or `yarn test`, This will run test with code coverage

## Documentation

- Find app documentation at `swagger link goes here`

## Technologies

- NodeJs
- ExpressJs
- Typescript
- Prisma
- Jest
- Supertest
- Nodemon
- Joi
- Postgres
- Swagger

## Author

- [Odumah Solomon](https://github.com/slimsolz)
