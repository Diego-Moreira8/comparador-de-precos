import { Box } from "@mui/material";
import type { ReactNode } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ComparatorCarouselProps<Item extends { id: string }> {
  items: Item[];
  children: (item: Item) => ReactNode;
}

function ComparatorCarousel<Item extends { id: string }>({
  items,
  children,
}: ComparatorCarouselProps<Item>) {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      modules={[Pagination]}
      pagination={{ clickable: true }}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <Box sx={{ mb: 4 }}>{children(item)}</Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export { ComparatorCarousel };
