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
    products: any;
    link: string
}

export default function TabsProductListMin(props: TabsProductListProps) {
    const [value, setValue] = React.useState(0);
    const [tab1data, setTab1data] = React.useState<any[]>([]);
    const [tab2data, setTab2data] = React.useState<any[]>([]);
    const [tab3data, setTab3data] = React.useState<any[]>([]);
    const [rows, setRows] = React.useState(1);
    const imageRef = React.useRef<HTMLDivElement>(null);

    const handleMouseEnter = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { title, products, link } = props;
    const router = useRouter();

    const handleGoLink = () => {
        router.push(link);
    }

    // 监听图片高度变化
    React.useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const height = entry.contentRect.height;
                // 假设每个产品卡片高度为 300px，计算可以显示的行数
                const productHeight = 300;
                const calculatedRows = Math.ceil(height / productHeight);
                setRows(Math.max(1, calculatedRows));
            }
        });

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, []);

    // 根据行数动态计算每个 tab 的数据
    React.useEffect(() => {
        if (props.products.data && Array.isArray(props.products.data)) {
            const productsPerRow = 4; // 每行显示的产品数量
            const chunkSize = productsPerRow * rows;
            
            const tab1 = props.products.data.slice(0, chunkSize);
            const tab2 = props.products.data.slice(chunkSize, chunkSize * 2);
            const tab3 = props.products.data.slice(chunkSize * 2, chunkSize * 3);

            setTab1data(tab1);
            setTab2data(tab2);
            setTab3data(tab3);
        }
    }, [props.products.data, rows]);

    const homeImage = React.useMemo(() => {
        return process.env.NEXT_PUBLIC_API_BASE_URL + props.products.image_url;
    }, [props.products])


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
                    <div ref={imageRef}>
                        <Image width={232} height={266} src={homeImage} alt={''}></Image>
                    </div>
                    <div className='flex-1'>
                        <CustomTabPanel value={value} index={0}>
                            <div className='w-full ml-[10px]'>
                                <div className="flex gap-[10px] flex-wrap">
                                    {tab1data.map((product: any) => (
                                        <Product {...product} key={product.id} />
                                    ))}
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <div className='w-full ml-[10px]'>
                                <div className="flex gap-[10px] flex-wrap">
                                    {tab2data.map((product: any) => (
                                        <Product {...product} key={product.id} />
                                    ))}
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <div className='w-full ml-[10px]'>
                                <div className="flex gap-[10px] flex-wrap">
                                    {tab3data.map((product: any) => (
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