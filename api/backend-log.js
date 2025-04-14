
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    try {
        // Verify API key
        const apiKey = req.headers['x-api-key'];
        const expectedApiKey = process.env.VITE_API_KEY;

        if (apiKey !== expectedApiKey) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Create Supabase client directly instead of using require
        const supabase = createClient(
            process.env.SUPABASE_URL || 'https://tpjlmokgivhurtcdwjil.supabase.co',
            process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwamxtb2tnaXZodXJ0Y2R3amlsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDYxMjc2MiwiZXhwIjoyMDYwMTg4NzYyfQ.qL4zQ_TYwIZcb08w-Hur2pQcMigeCGTjnv4GFeJuSus'
        );

        if (req.method === 'DELETE') {
            // Delete all logs
            const { error } = await supabase
                .from('backend_logs')
                .delete()
                .not('id', 'is', null);

            if (error) {
                console.error("Error deleting logs:", error);
                return res.status(500).json({ error: "Failed to delete logs" });
            }

            return res.status(200).json({ success: true, message: "All logs deleted successfully" });
        } else if (req.method === 'POST') {
            // Parse request body
            const body = req.body;

            // Validate request data
            if (!body.level || !body.message) {
                return res.status(400).json({ error: "Missing required fields: level, message" });
            }

            const validLevels = ["info", "warn", "error", "debug"];
            if (!validLevels.includes(body.level)) {
                return res.status(400).json({
                    error: `Invalid log level. Must be one of: ${validLevels.join(", ")}`,
                });
            }

            // Insert log into Supabase 
            const { data, error } = await supabase
                .from('backend_logs')
                .insert({
                    level: body.level,
                    message: body.message,
                    data: body.data || null,
                })
                .select();

            if (error) {
                console.error("Error inserting log:", error);
                return res.status(500).json({ error: "Failed to insert log" });
            }

            return res.status(201).json({ success: true, log: data[0] });
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
