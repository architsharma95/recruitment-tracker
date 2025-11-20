---
description: How to set up the Supabase backend
---

I have updated the app to use **Supabase** for authentication and data storage. Follow these steps to connect it.

## 1. Create a Supabase Project
1.  Go to [supabase.com](https://supabase.com) and sign up/log in.
2.  Click **"New Project"**.
3.  Give it a name (e.g., "Recruitment Tracker") and a password.
4.  Wait for the database to set up (takes ~1 minute).

## 2. Run the Database Schema
1.  In your Supabase dashboard, go to the **SQL Editor** (icon on the left).
2.  Click **"New Query"**.
3.  Copy the contents of the `schema.sql` file in your project (or copy the block below):

```sql
-- Create applications table
create table applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  company text not null,
  role text not null,
  status text not null default 'Applied',
  date_applied date not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create coffee_chats table
create table coffee_chats (
  id uuid default gen_random_uuid() primary key,
  application_id uuid references applications(id) on delete cascade not null,
  name text not null,
  date date not null,
  notes text,
  rating integer check (rating >= 1 and rating <= 5),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table applications enable row level security;
alter table coffee_chats enable row level security;

-- Create policies
create policy "Users can view their own applications"
  on applications for select
  using (auth.uid() = user_id);

create policy "Users can insert their own applications"
  on applications for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own applications"
  on applications for update
  using (auth.uid() = user_id);

create policy "Users can delete their own applications"
  on applications for delete
  using (auth.uid() = user_id);

create policy "Users can view coffee chats for their applications"
  on coffee_chats for select
  using (
    exists (
      select 1 from applications
      where applications.id = coffee_chats.application_id
      and applications.user_id = auth.uid()
    )
  );

create policy "Users can insert coffee chats for their applications"
  on coffee_chats for insert
  with check (
    exists (
      select 1 from applications
      where applications.id = coffee_chats.application_id
      and applications.user_id = auth.uid()
    )
  );
```
4.  Click **"Run"**.

## 3. Connect the App
1.  In Supabase, go to **Project Settings** (gear icon) -> **API**.
2.  Copy the **Project URL** and **anon public** key.
3.  In your project folder, create a file named `.env` (or rename `.env.example` to `.env`).
4.  Paste your keys:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5.  Restart your dev server (`npm run dev`).

Now your app has real user signup/login and persistent cloud storage!
