# GitHub Pages Deployment Instructions

This project is configured to deploy to `username.github.io` user pages, where your InfernalBits coming soon page will be served directly from the root domain.

## User Pages Deployment (username.github.io)

For `username.github.io` repositories, the source code lives in a `source` branch and built files are deployed to the `main` branch root.

### Setup Steps:

1. **Create/Use your User Pages repository:**
   - Repository must be named: `YOUR-USERNAME.github.io`
   - This will serve your site at: `https://YOUR-USERNAME.github.io`

2. **Push source code to the source branch:**
   ```bash
   git add .
   git commit -m "Add InfernalBits coming soon page source"
   
   # Create and push to source branch
   git checkout -b source
   git push -u origin source
   ```

3. **Configure GitHub Actions:**
   - Go to **Settings** → **Actions** → **General**
   - Under **Workflow permissions**, select **"Read and write permissions"**
   - This allows the workflow to push built files to the main branch

4. **Trigger deployment:**
   - Push to the `source` branch triggers automatic deployment
   - The workflow builds the project and pushes static files to `main` branch root
   - GitHub Pages serves from the `main` branch automatically

5. **Access your live site:**
   - Your site will be available at: `https://YOUR-USERNAME.github.io`
   - Clean URL with no subdirectories!

## Manual Deployment (Alternative)

If you prefer to deploy manually:

### Steps:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build for User Pages:**
   ```bash
   # Build for root path (user pages) and override output directory
   npx vite build --base=/ --outDir=dist
   
   # Add SPA routing support  
   cp dist/index.html dist/404.html
   ```

3. **Deploy to main branch:**
   ```bash
   # Deploy built files to main branch root
   npx gh-pages -d dist -b main
   ```

4. **GitHub Pages serves automatically:**
   - User Pages repositories serve from `main` branch root automatically
   - No additional configuration needed

## Custom Domain (Optional)

If you want to use a custom domain like `infernalbits.com`:

1. **Add CNAME to your repository:**
   - Create a file named `CNAME` in the root of your `source` branch
   - Add your domain: `echo "infernalbits.com" > CNAME`
   - The deployment workflow will automatically include this

2. **Configure DNS:**
   - Add a CNAME record pointing to `YOUR-USERNAME.github.io`
   - Or add A records pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Enable HTTPS:**
   - Go to repository **Settings** → **Pages**
   - Check **"Enforce HTTPS"** after DNS propagates

## Development vs Production

- **Development**: Run `npm run dev` for full-stack development with hot reload
- **Production**: The GitHub Pages deployment only includes the frontend static files
- **Local testing**: You can test the built version by serving the `dist` folder

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