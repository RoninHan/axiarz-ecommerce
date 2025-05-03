'use client'
import Header from "@/components/header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { get, post } from "@/utils/request";
import { useUserStore } from "@/store/userStore";
import { useCartStore } from '@/store/cartStore';
import { Box, Button, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Image from "next/image";

export default function CartPage() {
    const router = useRouter();
    const { isLoggedIn } = useUserStore();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const { selectedItems, toggleSelectedItem, setSelectedItems, setCheckoutData } = useCartStore();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }
        fetchCartItems();
    }, [isLoggedIn]);

    const fetchCartItems = async () => {
        try {
            const response: any = await get('/api/cart/get');
            setCartItems(response.cart_items);
        } catch (error) {
            console.error('获取购物车失败:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await post('/api/cart/delete/' + id);
            fetchCartItems();
        } catch (error) {
            console.error('删除失败:', error);
        }
    };

    const handleBatchDelete = async () => {
        if (selectedItems.length === 0) return;
        
        try {
            for (const id of selectedItems) {
                await post('/api/cart/delete/' + id);
            }
            setSelectedItems([]);
            fetchCartItems();
        } catch (error) {
            console.error('批量删除失败:', error);
        }
    };

    const handleCheckboxChange = (id: number) => {
        toggleSelectedItem(id);
    };

    const calculateTotal = () => {
        const selected = cartItems.filter(item => selectedItems.includes(item.id));
        const total = selected.reduce((sum, item) => sum + (Number(item.product.price) * item.quantity), 0);
        setTotalPrice(total);
    };

    useEffect(() => {
        calculateTotal();
    }, [selectedItems, cartItems]);

    const handleCheckout = () => {
        const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
        setCheckoutData(selectedCartItems, totalPrice);
        router.push('/placeOrder');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <Typography variant="h4" gutterBottom>
                    购物车
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedItems.length === cartItems.length}
                                        onChange={() => {
                                            if (selectedItems.length === cartItems.length) {
                                                setSelectedItems([]);
                                            } else {
                                                setSelectedItems(cartItems.map(item => item.id));
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>商品</TableCell>
                                <TableCell align="right">单价</TableCell>
                                <TableCell align="right">数量</TableCell>
                                <TableCell align="right">小计</TableCell>
                                <TableCell align="right">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Image
                                                src={process.env.NEXT_PUBLIC_API_BASE_URL + item.product.image_url}
                                                alt={item.product.name}
                                                width={80}
                                                height={80}
                                                style={{ objectFit: 'cover' }}
                                            />
                                            <Box sx={{ ml: 2 }}>
                                                <Typography>{item.product.name}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    型号：{item.product.type_name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">¥{item.product.price}</TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">¥{(Number(item.product.price) * item.quantity).toFixed(2)}</TableCell>
                                    <TableCell align="right">
                                        <IconButton 
                                            onClick={() => handleDelete(item.id)}
                                            sx={{ 
                                                color: '#ff0036',
                                                '&:hover': {
                                                    color: '#cc002b',
                                                    bgcolor: 'rgba(255, 0, 54, 0.04)'
                                                }
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleBatchDelete}
                            disabled={selectedItems.length === 0}
                            sx={{ 
                                borderColor: '#ff0036',
                                color: '#ff0036',
                                '&:hover': {
                                    borderColor: '#cc002b',
                                    bgcolor: 'rgba(255, 0, 54, 0.04)'
                                }
                            }}
                        >
                            批量删除
                        </Button>
                        <Typography variant="body2" color="text.secondary">
                            已选择 {selectedItems.length} 件商品
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6">
                            总计: ¥{totalPrice.toFixed(2)}
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleCheckout}
                            disabled={selectedItems.length === 0}
                            sx={{ 
                                mt: 3,
                                bgcolor: '#ff9400',
                                '&:hover': {
                                    bgcolor: '#e68600'
                                }
                            }}
                        >
                            结算
                        </Button>
                    </Box>
                </Box>
            </main>
            <Footer />
        </div>
    );
}