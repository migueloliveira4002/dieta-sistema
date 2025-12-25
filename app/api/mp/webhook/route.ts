export const runtime = 'nodejs';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const supabase = createClient();
    const preference_id =
      payload?.data?.preference_id ||
      payload?.merchant_order?.preference_id ||
      payload?.preference_id ||
      null;
    const payment_id =
      payload?.data?.id ||
      payload?.id ||
      payload?.payment?.id ||
      null;
    const status =
      payload?.type ||
      payload?.action ||
      payload?.data?.status ||
      payload?.payment?.status ||
      null;
    const external_reference =
      payload?.data?.external_reference ||
      payload?.merchant_order?.external_reference ||
      null;

    const { error } = await supabase
      .from('orders')
      .insert({
        preference_id,
        payment_id,
        status,
        external_reference,
        payload,
      });

    if (error) {
      return new Response(JSON.stringify({ ok: false, error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message || 'Unexpected error' }), { status: 500 });
  }
}
