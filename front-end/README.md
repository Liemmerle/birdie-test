# Birdie test back end

This is the front-end of the Birdie's developper test.

## Dependencies

All the dependencies are listed in the main README of this repository.

## Project structure

here you can find an explanation of the project's structure : 
- *src/components* : contains all the react's components :
  - *src/accordion* : contains the components used to make the accordion in the modal used to shown the list of selected events.

  - *src/components/app* : contains the main component of the front.

  - *src/components/dashboard* : show for a care recipient all of its events in a week, in contains the following components : 
    - *Dashboard.tsx* : full dashboard component that show the events of a whole week and with a navbar to change the observed week.
    - *DailyPanel.tsx* : part of the dashboard showing the visits and alerts of one day.

  - *src/components/event* : components relative to events : 
    - *VisitEvents.tsx* : show in the dashboard the differents visits.
    - *AlertEvents.tsx* : used in the dashboard to show the alerts raised.

  - *src/components/menu* : components used to make the left menu in which the user can select a care recipient.

  - *src/components/modal* : components used to make the modal that show the list of selected events.

  - *src/components/Button.ts* : stylised button used in the menu and the dashboard's navbar.

- *src/store* contains the actions, reducers and sagas of redux.
  - *src/store/actions* : 
    - *index.ts* : list the different types of action.
    - *careRecipient* : action that updates the selected care recipient.
    - *careRecipientReceived* : updates the list of care recipients obtained from the back.
    - *selectedEvents* : set the events shown in the modal.
    - *events* : actions triggered to fetch the events from the back-end and updates them in the state when they are received.

  - *src/store/reducers* : at the exception of the file *eventReceived* which contains the reducer that store in the state the events received from the back, every file contains the reducer corresponding to it's corresponding action file.
  - *src/store/sagas* : 
    - *fetchCareRecipient.ts* : saga that fetch the cares recipients from the back-end.
    - *fetchEvents.ts* : saga that obtains the events from the back-end.
- *src/colorScheme.ts* : contains all the colors used by the stylised component.

## Environments variables

This project uses the following environment's variables to store the informations of the back-end : 
 - REACT_APP_BACK_END_ADDRESS
 - REACT_APP_BACK_END_PORT

## Usage

You can run it on your machine by following those steps : 

1. install the dependencies
	```
	npm install
	```

2. setting the environments variables in a .env file at the root of the project

3. run the HTTP server
	```
	npm start
	```