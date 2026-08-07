export type CouplePayload = {
  name: string;
  members?: Array<{ name: string; email?: string }>;
};

export async function createCouple(payload: CouplePayload) {
  const response = await fetch('/api/couples', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Unable to create a couple profile.');
  }

  return response.json();
}
