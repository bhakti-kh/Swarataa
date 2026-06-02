import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Leaf, Droplets, Pill, Ear, Star, Info, CheckCircle, Sparkles } from 'lucide-react'
import styles from './HerbSupport.module.css'

const products = [
  { name: 'Morning Gargle Mix', desc: 'Herbal throat cleansing formula for morning vocal preparation', usage: 'Mix 1 tsp with warm water, gargle for 2 minutes', icon: Droplets, color: 'var(--soft-green)', rating: 4.8, benefits: ['Clears throat mucus', 'Soothes vocal cords', 'Reduces inflammation'] },
  { name: 'Dosha Balancer', desc: 'Personalized Ayurvedic blend based on your Prakriti', usage: 'Take 2 tablets after meals with warm water', icon: Leaf, color: 'var(--saffron)', rating: 4.9, benefits: ['Balances doshas', 'Supports voice clarity', 'Boosts immunity'] },
  { name: 'Vocal Support Dots', desc: 'Chewable herbal lozenges for instant vocal relief', usage: 'Chew 1 dot before practice or performance', icon: Pill, color: 'var(--gold)', rating: 4.7, benefits: ['Instant soothing', 'Reduces vocal strain', 'Natural ingredients'] },
  { name: 'Ear Training Drops', desc: 'Ayurvedic ear oil for enhanced auditory sensitivity', usage: '2 drops in each ear before sleep', icon: Ear, color: 'var(--deep-teal)', rating: 4.6, benefits: ['Improves hearing clarity', 'Reduces ear fatigue', 'Traditional formula'] },
]

export default function HerbSupport({ plan }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState('products')

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>SwarSuraksha</h1>
        <p>Herbal support for vocal wellness</p>
      </div>

      <div className={styles.banner}>
        <p className={styles.bannerLabel}>Ayurvedic Voice Care</p>
        <h2 className={styles.bannerTitle}>Personalized Herbal Kit</h2>
        <p className={styles.bannerSub}>Traditional formulations designed specifically for classical singers</p>
      </div>

      {plan?.swarSuraksha && (
        <div className={styles.aiKit}>
          <p className={styles.aiKitLabel}>Your AI-Generated Kit</p>
          <h2 className={styles.aiKitName}>{plan.swarSuraksha.kitName}</h2>
          <div className={styles.aiHerbs}>
            {plan.swarSuraksha.herbs.map((h, i) => (
              <div key={i} className={styles.aiHerb}>
                <p className={styles.aiHerbName}>{h.name}</p>
                <p className={styles.aiHerbForm}>{h.form}</p>
                <p className={styles.aiHerbBenefit}>{h.benefit}</p>
              </div>
            ))}
          </div>
          <div className={styles.aiGargle}><strong>Morning Gargle:</strong> {plan.swarSuraksha.morningGargle}</div>
        </div>
      )}

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${tab === 'products' ? styles.tabActive : ''}`} onClick={() => setTab('products')}>Products</button>
        <button className={`${styles.tab} ${tab === 'prakriti' ? styles.tabActive : ''}`} onClick={() => setTab('prakriti')}>Prakriti Assessment</button>
        {!plan?.swarSuraksha && (
          <button className={styles.tabQuiz} onClick={() => navigate('/quiz')}><Sparkles size={12} /> Get AI Kit</button>
        )}
      </div>

      {tab === 'products' ? (
        <div className={styles.productsGrid}>
          {products.map(p => (
            <div key={p.name} className={`card ${styles.productCard}`}>
              <div className={styles.productTop}>
                <div className={styles.productIcon} style={{ background: p.color + '15' }}><p.icon size={22} color={p.color} /></div>
                <span className={styles.rating}><Star size={11} fill="var(--saffron)" color="var(--saffron)" /> {p.rating}</span>
              </div>
              <h3 className={styles.productName}>{p.name}</h3>
              <p className={styles.productDesc}>{p.desc}</p>
              <div className={styles.benefits}>
                {p.benefits.map(b => <div key={b} className={styles.benefit}><CheckCircle size={11} color={p.color} /> {b}</div>)}
              </div>
              <div className={styles.usage}><div className={styles.usageLabel}><Info size={11} /> Usage</div><p>{p.usage}</p></div>
              <button className={styles.viewBtn} style={{ background: p.color }}>View Details</button>
            </div>
          ))}
        </div>
      ) : (
        <div className={`card ${styles.assessCard}`}>
          <h3>Prakriti Assessment</h3>
          <p className={styles.assessSub}>Discover your Ayurvedic constitution for personalized herb recommendations</p>
          <button className="btn-primary" onClick={() => navigate('/quiz')} style={{ marginTop: 24, width: '100%' }}>Take Full Prakriti Quiz</button>
        </div>
      )}
    </div>
  )
}
