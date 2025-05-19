# ContaContando Website

ContaContando is a modern, responsive website for a storytelling project. It is built with React.js and features a clean, minimalist design, responsive layout, and easy navigation.

## Features
- Responsive layout for desktop and mobile
- Modern navigation header with hamburger menu
- Home page with project introduction and navigation cards
- About page with visually engaging sections
- Contact page with location, contact info, and embedded map
- Footer with social media links and scroll-to-top button

## Tech Stack
- React.js
- CSS (custom, no CSS frameworks)
- React Router DOM
- Font Awesome (for social icons)

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd ContaContando_WebsiteTesting
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open your browser and go to `http://localhost:5173` (or the port shown in your terminal).

## Project Structure
```
src/
  Components/    # Reusable UI components (Header, Footer, HomeContent, ContactForm)
  Pages/         # Main pages (Home, About, Services, Contact)
  assets/        # Images and static assets
  index.jsx      # App entry point
  App.jsx        # Main app and routing
```

## Customization
- To change the logo, replace `src/assets/logo.png` with your own image.
- To update social links, edit the URLs in `Footer.jsx`.
- To add or edit content, modify the relevant page/component in `src/Pages` or `src/Components`.

## License
This project is for educational and demonstration purposes.
