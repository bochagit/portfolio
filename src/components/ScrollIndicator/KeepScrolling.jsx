import { useEffect, useState } from 'react'
import { ChevronsDown, OctagonMinus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import './KeepScrolling.css'

const Keep = () => {
  const { t } = useTranslation()
  const [isAtBottom, setIsAtBottom] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      
      setIsAtBottom(scrollPercent > 95)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='progress-keep'>
      {isAtBottom ? (
        <>
          <OctagonMinus strokeWidth={0.5} />
          <p className='progress-keep-text'>{t('scroll.endText')}</p>
          <OctagonMinus strokeWidth={0.5} />
        </>
      ) : (
        <>
          <ChevronsDown strokeWidth={.5} />
          <p className='progress-keep-text'>{t('scroll.text')}</p>
          <ChevronsDown strokeWidth={.5} />
        </>
      )}
    </div>
  )
}

export default Keep