"use client"
import * as React from 'react';

import './swiper.css';
import ProductList from '@/components/productList';
import Banner from '@/components/banner';
import Header from '@/components/header';
import TabsProductList from '@/components/tabsProductList';
import TabsProductListMin from '@/components/tabsProductListMin';
import { get } from '@/utils/request';


export default function Home() {


  const [bannerData, setBannerData] = React.useState<any[]>([]);
  const getBannerData = async () => {
    try {
      const res = await get("/api/banner/all");
      setBannerData(res as any[]);
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    getBannerData();
  }, []);


  const productsData = [
    {
      id: '1',
      name: '1.3寸树莓派LCD游戏机',
      price: 99,
      context: '240×240，65K彩色，带喇叭',
      image: 'https://www.waveshare.net/thumb/middle/photo/accBoard/GamePi13/GamePi13-1.jpg'
    },
    {
      id: '2',
      name: '1.3寸树莓派LCD游戏机',
      price: 99,
      context: '240×240，65K彩色，带喇叭',
      image: 'https://www.waveshare.net/thumb/middle/photo/accBoard/GamePi13/GamePi13-1.jpg'
    },
    {
      id: '3',
      name: '1.3寸树莓派LCD游戏机',
      price: 99,
      context: '240×240，65K彩色，带喇叭',
      image: 'https://www.waveshare.net/thumb/middle/photo/accBoard/GamePi13/GamePi13-1.jpg'
    },
    {
      id: '4',
      name: '1.3寸树莓派LCD游戏机',
      price: 99,
      context: '240×240，65K彩色，带喇叭',
      image: 'https://www.waveshare.net/thumb/middle/photo/accBoard/GamePi13/GamePi13-1.jpg'
    },
    {
      id: '5',
      name: '1.3寸树莓派LCD游戏机',
      price: 99,
      context: '240×240，65K彩色，带喇叭',
      image: 'https://www.waveshare.net/thumb/middle/photo/accBoard/GamePi13/GamePi13-1.jpg'
    }
  ]

  const productsData2 = [
    {
      id: '1',
      name: '1.3寸树莓派LCD游戏机',
      price: 99,
      context: '240×240，65K彩色，带喇叭',
      image: 'https://www.waveshare.net/thumb/middle/photo/accBoard/GamePi13/GamePi13-1.jpg'
    },
    {
      id: '2',
      name: '1.3寸树莓派LCD游戏机',
      price: 99,
      context: '240×240，65K彩色，带喇叭',
      image: 'https://www.waveshare.net/thumb/middle/photo/accBoard/GamePi13/GamePi13-1.jpg'
    },
    {
      id: '3',
      name: '1.3寸树莓派LCD游戏机',
      price: 99,
      context: '240×240，65K彩色，带喇叭',
      image: 'https://www.waveshare.net/thumb/middle/photo/accBoard/GamePi13/GamePi13-1.jpg'
    },
    {
      id: '4',
      name: '1.3寸树莓派LCD游戏机',
      price: 99,
      context: '240×240，65K彩色，带喇叭',
      image: 'https://www.waveshare.net/thumb/middle/photo/accBoard/GamePi13/GamePi13-1.jpg'
    }
  ]


  return (
    <>
      <Header />

      <main className='w-[1200px] mx-auto'>

        <Banner data={bannerData} />

        <div className='mt-6'>
          <ProductList products={productsData} title={'新品上市'} link={''} />
        </div>

        <div className='mt-6'>
          <TabsProductList title={'人工智能'} products={productsData} link={''} />
        </div>

        <div className='mt-6'>
          <TabsProductListMin title={'人工智能'} products={productsData2} link={''} />
        </div>
      </main>

    </>
  );

}
