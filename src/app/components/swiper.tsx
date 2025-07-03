"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import ImgSwiper1 from './img/premium_photo-1661772836015-317b6968401b.avif'
import ImgSwiper2 from './img/photo-1498050108023-c5249f4df085.avif'
import ImgSwiper3 from './img/premium_photo-1661782373451-93eaa3e9b30f.avif'
import Image from 'next/image';

const MySwiper = () => {
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            speed={1000}
            loop={true}
            autoplay={{ delay: 3000 }}
            className='rounded-[20px] '
        >
            <SwiperSlide><div>
                <Image src={ImgSwiper1}
                    alt="photo"
                    width={800}
                    height={500}
                    className="rounded-[20px] object-cover w-full h-full" />
            </div></SwiperSlide>
            <SwiperSlide><div>
                <Image src={ImgSwiper2}
                    alt="photo"
                    width={800}
                    height={500}
                    className="rounded-[20px] object-cover w-full h-full" />
            </div></SwiperSlide>
            <SwiperSlide><div>
                <Image src={ImgSwiper3}
                    alt="photo"
                    width={800}
                    height={500}
                    className="rounded-[20px] object-cover w-full h-full" />
            </div></SwiperSlide>
        </Swiper>
    );
};

export default MySwiper;