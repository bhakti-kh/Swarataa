const Anthropic = require('@anthropic-ai/sdk')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { vocalState, timeAvailable, prakriti, doshaKaal } = req.body

  const apiKey = process.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'API key not configured on server' })

  const client = new Anthropic({ apiKey })

  const prompt = `You are an expert Hindustani classical vocal coach and Ayurvedic wellness advisor named Guru AI.

A singer has just checked in before their riyaz session. Here is their current state:

VOCAL STATE TODAY: ${vocalState}
TIME AVAILABLE: ${timeAvailable} minutes
CURRENT DOSHA KAAL: ${doshaKaal}
${prakriti ? `SINGER'S PRAKRITI: ${JSON.stringify(prakriti)}` : 'PRAKRITI: Not yet assessed'}

Based on this, generate a personalized coaching session plan for TODAY. Be warm, encouraging, and specific.

Respond with JSON in this exact structure:
{
  "greeting": "A warm, personalized 1-sentence greeting acknowledging their vocal state today",
  "overallAdvice": "2-3 sentences of specific advice for practicing given their current state",
  "sessionPlan": [
    { "phase": "phase name", "duration": "X min", "exercise": "specific exercise name", "instruction": "brief specific instruction", "why": "why this is right for their state today" }
  ],
  "skipToday": ["thing to skip today and why in one line"],
  "focusToday": "The ONE most important thing to focus on in today's session",
  "closingMotivation": "A brief, genuine motivating message to end with"
}

Rules:
- Total session phases should add up to ${timeAvailable} minutes
- If voice is strained: no high notes, focus on humming and gentle alankars
- If fresh: full session, can include taans and higher range work
- If slightly tired: moderate session, avoid pushing
- If unsure: gentle warmup-focused session
- Reference specific ragas appropriate for ${doshaKaal}
- Keep instructions practical and actionable, not academic`

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].text
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Invalid response')

    return res.status(200).json(JSON.parse(jsonMatch[0]))
  } catch (e) {
    console.error(e.message)
    return res.status(500).json({ error: e.message })
  }
}
