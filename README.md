# LeetCafe: Where Code Meets Coffee ☕💻

LeetCafe is a web application for a unique cafe concept that combines programming culture with coffee shop experiences. This innovative space allows programmers to enjoy quality coffee and food while solving coding challenges, participating in events, and connecting with fellow developers.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [User Flow](#user-flow)
- [Tech Stack](#tech-stack)
- [Key Components](#key-components)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Future Enhancements](#future-enhancements)

## Overview

LeetCafe creates a unique blend of coffee shop ambiance with a programming-focused community hub. Programmers can enjoy speciality beverages and food while tackling daily coding challenges, attending events, and networking with other developers. The application serves both as a digital menu and ordering system for the physical cafe space.

## Features

### 🏠 Landing Page
- Engaging hero section introducing the cafe concept
- Menu preview with featured items
- Problem of the Day showcase
- WiFi details with binary password (changes weekly)
- Cafe space and ambiance introduction

### 👨‍💻 LeetPool Community
- Leaderboard of top coders by streak
- Integration with user profiles
- Achievement badges showcase
- Daily streak tracking

### 🧩 Problem of the Day
- Daily coding challenge with difficulty indicator
- Code editor with syntax highlighting
- Submission system with validation
- Discount rewards for successful solutions

### 🍽️ Digital Menu
- Categorized food and beverage listings
- Item details including allergens and dietary information 
- Add to tray functionality
- Quantity selection
- Customization options

### 🛒 Order System
- Digital tray with real-time total calculation
- Order tracking
- Multiple payment options
- Downloadable PDF receipt
- Order history for registered users

### 👤 User Profiles
- Custom avatars
- Achievement tracking
- Order history
- Streak preservation

## User Flow

### Ordering System Flow
1. **Browse Menu** - Explore the categorized digital menu
2. **Add to Tray** - Select items and add them to your digital tray
3. **Review Order** - Check your selections and adjust quantities if needed
4. **Place Order** - Finalize your order and proceed to payment
5. **Choose Payment Method** - Select your preferred payment option (counter or online)
6. **Receive Receipt** - Get a digital receipt (pdf) with your order number
7. **Show to CodeBarista** - Present your order to our staff to collect your items
8. **Earn Discount** - Solve the Problem of the Day and show your solution to our "CodeValidator" staff member for a 25% discount

### Programming Challenge Flow
1. **View Daily Problem** - Check out the Problem of the Day section
2. **Code Solution** - Use the embedded code editor to write your solution
3. **Submit Answer** - Test your solution against our test cases
4. **Validate Solution** - Present your correct solution to our CodeValidator
5. **Receive Discount** - Enjoy a 25% discount on your order
6. **Build Streak** - Maintain your daily solving streak to climb the LeetPool leaderboard

## Tech Stack

### Frontend
- **React** - Component-based UI development
- **TypeScript** - Type-safe JavaScript
- **React Router** - Navigation and routing
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Component library built on Radix UI
- **Lucide React** - SVG icon library
- **Sonner** - Toast notifications

### Backend & Authentication
- **Supabase** - Backend-as-a-Service (BaaS)
  - Authentication system
  - PostgreSQL database
  - Row-level security policies
  - Real-time subscriptions

### Additional Tools
- **Recharts** - Responsive charting library
- **jsPDF** - PDF generation for receipts
- **html2canvas** - HTML to canvas conversion
- **React Hook Form** - Form validation
- **Zod** - Schema validation
- **Tanstack Query** - Data fetching and caching

## Key Components

### UI Components
- **Toast System** - Non-intrusive notifications
- **Responsive Layout** - Mobile-friendly design
- **Custom Animations** - Enhanced user experience
- **Theme Support** - Light and dark mode
- **Binary Password Component** - Unique cafe-themed password display

### Business Logic
- **AuthContext** - User authentication state management
- **TrayContext** - Order management and persistence
- **Supabase Integration** - Backend connectivity
- **Order Processing** - Complete ordering flow

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/leetcafe.git

# Navigate to project directory
cd leetcafe

# Install dependencies
npm install

# Start the development server
npm run dev

```

## Future Enhancements
-**Coding Contests** - Weekly competitive programming events
-**Community Forum** - Discussion space for programmers
-**Reservation System** - Book study spaces or meeting rooms
-**Loyalty Program** - Rewards for frequent customers
-**Collaborative Coding** - Pair programming features
-**Mobile App** - Native mobile experience

## 📜 **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Contact**
If you have any questions, suggestions, or feedback, feel free to reach out at saurabh10.pro@gmail.com .