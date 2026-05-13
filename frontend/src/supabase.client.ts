import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gqdoxsqtwzikvbeirnrl.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxZG94c3F0d3ppa3ZiZWlybnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTcyMTksImV4cCI6MjA5Mzk5MzIxOX0.N40u-MhyLXsHtsRcdS9pjR7aKWAAuNBZONSK60rN4as';

export const supabase = createClient(supabaseUrl, supabaseKey);
