'use client'
import Header from "@/components/header";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextField from '@mui/material/TextField';
export default function PlaceOrder() {
    return (
        <div>
            <Header></Header>

            <main className="w-[1200px] mx-auto p-[20px]  mt-[20px]">
                <div className="address bg-white p-[20px] flex gap-[20px] items-center">
                    <label>收货地址</label>
                    <div className="flex gap-[20px]">
                        <div className="border-[#fa9619] border w-[420px] p-[20px] h-[120px] cursor-pointer flex items-end justify-between">
                            <div>
                                <p>收货人：张三</p>
                                <p>联系电话：13888888888</p>
                                <p>收货地址：广东省广州市天河区</p>
                            </div>
                            <div className="flex flex-row-reverse">
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <ModeEditIcon />
                                </IconButton>
                            </div>
                        </div>

                        <div className="bg-gray-100 h-[120px] w-[420px] cursor-pointer flex justify-center items-center">
                            <div className="text-[#fa9619]">
                                + 添加新地址
                            </div>
                        </div>
                    </div>

                </div>

                <div className="bg-white mt-[15px] p-[20px] flex gap-[20px] items-center">
                    <label htmlFor="">配送信息</label>
                    <div>
                        <div className="border-[#fa9619] border p-[20px] py-[10px]">顺丰</div>
                    </div>
                </div>

                <div className="bg-white mt-[15px] p-[20px] flex gap-[20px] items-center">
                    <label htmlFor="">电子发票</label>
                    <div>
                        <div className="flex items-center gap-[20px]" >
                            <div className="border-[#fa9619] border p-[20px] py-[10px]">增值税普通发票</div>
                            <div className="border-[#b4b4b4] border p-[20px] py-[10px]">13%增值税专用发票</div>
                        </div>
                        <div className="mt-[15px]">
                            <div>开票主体</div>
                            <div className="flex gap-[20px] mt-[10px]">
                                <div className="border-[#fa9619] border w-[420px] p-[20px] h-[120px] cursor-pointer ">
                                    <p>发票抬头：</p>
                                    <p>纳税人识别号：</p>
                                </div>
                                <div className="bg-gray-100 h-[120px] w-[420px] cursor-pointer flex justify-center items-center">
                                    <div className="text-[#fa9619]">
                                        + 添加新主体
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="bg-white mt-[15px] p-[20px] flex gap-[20px]">
                    <label htmlFor="">支付方式</label>
                    <div className="flex gap-[20px]">
                        <div className="border-[#fa9619] border p-[20px] py-[10px]">在线支付</div>
                        <div className="border-[#b4b4b4] border p-[20px] py-[10px]">银行转账</div>
                    </div>
                </div>

                <div className="bg-white mt-[15px] p-[20px] flex gap-[20px]">
                    <label htmlFor="">订单备注</label>
                    <div className="flex-1">
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="bg-white mt-[15px] p-[20px] flex gap-[20px]">
                    <label htmlFor="">商品清单</label>
                    <div>

                    </div>
                </div>
            </main>
        </div>
    )
}