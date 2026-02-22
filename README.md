# Trials and Triumphs 🃏

**A comprehensive platform for creating and managing card game events.**

Trials and Triumphs is a full-stack solution designed for tournament organizers and card game enthusiasts. It streamlines the entire event lifecycle—from player registration and character selection to real-time status tracking and administrative management.

## ✨ Features

- **Event Management:** Create and manage card game tournaments and events.
- **Character Selection:** Integrated system for players to select and lock in their characters.
- **Real-Time Status:** Live dashboards for tracking event progress and player standings.
- **Admin Dashboard:** Centralized control for organizers to manage participants and event data.
- **Secure Authentication:** Robust login and registration system powered by Supabase.
- **Responsive Tables:** Optimized data viewing using TanStack Table.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16+](https://nextjs.org/) (App Router)
- **Backend/Auth:** [Supabase](https://supabase.com/) (PostgreSQL + GoTrue)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Data Management:** [TanStack Table](https://tanstack.com/table)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Supabase Account & Project

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/XotEmBotZ/Trials-and-Triumphs.git
   cd Trials-and-Triumphs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Variables:
   Create a `.env.local` file and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 📊 Roadmap
- [ ] Automated matchmaking logic.
- [ ] Bracket generation for Swiss and Single Elimination.
- [ ] Exportable event reports (PDF/CSV).
