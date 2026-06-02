import styles from './Landing.module.css'

export default function Landing({ navigate }) {
  return (
    <div className={styles.page}>
      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>स्व</span>
          <span className={styles.logoText}>Swarataa</span>
        </div>
        <button className="btn-secondary" onClick={() => navigate('riyaz')}>
          Riyaz Framework
        </button>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>AI-Powered Vocal Health</div>
          <h1 className={styles.heroTitle}>
            Harmonize Your Voice,<br />
            <span className={styles.accent}>Harmonize Your Life</span>
          </h1>
          <p className={styles.heroSub}>
            A personalized vocal health companion for Hindustani classical singers —
            blending Ayurveda, pranayama, and modern voice science into one guided practice.
          </p>
          <div className={styles.heroCta}>
            <button className="btn-primary" onClick={() => navigate('quiz')}>
              Discover Your Prakriti →
            </button>
            <button className="btn-secondary" onClick={() => navigate('riyaz')}>
              Explore Riyaz Framework
            </button>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.chakra}>
            <div className={styles.chakraRing1} />
            <div className={styles.chakraRing2} />
            <div className={styles.chakraRing3} />
            <div className={styles.chakraCenter}>
              <span>स्व</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>What Swarataa Offers</h2>
        <div className={styles.featureGrid}>
          {FEATURES.map(f => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI CTA */}
      <section className={styles.aiCta}>
        <div className={styles.aiCtaInner}>
          <h2>Start with Your Prakriti</h2>
          <p>
            Answer 10 research-backed questions about your body, voice, and practice.
            Our AI generates a personalized riyaz plan, Ayurvedic recommendations,
            and your SwarSuraksha herb kit — in under 2 minutes.
          </p>
          <button className="btn-primary" onClick={() => navigate('quiz')}>
            Take the Prakriti Quiz
          </button>
          <p className={styles.disclaimer}>
            Based on classical Ayurvedic texts and vocal science research
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>स्व</span>
          <span className={styles.logoText}>Swarataa</span>
        </div>
        <p>MDes Thesis · IIT Hyderabad · Bhakti Khandekar</p>
      </footer>
    </div>
  )
}

const FEATURES = [
  {
    icon: '🎵',
    title: 'Personalized Riyaz Plan',
    desc: 'AI-generated daily practice schedule based on your prakriti, experience level, and Swar Samay timing.',
  },
  {
    icon: '🌿',
    title: 'SwarSuraksha Herb Kit',
    desc: 'Curated Ayurvedic herb recommendations matched to your dosha and specific vocal needs.',
  },
  {
    icon: '🧘',
    title: 'Yoga & Pranayama',
    desc: 'Targeted breathwork, yogasana, and chakradhyan practices to support your voice and wellbeing.',
  },
  {
    icon: '📊',
    title: 'Vocal Insights',
    desc: 'Understand your voice type, seasonal vulnerabilities, and how to protect your vocal health daily.',
  },
]
