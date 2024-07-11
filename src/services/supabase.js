import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://iythqiiduytaljdvygwk.supabase.co';

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\
eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5dGhxaWlkdXl0YWxqZHZ5Z3drI\
iwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxNzU2ODQsImV4cCI6MjAzNTc1MTY4NH0\
.yfzW62T5aVASiARz8XD9wl23NYdfrz4JZdULjaArNWs"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;