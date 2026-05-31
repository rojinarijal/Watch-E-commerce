# ⌚ Timeless Aura — Watch E-Commerce Website

<div align="center">

![Timeless Aura](https://img.shields.io/badge/Timeless-Aura-red?style=for-the-badge&logo=appstore&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

**A premium watch e-commerce platform built with HTML, CSS, JavaScript, and Node.js + Express backend.**

</div>

---

## 🌟 Features

- 🏠 **Home Page** — Animated hero carousel with promotional banners, trending products, and deals section
- 🛍️ **Products Page** — Full product listing with search, filter, and sort functionality
- 🔍 **Product Detail Page** — Individual product view with add-to-cart and wishlist support
- 📖 **Blog Page** — Watch-related blog articles and tips
- 👥 **About Us Page** — Brand story and team information
- 🛒 **Shopping Cart** — Add/remove items, quantity control, and total calculation
- ❤️ **Wishlist** — Save favorite watches for later
- 📩 **Contact / Newsletter** — Form with backend submission support
- 📱 **Responsive Design** — Mobile-friendly layout across all devices

---

## 🗂️ Project Structure

```
Watch ecommerce/
├── index.html          # Home page
├── product.html        # Products listing page
├── product_detail.html # Single product detail page
├── about_us.html       # About Us page
├── blog.html           # Blog page
├── style.css           # Global stylesheet
├── script.js           # Product data & core JS logic
├── cart.js             # Cart & wishlist functionality
├── server.js           # Express backend server
├── package.json        # Node.js dependencies
├── messages.json       # Contact form submissions storage
├── images/             # Product images
├── Icons/              # Icon assets
└── README.md           # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rojinarijal/Watch-E-commerce.git
   cd Watch-E-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```

4. **Open the app in your browser**
   ```
   http://localhost:5001
   ```

---

## 🖥️ Pages Overview

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with hero slider, deals, trending products |
| Products | `product.html` | Full product catalog with search & filter |
| Product Detail | `product_detail.html` | Detailed view of a selected watch |
| About Us | `about_us.html` | Brand story and team members |
| Blog | `blog.html` | Watch-related articles and news |

---

## 🔧 Backend API

The Express server (`server.js`) runs on **port 5001** and provides:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Submits a contact/newsletter form |
| `GET` | `/api/health` | Health check endpoint |

### Contact API Example

```json
POST /api/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I love your watches!"
}
```

---

## 💻 Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Page structure and semantics |
| CSS3 | Styling, animations, responsive layout |
| JavaScript (ES6+) | DOM manipulation, cart logic, dynamic content |
| Node.js | Backend runtime |
| Express.js | REST API server |
| Swiper.js | Hero image carousel/slider |
| Font Awesome | Icons |
| Google Fonts | Typography (Orbitron, Major Mono Display) |

---

## 🎨 Design Highlights

- **Dark-themed navbar** with brand colors (red & black)
- **Swiper.js hero carousel** with auto-play and navigation
- **Skewed section layouts** for modern visual appeal
- **Animated product cards** with hover effects
- **Smooth transitions** throughout the UI

---

## 🛒 Cart & Wishlist

The cart and wishlist are implemented using `localStorage`, allowing persistence between page visits without requiring a database.

- Add/remove items from cart
- Adjust item quantities
- View total price
- Save items to wishlist (heart icon)

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "cors": "^2.8.6",
    "express": "^5.2.1"
  }
}
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

**Rojina Rijal**

- GitHub: [@rojinarijal](https://github.com/rojinarijal)

---

<div align="center">
  <p>Made with ❤️ and ⌚ — <strong>Timeless Aura</strong></p>
  <p>© 2024 timelessaura.com. All rights reserved.</p>
</div>
