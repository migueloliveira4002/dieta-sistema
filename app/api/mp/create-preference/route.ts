export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) {
      return new Response(JSON.stringify({ error: 'Missing MP_ACCESS_TOKEN' }), { status: 500 });
    }

    const { name } = await req.json().catch(() => ({ name: undefined }));
    const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || vercelUrl || 'http://localhost:3001';

    const body: any = {
      items: [
        {
          title: 'Plano Personalizado + Bônus',
          description: 'Protocolo de Efeito Bariátrica Natural',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 29.9,
        },
      ],
      external_reference: name || 'lead',
      back_urls: {
        success: `${baseUrl}/obrigado`,
        pending: `${baseUrl}/obrigado`,
        failure: `${baseUrl}/obrigado`,
      },
    };
    if (baseUrl.startsWith('https://')) {
      body.auto_return = 'approved';
    }

    const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...body,
        notification_url: `${baseUrl}/api/mp/webhook`,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: data?.message || 'Failed to create preference' }), { status: 500 });
    }

    return new Response(JSON.stringify({ init_point: data.init_point, sandbox_init_point: data.sandbox_init_point, id: data.id }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Unexpected error' }), { status: 500 });
  }
}
