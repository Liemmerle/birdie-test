# Birdie test back end

This is the back-end of the Birdie's developper test.

## Dependencies

In addition to those indicated in the main readme, this project uses :
- sequelize to communicate with the database
- dotenv to read .env file in a development context
- unique-names-generator to generate mocked names for the care recipients and care givers

## Routes

*src/controllers* contains the various routes available : 
 - *ping.ts* contains the route */Hello* used to test the server
 - *carerecipients.ts* contains the route */careRecipients* which returns the ids and names of all the care recipients who have at least one event in the database.
 - *events.ts* contains the route */events/:careRecipientId/:timeStart/:timeEnd* which returns all the events between *timeStart* and *timeEnd* (in milliseconds) concerning the care recipient represented by its id.

## Environments variables

This project uses the following environment's variables to store the informations of the database : 
 - DATABASE_HOST
 - DATABASE_PORT
 - DATABASE_USERNAME
 - DATABASE_PASSWORD
 - DATABASE_NAME
 - DATABASE_DIALECT
 - BACK_END_PORT

## Usage

You can run it on your machine by following those steps : 

1. install the dependencies
	```
	npm install
	```
	
2. setting the environments variables in a .env file at the root of the project

3. run the HTTP server
	```
	npm run dev
	```