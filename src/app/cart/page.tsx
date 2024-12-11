'use client'
import Header from "@/components/header";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import React from "react";
import { Button, Divider, FormControlLabel, ListItemAvatar } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function Cart() {
    const router = useRouter();
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    return (
        <div>
            <Header></Header>

            <main className="w-[1200px] mx-auto p-[20px] bg-white mt-[20px]">
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {[0, 1, 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                            <ListItem
                                key={value}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="clear">
                                        <ClearIcon />
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.includes(value)}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemAvatar>
                                        <img className="w-[100px] h-[75px]" src="https://www.waveshare.net/photo/LCD-OLED/7inch-DSI-LCD-C/7inch-DSI-LCD-C-1.jpg?v=210730" />
                                    </ListItemAvatar>
                                    <ListItemText id={labelId} primary={
                                        <div className="w-[460px]">
                                            <a href="" className="text-[#666]">
                                                7寸电容触摸屏触控屏带外壳 500万像素前置摄像头 800×480像素
                                            </a>
                                            <div>
                                                <em className="text-[#999]">型号：7inch DSI LCD (with cam and case)</em>
                                            </div>
                                        </div>
                                    } />

                                    <ListItemText id={labelId} primary={
                                        <div className="text-[#666] w-[80px]">
                                            ¥ 307.00
                                        </div>
                                    } />
                                    <ListItemText className="" id={labelId} primary={
                                        <div className="w-[80px]">
                                            <TextField
                                                id="standard-number"
                                                type="number"
                                                variant="standard"
                                                onClick={(e) => e.stopPropagation()}
                                                slotProps={{
                                                    inputLabel: {
                                                        shrink: true,
                                                    },
                                                }}
                                            />
                                        </div>

                                    } />
                                    <ListItemText className="w-[80px]" id={labelId} primary={
                                        <div className="text-[#666]">
                                            <span className="text-[#B0B0B0]">小记</span> ¥ 307.00
                                        </div>
                                    } />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                    <Divider />
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="clear">
                                <Button variant="contained" className="px-10 py-1.5 bg-[#ff0036]" onClick={() => {
                                    router.push("/placeOrder")
                                }}>去结账</Button>
                            </IconButton>
                        }
                    >
                        <ListItemIcon>
                            <FormControlLabel control={<Checkbox edge="start" defaultChecked />} label="全选" />
                        </ListItemIcon>
                        <ListItemText primary={
                            <Button>
                                删除
                            </Button>
                        } />
                        <ListItemText />
                        <ListItemText primary={
                            <div>
                                <span className="text-[#666]">已选择 <span className="text-[#ff0036]">2</span> 款商品， 共计 <span className="text-[#ff0036]">2</span> 件， 合计(不含运费)： </span>
                                <span className="text-[28px] text-[#ff0036]">¥ 307.00</span>
                            </div>
                        } />
                        <ListItemText primary="" />
                    </ListItem>
                </List>

            </main>
        </div>
    )
}