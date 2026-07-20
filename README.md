# Anwesha Gartia - Personal Portfolio Website

A premium, production-ready personal portfolio website for **Anwesha Gartia**, an aspiring Data Scientist, Python Developer, and Machine Learning Enthusiast. Built using semantic HTML5, modern CSS3 (featuring Grid, Flexbox, Glassmorphism, and responsive design systems), and vanilla JavaScript.

---

## 🎨 Key Features

- **Apple & Stripe Inspired Aesthetic**: Clean typography, light/dark mode theme support, subtle gradients, and glassmorphic cards.
- **Dynamic Typing Animation**: Animated headline cycle demonstrating key professional titles.
- **Interactive Counters**: Animated number counters for statistics which run when they scroll into view.
- **Scroll Progress & Header Indicators**: Fixed header transitions on scroll with an active section indicator and scroll progress tracker.
- **Preloader**: Elegant splash preloading bar to manage asset transitions.
- **Mobile-Responsive Drawer Menu**: Toggles between mobile viewports and desktop layouts.
- **Smooth Page scrolling & Back-to-Top**: Native smooth scrolling and a scroll-triggered CTA button to head back to top.
- **Interactive Contact Form**: Custom-styled form inputs with status-changing submit states, client-side simulation, and successfully sent panels.

---

## 📂 Folder Structure

```text
Base/
├── index.html        # Core markup, SEO-friendly meta-tags, and semantic layouts
├── style.css         # Styling system, responsive grid layouts, and color variables
├── script.js         # Interactive scroll animations, typing loop, theme control
├── README.md         # Detailed project setup and deployment guide
└── resume.pdf        # Placeholder file representing Anwesha's resume
```

---

## 🚀 Local Development Setup

To run this project locally, simply clone the workspace and open the `index.html` file in any modern web browser.

Alternatively, spin up a local development server using Python:

```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🌐 Deployment Instructions

### Option 1: GitHub Pages (Recommended)

GitHub Pages hosts static websites directly from a GitHub repository.

1. **Create a GitHub Repository**:
   - Go to [github.com](https://github.com/) and create a new repository (e.g. `portfolio`).
2. **Push the Workspace Files**:
   - Initialize git, commit your changes, and push to your main branch:
     ```bash
     git init
     git add .
     git commit -m "Initial commit - Portfolio Website"
     git branch -M main
     git remote add origin https://github.com/anweshagartia13/portfolio.git
     git push -u origin main
     ```
3. **Configure Pages Settings**:
   - Navigate to the repository settings tab on GitHub.
   - On the left sidebar, click **Pages**.
   - Under the **Build and deployment** section, select `Deploy from a branch` as source.
   - Select the `main` branch and folder `/ (root)`, then click **Save**.
4. **Access Website**:
   - GitHub will generate a link (e.g. `https://anweshagartia13.github.io/portfolio/`). It will be live within 1–2 minutes.

---

### Option 2: Netlify

Netlify is a fast cloud hosting platform for modern web applications.

#### Method A: Drag & Drop (Super Fast)
1. Open your web browser and go to [app.netlify.com](https://app.netlify.com/).
2. Log in or create a free account.
3. Go to the **Sites** dashboard.
4. Drag and drop the folder containing your files (containing `index.html`, `style.css`, etc.) directly into the **"Drag and drop your site folder here"** upload box.
5. Netlify will deploy it instantly and provide a random URL (e.g. `https://sparkling-bubble-abc123.netlify.app/`), which you can customize in the settings.

#### Method B: Git Integration (Continuous Deployment)
1. Link your Netlify account to your GitHub profile.
2. Select **Add new site** > **Import from Git**.
3. Choose the repository containing your website.
4. Leave build settings blank (as this is a static HTML/CSS/JS site, no build steps are required).
5. Click **Deploy Site**. Every time you push updates to GitHub, Netlify will rebuild and publish your site automatically.
