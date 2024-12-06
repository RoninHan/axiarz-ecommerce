"use client"
import * as React from 'react';

import './swiper.css';
import ProductList from '@/components/productList';
import Banner from '@/components/banner';
import Header from '@/components/header';


export default function Home() {

  const bannerData = [
    {
      id: '1',
      image: 'https://www.waveshare.net/thumb/middle/photo/accBoard/GamePi13/GamePi13-1.jpg',
      title: '1.3寸树莓派LCD游戏机',
      description: '240×240，65K彩色，带喇叭'
    },
    {
      id: '2',
      image: 'https://www.waveshare.net/thumb/middle/photo/accBoard/GamePi13/GamePi13-1.jpg',
      title: '1.3寸树莓派LCD游戏机',
      description: '240×240，65K彩色，带喇叭'
    },
    {
      id: '3',
      image: 'https://www.waveshare.net/thumb/middle/photo/accBoard/GamePi13/GamePi13-1.jpg',
      title: '1.3寸树莓派LCD游戏机',
      description: '240×240，65K彩色，带喇叭'
    }
  ]

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


  return (
    <>
      <Header />

      <main className='w-[1240px] mx-auto'>

        <Banner data={bannerData} />

        <div>
          <ProductList products={productsData} />
        </div>
      </main>

    </>
  );

}
