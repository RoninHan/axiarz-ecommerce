`use client`
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useMemo } from 'react';

interface BannerItem {
    id: string;
    image_url: string;
    title?: string;
    description?: string;
}

interface BannerProps {
    data: BannerItem[];
}

export default function Banner(props: BannerProps) {

    const { data } = props;

    const bannerItems = useMemo(() => {
        return data.map((item) => {
            const image = process.env.NEXT_PUBLIC_API_BASE_URL + item.image_url
            return (
            <SwiperSlide key={item.id}>
                <img src={image} className='w-[1200px] h-[450px]' alt={item.title} />
                </SwiperSlide>
            )
        })
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