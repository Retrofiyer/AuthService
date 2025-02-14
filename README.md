# Domain User
# AuthService - JavaScript REST API

![Image](https://github.com/user-attachments/assets/8967cb0f-c4bb-49ab-8fba-1f2fa5868b28)

## About The Project

This is a REST API-based Node.js microservice named AuthService, responsible for handling user authentication. It allows users to securely log in to the application and generates a signed JWT token for authentication and authorization purposes. The API is deployed on an EC2 instance to provide scalable and secure authentication services.

## Table of Contents

<ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running-the-project">Running the service</a></li>
        <li><a href="#running-with-docker">Running with docker</a></li>
      </ul>
    </li>
    <li>
      <a href="#contributing">Contributing</a>
    </li>
 </ol>

## Overview

The AuthService microservice is responsible for authenticating users by verifying their credentials and issuing a JWT token. This token is used to validate user actions and access to secured resources within the application.

## Features

<div>
  <ul>
      <li> <b>REST API:</b> Provides simple endpoints for adding and listing users.</li>
      <li> <b>Node.js Powered:</b> Built on a minimal Node.js setup.</li>
      <li> <b>JWT Token Generation:</b> Signs and issues JSON Web Tokens for secure authentication.</li>
      <li> <b>Role-Based Access Control:</b> Supports authorization through token validation.</li>
  </ul>
</div>

## Built With

[![Node.js][nodejs.com]][nodejs-url]

<!-- GETTING STARTED -->
## Getting Started

## Prerequisites

Before you begin, make sure you have the following tools installed on your machine:

- **Node.js 18.20.4 or higher** - [Download Node](https://nodejs.org/en/download/package-manager)

If you don't have any of these tools installed, follow the provided links to install them.


## Installation

1.- Clone the repository
   ```sh
   git clone https://github.com/Retrofiyer/AuthService.git
   cd AuthService
   ```
2.- Build project using node.js
 ```sh
   npm install
   ```
## Running the project

  ```sh
    npm start
   ```

Open any browser and type

 ```sh
   localhost:3000
   ```

## Running with docker

1. Making Docker Pull 

 ```sh
   docker pull retroandre/authservice:<version>
   ```
or build docker image
```sh
   docker build -t <any-name> .
   ```
2. Last make a docker run

 ```sh
   docker run -p 3000:3000 retroandre/authservice:<version> # or any-name
   ```
3. Open any browser and type

 ```sh
   localhost:3000
   ```
   
## Contributing

I would like you to contribute to this project. Whether it's fixing a bug, adding a new feature or improving the documentation, your help is always welcome. Please email me at `sebitas5225@gmail.com` with all the details for improvement.

<!-- LINKS & IMAGES -->

[docker.com]: https://img.shields.io/badge/Docker-black?style=for-the-badge&logo=docker&logoColor=white
[docker-url]: https://www.docker.com/
[nodejs.com]: https://img.shields.io/badge/Node.js-black?style=for-the-badge&logo=node.js&logoColor=white
[nodejs-url]: https://nodejs.org/
