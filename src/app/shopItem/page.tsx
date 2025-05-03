'use client'
import Header from "@/components/header";
import ImageZoom from "@/components/imageZoom";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from "react";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { get, post } from "@/utils/request";
import { useUserStore } from "@/store/userStore";
import { Snackbar, Alert, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';




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
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function ShopItem() {
    // 获取路由参数  http://stackoverflow.com/questions/12311，参数：12311
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();

    const [data, setData] = React.useState<any>({});
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);
    const [value, setValue] = React.useState(0);

    const handleQuantityChange = (type: 'add' | 'minus') => {
        if (type === 'add') {
            setQuantity(prev => prev + 1);
        } else {
            if (quantity > 1) {
                setQuantity(prev => prev - 1);
            }
        }
    };

    const handleChange2 = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const getItem = async () => {
        let res: any = await get(`/api/product/get/${id}`);
        console.log(res)
        res.image_url = process.env.NEXT_PUBLIC_API_BASE_URL + res.image_url
        setData(res)
    }

    const addCart = async () => {
        // 检查是否登录
        const token = localStorage.getItem('axiarz-token');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            let res: any = await post(`/api/cart/create`, {
                user_id: useUserStore.getState().user?.id,
                product_id: Number(id),
                quantity: quantity
            });
            setOpenSnackbar(true);
        } catch (error) {
            console.error('加入购物车失败:', error);
        }
    }

    useEffect(() => {
        console.log('id: ' + id)
        getItem()
    }, [])

    return (
        <div>
            <Header></Header>

            <main className="w-[1200px] mx-auto p-[20px] bg-white mt-[20px]">
                <div className="flex gap-[20px]">
                    <div>
                        <a href="">
                            <ImageZoom img={data.image_url} bigImg={data.image_url} />
                        </a>
                    </div>
                    <div className="w-[716px]">

                        <div className="title text-[24px] text-[#666]">{data.name}</div>
                        <div className="sub-title text-[#ff0036] py-[10px] font-[14px]">{data.subtitle}</div>
                        <div className="price h-[60px] bg-[#f0f0f0] px-[10px] flex items-center rounded-sm">
                            <div className="line-left    text-[#666] w-[121px]">价格</div>
                            <div className="line-right text-[36px] text-[#ff0036] flex-1">¥{data.price}</div>
                        </div>
                        <div className="py-[20px] text-[#666] border-b-[1px] border-solid border-gray-300">
                            <div className="model flex items-center px-[10px] mt-[15px]">
                                <div className="line-left w-[121px]">型号</div>
                                <div className="line-right flex-1 ">{data.type_name}</div>
                            </div>
                            <div className="sku flex items-center px-[10px] mt-[15px]">
                                <div className="line-left w-[121px]">SKU</div>
                                <div className="line-right flex-1 ">{data.sku}</div>
                            </div>
                            <div className="brand flex items-center px-[10px] mt-[15px]">
                                <div className="line-left w-[121px]">品牌</div>
                                <div className="line-right flex-1 ">{data.brand}</div>
                            </div>
                        </div>

                        <div className="num flex items-center px-[10px] mt-[20px] text-[#666]">
                            <div className="line-left w-[121px]">数量</div>
                            <div className="line-right flex-1 flex items-center">
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    border: '1px solid #ddd',
                                    borderRadius: 1,
                                    width: 'fit-content'
                                }}>
                                    <IconButton 
                                        onClick={() => handleQuantityChange('minus')}
                                        disabled={quantity <= 1}
                                        sx={{ 
                                            color: quantity <= 1 ? '#ccc' : '#666',
                                            '&:hover': {
                                                bgcolor: 'rgba(0, 0, 0, 0.04)'
                                            }
                                        }}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography 
                                        sx={{ 
                                            px: 2, 
                                            minWidth: '40px', 
                                            textAlign: 'center',
                                            borderLeft: '1px solid #ddd',
                                            borderRight: '1px solid #ddd'
                                        }}
                                    >
                                        {quantity}
                                    </Typography>
                                    <IconButton 
                                        onClick={() => handleQuantityChange('add')}
                                        sx={{ 
                                            color: '#666',
                                            '&:hover': {
                                                bgcolor: 'rgba(0, 0, 0, 0.04)'
                                            }
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </div>
                        </div>

                        <div className="flex items-center px-[10px] mt-[20px]">
                            <Button 
                                variant="contained" 
                                className="px-10 py-3"
                                onClick={addCart}
                                sx={{ 
                                    bgcolor: '#ff9400',
                                    '&:hover': {
                                        bgcolor: '#e68600'
                                    }
                                }}
                            >
                                加入购物车
                            </Button>

                            {/* 暂时隐藏收藏按钮，后续使用
                            <div className="ml-[50px] text-[16px]">
                                <IconButton aria-label="delete" className=" hover:text-red-500" size="small">
                                    <FavoriteIcon />
                                    收藏商品
                                </IconButton>
                            </div>
                            */}
                        </div>
                    </div>
                </div>

                <div className="mt-[40px]">
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange2} aria-label="basic tabs example">
                                <Tab label="产品详情" {...a11yProps(0)} />
                                <Tab label="产品资料" {...a11yProps(1)} />
                                <Tab label="配置清单" {...a11yProps(2)} />
                                <Tab label="保修&售后服务" {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <div dangerouslySetInnerHTML={{ __html: data.product_details }} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <div dangerouslySetInnerHTML={{ __html: data.product_information }} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <div dangerouslySetInnerHTML={{ __html: data.configuration_list }} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <div dangerouslySetInnerHTML={{ __html: data.wass }} />
                        </CustomTabPanel>
                    </Box>
                </div>
            </main>
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={3000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity="success" 
                    sx={{ width: '100%' }}
                >
                    商品已成功加入购物车！
                </Alert>
            </Snackbar>
        </div>
    )
}