`use client`
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useMemo } from 'react';

interface BannerItem {
    id: string;
    image: string;
    title?: string;
    description?: string;
}

interface BannerProps {
    data: BannerItem[];
}

export default function Banner(props: BannerProps) {

    const { data } = props;

    const bannerItems = useMemo(() => {
        return data.map((item) => (
            <SwiperSlide key={item.id}>
                <img src={item.image} alt={item.title} />
            </SwiperSlide>
        ))
    }, [data]);

    return (
        <Swiper
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            navigation={true}
            pagination={{
                dynamicBullets: true,
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
        >
            {bannerItems}
        </Swiper>
    )

}