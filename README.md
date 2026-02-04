# Kunal Khaire - Developer Universe Portfolio

A fully animated, interactive portfolio website themed around a cosmic "Developer's Universe". Built with React, Tailwind CSS, Framer Motion, and GSAP.

## 🚀 Features

- **Cosmic Theme**: Immersive space exploration interface.
- **Interactive Animations**: Framer Motion entrance effects, floating elements, and particle backgrounds.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Performance**: Lazy loading, optimized assets, and best practices.
- **Contact Form**: Integrated with EmailJS.

## 🛠️ Tech Stack

- **Frontend**: React 18, Create React App
- **Styling**: Tailwind CSS, PostCSS
- **Animation**: Framer Motion, GSAP
- **Icons**: React Icons (FontAwesome, Simple Icons)

## 🏃‍♂️ Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/kunalkhaire302/portfolio-universe.git
   cd portfolio-universe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌍 Deployment

### Vercel (Recommended)
This project is configured for Vercel. follows these steps:

1.  **Push to GitHub**: Ensure your latest code is pushed to your GitHub repository.
2.  **Login to Vercel**: Go to [vercel.com](https://vercel.com) and sign up/login with GitHub.
3.  **Add New Project**: Click "Add New..." -> "Project".
4.  **Import Repository**: Find `portfolio-universe` and click "Import".
5.  **Configure Project**:
    *   **Framework Preset**: Select `Create React App`.
    *   **Root Directory**: `./` (default).
    *   **Environment Variables**: **CRITICAL STEP**
        *   Expand the "Environment Variables" section.
        *   Add the following keys (copy values from your local `.env` file):
            *   `REACT_APP_EMAILJS_SERVICE_ID`
            *   `REACT_APP_EMAILJS_TEMPLATE_ID`
            *   `REACT_APP_EMAILJS_PUBLIC_KEY`
6.  **Deploy**: Click "Deploy". Vercel will build and launch your site.

### Netlify
1. Drag and drop the `build` folder.
2. Ensure redirects are handled (`_redirects` or `netlify.toml`).

## 📞 Contact

- **Email**: kunalkhaire302@gmail.com
- **LinkedIn**: [Kunal Khaire](https://linkedin.com/in/kunal-khaire)
- **GitHub**: [kunalkhaire302](https://github.com/kunalkhaire302)

---
© 2026 Kunal Khaire. All Rights Reserved.
