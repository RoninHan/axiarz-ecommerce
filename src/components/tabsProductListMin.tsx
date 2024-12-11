

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import './style/tabsProductList.css'
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Product from './product';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface TabsProductListProps {
    title: string;
    products: any[];
    link: string
}

export default function TabsProductListMin(props: TabsProductListProps) {
    const [value, setValue] = React.useState(0);

    const handleMouseEnter = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { title, products, link } = props;
    const router = useRouter();

    const handleGoLink = () => {
        router.push(link);
    }


    return (
        <div className='w-full'>
            <Box sx={{ width: '100%' }}>
                <Box>
                    <div className='flex justify-between items-center'>
                        <h2 className="text-2xl text-gray-500 h-[64px] leading-[64px]"><a href="#" onClick={handleGoLink}>{title}</a></h2>
                        <Tabs value={value} aria-label="basic tabs example" >
                            <Tab label="Item One" {...a11yProps(0)} onMouseEnter={(event) => handleMouseEnter(event, 0)} />
                            <Tab label="Item Two" {...a11yProps(1)} onMouseEnter={(event) => handleMouseEnter(event, 1)} />
                            <Tab label="Item Three" {...a11yProps(2)} onMouseEnter={(event) => handleMouseEnter(event, 2)} />
                        </Tabs>
                    </div>

                </Box>
                <div className='flex flex-row'>
                    <div>
                        <Image width={232} height={266} src={'https://www.waveshare.net/photo/column/Arduino-Nucleo/1.jpg'} alt={''}></Image>
                    </div>
                    <div className='flex-1'>
                        <CustomTabPanel value={value} index={0}>
                            <div className='w-full ml-[10px]'>
                                <div className="flex gap-[10px] flex-wrap">
                                    {products.map((product) => (
                                        <Product {...product} key={product.id} />
                                    ))}
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <div className='w-full ml-[10px]'>
                                <div className="flex gap-[10px] flex-wrap">
                                    {products.map((product) => (
                                        <Product {...product} key={product.id} />
                                    ))}
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <div className='w-full ml-[10px]'>
                                <div className="flex gap-[10px] flex-wrap">
                                    {products.map((product) => (
                                        <Product {...product} key={product.id} />
                                    ))}
                                </div>
                            </div>
                        </CustomTabPanel>
                    </div>
                </div>

            </Box>
        </div>

    );
}