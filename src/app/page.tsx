"use client"
import * as React from 'react';

import './swiper.css';
import ProductList from '@/components/productList';
import Banner from '@/components/banner';
import Header from '@/components/header';
import TabsProductList from '@/components/tabsProductList';
import TabsProductListMin from '@/components/tabsProductListMin';
import { get } from '@/utils/request';
import ProductListSkeleton from '@/components/ProductListSkeleton';
import Footer from '@/components/Footer';


export default function Home() {


  const [bannerData, setBannerData] = React.useState<any[]>([]);
  const [homeProductData, setHomeProductData] = React.useState<any[]>([]);
  const [newProductData, setNewProductData] = React.useState<any[]>([]);
  const getBannerData = async () => {
    try {
      const res = await get("/api/banner/all");
      setBannerData(res as any[]);
    } catch (e) {
      console.log(e);
    }
  }

  const getHomeProductData = async () => {
    try {
      const res = await get("/api/product/home");
      console.log(res)
      setHomeProductData(res as any[]);
    } catch (e) {
      console.log(e);
    }
  }

  const getProductNewData = async () => {
    try {
      const res = await get("/api/product/new");
      setNewProductData(res as any[])
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    getBannerData();
    getHomeProductData();
    getProductNewData();
  }, []);

  return (
    <>
      <Header />

      <main className='w-[1200px] mx-auto mb-4'>

        <Banner data={bannerData} />

        <div className='mt-6'>
          {
            newProductData.length > 0 ? <ProductList products={newProductData} title={'新品上市'} link={''} /> : <ProductListSkeleton count={5} />
          }

        </div>

        {/* <div className='mt-6'>
          <TabsProductList title={'人工智能'} products={productsData} link={''} />
        </div> */}

        {
          homeProductData.map((v, k) =>
          (<div className='mt-6' key={k} >
            <TabsProductListMin title={v.name} products={v} link={''} />
          </div>)
          )
        }

      </main>
      
      <Footer />
    </>
  );

}
