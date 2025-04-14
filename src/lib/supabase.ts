
import { supabase as supabaseClient } from "@/integrations/supabase/client";

// Export the supabase client from the integrations folder
export const supabase = supabaseClient;

export type LogTable = 'backend_logs' | 'frontend_logs';
