import { useState, useRef, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithGoogle } from '../utils/firebase'
import { Mic, Upload, Play, Square, Music, Wind, Flame, Droplets, ArrowRight, Sparkles, FileAudio, X, Loader2, Activity, LogIn, ChevronLeft, ChevronRight, Leaf, BookOpen, Star, Quote, Users } from 'lucide-react'
import styles from './Welcome.module.css'

const mockAnalysis = {
  pitchRange: 'D3 – A5 (2.3 Octaves)', baseFrequency: 'Sa = C# (138.6 Hz)',
  vocalType: 'Mezzo / Madhya Saptak Dominant', prakritiGuess: 'Vata-Pitta',
  prakritiScores: { vata: 68, pitta: 55, kapha: 32 },
  breathStrength: 78, pitchAccuracy: 76, vocalEndurance: 85,
  suggestedRaag: 'Raag Yaman', suggestedTime: 'Evening Sandhya Kaal',
}

const serviceSlides = [
  { title: 'AI Voice Analysis', desc: 'Discover your pitch range, vocal type, and Prakriti alignment in under 60 seconds.', icon: Mic, color: 'var(--saffron)', link: '/app/dashboard', badge: 'Core Feature' },
  { title: 'Riyaz Framework', desc: 'Structured practice plans inspired by gharana traditions — alankar, taan, and raag studies.', icon: Music, color: 'var(--soft-green)', link: '/app/riyaz', badge: 'Practice' },
  { title: 'SwarSuraksha Herbs', desc: 'Ayurvedic herbs and throat remedies curated by vocal health specialists.', icon: Leaf, color: 'var(--soft-green)', link: '/app/herbs', badge: 'Wellness' },
  { title: 'Vocal Health Tracking', desc: 'Monitor breath strength, pitch accuracy, and vocal endurance over time.', icon: Activity, color: 'var(--saffron)', link: '/app/progress', badge: 'Health' },
  { title: 'Practice Library', desc: 'Alankars, ragas, pranayama guides and yogasana — all in one place.', icon: BookOpen, color: 'var(--gold)', link: '/app/library', badge: 'Resources' },
]

const analyzeStages = ['Detecting pitch range…', 'Analyzing tonal quality…', 'Mapping swar patterns…', 'Evaluating breath support…', 'Determining Prakriti alignment…', 'Building your vocal profile…']

