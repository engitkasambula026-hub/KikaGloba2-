import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";

const ADMIN_EMAIL = "engitkasambula026@gmail.com";

async function isSuperAdminAuthenticated() {
  const cookieStore = await cookies();
  const sessionEmail = cookieStore.get("kika_user_email")?.value?.toLowerCase().trim();
  const sessionActive = cookieStore.get("kika_session_active")?.value;
  return sessionActive === "true" && sessionEmail === ADMIN_EMAIL;
}

// GET: Fetch tariffs (returns full wholesale + margin data to Admin, retail-only to Members)
export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL || "");
    const isAdmin = await isSuperAdminAuthenticated();

    const rows = await sql`
      SELECT tariff_id, country_prefix, destination_name, wholesale_cost_sek_min, retail_rate_sek_min, retail_rate_sek_sec
      FROM kika_voip_tariffs
      ORDER BY destination_name ASC;
    `;

    if (isAdmin) {
      return NextResponse.json({ success: true, isAdmin: true, tariffs: rows });
    }

    // Strip all wholesale figures before returning to regular members
    const publicTariffs = rows.map((r: any) => ({
      country_prefix: r.country_prefix,
      destination_name: r.destination_name,
      retail_rate_sek_sec: parseFloat(r.retail_rate_sek_sec)
    }));

    return NextResponse.json({ success: true, isAdmin: false, tariffs: publicTariffs });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST: Super-Admin Tariff Recalculation & Decimal Precision Engine
export async function POST(request: Request) {
  try {
    if (!(await isSuperAdminAuthenticated())) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Super-Admin credentials required." },
        { status: 403 }
      );
    }

    const { countryPrefix, destinationName, wholesaleCostMinSEK, retailRatePerSecSEK, decimalPlaces } = await request.json();

    if (!countryPrefix || retailRatePerSecSEK === undefined) {
      return NextResponse.json({ success: false, error: "Prefix and target per-second rate are required." }, { status: 400 });
    }

    const precision = Math.min(6, Math.max(2, Number(decimalPlaces || 4)));
    const cleanPerSec = Number(parseFloat(retailRatePerSecSEK).toFixed(precision));
    const derivedRetailPerMin = parseFloat((cleanPerSec * 60).toFixed(4));
    const wholesaleMin = parseFloat(wholesaleCostMinSEK || "0");

    const sql = neon(process.env.DATABASE_URL || "");

    await sql`
      INSERT INTO kika_voip_tariffs (country_prefix, destination_name, wholesale_cost_sek_min, retail_rate_sek_min)
      VALUES (${countryPrefix.trim()}, ${destinationName || countryPrefix}, ${wholesaleMin}, ${derivedRetailPerMin})
      ON CONFLICT (country_prefix)
      DO UPDATE SET
        destination_name = COALESCE(${destinationName}, kika_voip_tariffs.destination_name),
        wholesale_cost_sek_min = ${wholesaleMin},
        retail_rate_sek_min = ${derivedRetailPerMin};
    `;

    return NextResponse.json({
      success: true,
      message: `Updated ${countryPrefix} tariff to ${cleanPerSec.toFixed(precision)} SEK/sec (Derived Equivalent: ${derivedRetailPerMin.toFixed(4)} SEK/min).`
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
