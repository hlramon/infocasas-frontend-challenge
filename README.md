# InfoCasas Frontend Challenge Criteria

Welcome to the InfoCasas frontend coding challenge! Please read the following instructions carefully.

**Your goal is to set up a personal task management app that lets users to track and focus on the things they need to get done.**

# Contents

- [Use cases](#use-cases)
- [Evaluation criteria](#evaluation-criteria)
  - [Technology requirements](#technology-requirements)
  - [Code requirements](Criteria.md#must-have)
- [How to submit](#how-to-submit)
- [API server](#api-server)
- [Time limit](#time-limit)
- [Installation](#installation)
- [Running](#running)

# Use cases

The user shall be able to:

- Create, list, delete, update todos (using the API provided below)
- Filter by string
- Sort by completeness

The interactions should not refresh the page.

# Evaluation criteria

## Technology requirements

[Next.js](https://nextjs.org/) is a mandatory requirement. Apart from this, you can use any library.

## Code requirements

The full criteria for evaluating the coding challenge can be found [here](./Criteria.md).

# How to submit

- Clone this repository.
- A RESTful API for `todos` is provided with the challenge. See: [API server](#api-server)
- Complete your project as described above within your local repository.
- Ensure everything you want to commit is committed before you bundle.
- Create a git bundle: `git bundle create your_name.bundle --all`
- Email the bundle file to your point of contact.

#### IMPORTANT !!!!

The project must include a `readme` file with **instructions for running the local env**. It should specify basic obious commands (such as npm install) and also any extra command or step to run de local env.

If the project needs some environment file (that usually should be ignored in the git repo) you must add an example file with the necessary configs and it must be mentioned in the `readme` file instructions. (ej: if you need a .env file, you must add a .example.env or something similar).

If the project doesn’t provide clear instructions on how to run it **the candidate will be disqualified**. We will not “try hard” to run your project.

# API server

The service [JSONPlaceholder](https://jsonplaceholder.typicode.com) includes all the necessary methods required to achieve the goal (`POST`, `GET`, `PUT`, `PATCH`, and `DELETE`).

Check [JSONPlaceholder](https://jsonplaceholder.typicode.com) for more information.

# Time limit

There is no hard time limit for this coding challenge. However, we believe that 6-8 hours is sufficient for the [must-have parts of the application](Criteria.md#must-have). Happy coding!

Good luck,
The InfoCasas Team

# Installation

In the root of the project execute `npm install`

# Running

To run, create a file from .example.env called .env.local and add the necessary information.

Then run `npm run dev` in the terminal. This command will create a server running on port 3000
