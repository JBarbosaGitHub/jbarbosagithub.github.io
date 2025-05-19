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
- Vite (with base config for GitHub Pages)
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

## Deployment (GitHub Pages)

To deploy this Vite React app to GitHub Pages:

1. **Set the base path in `vite.config.js`:**
   ```js
   export default defineConfig({
     base: '/', // For user/organization pages
     plugins: [react()],
   })
   ```
2. **Build the project:**
   ```bash
   npm run build
   ```
3. **Copy the contents of the `dist` folder to the root of your repository.**
   - Overwrite old files as needed.
   - Remove the `dist` folder after copying.
4. **Create a `404.html` file:**
   - Copy the contents of `index.html` and save as `404.html` in the root.
   - This enables client-side routing with React Router on GitHub Pages.
5. **Commit and push your changes to GitHub.**
6. **Visit your site:**
   - `https://<your-username>.github.io/`

## Project Structure
```
404.html           # For SPA routing on GitHub Pages
index.html         # Main HTML entry point
src/
  Components/      # Reusable UI components (Header, Footer, HomeContent, ContactForm)
  Pages/           # Main pages (Home, About, Services, Contact)
  assets/          # Images and static assets
  index.jsx        # App entry point
  App.jsx          # Main app and routing
vite.config.js     # Vite configuration (with base path)
```

## Customization
- To change the logo, replace `src/assets/logo.png` with your own image.
- To update social links, edit the URLs in `Footer.jsx`.
- To add or edit content, modify the relevant page/component in `src/Pages` or `src/Components`.

## License
This project is for educational and demonstration purposes.
