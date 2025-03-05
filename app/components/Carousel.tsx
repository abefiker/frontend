"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

// Dummy promotions data
const promotions = [
    {
        src: "/images/carousel/advert1.jpg",
        title: "Use our train service to train",
        description: "we better go together",
    },
    {
        src: "/images/carousel/advert2.jpg",
        title: "Music festival",
        description: "A historical drama showcasing the struggles of a lost era.",
    },
    {   
        src: "/images/carousel/advert3.jpg",
        title: "Delicious service",
        description: "legend taster always knows about us",
    },
    {
        src: "/images/carousel/advert4.jpg",
        title: "Pride and Love",
        description: "There is no secret , just we are specializing being with you",
    },
];

export default function Carousel() {
    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="progress-slide-carousel"
            >
                {promotions.map((promo, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={promo.src}
                                alt={promo.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-0 bg-opacity-50 w-full p-4 text-white">
                                <h2 className="text-lg md:text-2xl font-bold">{promo.title}</h2>
                                <p className="text-sm md:text-base">{promo.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
