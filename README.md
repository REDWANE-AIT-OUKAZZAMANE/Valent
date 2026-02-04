# 💌 Valentine's Day App 💌

## About
A simple application to ask your friends and family to be your Valentine :-). Enjoy 💖!

## Getting Started
In the project directory, you can: 

1. Fork the repo
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deploying to GitHub Pages

This project is configured to be deployed to GitHub Pages using GitHub Actions.

### Automatic Deployment

The project includes a GitHub Actions workflow that automatically builds and deploys the site to GitHub Pages when you push to the `main` branch.

#### Steps to Enable GitHub Pages:

1. Go to your repository on GitHub
2. Click on **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Push changes to the `main` branch or manually trigger the workflow from the **Actions** tab
5. Once the workflow completes, your site will be available at:
   - `https://<your-username>.github.io/Valent/`

### Manual Build

To build the project locally for static export:

```bash
npm run build
```

This will generate a static site in the `out/` directory that can be deployed to any static hosting service.
