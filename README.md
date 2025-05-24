# GymBeam Case Study - React Developer (2025, Level 1)

## Objective
The objective of the Case Study is to create a simple web application using React, Next.js and Tailwind, containing a list of products and a detail view for authenticated customers using Fake Store API. All information regarding installing and starting the project and any additional details will be provided in the README.md file. It's crucial to prioritize a good user experience to satisfy potential customers.

## Introduction
This project is a web application built as part of the GymBeam React Developer interview process. It allows authenticated users to browse a list of products and view product details, fetched from the FakeStoreAPI. The primary focus was on creating a good user experience, adhering to functional and non-functional requirements, and demonstrating proficiency in the specified tech stack (Next.js, React, Tailwind CSS, TypeScript).

## Technologies Used
- **Framework:** Next.js (v15.3.2 using App Router)
- **UI Library:** React (v19.0.0)
- **Styling:** Tailwind CSS (v4)
- **Language:** TypeScript
- **API:** FakeStoreAPI (for product data and authentication)
- **State Management:** React Context API (`AuthContext.tsx`), `useState`
- **Routing:** Next.js App Router
- **Icons:** `react-icons` (v5.5.0) - Used for UI elements across the application.
- **Loading Indicators:** `react-spinners` (v0.17.0) - For visual feedback during data fetching.
- **Linting/Formatting:** ESLint (as per Next.js defaults)

## Getting Started

### Prerequisites
- Node.js (LTS version recommended, e.g., v18.x or v20.x)
- npm (v8.x or later) or yarn (v1.22.x or later)

### Installation & Setup
1.  **Clone the repository (or extract the zip folder):**
    If you received the project as a Git repository:
    ```bash
    git clone <repository-url>
    cd gymbeam-interview
    ```
    If you received a zip file, extract it and navigate into the project's root directory (`gymbeam-interview`).

2.  **Install dependencies:**
    Open your terminal in the project's root directory and run:
    ```bash
    npm install
    ```
    or if you prefer yarn:
    ```bash
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
    The application will typically start on `http://localhost:3000`. Open this URL in your browser.

## Project Structure
The project follows a standard Next.js App Router structure:
-   **`/src/app`**: Contains all application routes (pages), layouts, and server-side API handlers.
    -   **`/api`**: Backend API Route Handlers. These act as a proxy to the FakeStoreAPI, allowing for potential enhancements like caching or abstracting API keys (though not strictly needed for FakeStoreAPI).
        -   `/products/route.ts`: Fetches all products.
        -   `/products/[id]/route.ts`: Fetches a single product by ID.
        -   `/products/categories/route.ts`: Fetches all product categories.
        -   `/products/category/[categoryName]/route.ts`: Fetches products by category.
    -   **`/login/page.tsx`**: The login page component.
    -   **`/products/page.tsx`**: The product listing page component.
    -   **`/products/[id]/page.tsx`**: The product detail page component.
    -   **`layout.tsx`**: The root layout for the application, wrapping all pages. Includes `Navbar`, `Footer`, `AnnouncementBar`, and `AuthProvider`.
    -   **`page.tsx`**: The homepage component, which handles redirection based on authentication status.
    -   **`globals.css`**: Global styles, primarily for importing Tailwind CSS.
-   **`/src/components`**: Reusable React components used throughout the application.
-   **`/src/contexts`**: React Context for global state management, specifically `AuthContext.tsx` for authentication.
-   **`/src/hooks`**: Directory for custom React hooks (currently empty).
-   **`/src/types`**: Contains TypeScript type definitions, e.g., `types.ts` for the `Product` interface.
-   **`/public`**: Static assets like images (e.g., GymBeam logo).

## Functional Requirements Met
The application successfully meets the specified functional requirements:
-   **1a. Customer Login:** Implemented via the `/login` page. Users can log in using credentials provided by FakeStoreAPI. Registration is optional and not implemented as per the case study.
-   **1b. Product Access for Logged-in Users:**
    -   Once logged in, customers can access the product listing page (`/products`).
    -   They can navigate to individual product detail screens (`/products/[id]`).
-   **1c. Cart Operations:** Cart operations are explicitly stated as not part of this case study and are therefore not implemented. A placeholder cart icon and dropdown are present in the Navbar for UI completeness.
-   **1d. Customer Logout:** Authenticated users can log out of the application. The logout option is available in the user profile dropdown in the Navbar.

