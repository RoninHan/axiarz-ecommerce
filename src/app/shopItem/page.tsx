'use client'
import Header from "@/components/header";
import ImageZoom from "@/components/imageZoom";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

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
import { get } from "@/utils/request";


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

    const [data, setData] = React.useState<any>({});
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    const [value, setValue] = React.useState(0);

    const handleChange2 = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const getItem = async () => {
        let res: any = await get(`/api/product/get/${id}`);
        console.log(res)
        res.image_url = process.env.NEXT_PUBLIC_API_BASE_URL + res.image_url
        setData(res)
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
                                <div className="line-right flex-1 ">{data.xh}</div>
                            </div>
                            <div className="sku flex items-center px-[10px] mt-[15px]">
                                <div className="line-left w-[121px]">SKU</div>
                                <div className="line-right flex-1 ">{data.sku}</div>
                            </div>
                            <div className="brand flex items-center px-[10px] mt-[15px]">
                                <div className="line-left w-[121px]">品牌</div>
                                <div className="line-right flex-1 ">{data.pp}</div>
                            </div>
                        </div>

                        <div className="invoicing-type flex items-center px-[10px] mt-[20px] text-[#666]">
                            <div className="line-left w-[121px]">开票类型</div>
                            <div className="line-right flex-1">
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-helper-label" size="small">开票类型</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                        size="small"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="num flex items-center px-[10px] mt-[20px] text-[#666]">
                            <div className="line-left w-[121px]">数量</div>
                            <div className="line-right flex-1">
                                <TextField
                                    id="standard-number"
                                    label="Number"
                                    type="number"
                                    variant="standard"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center px-[10px] mt-[20px]">
                            <Button variant="contained" className="px-10 py-3 bg-[#ff0036]">加入购物车</Button>

                            <div className="ml-[50px] text-[16px]">
                                <IconButton aria-label="delete" className=" hover:text-red-500" size="small">
                                    <FavoriteIcon />
                                    收藏商品
                                </IconButton>

                            </div>
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
                            {data.description}
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            Item Two
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            Item Three
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            Item Three2
                        </CustomTabPanel>
                    </Box>
                </div>
            </main>
        </div>
    )
}