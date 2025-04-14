
import { supabase } from "@/lib/supabase";
import { LogLevel } from "@/types/logs";

export interface LogRequest {
  level: LogLevel;
  message: string;
  data?: Record<string, any>;
}

export async function POST(request: Request) {
  try {
    // Verify API key
    const apiKey = request.headers.get("x-api-key");
    const expectedApiKey = import.meta.env.VITE_API_KEY;

    if (apiKey !== expectedApiKey) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse request body
    const body: LogRequest = await request.json();

    // Validate request data
    if (!body.level || !body.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: level, message" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const validLevels: LogLevel[] = ["info", "warn", "error", "debug"];
    if (!validLevels.includes(body.level)) {
      return new Response(
        JSON.stringify({
          error: `Invalid log level. Must be one of: ${validLevels.join(", ")}`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Insert log into Supabase
    const { data, error } = await supabase.from("backend_logs").insert({
      level: body.level,
      message: body.message,
      data: body.data || null,
    }).select();

    if (error) {
      console.error("Error inserting log:", error);
      return new Response(
        JSON.stringify({ error: "Failed to insert log" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true, log: data[0] }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
