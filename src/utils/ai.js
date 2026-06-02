export async function generatePlan(answers, questions, singerProfile = null) {
  // Tally dosha scores
  const scores = { vata: 0, pitta: 0, kapha: 0 }
  const experienceLevel = answers.experience?.dosha || 'intermediate'

  Object.entries(answers).forEach(([id, ans]) => {
    if (['vata', 'pitta', 'kapha'].includes(ans.dosha)) {
      scores[ans.dosha]++
    }
  })

  const dominant = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const primaryDosha = dominant[0][0]
  const secondaryDosha = dominant[1][1] > 0 ? dominant[1][0] : null

  const answerSummary = questions
    .map(q => `${q.question}\nAnswer: ${answers[q.id]?.label || 'Not answered'}`)
    .join('\n\n')

  const prompt = `You are an expert in Ayurveda, Hindustani classical music, and vocal health.
You are analyzing a singer's prakriti (Ayurvedic constitution) quiz results to generate a personalized vocal health and practice plan.

${singerProfile ? `SINGER PROFILE:
Voice Type: ${singerProfile.voiceType}
Training Background: ${singerProfile.training}
Primary Goal: ${singerProfile.goal}
Biggest Challenge: ${singerProfile.challenge}

` : ''}SINGER'S QUIZ ANSWERS:
${answerSummary}

DOSHA SCORES: Vata: ${scores.vata}, Pitta: ${scores.pitta}, Kapha: ${scores.kapha}
PRIMARY DOSHA: ${primaryDosha}${secondaryDosha ? ` (with secondary ${secondaryDosha})` : ''}
EXPERIENCE LEVEL: ${experienceLevel}

Generate a comprehensive, personalized vocal health plan. Format your response as JSON with this exact structure:

{
  "prakriti": {
    "primary": "${primaryDosha}",
    "secondary": "${secondaryDosha || 'none'}",
    "scores": { "vata": ${scores.vata}, "pitta": ${scores.pitta}, "kapha": ${scores.kapha} },
    "summary": "2-3 sentence description of this singer's prakriti and what it means for their voice"
  },
  "voiceProfile": {
    "strengths": ["strength 1", "strength 2", "strength 3"],
    "vulnerabilities": ["vulnerability 1", "vulnerability 2"],
    "seasonalAdvice": "One specific seasonal advice based on their dosha"
  },
  "riyazPlan": {
    "bestTime": "Specific time window for riyaz based on Swar Samay and dosha (e.g., 6–8 AM)",
    "duration": "Recommended session duration",
    "warmup": ["warmup exercise 1 (2-3 min)", "warmup exercise 2 (2-3 min)"],
    "core": ["core practice 1 with raga/alankaar recommendation", "core practice 2", "core practice 3"],
    "cooldown": ["cooldown exercise 1", "cooldown exercise 2"],
    "weeklyStructure": "Brief description of how to structure the week (e.g., 5 days practice, 2 days rest with light humming)"
  },
  "ayurveda": {
    "dietTips": ["diet tip 1 specific to dosha", "diet tip 2", "diet tip 3"],
    "toAvoid": ["food or habit to avoid 1", "food or habit to avoid 2"],
    "dailyRoutine": "One key daily routine recommendation for vocal health"
  },
  "pranayama": [
    { "name": "Pranayama name", "duration": "X minutes", "benefit": "specific benefit for their dosha/voice" },
    { "name": "Pranayama name 2", "duration": "X minutes", "benefit": "specific benefit" }
  ],
  "yoga": [
    { "name": "Asana name", "sanskrit": "Sanskrit name", "benefit": "specific vocal/dosha benefit" },
    { "name": "Asana name 2", "sanskrit": "Sanskrit name 2", "benefit": "specific benefit" }
  ],
  "swarSuraksha": {
    "kitName": "Personalized kit name based on dosha",
    "herbs": [
      { "name": "Herb name", "form": "How to take it (e.g., honey, tea, decoction)", "benefit": "specific benefit" },
      { "name": "Herb name 2", "form": "How to take it", "benefit": "specific benefit" },
      { "name": "Herb name 3", "form": "How to take it", "benefit": "specific benefit" }
    ],
    "morningGargle": "Specific gargle recipe for their dosha"
  }
}

Be specific and practical. Reference actual ragas, alankars, and Ayurvedic terms. Make this feel deeply personalized to their specific dosha combination and experience level.`

  const res = await fetch('/api/generate-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'API error')
  }

  return res.json()
}
