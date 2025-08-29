<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1dbMNtT7fhSC_KyooaCuxz1ktLkDQLv06

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your actual Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

## Getting a Gemini API Key

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Create a new API key
4. Copy the key and paste it in your `.env.local` file

## Security Notes

- **Never commit `.env` or `.env.local` files to version control**
- The `.env.example` file shows what environment variables are needed
- For production deployment, set environment variables in your hosting platform's dashboard
