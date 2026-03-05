import { FC, use, useEffect, useState } from "react";
import styles from "./HeroOverlay.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { SelectedImage } from "@/UI/ImagePicker/ImagePicker";
import { useHttp } from "@/hooks/useHttp";
import { HeroResponse } from "../hero.type";
import { BASE_URL } from "@/services/api";
const HeroOverlay: FC = () => {
    
    const [selectedHeroImageIndex, setSelectedHeroImageIndex] =
    useState<number>(0);
    const { request, loading: loadingHero } = useHttp();
    const [activeHeroImages, setActiveHeroImages] =
    useState<SelectedImage[]>(null);
    console.log(activeHeroImages);
  useEffect(() => {
    getActiveHeroData();
  }, []);
  const getActiveHeroData = async () => {
    // Placeholder for potential future logic
    const {data, error} = (await request<HeroResponse>(
      "get",
      "admin/heroes/activeHero"
    ));
    if(error) {
      console.error("Error fetching active hero data:", error);
    } else {
      setActiveHeroImages(data.images);
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
                backgroundImage: `url(${BASE_URL}${activeHeroImages[selectedHeroImageIndex].url})`,
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
