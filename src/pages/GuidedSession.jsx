import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, SkipForward, Clock, CheckCircle2, ChevronRight, Volume2, ExternalLink } from 'lucide-react'
import styles from './GuidedSession.module.css'

// ── Curated video library by level and phase ──────────────────────────────
const VIDEOS = {
  warmup: {
    beginner: [
      { id: 'a_XrRKzrT8Y', title: "Let's Sing! — Warmup Exercises", channel: 'Raag Hindustani' },
      { id: 'Mo73nXFYnEM', title: 'How to Practice SAA — Foundation', channel: 'Mayoor Music' },
    ],
    intermediate: [
      { id: 'BL9FHu9r9do', title: 'Startup Vocal Exercise — Complete Tutorial', channel: 'Parth Vocals' },
      { id: 'a_XrRKzrT8Y', title: "Let's Sing! — Warmup Exercises", channel: 'Raag Hindustani' },
    ],
    advanced: [
      { id: 'BL9FHu9r9do', title: 'Startup Vocal Exercise — Complete Tutorial', channel: 'Parth Vocals' },
      { id: 'Mo73nXFYnEM', title: 'How to Practice SAA — Foundation', channel: 'Mayoor Music' },
    ],
  },
  alankars: {
    beginner: [
      { id: 'x3-L91DbWZY', title: 'Sa Re Ga Ma Lesson #1 — Basic Alankar', channel: 'Daily Riyaz' },
      { id: 'B4HUZdXVgzk', title: 'Sa Re Ga Ma Lesson #2 — Alankar', channel: 'Daily Riyaz' },
    ],
    intermediate: [
      { id: 'EYZWXDcqTSc', title: 'Alankar Practice for Singers', channel: 'Raag Hindustani' },
      { id: '4jBAcTg1Uik', title: 'Expand Vocal Range — Alankar', channel: 'Raag Hindustani' },
    ],
    advanced: [
      { id: 'LCTQFnXCYgE', title: 'Gamak Voice Training — Alankar', channel: 'Raag Hindustani' },
      { id: '4jBAcTg1Uik', title: 'Expand Vocal Range — Alankar', channel: 'Raag Hindustani' },
    ],
  },
  raga: {
    beginner: [
      { id: 'G8UAmSr2Bw0', title: 'Raag Yaman for Beginners', channel: 'VoxGuru' },
      { id: 'Q9t-KiJKDPI', title: 'Raag Bhairav — Introduction', channel: 'Hindustani Vocal' },
    ],
    intermediate: [
      { id: 'rrwtS9bYax4', title: 'Learn Raag Bhairav — Full Tutorial', channel: 'Hindustani Raga' },
      { id: 'G8UAmSr2Bw0', title: 'Raag Yaman Practice', channel: 'VoxGuru' },
    ],
    advanced: [
      { id: 'rrwtS9bYax4', title: 'Learn Raag Bhairav — Full Tutorial', channel: 'Hindustani Raga' },
      { id: '2Ak_ZCuPWfc', title: 'Hindustani Vocals — Advanced', channel: 'Classical Music Hub' },
    ],
  },
  cooldown: {
    beginner: [{ id: 't-ieofpopmU', title: 'Farinelli Breathing — Breath Management', channel: 'Vocal Science' }],
    intermediate: [{ id: 't-ieofpopmU', title: 'Farinelli Breathing — Breath Management', channel: 'Vocal Science' }],
    advanced: [{ id: 't-ieofpopmU', title: 'Farinelli Breathing — Breath Management', channel: 'Vocal Science' }],
  },
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function getVideos(category, level) {
  return VIDEOS[category]?.[level] || VIDEOS[category]?.beginner || []
}

export default function GuidedSession({ plan, sessionPlan }) {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(null)
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [completedSteps, setCompletedSteps] = useState([])
  const [activeVideo, setActiveVideo] = useState(0)
  const intervalRef = useRef(null)

  const level = plan?.prakriti?.primary === 'kapha' ? 'intermediate' : 'beginner'

  // Use passed sessionPlan or build a fallback
  const session = sessionPlan || {
    totalMinutes: 20,
    dosha: { label: 'Current Kaal', raga: 'Raag Yaman' },
    steps: [
      { id: 'warmup', phase: 'Warmup', emoji: '🌅', duration: 4 * 60, items: ['Humming on Sa', 'Lip trills', 'Vowel exercises'], instruction: 'Start gently. Focus on breath and ease into your voice.', videoCategory: 'warmup' },
      { id: 'alankars', phase: 'Alankar Practice', emoji: '🎵', duration: 5 * 60, items: ['Saral alankars 1–5', 'Sa Re Ga Ma Pa'], instruction: 'Systematic swara patterns. Slow first, then gradually increase pace.', videoCategory: 'alankars' },
      { id: 'raga', phase: 'Raga Riyaz', emoji: '🎼', duration: 9 * 60, items: ['Raag Yaman — aaroha avaroha', 'Slow alaap'], instruction: 'Begin with slow alaap, then build to faster passages.', videoCategory: 'raga' },
      { id: 'cooldown', phase: 'Cooldown', emoji: '🌙', duration: 2 * 60, items: ['Soft humming', 'Deep breathing'], instruction: 'Bring your voice down gently. End in silence.', videoCategory: 'cooldown' },
    ],
  }

  const currentStep = session.steps[stepIndex]
  const videos = getVideos(currentStep?.videoCategory, level)

  // Set timer when step changes
  useEffect(() => {
    if (currentStep) {
      setTimeLeft(currentStep.duration)
      setActiveVideo(0)
    }
  }, [stepIndex])

  // Timer logic
  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current)
            handleStepComplete()
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, stepIndex])

  const handleStart = () => setRunning(true)

  const handleStepComplete = () => {
    setRunning(false)
    setCompletedSteps(prev => [...prev, currentStep.id])
    if (stepIndex < session.steps.length - 1) {
      setTimeout(() => {
        setStepIndex(i => i + 1)
        setRunning(true)
      }, 1500)
    } else {
      setCompleted(true)
    }
  }

  const handleSkip = () => {
    clearInterval(intervalRef.current)
    handleStepComplete()
  }

  const progress = session.steps.slice(0, stepIndex).reduce((a, s) => a + s.duration, 0)
  const totalDuration = session.steps.reduce((a, s) => a + s.duration, 0)
  const overallProgress = ((progress + (currentStep?.duration - (timeLeft || currentStep?.duration))) / totalDuration) * 100

  // ── Completion screen ─────────────────────────────────────────────────
  if (completed) {
    return (
      <div className={styles.completePage}>
        <div className={styles.completeInner}>
          <div className={styles.completeIcon}>🎉</div>
          <h1>Riyaz Complete!</h1>
          <p>You completed a {session.totalMinutes}-minute session. Excellent practice today.</p>
          <div className={styles.completedSteps}>
            {session.steps.map(step => (
              <div key={step.id} className={styles.completedStep}>
                <CheckCircle2 size={16} color="var(--soft-green)" />
                <span>{step.emoji} {step.phase}</span>
              </div>
            ))}
          </div>
          <div className={styles.completeActions}>
            <button className="btn-primary" onClick={() => navigate('/app/start')}>Practice Again</button>
            <button className="btn-secondary" onClick={() => navigate('/app/dashboard')}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {/* Overall progress bar */}
      <div className={styles.overallProgress}>
        <div className={styles.overallFill} style={{ width: `${Math.min(overallProgress, 100)}%` }} />
      </div>

      {/* Step tabs */}
      <div className={styles.stepTabs}>
        {session.steps.map((step, i) => (
          <div
            key={step.id}
            className={`${styles.stepTab} ${i === stepIndex ? styles.stepTabActive : ''} ${completedSteps.includes(step.id) ? styles.stepTabDone : ''}`}
          >
            <span>{step.emoji}</span>
            <span className={styles.stepTabLabel}>{step.phase}</span>
            {completedSteps.includes(step.id) && <CheckCircle2 size={12} color="var(--soft-green)" />}
          </div>
        ))}
      </div>

      <div className={styles.layout}>
        {/* Left — Timer + Instructions */}
        <div className={styles.leftPane}>
          <div className="card" style={{ padding: 28, textAlign: 'center' }}>
            <p className={styles.phaseLabel}>{currentStep?.emoji} {currentStep?.phase}</p>

            {/* Timer */}
            <div className={styles.timerWrap}>
              <svg viewBox="0 0 120 120" className={styles.timerSvg}>
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(26,74,74,0.08)" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="54"
                  fill="none"
                  stroke="var(--saffron)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 54}`}
                  strokeDashoffset={`${2 * Math.PI * 54 * (1 - (timeLeft || 0) / (currentStep?.duration || 1))}`}
                  transform="rotate(-90 60 60)"
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div className={styles.timerInner}>
                <span className={styles.timerNum}>{formatTime(timeLeft || currentStep?.duration || 0)}</span>
                <span className={styles.timerLabel}>remaining</span>
              </div>
            </div>

            {/* Control */}
            {!running ? (
              <button className="btn-primary" onClick={handleStart} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Play size={16} fill="white" /> {timeLeft === currentStep?.duration ? 'Begin' : 'Resume'}
              </button>
            ) : (
              <div className={styles.controls}>
                <button className={styles.pauseBtn} onClick={() => { setRunning(false); clearInterval(intervalRef.current) }}>
                  Pause
                </button>
                <button className={styles.skipBtn} onClick={handleSkip}>
                  <SkipForward size={14} /> Skip
                </button>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="card" style={{ padding: 20 }}>
            <p className={styles.instructionTitle}>Instructions</p>
            <p className={styles.instructionText}>{currentStep?.instruction}</p>
            <ul className={styles.itemList}>
              {currentStep?.items?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — Videos */}
        <div className={styles.rightPane}>
          <p className={styles.videosTitle}><Volume2 size={14} /> Reference Videos</p>
          {videos.map((video, i) => (
            <div key={i} className={styles.videoCard}>
              <div className={`${styles.videoTab} ${activeVideo === i ? styles.videoTabActive : ''}`} onClick={() => setActiveVideo(i)}>
                <div className={styles.videoThumb}>
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                    className={styles.thumbImg}
                  />
                  {activeVideo !== i && (
                    <div className={styles.thumbPlay}><Play size={16} fill="white" color="white" /></div>
                  )}
                </div>
                <div className={styles.videoInfo}>
                  <p className={styles.videoTitle}>{video.title}</p>
                  <p className={styles.videoChannel}>{video.channel}</p>
                </div>
              </div>
              {activeVideo === i && (
                <div className={styles.embedWrap}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=0&rel=0&modestbranding=1`}
                    title={video.title}
                    className={styles.embed}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