## Non-Functional Requirements Met
-   **2a. Browser Compatibility:** The application uses modern web technologies (React, Next.js, Tailwind CSS) and standard HTML/CSS, ensuring it runs smoothly on the most popular browsers (e.g., Google Chrome, Firefox, Safari, Edge).
-   **2b. Consistent UI/UX:**
    -   Tailwind CSS provides a consistent design language.
    -   Reusable components (`ProductCard`, `Navbar`, etc.) ensure UI uniformity.
    -   User feedback is provided through loading spinners (`LoadingSpinner`) and error messages.
-   **2c. GymBeam Brand Identity:**
    -   The GymBeam logo is prominently displayed in the `Navbar`.
    -   A color scheme featuring orange accents, consistent with GymBeam's branding, is used.
    -   Components like `AnnouncementBar` and `Banner` are included to emulate common e-commerce/brand features, with the `Banner` content inspired by GymBeam's own site.
-   **2d. FakeStoreAPI Usage:** All product data and authentication logic (login endpoint) utilize the `https://fakestoreapi.com`.
-   **2e. Local Executability:** The project is fully executable on a local device by following the "Installation & Setup" instructions.

## API Routes (Proxy to FakeStoreAPI)
Next.js Route Handlers are used as a backend proxy to interact with the FakeStoreAPI. This approach offers benefits like:
-   Centralized API interaction logic.
-   Server-side caching capabilities (implemented here).
-   Abstraction of the external API from the client-side code.

All API routes implement:
-   Error handling for API failures.
-   Caching strategy: `next: { revalidate: 3600 }` (data is cached for 1 hour, with stale-while-revalidate behavior) and specific `tags` for potential on-demand revalidation.

-   **`GET /api/products`**
    -   **Description:** Fetches a list of all products.
    -   **Proxies to:** `https://fakestoreapi.com/products`
    -   **Cache Tag:** `products`
-   **`GET /api/products/[id]`**
    -   **Description:** Fetches a single product by its ID.
    -   **Example:** `/api/products/1`
    -   **Proxies to:** `https://fakestoreapi.com/products/{id}`
    -   **Cache Tag:** `product-{id}`
-   **`GET /api/products/categories`**
    -   **Description:** Fetches a list of all available product categories.
    -   **Proxies to:** `https://fakestoreapi.com/products/categories`
    -   **Cache Tag:** `categories`
-   **`GET /api/products/category/[categoryName]`**
    -   **Description:** Fetches products belonging to a specific category.
    -   **Example:** `/api/products/category/electronics`
    -   **Proxies to:** `https://fakestoreapi.com/products/category/{categoryName}` (URL encoded)
    -   **Cache Tag:** `category-{categoryName}`

## Core Components (`src/components`)
-   **`AnnouncementBar.tsx`**: A simple bar at the top of the page to display promotional messages.
-   **`Banner.tsx`**: Displays a banner with key selling points, inspired by the GymBeam website, using icons from `react-icons`.
-   **`Footer.tsx`**: Application footer with links, social media icons, and copyright information.
-   **`LoadingSpinner.tsx`**: A reusable component that displays a `ClipLoader` (from `react-spinners`) during data loading states.
-   **`Navbar.tsx`**: The main navigation bar. Includes the GymBeam logo, a placeholder search bar, and icons for user profile (login/logout) and a placeholder shopping cart. Adapts based on authentication status.
-   **`ProductCard.tsx`**: Renders individual product information in a card format on the product listing page, including image, title, truncated description, price, and rating.
-   **`ProtectedRoute.tsx`**: A client-side wrapper component that ensures only authenticated users can access its children. It redirects to `/login` if the user is not authenticated or if authentication status is still loading.
-   **`StarRating.tsx`**: A component to display product ratings visually using star icons (`LuStar` from `react-icons`).

## Key Concepts & Implementation Details

### Authentication (`src/contexts/AuthContext.tsx`)
-   Authentication state is managed globally using `AuthContext`.
-   **Login Process:** The `LoginPage` (`src/app/login/page.tsx`) directly calls the `https://fakestoreapi.com/auth/login` endpoint of FakeStoreAPI.
    -   For ease of testing, the login form is pre-filled with valid test credentials: `username: mor_2314`, `password: 83r5^_`.
-   **Token Storage:** Upon successful login, the received authentication token is stored in `localStorage`.
-   **Context Value:** `AuthContext` provides `isAuthenticated` (boolean), `token` (string|null), `login(token)` function, `logout()` function, and an `isLoading` (boolean) state.
-   **Initial Load Handling:** The `isLoading` state in `AuthContext` manages the initial check for a token in `localStorage`, preventing premature redirects or UI flashes before the authentication status is determined.
-   **Logout:** The `logout` function removes the token from `localStorage` and updates the context state, redirecting the user to `/login`.

