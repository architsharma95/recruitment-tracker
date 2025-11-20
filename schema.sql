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

-- Coffee chats policies (linked to applications)
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
