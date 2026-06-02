import { useState } from 'react'
import { Leaf, Droplets, Pill, Ear, Star, CheckCircle, ShoppingBag, RefreshCw, Package } from 'lucide-react'
import styles from './HerbSupport.module.css'

const DEFAULT_HERBS = [
  {
    name: 'Morning Gargle Mix',
    sanskrit: 'Prabhata Gandoosha',
    desc: 'Herbal throat cleansing formula for morning vocal preparation',
    usage: 'Mix 1 tsp with warm water, gargle for 2 minutes before riyaz',
    icon: Droplets,
    color: 'var(--soft-green)',
    rating: 4.8,
    price: '₹320',
    period: '30-day supply',
    benefits: ['Clears throat mucus', 'Soothes vocal cords', 'Reduces inflammation'],
  },
  {
    name: 'Dosha Balancer',
    sanskrit: 'Prakriti Samvardhan',
    desc: 'Personalized Ayurvedic blend matched to your vocal prakriti',
    usage: 'Take 2 tablets after meals with warm water',
    icon: Leaf,
    color: 'var(--saffron)',
    rating: 4.9,
    price: '₹480',
    period: '30-day supply',
    benefits: ['Balances your dosha', 'Supports voice clarity', 'Builds immunity'],
  },
  {
    name: 'Vocal Support Dots',
    sanskrit: 'Swar Raksha Gutika',
    desc: 'Chewable herbal lozenges for instant vocal relief',
    usage: 'Chew 1 dot before practice or performance',
    icon: Pill,
    color: 'var(--gold)',
    rating: 4.7,
    price: '₹240',
    period: '60 dots / pack',
    benefits: ['Instant soothing', 'Reduces vocal strain', 'Natural ingredients'],
  },
  {
    name: 'Ear Training Drops',
    sanskrit: 'Shravana Taila',
    desc: 'Ayurvedic ear oil for enhanced auditory sensitivity',
    usage: '2 drops in each ear before sleep',
    icon: Ear,
    color: 'var(--deep-teal)',
    rating: 4.6,
    price: '₹380',
    period: '3-month supply',
    benefits: ['Improves hearing clarity', 'Reduces ear fatigue', 'Traditional formula'],
  },
]

export default function HerbSupport({ plan }) {
  const [subscribed, setSubscribed] = useState({})

  const aiHerbs = plan?.swarSuraksha

  const toggleSubscribe = (name) => {
    setSubscribed(prev => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>SwarSuraksha</h1>
          <p>Your personalized Ayurvedic herb support · Delivered monthly</p>
        </div>
        <div className={styles.headerBadge}>
          <Package size={14} color="var(--soft-green)" />
          <span>Monthly Kit</span>
        </div>
      </div>

      {/* Personalized AI kit */}
      {aiHerbs ? (
        <div className={styles.aiKit}>
          <div className={styles.aiKitHeader}>
            <div>
              <p className={styles.aiKitLabel}>Your Personalized Kit · {plan.prakriti?.primary?.charAt(0).toUpperCase() + plan.prakriti?.primary?.slice(1)} Prakriti</p>
              <h2 className={styles.aiKitName}>{aiHerbs.kitName}</h2>
            </div>
            <div className={styles.aiKitBadge}>AI Curated</div>
          </div>

          <div className={styles.aiHerbs}>
            {aiHerbs.herbs.map((h, i) => (
              <div key={i} className={styles.aiHerb}>
                <div className={styles.aiHerbTop}>
                  <div>
                    <p className={styles.aiHerbName}>{h.name}</p>
                    <p className={styles.aiHerbForm}>{h.form}</p>
                  </div>
                  <button
                    className={`${styles.subscribeSmall} ${subscribed[h.name] ? styles.subscribedSmall : ''}`}
                    onClick={() => toggleSubscribe(h.name)}
                  >
                    {subscribed[h.name] ? <><CheckCircle size={11} /> Added</> : '+ Add'}
                  </button>
                </div>
                <p className={styles.aiHerbBenefit}>{h.benefit}</p>
              </div>
            ))}
          </div>

          <div className={styles.gargle}>
            <RefreshCw size={12} color="var(--saffron)" />
            <span><strong>Morning Gargle:</strong> {aiHerbs.morningGargle}</span>
          </div>

          <div className={styles.kitCta}>
            <div>
              <p className={styles.kitCtaLabel}>Subscribe to your monthly kit</p>
              <p className={styles.kitCtaDesc}>Automatically refilled every 30 days · Cancel anytime</p>
            </div>
            <button className={styles.subscribeKitBtn}>
              <ShoppingBag size={14} /> Subscribe Monthly
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.noKit}>
          <Leaf size={32} color="var(--soft-green)" />
          <p>Complete your vocal assessment to receive a personalized herb kit matched to your prakriti.</p>
        </div>
      )}

      {/* General product catalog */}
      <div>
        <h2 className={styles.sectionTitle}>SwarSuraksha Product Range</h2>
        <p className={styles.sectionSub}>All products are sourced from certified Ayurvedic suppliers. Subscribe individually or as a kit.</p>
        <div className={styles.productsGrid}>
          {DEFAULT_HERBS.map(p => (
            <div key={p.name} className={`card ${styles.productCard}`}>
              <div className={styles.productTop}>
                <div className={styles.productIcon} style={{ background: p.color + '15' }}>
                  <p.icon size={22} color={p.color} />
                </div>
                <div className={styles.productRating}>
                  <Star size={11} fill="var(--gold)" color="var(--gold)" /> {p.rating}
                </div>
              </div>

              <h3 className={styles.productName}>{p.name}</h3>
              <p className={styles.productSanskrit}>{p.sanskrit}</p>
              <p className={styles.productDesc}>{p.desc}</p>

              <div className={styles.benefits}>
                {p.benefits.map(b => (
                  <div key={b} className={styles.benefit}>
                    <CheckCircle size={11} color={p.color} /> {b}
                  </div>
                ))}
              </div>

              <div className={styles.usage}>
                <p className={styles.usageText}>{p.usage}</p>
              </div>

              <div className={styles.productFooter}>
                <div>
                  <span className={styles.price}>{p.price}</span>
                  <span className={styles.period}> / {p.period}</span>
                </div>
                <button
                  className={`${styles.subscribeBtn} ${subscribed[p.name] ? styles.subscribedBtn : ''}`}
                  onClick={() => toggleSubscribe(p.name)}
                  style={!subscribed[p.name] ? { background: p.color } : {}}
                >
                  {subscribed[p.name] ? <><CheckCircle size={13} /> Subscribed</> : <><ShoppingBag size={13} /> Subscribe</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
