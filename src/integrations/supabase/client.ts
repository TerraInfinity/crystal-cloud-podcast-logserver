// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tpjlmokgivhurtcdwjil.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwamxtb2tnaXZodXJ0Y2R3amlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MTI3NjIsImV4cCI6MjA2MDE4ODc2Mn0.pbPyp9dPmMW0V7CIBejJRRoK8BhtzvSMiYNFel1qghE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);