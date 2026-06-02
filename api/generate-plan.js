import Anthropic from '@anthropic-ai/sdk'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' })
  }

  const client = new Anthropic({ apiKey: process.env.VITE_ANTHROPIC_API_KEY })

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].text
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Invalid AI response')

    return res.status(200).json(JSON.parse(jsonMatch[0]))
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}
