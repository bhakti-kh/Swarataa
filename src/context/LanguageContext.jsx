import { createContext, useContext, useState } from 'react'

export const STRINGS = {
  en: {
    code: 'en',
    label: 'EN',
    nativeName: 'English',
    // Nav
    dashboard: 'Dashboard',
    startRiyaz: 'Start Riyaz',
    myPlan: 'My Vocal Plan',
    swarSuraksha: 'SwarSuraksha',
    progress: 'Progress',
    library: 'Library',
    community: 'Community',
    prakritiQuiz: 'Retake Prakriti Quiz',
    signOut: 'Sign out',
    // Landing
    getStarted: 'Get Your Vocal Plan →',
    goToDashboard: 'Go to Dashboard →',
    viewMyPlan: 'View My Plan',
    // Onboarding
    section1: 'About You',
    section2: 'Your Voice',
    section3: 'Prakriti',
    stepOf: (a, b) => `${a} of ${b}`,
    continueBtn: 'Continue →',
    generating: 'Creating your vocal plan...',
    generatingSub: 'AI is analysing your prakriti, voice type, and goals to craft your personalized plan.',
    // Session
    beginSession: 'Begin Session',
    // Common
    backHome: 'Back to home',
    takeQuiz: 'Take the Quiz →',
  },
  hi: {
    code: 'hi',
    label: 'हिं',
    nativeName: 'हिन्दी',
    // Nav
    dashboard: 'डैशबोर्ड',
    startRiyaz: 'रियाज़ शुरू करें',
    myPlan: 'मेरी स्वर योजना',
    swarSuraksha: 'स्वर सुरक्षा',
    progress: 'प्रगति',
    library: 'पुस्तकालय',
    community: 'समुदाय',
    prakritiQuiz: 'प्रकृति परीक्षा दोबारा लें',
    signOut: 'साइन आउट',
    // Landing
    getStarted: 'अपनी स्वर योजना पाएं →',
    goToDashboard: 'डैशबोर्ड पर जाएं →',
    viewMyPlan: 'मेरी योजना देखें',
    // Onboarding
    section1: 'आपके बारे में',
    section2: 'आपकी आवाज़',
    section3: 'प्रकृति',
    stepOf: (a, b) => `${a} में से ${b}`,
    continueBtn: 'आगे बढ़ें →',
    generating: 'आपकी स्वर योजना बन रही है...',
    generatingSub: 'AI आपकी प्रकृति, आवाज़ और लक्ष्यों के आधार पर आपकी व्यक्तिगत योजना तैयार कर रहा है।',
    // Session
    beginSession: 'सत्र शुरू करें',
    // Common
    backHome: 'होम पर वापस जाएं',
    takeQuiz: 'परीक्षा लें →',
  },
  mr: {
    code: 'mr',
    label: 'म',
    nativeName: 'मराठी',
    // Nav
    dashboard: 'डॅशबोर्ड',
    startRiyaz: 'रियाझ सुरू करा',
    myPlan: 'माझी स्वर योजना',
    swarSuraksha: 'स्वर सुरक्षा',
    progress: 'प्रगती',
    library: 'ग्रंथालय',
    community: 'समुदाय',
    prakritiQuiz: 'प्रकृती परीक्षा पुन्हा द्या',
    signOut: 'साइन आउट',
    // Landing
    getStarted: 'तुमची स्वर योजना मिळवा →',
    goToDashboard: 'डॅशबोर्डवर जा →',
    viewMyPlan: 'माझी योजना पाहा',
    // Onboarding
    section1: 'तुमच्याबद्दल',
    section2: 'तुमचा आवाज',
    section3: 'प्रकृती',
    stepOf: (a, b) => `${b} पैकी ${a}`,
    continueBtn: 'पुढे जा →',
    generating: 'तुमची स्वर योजना तयार होत आहे...',
    generatingSub: 'AI तुमची प्रकृती, आवाज आणि ध्येयांच्या आधारे तुमची वैयक्तिक योजना तयार करत आहे।',
    // Session
    beginSession: 'सत्र सुरू करा',
    // Common
    backHome: 'होमवर परत जा',
    takeQuiz: 'परीक्षा द्या →',
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('swarataa_lang') || 'en' } catch { return 'en' }
  })

  const changeLang = (code) => {
    setLang(code)
    try { localStorage.setItem('swarataa_lang', code) } catch {}
  }

  const t = STRINGS[lang] || STRINGS.en

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
