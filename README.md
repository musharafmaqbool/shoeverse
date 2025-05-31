# Thrifted Kicks - Frontend



A modern and responsive e-commerce frontend for a thrifted shoes store. This project is currently focused on the user interface and adding items to a local cart using React and styled-components. A separate backend is planned for handling actual orders and data persistence.

## Features

*   Display shoes in an interactive carousel.
*   Show detailed information (title, model, price, description) for the currently viewed shoe.
*   "Add to Cart" button with a success popup message.
*   Header with navigation links (Home, Explore, About, Contact).
*   Search, User, and Cart icons in the header.
*   Basic dropdown for the cart icon showing added items (local state).
*   Basic placeholder interface for the user icon (login).
*   Footer that appears when hovering near the bottom of the page.
*   Responsive design for various screen sizes (check using browser developer tools).

## Technologies Used

*   React
*   Styled Components
*   React Slick (for the carousel)
*   React Icons (for various icons)
*   Framer Motion (for animations, e.g., header dropdowns, popup)
*   Vite (as the build tool)
*   Git for version control
*   GitHub for hosting and collaboration

## Setup and Installation

Follow these steps to get the project running locally on your machine.

**Prerequisites:**

*   Node.js (LTS version recommended)
*   npm or Yarn or pnpm (npm is included with Node.js)

**Steps:**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/musharafmaqbool/shoes-store.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd shoes-store
    ```
3.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using Yarn:
    ```bash
    yarn install
    ```
    Or using pnpm:
    ```bash
    pnpm install
    ```
4.  **Start the development server:**
    Using npm:
    ```bash
    npm run dev
    ```
    Or using Yarn:
    ```bash
    yarn dev
    ```
    Or using pnpm:
    ```bash
    pnpm dev
    ```

    The application should now be running at `http://localhost:5175` (or a similar port).

    *To access the development server from other devices on your network (e.g., your phone), stop the server (`Ctrl + C`) and run:*
    ```bash
    npm run dev --host
    # or yarn dev --host
    # or pnpm dev --host
    ```
    *Then, access it from your phone's browser using your computer's local IP address and the port shown in the terminal (e.g., `http://192.168.10.180:5175`).*

## Usage

*   Navigate through the site using the header links.
*   Browse shoes using the carousel arrows.
*   Click "Add to Cart" to add the current shoe to the temporary cart (items are not saved persistently yet).
*   Click the bag icon in the header to view items in your cart.
*   (Backend integration pending): Future functionality will include persistent cart, checkout, user accounts, etc.

## Project Structure
