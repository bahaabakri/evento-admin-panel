import { useEffect, useState } from "react"
import heroImagesPath from '../hero-images';
import styles from './HeroOverlay.module.scss'
import { AnimatePresence, motion } from "framer-motion";
const HeroOverlay = () => {
    const [selectedHeroImageIndex, setSelectedHeroImageIndex] = useState<number>(0)
    useEffect(() => {
        const heroImagesInterval = setInterval(() => {
            setSelectedHeroImageIndex(prev => (prev + 1) % heroImagesPath.length)
        }, 10000)

        return () => {
            clearInterval(heroImagesInterval)
        }
    })
    return (
        <div className={styles['hero-section-overlay']}>
        {
        <AnimatePresence>
            <motion.div
                key={selectedHeroImageIndex}
                style={{
                    backgroundImage: `url(${heroImagesPath[selectedHeroImageIndex]})`
                }}
                className={styles['image-slider']}
                animate={{ opacity: 0.5, x: 0 }}
                exit={{ opacity: 0, x: +200 }}
                transition={{ duration: 1, ease:'easeInOut' }}
            />
        </AnimatePresence>
        }
    </div>
    )
}
export default HeroOverlay