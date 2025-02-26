// Script to check if the saved_locations table exists in the Supabase database
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

async function checkDatabase() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.error("Missing Supabase environment variables");
    process.exit(1);
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  try {
    // Check if the saved_locations table exists
    const { data, error } = await supabase
      .from("saved_locations")
      .select("*")
      .limit(1);

    if (error) {
      console.error("Error checking saved_locations table:", error);
      console.log(
        "\nThe saved_locations table might not exist or there might be permission issues."
      );
      console.log(
        "Make sure to run the migrations in the Supabase dashboard or using the Supabase CLI."
      );
      console.log(
        "\nMigration file: supabase/migrations/20240101000000_create_saved_locations_table.sql"
      );
    } else {
      console.log("✅ The saved_locations table exists and is accessible.");
      console.log("Data sample:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

checkDatabase();
