const Anthropic = require('@anthropic-ai/sdk')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' })
  }

  const apiKey = process.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' })
  }

  try {
    const client = new Anthropic.default({ apiKey })

    const message = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].text
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Invalid AI response')

    return res.status(200).json(JSON.parse(jsonMatch[0]))
  } catch (e) {
    console.error('API error:', e.message)
    return res.status(500).json({ error: e.message })
  }
}
