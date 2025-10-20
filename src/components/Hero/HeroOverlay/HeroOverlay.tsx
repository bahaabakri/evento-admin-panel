import { FC, use, useEffect, useState } from "react";
import styles from "./HeroOverlay.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { SelectedImage } from "@/UI/ImagePicker/ImagePicker";
import { useHttp } from "@/hooks/useHttp";
import { HeroResponse } from "../hero.type";
const HeroOverlay: FC = () => {
    
    const [selectedHeroImageIndex, setSelectedHeroImageIndex] =
    useState<number>(0);
    const { request, loading: loadingHero, error: errorFetchingHero } = useHttp();
    const [activeHeroImages, setActiveHeroImages] =
    useState<SelectedImage[]>(null);
    console.log(activeHeroImages);
  useEffect(() => {
    getActiveHeroData();
  }, []);
  const getActiveHeroData = async () => {
    // Placeholder for potential future logic
    const res = (await request(
      "get",
      "admin/heros/activeHero"
    )) as HeroResponse;
    if (res) {
      setActiveHeroImages(res.images);
    } else if (errorFetchingHero) {
      console.error("Error fetching active hero data:", errorFetchingHero);
    }
  };
  useEffect(() => {
    const heroImagesInterval = setInterval(() => {
      setSelectedHeroImageIndex(
        (prev) => (prev + 1) % activeHeroImages?.length
      );
    }, 10000);

    return () => {
      clearInterval(heroImagesInterval);
    };
  });
  return (
    !loadingHero &&
    activeHeroImages &&
    activeHeroImages.length > 0 && (
      <div className={styles["hero-section-overlay"]}>
        {
          <AnimatePresence>
            <motion.div
              key={selectedHeroImageIndex}
              style={{
                backgroundImage: `url(${import.meta.env.VITE_API_BASE_URL}${activeHeroImages[selectedHeroImageIndex].url})`,
              }}
              className={styles["image-slider"]}
              animate={{ opacity: 0.5, x: 0 }}
              exit={{ opacity: 0, x: +200 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </AnimatePresence>
        }
      </div>
    )
  );
};
export default HeroOverlay;