### Protected Routes
-   The `ProtectedRoute.tsx` component is used to guard routes that require authentication (e.g., `/products` and `/products/[id]`).
-   It leverages the `useAuth` hook to check `isAuthenticated` and `isLoading` states. If not authenticated and not loading, it redirects to `/login` using `next/navigation`'s `router.replace()`.

### Data Fetching & Caching
-   **Client-Side Fetching:** Pages like `ProductsPageContent` (in `/products/page.tsx`) and `ProductDetailPageContent` (in `/products/[id]/page.tsx`) use `useEffect` and `fetch` to call the internal Next.js API routes (e.g., `/api/products`).
-   **Server-Side Caching (via API Routes):** The Next.js API routes that proxy to FakeStoreAPI implement data caching with a 1-hour revalidation time. This improves performance and reduces redundant calls to the external API.
-   **Loading and Error States:** All data-fetching operations include handling for loading and error states, providing appropriate feedback to the user (e.g., via `LoadingSpinner` or error messages).

### Styling & UI
-   **Tailwind CSS:** Used for all styling, enabling rapid development of a responsive and consistent UI.
-   **GymBeam Brand Alignment:** Efforts were made to align with the GymBeam brand through logo usage, a color palette featuring orange, and UI components like the `AnnouncementBar` and `Banner`.
-   **Responsive Design:** The application is designed to be responsive, with layouts and components adapting to various screen sizes (mobile, tablet, desktop) using Tailwind's responsive utility classes.

## Enhancements (Going Above and Beyond Requirements)
Several features and practices were implemented to enhance the application beyond the minimum requirements:
-   **Robust API Proxy Layer:** The Next.js API Route Handlers provide a clean abstraction over the FakeStoreAPI, with built-in caching and error handling.
-   **Improved User Experience:**
    -   Clear loading indicators (`LoadingSpinner`).
    -   Informative error messages on API failures.
    -   `StarRating` component for visual product ratings.
    -   Category filtering on the products page.
-   **Enhanced Brand Feel:**
    -   `AnnouncementBar.tsx` for promotions.
    -   `Banner.tsx` showcasing company strengths, styled similarly to the official GymBeam site.
    -   A more complete `Footer.tsx` with common e-commerce links.
-   **Client-Side Auth Management:** A well-structured `AuthContext` for managing authentication state, including handling the initial loading state from `localStorage`.
-   **Responsive UI:** Navbar, product grid, and product detail page are responsive.
-   **TypeScript:** Used throughout the project for better code quality and maintainability.
-   **Pre-filled Login Form:** For convenient testing of the authenticated user flow.
-   **Thoughtful Component Design:** Components are designed to be reusable and focused.

## How to Test
1.  **Launch the application:** Run `npm run dev` or `yarn dev` and open `http://localhost:3000`.
2.  **Initial State:** You should be automatically redirected from the homepage (`/`) to the `/login` page because you are not yet authenticated.
3.  **Login:**
    -   On the `/login` page, the username and password fields are pre-filled with valid test credentials (e.g., `username: mor_2314`, `password: 83r5^_`).
    -   Click the "Login" button.
4.  **Authenticated Experience:**
    -   Upon successful login, you will be redirected to the `/products` page.
    -   **Product Listing (`/products`):**
        -   Browse the list of products.
        -   Test the category filter buttons to view products from specific categories or all products.
    -   **Product Detail (`/products/[id]`):**
        -   Click "View Details" on any product card to navigate to its detail page.
        -   Verify that all product information (image, title, description, price, rating) is displayed correctly.
        -   The "Buy Now" button is a placeholder and will trigger an alert.
5.  **Logout:**
    -   Click the user profile icon (LuUser) in the Navbar.
    -   Select "Logout" from the dropdown menu.
    -   You should be redirected back to the `/login` page.
6.  **Accessing Protected Routes After Logout:**
    -   Try to manually navigate to `/products` or any product detail page (e.g., `/products/1`) after logging out.
    -   You should be redirected back to `/login`.

## Output Submission
As per the case study requirements, the submission includes:
1.  **Screenshots:** Screenshots of the application for both desktop and mobile views.
2.  **Source Code:** This source code, shared via a Git repository or packed in a zip folder.

---
*This Case Study project was developed by Pavol Padyšák.*
