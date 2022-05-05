# Hospital_API

A server side of a Hospital were a doctor can login, the doctor register the patient in the app and creates a report with the doctor id, status and date of visit. Fetches data on patient history & status

## Table of Contents
* Generalinfo
* Technology
* Setup
* Functionality
* status

## Introduction
    
  The Application helps users to rate their favourite movies through API calls. Express is used with Node.js due to its fast, 
  unopinionated, minimalist web framework. MongoDB used to store data of users and the movies due to its avaliability of large
  range of Schema and ease to use. 
    
## Technology
    1. Node.js
    2. Express
    3. MongoDB
    4. Mongoose

## Setup
   Make sure that Node.js, Mongodb, robo3T, VS Code(any text editor) and Postman are installed in your local system. 
   Open the terminal and type the following commands
   * npm install --save-dev nodemon
   * npm install
   * create a .env file in the root of the project
   * Paste the following in your .env file
        ACCESS_TOKEN_SECRET = Any_String_Of_Your_Choice
   * To run the project type **npm start** in the terminal

## Functionality

   ## Register Doctor 
        To Register a new doctor "POST" request has to be sent to /doctors/register with _name, email and password_ 
        in the request body. Onece the registration is done the doctor is created and can continue to login. The 
        following image give a picture of registration request.
![Register Doc](https://user-images.githubusercontent.com/76957372/166963188-efb95c83-c167-4a7d-9488-af96f1aea020.png)
   ## Login Doctor
        Once is registeration is done, the doctor can send a "POST" request to /doctors/login with _email and password_ 
        in the request body. On a successful login the user will be given an accesstoken(The accessToken expires 
        after 1hour) which can be used to create, retrive reports of patients.Note: The following picture paints 
        the image of the above statements.
![Login Doc](https://user-images.githubusercontent.com/76957372/166963256-7c733164-3ece-4af1-a94c-1b39631951f0.png)
  ## Login/Register Patient
        To login/register a new patient the doctor has to send a "POST" request to /patients/register with patients
        phone number in the body and key 'auth-token' in the Header which should be assigned to the doctors access
        token. The following image give a picture of registration request.
![Create Patient-0](https://user-images.githubusercontent.com/76957372/166964491-51d2344e-ceca-43a7-bdc0-9443b66af261.png)
![Create Patient](https://user-images.githubusercontent.com/76957372/166964510-f74bbc6d-2845-464f-9264-e1ac1bbe4580.png)
   ## Create Report
        To create a new report send a "POST" request to /patients/:id/create_report where id is the patients id that 
        the doctor should have got while registering/logging in the patient. The body should contain key 'status' 
        against which the status value should be choosen only from this array ['Negative', 'Travelled-Quarantine',
        'Symptoms-Quarantine', 'Positive-Admit'] othewise an error will be thrown. The doctor should authenticate 
        themselves with the access token by inserting it in the Header. The following picture paints the image of 
        the above statements.
![Create Report-1](https://user-images.githubusercontent.com/76957372/166965661-72dca405-b10d-4a9f-b1c2-8e0132c8becd.png)
![Create Report-2](https://user-images.githubusercontent.com/76957372/166965687-11889be8-51a3-4e53-89ee-1c3ba532e996.png)
![Create Report - 0](https://user-images.githubusercontent.com/76957372/166965625-d3ef7277-c998-42f9-874e-40ff3cd43566.png)
   ## Fetch All Reports of a Patient
        To fectch all the reports of a respective patient send a "GET" request to /patients/:id/all_reports where id is the
        patients id which has to be send in the body with key 'id', authentication of doctor is required, the doctor 
        should authenticate themselves using accesstoken. The following picture points the image of the above statements.
![Fetch all Reports-0](https://user-images.githubusercontent.com/76957372/166966803-3fb538d9-5e76-45df-a4de-21e7a256854b.png)
![Fetch all Reports-1](https://user-images.githubusercontent.com/76957372/166966821-bb038345-d0cd-4cee-8b65-8b72e6d809e7.png)
   ## Fetch based on status
        To fetch reports based on status the doctor need to send a "GET" request to /reports/:status where status 
        has to be choosen from this array ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'].
        The doctor needs to authenticate themselves before sending their request using their access token.
![status-0](https://user-images.githubusercontent.com/76957372/166967921-d63389f5-76d0-42bb-a134-a74f8aa9de9c.png)
![status-1](https://user-images.githubusercontent.com/76957372/166967932-1398d343-ad6e-4d85-949f-6bb8b039f23a.png)

## Status
    This project is completely developed and has all required functionality. 
