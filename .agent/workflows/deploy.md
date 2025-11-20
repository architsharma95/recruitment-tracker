---
description: How to deploy the app to the internet (Vercel)
---

To share your app with others, you need to host the frontend. I recommend **Vercel** because it's free, fast, and works perfectly with React + Vite.

## Prerequisites
1.  **GitHub Account**: You need to push your code to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (you can log in with GitHub).

## Step 1: Push Code to GitHub
1.  Create a new repository on GitHub (e.g., `recruitment-tracker`).
2.  Run these commands in your terminal to push your code:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/recruitment-tracker.git
    git push -u origin main
    ```

## Step 2: Deploy to Vercel
1.  Go to your **Vercel Dashboard** and click **"Add New..."** -> **"Project"**.
2.  Select your `recruitment-tracker` repository and click **Import**.

## Step 3: Configure Environment Variables (Crucial!)
**Before** clicking Deploy, you must add your Supabase keys so the live app can talk to the database.

1.  In the "Configure Project" screen, look for **Environment Variables**.
2.  Add the following (copy values from your local `.env` file):
    *   **Key**: `VITE_SUPABASE_URL`
        *   **Value**: `your_supabase_url`
    *   **Key**: `VITE_SUPABASE_ANON_KEY`
        *   **Value**: `your_supabase_anon_key`
3.  Click **Deploy**.

## Step 4: Using a Custom Domain (e.g., from Wix)
If you bought a domain on **Wix** (like `www.my-app.com`), you can use it with Vercel!

1.  **Deploy to Vercel first** (steps above).
2.  In Vercel, go to **Settings** -> **Domains**.
3.  Enter your domain (e.g., `www.my-app.com`) and click **Add**.
4.  Vercel will give you **DNS records** (usually an A Record and a CNAME).
5.  Go to your **Wix Dashboard** -> **Domains** -> **Manage DNS Records**.
6.  Add the records Vercel gave you.

**Note**: You cannot "upload" this app into the Wix Website Builder. It must be hosted on Vercel, but it can *use* your Wix domain.
