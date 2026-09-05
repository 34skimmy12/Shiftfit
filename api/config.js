// ShiftFit runtime configuration endpoint.
// Set these values in Vercel Environment Variables; never hard-code secrets here.
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || ''
  });
}
