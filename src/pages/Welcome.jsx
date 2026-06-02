import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../utils/firebase'
import { ImageWithFallback } from '../components/ImageWithFallback'
import {
  Mic, Upload, Play, Square, CheckCircle2, Music, Wind, Flame,
  Droplets, ArrowRight, Sparkles, Volume2, FileAudio, X, Loader2,
  Heart, Activity, TrendingUp, CirclePlay, LogIn, Crown, Clock,
  ChevronLeft, ChevronRight, ShoppingBag, Leaf, BookOpen, Smartphone,
  Star, Quote, Users
} from 'lucide-react'

const mockAnalysis = {
  pitchRange: 'D3 – A5 (2.3 Octaves)',
  baseFrequency: 'Sa = C# (138.6 Hz)',
  vocalType: 'Mezzo / Madhya Saptak Dominant',
  prakritiGuess: 'Vata-Pitta',
  prakritiScores: { vata: 68, pitta: 55, kapha: 32 },
  breathStrength: 78, pitchAccuracy: 76, vocalEndurance: 85,
  suggestedRaag: 'Raag Yaman', suggestedTime: 'Evening Sandhya Kaal',
}

function LiveWaveform({ active }) {
  const canvasRef = useRef(null)
  const animRef = useRef(0)
  const timeRef = useRef(0)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const draw = () => {
      timeRef.current += 0.05
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)
      if (active) {
        const colors = ['#C45C26', '#1A8A7A', '#8B6914']
        colors.forEach((color, ci) => {
          ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.globalAlpha = 0.5 + ci * 0.15
          for (let x = 0; x < w; x++) {
            const amp = 20 + Math.sin(timeRef.current * (1 + ci * 0.3)) * 15
            const y = h / 2 + Math.sin(x * (0.02 + ci * 0.008) + timeRef.current * (2 + ci)) * amp
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
          }
          ctx.stroke()
        })
        ctx.globalAlpha = 1
      } else {
        ctx.beginPath(); ctx.strokeStyle = '#C45C2640'; ctx.lineWidth = 1
        ctx.moveTo(0, canvas.height / 2); ctx.lineTo(canvas.width, canvas.height / 2); ctx.stroke()
      }
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [active])
  return <canvas ref={canvasRef} width={400} height={80} className="w-full h-20 rounded-xl" />
}

const serviceSlides = [
  { title: 'AI Voice Analysis', desc: 'Discover your pitch range, vocal type, and Prakriti alignment in under 60 seconds.', icon: Mic, color: '#C45C26', link: '/dashboard', linkLabel: 'Try Free Analysis', badge: 'Core Feature' },
  { title: 'Riyaz Framework', desc: 'Structured practice plans inspired by gharana traditions — alankar, taan, and raag studies.', icon: Music, color: '#1A8A7A', link: '/riyaz', linkLabel: 'Explore Riyaz', badge: 'Practice' },
  { title: 'SwaraSuraksha Herbs', desc: 'Ayurvedic herbs and throat remedies curated by vocal health specialists.', icon: Leaf, color: '#2D6B5E', link: '/herbs', linkLabel: 'Browse Herbs', badge: 'Wellness' },
  { title: 'Vocal Health Tracking', desc: 'Monitor breath strength, pitch accuracy, and vocal endurance over time.', icon: Activity, color: '#C45C26', link: '/progress', linkLabel: 'Track Health', badge: 'Health' },
  { title: 'Practice Library', desc: 'Alankars, ragas, pranayama guides, yogasana — all in one place.', icon: BookOpen, color: '#8B6914', link: '/library', linkLabel: 'Browse Library', badge: 'Resources' },
  { title: 'Mobile App', desc: 'Take Swarataa everywhere — offline riyaz, dosha reminders, and built-in tanpura.', icon: Smartphone, color: '#6B5CE7', link: '/dashboard', linkLabel: 'Coming Soon', badge: 'Android & iOS' },
]

