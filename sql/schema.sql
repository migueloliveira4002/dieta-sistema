-- Enable pgcrypto for gen_random_uuid()
create extension if not exists "pgcrypto";

-- Table: Leads (Temporary quiz data)
create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text,
  quiz_data jsonb,
  status text default 'started' -- 'started', 'completed'
);

-- Table: Users (Profiles linked to Auth)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  whatsapp text,
  quiz_data jsonb,
  status text default 'paid', -- 'pending', 'paid', 'delivered'
  created_at timestamptz default now()
);

-- RLS Policies (Security)
alter table leads enable row level security;
alter table profiles enable row level security;

-- Allow public to insert leads (for the quiz)
create policy "Enable insert for public" on leads for insert with check (true);
-- Allow public to read their own lead if they have the ID (optional, depending on flow)
-- For this app, server actions will handle everything so we bypass RLS on server side or use service role if needed, 
-- but 'public insert' is good for anonymous quiz takers.

-- Profiles policies
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

create table orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  preference_id text,
  payment_id text,
  status text,
  external_reference text,
  payload jsonb
);
alter table orders enable row level security;
create policy "Enable insert for public" on orders for insert with check (true);
-- Function to handle new user signup (Optional: Automatically create profile on auth signup)
-- For this specific flow, we are creating the profile manually via server action after payment, so we might not need a trigger.
