# Japesh Babbar · Portfolio 🚀

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![LeetCode](https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black)](https://leetcode.com/u/japeshbabbar/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/japeshbabbar)

> **Personal developer portfolio and interactive showcase of Japesh Babbar** — Computer Science Engineering student at Guru Tegh Bahadur Institute of Technology (GGSIPU), Delhi. Focusing on Machine Learning, Document AI, Data Structures & Algorithms, and full-stack development with live API-driven telemetry.

---

## 🌟 Highlights & Key Features

- **⚡ Live LeetCode Analytics:**
  - Real-time GraphQL proxy fetching live problem counts categorized by difficulty (`Easy`, `Medium`, `Hard`).
  - Active submission streak, total active days, contest rating, and interactive annual activity heatmap.
- **🐙 Live GitHub Profile Telemetry:**
  - Dynamic contribution activity calendar fetched via GitHub GraphQL API.
  - Automatic language distribution calculation across public repositories with color-coded breakdown.
  - Featured pinned / recently updated public repositories.
- **🛠️ AI & Machine Learning Project Showcase:**
  - **RECTIF-AI:** High-accuracy document verification engine leveraging OCR (EasyOCR & PyTesseract), fuzzy string matching (RapidFuzz), FastAPI, and Google Gemini API built at Vihaan 9.0 (DTU).
  - **Loan Prediction System:** Machine learning classification pipeline with exploratory data analysis, class imbalance handling, and comparative model evaluation (Random Forest, Decision Tree, Logistic Regression).
- **🎓 Interactive Background & Experience:**
  - Timeline highlighting leadership (IEEE GTBIT Student Branch Coordinator) and academic milestones.
  - Categorized skill grid covering Languages (C++, Python, JS), Core CS concepts, Web Frameworks, ML libraries, and Developer tools.
- **📱 Ultra-Lightweight & Accessible:**
  - Zero heavy framework bundle overhead; instant first-contentful paint.
  - Native CSS design tokens with smooth scrolling, micro-interactions, and full accessibility support (`prefers-reduced-motion` compatible).
  - Direct resume download and quick contact links (Email, Phone, LinkedIn, LeetCode, GitHub).

---

## 🏗️ Architecture & Directory Structure

```plaintext
japesh-portfolio/
├── api/
│   ├── github.js        # Vercel Serverless Function: Proxies GitHub REST & GraphQL API
│   └── leetcode.js      # Vercel Serverless Function: Proxies LeetCode GraphQL API
├── index.html           # Single-page portfolio application with modern CSS & dynamic JS
├── resume.pdf           # Downloadable curriculum vitae / resume
├── package.json         # Project metadata and development scripts
├── vercel.json          # Deployment & routing configuration
├── .gitignore           # Git ignore rules for node_modules, logs, and environments
└── README.md            # Comprehensive project documentation
```

---

## 🔌 Serverless Functions (`/api`)

Browsers cannot query LeetCode or authenticated GitHub endpoints directly due to CORS restrictions and API credential protection. This repository uses **Vercel Serverless Functions** as caching microservices:

### 1. LeetCode Proxy (`/api/leetcode`)
- **Upstream:** `https://leetcode.com/graphql`
- **Output:**
  - `solved`: Solved counts by difficulty level (`All`, `Easy`, `Medium`, `Hard`)
  - `calendar`: Daily timestamp-to-submission count mapping for heatmap rendering
  - `streak`: Current daily problem solving streak
  - `activeDays`: Total active coding days
  - `rating`: Contest rating and attended contest count
- **Cache-Control:** `s-maxage=1800, stale-while-revalidate=86400` (Cached for 30 minutes at edge)

### 2. GitHub Telemetry (`/api/github`)
- **Upstream:** `https://api.github.com/users/{USER}`, `.../repos`, and `https://api.github.com/graphql`
- **Output:**
  - `repos`: Public repository count
  - `followers`: Total followers
  - `langs`: Aggregated language breakdown across non-forked repos
  - `contributions`: Total annual contributions and daily activity map
  - `top`: Top public repositories with descriptions, primary language, and push timestamps
- **Cache-Control:** `s-maxage=900, stale-while-revalidate=86400` (Cached for 15 minutes at edge)

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [Vercel CLI](https://vercel.com/docs/cli) (optional, for running serverless functions locally)

### 1. Clone the repository
```bash
git clone https://github.com/japeshbabbar/portfolio.git
cd portfolio
```

### 2. Run locally with Vercel CLI (Recommended)
Running through Vercel CLI enables both the static `index.html` and the serverless functions in `/api`:
```bash
# Install Vercel CLI globally if not already installed
npm install -g vercel

# Start local development server
vercel dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Alternative: Run as static page
If you only need to preview the static markup and styling, you can open `index.html` directly in any web browser or use VS Code Live Server / Python HTTP server:
```bash
python -m http.server 8000
```
*(Note: Live stats in `/api` will fallback gracefully to profile links if serverless functions are not running).*

---

## ⚙️ Environment Variables (Optional)

When deploying to [Vercel](https://vercel.com), you can configure the following optional environment variables in your project settings:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `GITHUB_USER` | GitHub username to fetch stats for | `japeshbabbar` |
| `GITHUB_TOKEN` | Personal Access Token (classic or fine-grained) to fetch private contributions & bypass API rate limits | *None* |
| `LEETCODE_USER` | LeetCode handle to fetch stats for | `japeshbabbar` |

---

## 🚢 Deployment

### Deploying to Vercel (Recommended)
1. Fork or push this repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
3. Import the `portfolio` repository.
4. Leave Root Directory as `./` and Framework Preset as **"Other"**.
5. (Optional) Add `GITHUB_TOKEN` under Environment Variables for higher rate limits.
6. Click **Deploy**. Vercel will automatically host both the static frontend and the `/api` serverless functions.

---

## 📬 Contact & Connect

- **Portfolio:** [japeshbabbar/portfolio](https://github.com/japeshbabbar/portfolio)
- **LinkedIn:** [linkedin.com/in/japesh-babbar-673509374](https://www.linkedin.com/in/japesh-babbar-673509374/)
- **GitHub:** [@japeshbabbar](https://github.com/japeshbabbar)
- **LeetCode:** [@japeshbabbar](https://leetcode.com/u/japeshbabbar/)
- **Email:** [japeshbabbar63@gmail.com](mailto:japeshbabbar63@gmail.com)
- **Phone:** +91 70154 36700

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Feel free to star ⭐ the repository if you found it useful!
