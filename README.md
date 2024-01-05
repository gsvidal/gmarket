[Gmarket deployed App](https://gmarket.onrender.com)

# Distinctiveness and Complexity

The detailed description bellow demonstrates the complexity of my e-commerce application, showcasing over three years of accumulated web development expertise. In my pursuit of excellence, I opted for a challenging project, steering away from the simplicity of a basic Django React JS application. This deliberate choice reflects my commitment to meeting course requirements and building a project that meets industry standards.

## Gmarket is an e-commerce fullstack app with some CMS(Content Management System) functionalities, it's been built with:

Frontend:

- React (Javascript library to create user interfaces)
- TypeScript (Javascript superset to static typing)
- Vite (Bundler and dev environment)
- TDD (Test Driven Development)
- Vitest + React Testing Library (unit test)
- Redux + toolkit (For Centralized State Management)
- React router (For routing in the client, using Private and Public routes)
- Sass (for styling, it's like CSS but with nesting and variables)
- Axios (for making http requests with abort controller integration)
- Clean Architecture pattern (using a file structure for Components, Pages, Redux, Services, Adapters, etc ) and SOLID principles.
- Custom hooks to reuse components and state.
- Lazy loading and code splitting (to render components or pages when they are actually needed, reducing the bundle size)
- Mock Service Worker (MSW) when testing to simulate http request to the server without consuming real resources from the actual server.

## File's Content

- First we create a vite project with a react-typescript setup, then we install vitest and react testing library for testing with its proper file configurations.

- The Clean Architectural pattern applied in this project brings several benefits like maintainability, encapsulation of complexity, testability, scalability and separation of concerns. Clean Architecture emphasizes structuring code in layers, each with a distinct responsibility.

- Files:

- Components:
  (The heart of a React application), in this folder will be each piece of reusable code across the entire app:
  Button, Header, Input, Modal, Pagination, ProductForm, ProductItem, ProductList

Each and every component folder contains 4 files. Example:
Button folder:

- Button.tsx (Actual Button component: Button logic and JSX - html like sintax to create React components).
- Button.test.tsx (unit tests for Button component).
- Button.scss (Button component styling)
- index.ts (barrel file for easy and concise module exporting)

- Pages:
  Similar to component but usually larger or not sharable in many parts of the application: AuthForm, Dashboard, HomePage, Login, Register

- Redux:
  State Managment System, it provides a centralized and predictabled way to manage the state, it's used when state is used and shared between multiple components or the entire application.
  This folder contains the store (the central repository for the application's state)

- Services:
  This folder contains modules responsible for handling communication with external services (backend)
  We find an only file public.services.ts all the functions that contains the actual http request (call) and an abort controller in case the component where this call was made, has been unmounted or the user navigated to another page.

- Adapters:
  They act as a bridge between the inner and outer layers, they provide us the separation of concern we want to apply.
  We have user, product and products adapters. It's a way to ensure that if eventually the outer layer (in this case the backend serves us with a slightly different json response), we won't need to make changes in a lot of parts in our application, we'd just modify the adapter file of what wee need.

- Custom hooks:
  We encapsulate and reuse logic across different components with hooks. This allow us to have cleaner components. Like using useFectchProducts when setting the logic to handle loading, error messages or pagination related state when trying to fetch product lists for Dashboard or Home pages. Similar cases for useInput and useFetchAndLoad to handle input related logic and loading and callEndPoint related to making http requests.

## Application functionalities/features

- Users can login.
- Users can logout.
- Users can register with different roles: Seller or Customer.
- If username already exists the user will be notified with an error message.
- Depending on each of those user will have different permissions and clearance (in the front and back).
- Seller users can create a product and add name, brand, description, base price, price, stock, image (as jpg, png or jpeg) formats, and a category dropdown list.
- Only the last two (image and category) are optional, the rest are required fields.
- If a seller user doesn't meet the conditions for any field when filling them out an error message will be shown in the create product modal. (The error text comes from the back and it's caught in the frontend if something goes wrong).
- Seller can cancel or create the product.
- If seller user add the product(a http post request will be sent to the backend), if creation is successful, the product will be shown in their Dashboard menu.
- When navigating to Dashboard menu, seller user can view their products and edit them or delete them.
- When user click on edit a edit product form will be rendered and will ask for new data showing the previous data at first.
- Seller user can also delete a product, when click on delete(DELETE http request), and if it's sucessfully deleted, the item will disappear with a fading animation.
- When user clicks on delete button a similar modal will be shown with a confirmation message.
- In case of user chose the customer role, won't have access to the dashboard, but will have the permission to add products to their shopping cart.
- There's Pagination (front & back), in the client will show previous, next buttons as well as some page numbers or elipsis in case the total pages are greater than or equal to the max amount of visible pages (5).
- There's also a products-per-page filter with set values (5,10,15,25 and 50) products/page.
- These values will change the size of the pagination (a low products-per-page will result in a larger pagination pages buttons and viceversa).
- There's a toast notification component that shows a short message when success (user registered successfully, product created/edited/updated successfully, etc), also with danger (in case some http request failed, if user couldn't register successfully, or delete a product, etc.)
- Responsiveness is implemented with flexible container and products row sizes and header with a hamburger menu
- Glassy effects for Header, hamburger menu and modals.
- Dark mode by default.
- Modern theming and styling that makes the app more homogeneous and visually appealing.


## Installation and starting backend and front dev servers

Install the project:

`git clone -b web50/projects/2020/x/capstone git@github.com:me50/gsvidal.git`

To run locally:
Open a new terminal and run:

`cd gsvidal/frontend`

Install all dependencies

`npm install` (If using npm)
or
`yarn install` (If using yarn)

To start the frontend development server:

`npm run dev`

The frontend development server will be by default at local: http://localhost:5173/

## Any aditional information about the project:

This project is a fullstack web app but if you read this document until this point you'll notice that has a strong foundation in the client side (frontend). That's because I specialize as a frontend web developer.

The previous commands were meant to be used in a windows environment with a git bash terminal. Then may not work in other environment like macOS (especially the virtual environment activation process)
