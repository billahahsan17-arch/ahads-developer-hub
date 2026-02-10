
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Atlas AI Developer Hub

An elite engineering operating system and educational platform with 12 pillars of mastery, guided by the Atlas AI mentor.

## 🚀 Deployment Protocol (Cloud Uplink)

To keep this system running **24/7 globally**, follow these deployment steps.

### 1. Source Control
Push your code to a private or public GitHub repository.

```bash
git init
git add .
git commit -m "Initialize Atlas Core"
# Add your remote origin
git push -u origin main
```

### 2. Cloud Infrastructure (Vercel)
This project is optimized for [Vercel](https://vercel.com).

1.  Login to Vercel and **Import** your GitHub repository.
2.  **CRITICAL:** In the *Environment Variables* section, add your neural link:
    *   **Key:** `API_KEY`
    *   **Value:** `Your_Google_Gemini_API_Key_Here`
3.  Click **Deploy**.

### 3. System Behavior
*   **Cloud Mode:** When the `API_KEY` is present in Vercel, the app connects to Google's Gemini Flash model for live intelligence.
*   **Local/Offline Mode:** If the API key fails or you lose internet, the system automatically falls back to the **Local Kernel** (Regex & heuristic logic) to ensure 100% uptime.

## 🛠️ Run Locally (Dev Mode)

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `API_KEY` in `.env.local`:
   ```bash
   API_KEY=your_key_here
   ```
3. Run the app:
   `npm run dev`
