// Estimation de calories par photo avec l'API Gemini (clé gratuite via Google AI Studio).
// Variables Vercel : GEMINI_API_KEY (obligatoire), GEMINI_MODEL (facultatif).
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const { image } = req.body || {};
  if (!image) return res.status(400).json({ error: 'image manquante' });
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
    body: JSON.stringify({
      contents: [{ parts: [
        { inline_data: { mime_type: 'image/jpeg', data: image } },
        { text: 'Photo d’un repas. Réponds uniquement en JSON : {"nom":"description courte en français","min":entier,"max":entier}, où min et max sont une fourchette réaliste de kcal pour tout ce qui est visible.' }
      ] }],
      generationConfig: { responseMimeType: 'application/json' }
    })
  });
  const j = await r.json();
  if (!r.ok) return res.status(502).json({ error: (j.error && j.error.message) || 'API' });
  try {
    const t = j.candidates[0].content.parts.map(p => p.text || '').join('').replace(/```json|```/g, '').trim();
    return res.status(200).json(JSON.parse(t));
  } catch (e) { return res.status(502).json({ error: 'réponse illisible' }); }
};
