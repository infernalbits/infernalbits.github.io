# GitHub Pages Deployment Instructions

This project is configured to deploy the frontend to GitHub Pages as a static site. The backend server components are not needed for the coming soon page functionality.

## Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to the `main` branch.

### Setup Steps:

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add InfernalBits coming soon page"
   git push origin main
   ```

2. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **"GitHub Actions"**
   - The first deployment will start automatically

3. **Configure repository permissions:**
   - Go to **Settings** → **Actions** → **General**
   - Under **Workflow permissions**, ensure **"Read and write permissions"** is selected
   - Save changes

4. **Access your deployed site:**
   - Your site will be available at: `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`
   - The deployment process takes 2-3 minutes

## Manual Deployment (Alternative)

If you prefer to deploy manually or want to test the build process:

### Prerequisites:
- Node.js 20+ installed
- Your repository cloned locally

### Steps:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build for GitHub Pages:**
   ```bash
   # Replace YOUR-REPO-NAME with your actual repository name
   npx vite build --base=/YOUR-REPO-NAME/
   
   # Add SPA routing support
   cp dist/public/index.html dist/public/404.html
   ```

3. **Deploy to GitHub Pages:**
   ```bash
   npx gh-pages -d dist/public -b gh-pages
   ```

4. **Enable GitHub Pages:**
   - Go to your repository **Settings** → **Pages**
   - Set **Source** to **"Deploy from a branch"**
   - Select **"gh-pages"** branch and **"/ (root)"** folder
   - Save

## Custom Domain (Optional)

If you want to use a custom domain like `infernalbits.com`:

1. **Add CNAME file:**
   ```bash
   echo "infernalbits.com" > dist/public/CNAME
   ```

2. **Update build command:**
   ```bash
   npx vite build --base=/
   cp dist/public/index.html dist/public/404.html
   echo "infernalbits.com" > dist/public/CNAME
   ```

3. **Configure DNS:**
   - Add a CNAME record pointing to `YOUR-USERNAME.github.io`
   - Or add A records pointing to GitHub Pages IPs

## Development vs Production

- **Development**: Run `npm run dev` for full-stack development with hot reload
- **Production**: The GitHub Pages deployment only includes the frontend static files
- **Local testing**: You can test the built version by serving the `dist/public` folder

## Troubleshooting

### Build Issues
- Make sure to use `npx vite build` instead of `npm run build` for GitHub Pages
- The `--base` flag must match your repository name exactly

### Routing Issues
- The 404.html file ensures single-page application routing works on GitHub Pages
- If deep links don't work, verify the 404.html file was created correctly

### Asset Loading Issues
- Check that the `--base` path matches your repository name
- For custom domains, use `--base=/` instead

## Repository Requirements

- Repository must be **public** (for free GitHub Pages)
- Or you need **GitHub Pro/Team/Enterprise** for private repository Pages
- The `gh-pages` branch will be created automatically

Your InfernalBits coming soon page will be live with all animations, terminal effects, and hidden link functionality working perfectly on GitHub Pages!