const culturePillars = [
  { title: 'Guru-Shishya Parampara', desc: 'The sacred teacher-student lineage that has preserved vocal techniques across centuries — each gharana carrying its own melodic personality.', icon: Users, color: '#C45C26', image: 'https://images.unsplash.com/photo-1647870186205-26ebff5add21?w=400&q=80' },
  { title: 'Raag & Rasa', desc: 'Each raag evokes a specific rasa (emotion) and is tied to a time of day — morning raags awaken, evening raags contemplate, night raags transcend.', icon: Music, color: '#1A8A7A', image: 'https://images.unsplash.com/photo-1569940572012-3f10dc929566?w=400&q=80' },
  { title: 'Ayurvedic Voice Care', desc: 'For centuries, singers have used Yashtimadhu, Tulsi, and warm ghee to protect their vocal cords — wellness and art intertwined.', icon: Leaf, color: '#2D6B5E', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&q=80' },
  { title: 'Pranayama & Breath', desc: 'Breath is the foundation of voice. Classical singers practice pranayama to build diaphragmatic control and sustain long, unbroken phrases.', icon: Wind, color: '#6B5CE7', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80' },
]

export default function Welcome({ user }) {
  const navigate = useNavigate()
  const [step, setStep] = useState('idle')
  const [fileName, setFileName] = useState(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [analysis, setAnalysis] = useState(null)
  const [analyzeProgress, setAnalyzeProgress] = useState(0)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [signingIn, setSigningIn] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const fileInputRef = useRef(null)
  const timerRef = useRef(null)
  const carouselTimerRef = useRef(null)

  useEffect(() => {
    carouselTimerRef.current = setInterval(() => setCarouselIndex(p => (p + 1) % serviceSlides.length), 4000)
    return () => clearInterval(carouselTimerRef.current)
  }, [])

  const resetCarousel = () => {
    clearInterval(carouselTimerRef.current)
    carouselTimerRef.current = setInterval(() => setCarouselIndex(p => (p + 1) % serviceSlides.length), 4000)
  }

  const analyzeStages = ['Detecting pitch range…', 'Analyzing tonal quality…', 'Mapping swar patterns…', 'Evaluating breath support…', 'Determining Prakriti alignment…', 'Building your vocal profile…']
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

  const stopRecording = useCallback(() => {
    clearInterval(timerRef.current); runAnalysis()
  }, [])

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) { setFileName(file.name); setStep('uploading'); setAnalysis(null); setTimeout(runAnalysis, 800) }
  }, [])

  const resetAll = () => { setStep('idle'); setFileName(null); setRecordingTime(0); setAnalysis(null); setAnalyzeProgress(0); clearInterval(timerRef.current) }

  const formatTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  const handleSignIn = async () => {
    setSigningIn(true)
    try { await signInWithGoogle(); navigate('/dashboard') } catch (e) { setSigningIn(false) }
  }

  return (
    <div className="space-y-5">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1724136777943-01fe8ac3f724?w=1080&q=80"
          alt="Classical music atmosphere"
          className="w-full h-44 sm:h-52 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D1810]/90 via-[#2D1810]/70 to-[#2D1810]/30 flex items-center">
          <div className="p-6 sm:p-8 text-white flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C45C26] to-[#D4956B] flex items-center justify-center">
                <Music size={14} className="text-white" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">Swarataa</span>
            </div>
            <h1 className="text-white text-xl sm:text-2xl max-w-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              Discover Your Vocal Identity
            </h1>
            <p className="text-white/70 text-xs sm:text-sm mt-1.5 max-w-md">
              Share your voice and let Swarataa map your tonal fingerprint, Prakriti alignment, and personalized riyaz path.
            </p>
          </div>
        </div>
      </div>

      {/* Login + Trial strip */}
      <div className="flex flex-col sm:flex-row gap-3">
        {user ? (
          <div className="flex-1 bg-card rounded-2xl border border-border shadow-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {user.photoURL && <img src={user.photoURL} className="w-9 h-9 rounded-full" referrerPolicy="no-referrer" alt="" />}
              <div>
                <p className="text-sm">Welcome back, {user.displayName?.split(' ')[0]}</p>
                <p className="text-[10px] text-muted-foreground">Continue your vocal journey</p>
              </div>
            </div>
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1.5 bg-[#2D1810] text-white px-4 py-2 rounded-xl text-xs hover:bg-[#3D2820] transition-colors">
              Dashboard <ArrowRight size={12} />
            </button>
          </div>
        ) : (
          <div className="flex-1 bg-card rounded-2xl border border-border shadow-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B6914]/15 to-[#C45C26]/10 flex items-center justify-center">
                <Crown size={16} className="text-[#8B6914]" />
              </div>
              <div>
                <p className="text-sm">Sign in with Google</p>
                <p className="text-[10px] text-muted-foreground">Access your personalized vocal health plan</p>
              </div>
            </div>
            <button onClick={handleSignIn} disabled={signingIn} className="flex items-center gap-1.5 bg-[#2D1810] text-white px-4 py-2 rounded-xl text-xs hover:bg-[#3D2820] transition-colors disabled:opacity-60">
              {signingIn ? <Loader2 size={13} className="animate-spin" /> : <LogIn size={13} />}
              {signingIn ? 'Signing in…' : 'Sign In'}
            </button>
          </div>
        )}
        <div className="sm:w-[220px] bg-gradient-to-br from-[#1A8A7A]/10 to-[#1A8A7A]/5 rounded-2xl border border-[#1A8A7A]/20 p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1.5">
            <Clock size={14} className="text-[#1A8A7A]" />
            <span className="text-xs text-[#1A8A7A]">Free Trial</span>
          </div>
          <p className="text-lg text-[#1A8A7A]" style={{ fontFamily: "'Playfair Display', serif" }}>7 days left</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Sing below to unlock your trial dashboard.</p>
        </div>
      </div>

      {/* Services Carousel */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-3 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#C45C26]" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Explore Swarataa</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => { setCarouselIndex(p => (p - 1 + serviceSlides.length) % serviceSlides.length); resetCarousel() }} className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => { setCarouselIndex(p => (p + 1) % serviceSlides.length); resetCarousel() }} className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[0, 1, 2].map(offset => {
              const idx = (carouselIndex + offset) % serviceSlides.length
              const slide = serviceSlides[idx]
              return (
                <Link key={`${slide.title}-${offset}`} to={slide.link}
                  className={`group rounded-xl border p-4 transition-all hover:shadow-md ${offset === 1 ? 'hidden sm:block' : ''} ${offset === 2 ? 'hidden lg:block' : ''}`}
                  style={offset === 0 ? { borderColor: `${slide.color}30`, backgroundColor: `${slide.color}06` } : { borderColor: 'var(--border)' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${slide.color}12` }}>
                      <slide.icon size={20} style={{ color: slide.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="text-sm truncate" style={{ fontFamily: "'Playfair Display', serif" }}>{slide.title}</h4>
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0" style={{ backgroundColor: `${slide.color}15`, color: slide.color }}>{slide.badge}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-2">{slide.desc}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] mt-2" style={{ color: slide.color }}>{slide.linkLabel} <ArrowRight size={10} /></span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {serviceSlides.map((_, i) => (
              <button key={i} onClick={() => { setCarouselIndex(i); resetCarousel() }}
                className={`h-1.5 rounded-full transition-all ${i === carouselIndex ? 'w-5 bg-[#C45C26]' : 'w-1.5 bg-border'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Voice Input */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className={`bg-card rounded-2xl border shadow-sm overflow-hidden transition-all ${step === 'recording' ? 'border-[#C45C26] ring-2 ring-[#C45C26]/20' : 'border-border hover:border-[#C45C26]/30'}`}>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#C45C2615' }}>
                <Mic size={22} className="text-[#C45C26]" />
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }}>Sing Live</h3>
                <p className="text-xs text-muted-foreground">Record your voice in real-time</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Sing a few lines of any raag or sustain 'Sa' for 15–30 seconds. The app will analyze your pitch, tone, and breath quality.</p>
            {step === 'recording' ? (
              <div className="space-y-3">
                <LiveWaveform active={true} />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm text-red-500 tabular-nums">{formatTime(recordingTime)}</span>
                  </div>
                  <button onClick={stopRecording} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-600 transition-colors">
                    <Square size={14} /> Stop
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={startRecording} disabled={step !== 'idle'} className="w-full flex items-center justify-center gap-2 bg-[#C45C26] text-white px-4 py-3 rounded-xl text-sm hover:bg-[#A84E20] transition-colors disabled:opacity-40">
                <Mic size={16} /> Start Recording
              </button>
            )}
          </div>
        </div>

        <div className={`bg-card rounded-2xl border shadow-sm overflow-hidden transition-all ${step === 'uploading' ? 'border-[#1A8A7A] ring-2 ring-[#1A8A7A]/20' : 'border-border hover:border-[#1A8A7A]/30'}`}>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#1A8A7A15' }}>
                <Upload size={22} className="text-[#1A8A7A]" />
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }}>Upload File</h3>
                <p className="text-xs text-muted-foreground">Upload a voice recording</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Upload an existing recording — MP3, WAV, M4A, or OGG (up to 10 MB). A 30-second clip is enough for accurate analysis.</p>
            {fileName ? (
              <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2.5">
                <FileAudio size={16} className="text-[#1A8A7A] flex-shrink-0" />
                <span className="text-sm truncate flex-1">{fileName}</span>
                <button onClick={resetAll} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>
              </div>
            ) : (
              <>
                <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()} disabled={step !== 'idle'} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#1A8A7A]/30 text-[#1A8A7A] px-4 py-3 rounded-xl text-sm hover:bg-[#1A8A7A]/5 transition-colors disabled:opacity-40">
                  <Upload size={16} /> Choose Audio File
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Analysis Progress */}
      {step === 'analyzing' && (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Loader2 size={20} className="text-[#C45C26] animate-spin" />
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }}>Analyzing Your Voice</h3>
              <p className="text-xs text-muted-foreground">{currentStage}</p>
            </div>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#C45C26] to-[#1A8A7A] rounded-full transition-all duration-300" style={{ width: `${analyzeProgress}%` }} />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-muted-foreground">Processing...</span>
            <span className="text-[10px] text-muted-foreground">{analyzeProgress}%</span>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {step === 'complete' && analysis && (
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#2D1810] to-[#3D2820] p-5">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 size={16} className="text-[#1A8A7A]" />
              <span className="text-xs text-white/60 uppercase tracking-wider">Voice Analysis Complete</span>
            </div>
            <h2 className="text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Your Vocal Profile</h2>
          </div>
          <div className="p-5 space-y-5">
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: 'Pitch Range', value: analysis.pitchRange, color: '#C45C26' },
                { label: 'Base Frequency', value: analysis.baseFrequency, color: '#1A8A7A' },
                { label: 'Vocal Type', value: analysis.vocalType, color: '#8B6914' },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3 border border-border" style={{ backgroundColor: `${s.color}08` }}>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
                  <p className="text-sm mt-1" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5"><Activity size={12} /> Vocal Health Baseline</p>
                <div className="space-y-3">
                  {[{ label: 'Breath Strength', value: analysis.breathStrength, color: '#C45C26' }, { label: 'Pitch Accuracy', value: analysis.pitchAccuracy, color: '#1A8A7A' }, { label: 'Vocal Endurance', value: analysis.vocalEndurance, color: '#8B6914' }].map(m => (
                    <div key={m.label}>
                      <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">{m.label}</span><span style={{ color: m.color }}>{m.value}%</span></div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${m.value}%`, backgroundColor: m.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-[#FFF8F0] border border-[#C45C2620] p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"><Sparkles size={12} /> Prakriti from Voice</p>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#C45C2615] text-[#C45C26] border border-[#C45C2630]">{analysis.prakritiGuess}</span>
                </div>
                <div className="space-y-2.5">
                  {[{ d: 'vata', icon: Wind, color: '#6B5CE7' }, { d: 'pitta', icon: Flame, color: '#C45C26' }, { d: 'kapha', icon: Droplets, color: '#1A8A7A' }].map(({ d, icon: Icon, color }) => (
                    <div key={d}>
                      <div className="flex justify-between text-xs mb-1"><div className="flex items-center gap-1.5"><Icon size={12} style={{ color }} /><span className="capitalize">{d}</span></div><span style={{ color }}>{analysis.prakritiScores[d]}%</span></div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${analysis.prakritiScores[d]}%`, backgroundColor: color }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gradient-to-r from-[#1A8A7A10] to-[#1A8A7A05] rounded-xl p-4 border border-[#1A8A7A20]">
              <div className="w-12 h-12 rounded-xl bg-[#1A8A7A15] flex items-center justify-center flex-shrink-0"><Music size={22} className="text-[#1A8A7A]" /></div>
              <div><p className="text-sm">Suggested starting raag: <strong className="text-[#1A8A7A]">{analysis.suggestedRaag}</strong></p><p className="text-xs text-muted-foreground">Best practiced during {analysis.suggestedTime}</p></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => navigate(user ? '/dashboard' : '/login')} className="flex-1 flex items-center justify-center gap-2 bg-[#C45C26] text-white px-6 py-3 rounded-xl hover:bg-[#A84E20] transition-colors shadow-lg shadow-[#C45C26]/20">
                {user ? 'Enter Dashboard' : 'Sign In to Save'} <ArrowRight size={16} />
              </button>
              <button onClick={() => navigate('/quiz')} className="flex items-center justify-center gap-2 border border-[#8B6914]/30 text-[#8B6914] px-5 py-3 rounded-xl text-sm hover:bg-[#8B6914]/5 transition-colors">
                <Sparkles size={14} /> Full Prakriti Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cultural content */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#8B6914]/10 flex items-center justify-center"><Star size={16} className="text-[#8B6914]" /></div>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }}>The Living Tradition</h2>
            <p className="text-xs text-muted-foreground">Celebrating Indian classical vocal heritage</p>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden">
          <ImageWithFallback src="https://images.unsplash.com/photo-1516972810927-80185027ca84?w=1080&q=80" alt="Indian classical vocalist performing" className="w-full h-44 sm:h-56 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D1810]/95 via-[#2D1810]/40 to-transparent flex flex-col justify-end p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Quote size={24} className="text-[#C45C26] flex-shrink-0 mt-0.5 opacity-70" />
              <div>
                <p className="text-white/90 text-sm sm:text-base italic max-w-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "Nada Brahma" — Sound is the Creator. In the Hindustani tradition, the voice is not merely an instrument; it is the most intimate bridge between the human spirit and the divine.
                </p>
                <p className="text-white/50 text-[10px] mt-2 uppercase tracking-wider">Ancient Vedic Philosophy of Sound</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {culturePillars.map(pillar => (
            <div key={pillar.title} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden group hover:border-[#8B6914]/20 transition-colors">
              <div className="relative h-28 overflow-hidden">
                <ImageWithFallback src={pillar.image} alt={pillar.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1810]/70 to-transparent" />
                <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${pillar.color}20` }}>
                  <pillar.icon size={16} style={{ color: pillar.color }} />
                </div>
              </div>
              <div className="p-3.5">
                <h4 className="text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{pillar.title}</h4>
                <p className="text-[11px] text-muted-foreground">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#2D1810] to-[#3D2820] rounded-2xl p-5">
          <p className="text-[10px] text-white/40 uppercase tracking-wider mb-3">Great Gharana Traditions</p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Gwalior', est: '15th c.', trait: 'Clarity & openness' },
              { name: 'Kirana', est: '19th c.', trait: 'Melodic depth' },
              { name: 'Jaipur-Atrauli', est: '19th c.', trait: 'Rhythmic precision' },
              { name: 'Agra', est: '16th c.', trait: 'Powerful voice' },
              { name: 'Patiala', est: '18th c.', trait: 'Taan mastery' },
              { name: 'Indore', est: '20th c.', trait: 'Innovation' },
            ].map(g => (
              <div key={g.name} className="bg-white/5 rounded-xl px-3 py-2 border border-white/10">
                <p className="text-xs text-white">{g.name}</p>
                <p className="text-[9px] text-white/40">{g.est} · {g.trait}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-white/30 mt-3 italic">Swarataa draws from these gharana philosophies to create personalized riyaz frameworks for every voice.</p>
        </div>
      </div>

      <div className="text-center pb-2">
        <button onClick={() => navigate('/dashboard')} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Skip for now → Explore Dashboard
        </button>
      </div>
    </div>
  )
}
