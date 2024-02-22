# Santex RBI Team - Front End Training Challenge

Quick challenge to help candidates to join RBI Team to catch up with currently used technologies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Goals

- Get familiar with Styled Components as styling strategy
- Get a good understanding of Apollo Client and how to integrate Graphql to a React front end application
- Use Graphql Fragments
- Acquire good practices with Jest and testing both components and hooks
- Review React hooks concepts and develop custom hooks

## Requirements

- Implement a home page with a grid of products that includes product picture, description and price (from any product variant). Hint: use Graphql query.
- Create a "Buy" button for each product in the greed and implement a mutation to update an order everytime a user clicks on that button.
  The mutation is called `addItemToOrder`. Hint: look into the API documentation section of this document
- Implement app header component that includes the subtotal of the current order and persists through page refresh. Hint: use Graphql mutation and Context API
- Add custom hook named `useStateWithStorage` with same API as `useState` hook but adding local storage capabilities. Can be used for header subtotal
- Create tests for grid UI item and other components

## API documentation

Even thought the app is already connected to a graphql endpoint, the trainee can find here all required information about `queries`, `mutations` and Graphql types.

Demos : 
UI-UX - 
![image](https://github.com/maxrikotero/challenge_santex/assets/13091618/ae257f73-8f91-4955-bf1a-aec458f4ef46)

The goal was trying to simulate the data grid of MUI matching the column index and the data property, render element function to pass react node component and get the row property to be able to use the data row.
Interaction with the localstorage use made into the custom hook.

Unit testing I mocked the responses (query-mutation) simulation the main stuff such as skeleton loading, click fired, render data and increse the sub total on the header.

TESTING - 
![image](https://github.com/maxrikotero/challenge_santex/assets/13091618/67b1af5b-f51d-42c6-9057-5fd49d647bea)