export default function Welcome({ user }) {
  const navigate = useNavigate()
  const [step, setStep] = useState('idle')
  const [fileName, setFileName] = useState(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [analysis, setAnalysis] = useState(null)
  const [analyzeProgress, setAnalyzeProgress] = useState(0)
  const [signingIn, setSigningIn] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const fileInputRef = useRef(null)
  const timerRef = useRef(null)

  const currentStage = analyzeStages[Math.min(Math.floor(analyzeProgress / (100 / analyzeStages.length)), analyzeStages.length - 1)]

  const runAnalysis = () => {
    setStep('analyzing'); setAnalyzeProgress(0)
    const interval = setInterval(() => {
      setAnalyzeProgress(p => { if (p >= 100) { clearInterval(interval); setStep('complete'); setAnalysis(mockAnalysis); return 100 } return p + 2 })
    }, 60)
  }

  const startRecording = useCallback(() => {
    setStep('recording'); setRecordingTime(0); setFileName(null); setAnalysis(null)
    timerRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000)
  }, [])

  const stopRecording = useCallback(() => { clearInterval(timerRef.current); runAnalysis() }, [])

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) { setFileName(file.name); setStep('uploading'); setAnalysis(null); setTimeout(runAnalysis, 800) }
  }, [])

  const resetAll = () => { setStep('idle'); setFileName(null); setRecordingTime(0); setAnalysis(null); setAnalyzeProgress(0); clearInterval(timerRef.current) }
  const formatTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  const handleSignIn = async () => {
    setSigningIn(true)
    try { await signInWithGoogle(); navigate('/app/dashboard') } catch { setSigningIn(false) }
  }

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroLogoRow}>
            <div className={styles.heroLogoIcon}><Music size={14} color="white" /></div>
            <span className={styles.heroLogoText}>Swarataa</span>
          </div>
          <h1 className={styles.heroTitle}>Discover Your Vocal Identity</h1>
          <p className={styles.heroSub}>Share your voice and let Swarataa map your tonal fingerprint, Prakriti alignment, and personalized riyaz path.</p>
        </div>
      </div>

      {/* Login / User Strip */}
      <div className={styles.strip}>
        <div className={styles.stripCard}>
          {user ? (
            <>
              <div className={styles.stripLeft}>
                {user.photoURL && <img src={user.photoURL} className={styles.stripAvatar} referrerPolicy="no-referrer" alt="" />}
                <div>
                  <div className={styles.stripTitle}>Welcome back, {user.displayName?.split(' ')[0]}</div>
                  <div className={styles.stripSub}>Continue your vocal journey</div>
                </div>
              </div>
              <button className={styles.stripBtn} onClick={() => navigate('/app/dashboard')}>
                Dashboard <ArrowRight size={13} />
              </button>
            </>
          ) : (
            <>
              <div className={styles.stripLeft}>
                <div className={styles.stripIconWrap}><LogIn size={16} color="var(--saffron)" /></div>
                <div>
                  <div className={styles.stripTitle}>Sign in with Google</div>
                  <div className={styles.stripSub}>Access your personalized vocal health plan</div>
                </div>
              </div>
              <button className={styles.stripBtn} onClick={handleSignIn} disabled={signingIn}>
                {signingIn ? <Loader2 size={13} className={styles.spin} /> : <LogIn size={13} />}
                {signingIn ? 'Signing in…' : 'Sign In'}
              </button>
            </>
          )}
        </div>
        <div className={styles.trialBadge}>
          <span className={styles.trialLabel}>Free Trial</span>
          <span className={styles.trialDays}>7 days left</span>
          <span className={styles.trialSub}>Sing below to unlock your dashboard</span>
        </div>
      </div>

      {/* Services Carousel */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
        <div className={styles.carouselHeader}>
          <div className={styles.carouselTitle}><Sparkles size={14} color="var(--saffron)" /> Explore Swarataa</div>
          <div className={styles.carouselControls}>
            <button className={styles.carouselBtn} onClick={() => setCarouselIndex(p => (p - 1 + serviceSlides.length) % serviceSlides.length)}><ChevronLeft size={14} /></button>
            <button className={styles.carouselBtn} onClick={() => setCarouselIndex(p => (p + 1) % serviceSlides.length)}><ChevronRight size={14} /></button>
          </div>
        </div>
        <div className={styles.carouselSlides}>
          {[0, 1, 2].map(offset => {
            const slide = serviceSlides[(carouselIndex + offset) % serviceSlides.length]
            return (
              <Link key={offset} to={slide.link} className={`${styles.slide} ${offset === 0 ? styles.slideActive : ''}`}>
                <div className={styles.slideIcon}><slide.icon size={18} color={slide.color} /></div>
                <div className={styles.slideBody}>
                  <div className={styles.slideTitleRow}>
                    <span className={styles.slideTitle}>{slide.title}</span>
                    <span className={styles.slideBadge} style={{ color: slide.color }}>{slide.badge}</span>
                  </div>
                  <p className={styles.slideDesc}>{slide.desc}</p>
                </div>
              </Link>
            )
          })}
        </div>
        <div className={styles.carouselDots}>
          {serviceSlides.map((_, i) => <button key={i} className={`${styles.dot} ${i === carouselIndex ? styles.dotActive : ''}`} onClick={() => setCarouselIndex(i)} />)}
        </div>
      </div>

      {/* Voice Input */}
      <div className={styles.voiceGrid}>
        {/* Record */}
        <div className={`card ${styles.voiceCard} ${step === 'recording' ? styles.voiceCardActive : ''}`}>
          <div className={styles.voiceCardHeader}>
            <div className={styles.voiceIcon} style={{ background: 'rgba(232,135,58,0.12)' }}><Mic size={22} color="var(--saffron)" /></div>
            <div>
              <h3 className={styles.voiceTitle}>Sing Live</h3>
              <p className={styles.voiceSub}>Record your voice in real-time</p>
            </div>
          </div>
          <p className={styles.voiceDesc}>Sing a few lines of any raag or sustain 'Sa' for 15–30 seconds. The app will analyze your pitch, tone, and breath quality.</p>
          {step === 'recording' ? (
            <div className={styles.recording}>
              <div className={styles.waveform}>{Array.from({ length: 20 }).map((_, i) => <div key={i} className={styles.bar} style={{ height: `${12 + Math.random() * 28}px` }} />)}</div>
              <div className={styles.recRow}>
                <span className={styles.recTime}><span className={styles.recDot} /> {formatTime(recordingTime)}</span>
                <button className={styles.stopBtn} onClick={stopRecording}><Square size={13} /> Stop</button>
              </div>
            </div>
          ) : (
            <button className={styles.startBtn} onClick={startRecording} disabled={step !== 'idle'}>
              <Mic size={15} /> Start Recording
            </button>
          )}
        </div>

        {/* Upload */}
        <div className={`card ${styles.voiceCard} ${step === 'uploading' ? styles.voiceCardActiveGreen : ''}`}>
          <div className={styles.voiceCardHeader}>
            <div className={styles.voiceIcon} style={{ background: 'rgba(74,124,106,0.12)' }}><Upload size={22} color="var(--soft-green)" /></div>
            <div>
              <h3 className={styles.voiceTitle}>Upload File</h3>
              <p className={styles.voiceSub}>Upload a voice recording</p>
            </div>
          </div>
          <p className={styles.voiceDesc}>Upload an existing recording — MP3, WAV, M4A, or OGG (up to 10 MB). A 30-second clip is enough for accurate analysis.</p>
          {fileName ? (
            <div className={styles.fileRow}>
              <FileAudio size={15} color="var(--soft-green)" />
              <span className={styles.fileName}>{fileName}</span>
              <button className={styles.clearBtn} onClick={resetAll}><X size={13} /></button>
            </div>
          ) : (
            <>
              <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              <button className={styles.uploadBtn} onClick={() => fileInputRef.current?.click()} disabled={step !== 'idle'}>
                <Upload size={15} /> Choose Audio File
              </button>
            </>
          )}
        </div>
      </div>

      {/* Analysis Progress */}
      {step === 'analyzing' && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className={styles.analysisHeader}>
            <Loader2 size={18} color="var(--saffron)" className={styles.spin} />
            <div>
              <h3 className={styles.analysisTitle}>Analyzing Your Voice</h3>
              <p className={styles.analysisSub}>{currentStage}</p>
            </div>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${analyzeProgress}%` }} />
          </div>
          <div className={styles.progressRow}><span>Processing...</span><span>{analyzeProgress}%</span></div>
        </div>
      )}

      {/* Analysis Results */}
      {step === 'complete' && analysis && (
        <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
          <div className={styles.resultsHeader}>
            <p className={styles.resultsLabel}>Voice Analysis Complete</p>
            <h2 className={styles.resultsTitle}>Your Vocal Profile</h2>
          </div>
          <div className={styles.resultsBody}>
            <div className={styles.resultsMeta}>
              {[
                { label: 'Pitch Range', value: analysis.pitchRange, color: 'var(--saffron)' },
                { label: 'Base Frequency', value: analysis.baseFrequency, color: 'var(--soft-green)' },
                { label: 'Vocal Type', value: analysis.vocalType, color: 'var(--gold)' },
              ].map(s => (
                <div key={s.label} className={styles.metaCard} style={{ borderColor: s.color + '30' }}>
                  <span className={styles.metaLabel}>{s.label}</span>
                  <span className={styles.metaValue} style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.resultsMetrics}>
              {[
                { label: 'Breath Strength', value: analysis.breathStrength, color: 'var(--saffron)' },
                { label: 'Pitch Accuracy', value: analysis.pitchAccuracy, color: 'var(--soft-green)' },
                { label: 'Vocal Endurance', value: analysis.vocalEndurance, color: 'var(--gold)' },
              ].map(m => (
                <div key={m.label} className={styles.metric}>
                  <div className={styles.metricRow}><span>{m.label}</span><span style={{ color: m.color }}>{m.value}%</span></div>
                  <div className={styles.metricTrack}><div className={styles.metricFill} style={{ width: `${m.value}%`, background: m.color }} /></div>
                </div>
              ))}
            </div>
            <div className={styles.raagSuggestion}>
              <Music size={18} color="var(--soft-green)" />
              <div>
                <p>Suggested starting raag: <strong style={{ color: 'var(--soft-green)' }}>{analysis.suggestedRaag}</strong></p>
                <p className={styles.raagTime}>Best practiced during {analysis.suggestedTime}</p>
              </div>
            </div>
            <div className={styles.resultsActions}>
              <button className="btn-primary" onClick={() => navigate(user ? '/app/dashboard' : '/login')}>
                {user ? 'Enter Dashboard' : 'Sign In to Save'} <ArrowRight size={15} />
              </button>
              <button className="btn-secondary" onClick={() => navigate('/quiz')}>
                <Sparkles size={14} /> Full Prakriti Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cultural Section */}
      <div className={styles.cultural}>
        <div className={styles.culturalHeader}>
          <Star size={16} color="var(--gold)" />
          <div>
            <h2 className={styles.culturalTitle}>The Living Tradition</h2>
            <p className={styles.culturalSub}>Celebrating Indian classical vocal heritage</p>
          </div>
        </div>

        <div className={styles.quoteCard}>
          <Quote size={22} color="var(--saffron)" style={{ opacity: 0.6, flexShrink: 0, marginTop: 2 }} />
          <p className={styles.quoteText}>"Nada Brahma" — Sound is the Creator. In the Hindustani tradition, the voice is not merely an instrument; it is the most intimate bridge between the human spirit and the divine.</p>
        </div>

        <div className={styles.gharanaStrip}>
          <p className={styles.gharanaLabel}>Great Gharana Traditions</p>
          <div className={styles.gharanaList}>
            {[
              { name: 'Gwalior', trait: 'Clarity & openness' },
              { name: 'Kirana', trait: 'Melodic depth' },
              { name: 'Jaipur-Atrauli', trait: 'Rhythmic precision' },
              { name: 'Agra', trait: 'Powerful voice' },
              { name: 'Patiala', trait: 'Taan mastery' },
              { name: 'Indore', trait: 'Innovation' },
            ].map(g => (
              <div key={g.name} className={styles.gharanaItem}>
                <span className={styles.gharanaName}>{g.name}</span>
                <span className={styles.gharanaTrait}>{g.trait}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.skipRow}>
        <button className={styles.skip} onClick={() => navigate('/app/dashboard')}>Skip for now → Explore Dashboard</button>
      </div>
    </div>
  )
}
