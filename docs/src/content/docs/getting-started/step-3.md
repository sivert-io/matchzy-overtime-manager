---
title: Step 3 Starting MOM 🚀
description: This guide will help you set up and run MOM using different methods, including **npm** and **Docker**.
---

Now that your environment variables are set up, it's time to decide how to run **Matchzy Overtime Manager (MOM)**. You can choose between **Docker** or a JavaScript runtime like **Node.js**, **Yarn**, or **Bun**.

## Option 1: Using Docker 🐳

Docker is a containerization platform that allows you to run applications in isolated environments. If you don’t have Docker installed, you can get it here: [Docker](https://www.docker.com/).

To run MOM using Docker:

1. Build the Docker image:
   ```sh
   docker build -t matchzy-overtime-manager .
   ```
2. Run the container:
   ```sh
   docker run -d -p 3000:3000 --name matchzy-overtime-manager matchzy-overtime-manager
   ```
3. Alternatively, use Docker Compose:
   ```sh
   docker-compose up -d
   ```

## Option 2: Using a JavaScript Runtime

If you prefer to run MOM natively, you can use one of the following JavaScript runtimes:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Bun](https://bun.sh/)

To install dependencies and start MOM manually:

1. Install dependencies:
   ```sh
   npm install   # or yarn install / bun install
   ```
2. Build the project:
   ```sh
   npm run build   # or yarn build / bun run build
   ```
3. Start the server:
   ```sh
   npm start   # or yarn start / bun run start
   ```

Once MOM is running, proceed to [Step 4: Configuring Your CS2 Server](step-4).
