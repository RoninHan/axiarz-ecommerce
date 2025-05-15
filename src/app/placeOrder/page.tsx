'use client'
import Header from "@/components/header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { get, post } from "@/utils/request";
import { useUserStore } from "@/store/userStore";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Chip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Image from "next/image";
import { Snackbar, Alert } from '@mui/material';
import { useCartStore } from '@/store/cartStore';

export default function PlaceOrder() {
    const router = useRouter();
    const { isLoggedIn, user } = useUserStore();
    const { checkoutItems, totalPrice: checkoutTotal, clearCheckoutData } = useCartStore();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [openAddressDialog, setOpenAddressDialog] = useState(false);
    const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);
    const [openAddAddressDialog, setOpenAddAddressDialog] = useState(false);
    const [openAddInvoiceDialog, setOpenAddInvoiceDialog] = useState(false);
    const [addresses, setAddresses] = useState<any[]>([]);
    const [invoices, setInvoices] = useState<any[]>([]);

    // 表单数据
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        invoice: false,
        invoiceType: 1,
        invoiceTitle: '',
        invoiceTaxNumber: '',
        remark: ''
    });

    const [newAddress, setNewAddress] = useState({
        receiver: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        detail: '',
        postal_code: ''
    });
    const [newInvoice, setNewInvoice] = useState({
        type: 1, // 1: 个人, 2: 公司
        title: '',
        tax_number: '',
        content: '',
        email: '',
        phone: '',
        is_default: false
    });

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }
        
        if (checkoutItems.length > 0) {
            setCartItems(checkoutItems);
            setTotalPrice(checkoutTotal);
        } else {
            setSnackbarMessage('未选择商品');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            router.push('/cart');
        }
        
        fetchAddresses();
        fetchInvoices();
    }, [isLoggedIn]);

    const fetchAddresses = async () => {
        try {
            const response: any = await get('/api/address/get');
            setAddresses(response.rows);
        } catch (error) {
            console.error('获取地址列表失败:', error);
        }
    };

    const fetchInvoices = async () => {
        try {
            const response: any = await get('/api/invoice/list');
            setInvoices(response.invoices);
        } catch (error) {
            console.error('获取发票信息失败:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddressSelect = (address: any) => {
        setFormData(prev => ({
            ...prev,
            name: address.name,
            phone: address.phone,
            address: address.address
        }));
        setOpenAddressDialog(false);
    };

    const handleInvoiceSelect = (invoice: any) => {
        setFormData(prev => ({
            ...prev,
            invoiceType: invoice.type,
            invoiceTitle: invoice.title,
            invoiceTaxNumber: invoice.tax_number
        }));
        setOpenInvoiceDialog(false);
    };

    const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNewInvoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewInvoice(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveAddress = async () => {
        try {
            const response: any = await post('/api/address/create', newAddress);
            setAddresses(prev => [...prev, response.address]);
            setFormData(prev => ({
                ...prev,
                name: newAddress.receiver,
                phone: newAddress.phone,
                address: `${newAddress.province}${newAddress.city}${newAddress.district}${newAddress.detail}`
            }));
            setNewAddress({ 
                receiver: '', 
                phone: '', 
                province: '', 
                city: '', 
                district: '', 
                detail: '', 
                postal_code: '' 
            });
            setOpenAddAddressDialog(false);
            setSnackbarMessage('地址添加成功');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('添加地址失败:', error);
            setSnackbarMessage('添加地址失败，请重试');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleSaveInvoice = async () => {
        try {
            const response: any = await post('/api/invoice/create', newInvoice);
            setInvoices(prev => [...prev, response.invoice]);
            setFormData(prev => ({
                ...prev,
                invoiceType: newInvoice.type,
                invoiceTitle: newInvoice.title,
                invoiceTaxNumber: newInvoice.tax_number
            }));
            setNewInvoice({ 
                type: 1, 
                title: '', 
                tax_number: '', 
                content: '', 
                email: '', 
                phone: '', 
                is_default: false 
            });
            setOpenAddInvoiceDialog(false);
            setSnackbarMessage('发票信息添加成功');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('添加发票信息失败:', error);
            setSnackbarMessage('添加发票信息失败，请重试');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleSubmit = async () => {
        // 表单验证
        if (!formData.name || !formData.phone || !formData.address) {
            setSnackbarMessage('请填写完整的收货信息');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        if (formData.invoice) {
            if (!formData.invoiceTitle) {
                setSnackbarMessage('请填写发票抬头');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                return;
            }
            if (formData.invoiceType === 'company' && !formData.invoiceTaxNumber) {
                setSnackbarMessage('请填写纳税人识别号');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                return;
            }
        }

        try {
            const orderData = {
                user_id: user?.id,
                items: cartItems.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity
                })),
                shipping_info: {
                    name: formData.name,
                    phone: formData.phone,
                    address: formData.address
                },
                invoice_info: formData.invoice ? {
                    type: formData.invoiceType,
                    title: formData.invoiceTitle,
                    tax_number: formData.invoiceTaxNumber
                } : null,
                remark: formData.remark,
                total_amount: totalPrice
            };

            const response = await post('/api/order/create', orderData);
            setSnackbarMessage('订单创建成功！');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            clearCheckoutData(); // 清除结算数据
            setTimeout(() => {
                router.push('/order');
            }, 1500);
        } catch (error) {
            console.error('创建订单失败:', error);
            setSnackbarMessage('创建订单失败，请重试');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <Typography variant="h4" gutterBottom>
                    确认订单
                </Typography>
                <Grid container spacing={4}>
                    {/* 收货信息 */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">
                                    收货信息
                                </Typography>
                                <Box>
                                    <Button
                                        startIcon={<AddIcon />}
                                        onClick={() => setOpenAddAddressDialog(true)}
                                        sx={{ color: '#ff9400', mr: 2 }}
                                    >
                                        添加地址
                                    </Button>
                                    <Button
                                        startIcon={<AddIcon />}
                                        onClick={() => setOpenAddressDialog(true)}
                                        sx={{ color: '#ff9400' }}
                                    >
                                        选择地址
                                    </Button>
                                </Box>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="收货人姓名"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#ff9400',
                                                },
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#ff9400',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="联系电话"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#ff9400',
                                                },
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#ff9400',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="收货地址"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        multiline
                                        rows={2}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#ff9400',
                                                },
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#ff9400',
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* 发票信息 */}
                        <Paper sx={{ p: 3, mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">
                                    发票信息
                                </Typography>
                                <Box>
                                    <Button
                                        startIcon={<AddIcon />}
                                        onClick={() => setOpenAddInvoiceDialog(true)}
                                        sx={{ color: '#ff9400', mr: 2 }}
                                    >
                                        添加发票
                                    </Button>
                                    <Button
                                        startIcon={<AddIcon />}
                                        onClick={() => setOpenInvoiceDialog(true)}
                                        sx={{ color: '#ff9400' }}
                                    >
                                        选择发票
                                    </Button>
                                </Box>
                            </Box>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="invoice"
                                            checked={formData.invoice}
                                            onChange={handleInputChange}
                                        />
                                    }
                                    label="需要发票"
                                />
                            </FormGroup>
                            {formData.invoice && (
                                <Box sx={{ mt: 2 }}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">发票类型</FormLabel>
                                        <RadioGroup
                                            row
                                            name="invoiceType"
                                            value={formData.invoiceType}
                                            onChange={handleInputChange}
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={<Radio />}
                                                label="个人"
                                            />
                                            <FormControlLabel
                                                value={2}
                                                control={<Radio />}
                                                label="公司"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <TextField
                                        fullWidth
                                        label="发票抬头"
                                        name="invoiceTitle"
                                        value={formData.invoiceTitle}
                                        onChange={handleInputChange}
                                        sx={{ 
                                            mt: 2,
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#ff9400',
                                                },
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#ff9400',
                                            },
                                        }}
                                        required
                                    />
                                    {formData.invoiceType === 2 && (
                                        <TextField
                                            fullWidth
                                            label="纳税人识别号"
                                            name="invoiceTaxNumber"
                                            value={formData.invoiceTaxNumber}
                                            onChange={handleInputChange}
                                            sx={{ 
                                                mt: 2,
                                                '& .MuiOutlinedInput-root': {
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#ff9400',
                                                    },
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#ff9400',
                                                },
                                            }}
                                            required
                                        />
                                    )}
                                </Box>
                            )}
                        </Paper>

                        {/* 备注信息 */}
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                备注信息
                            </Typography>
                            <TextField
                                fullWidth
                                label="订单备注"
                                name="remark"
                                value={formData.remark}
                                onChange={handleInputChange}
                                multiline
                                rows={3}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#ff9400',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#ff9400',
                                    },
                                }}
                            />
                        </Paper>
                    </Grid>

                    {/* 订单信息 */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
                            <Typography variant="h6" gutterBottom>
                                订单信息
                            </Typography>
                            <TableContainer>
                                <Table size="small">
                                    <TableBody>
                                        {cartItems.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Image
                                                            src={process.env.NEXT_PUBLIC_API_BASE_URL + item.product.image_url}
                                                            alt={item.product.name}
                                                            width={60}
                                                            height={60}
                                                            style={{ objectFit: 'cover' }}
                                                        />
                                                        <Box sx={{ ml: 1 }}>
                                                            <Typography variant="body2">
                                                                {item.product.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                x{item.quantity}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    ¥{(Number(item.product.price) * item.quantity).toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                                <Typography variant="h6" align="right">
                                    总计: ¥{totalPrice.toFixed(2)}
                                </Typography>
                            </Box>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{ 
                                    mt: 3,
                                    bgcolor: '#ff9400',
                                    '&:hover': {
                                        bgcolor: '#e68600'
                                    }
                                }}
                            >
                                提交订单
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </main>
            <Footer />

            {/* 地址选择对话框 */}
            <Dialog open={openAddressDialog} onClose={() => setOpenAddressDialog(false)}>
                <DialogTitle>选择收货地址</DialogTitle>
                <DialogContent>
                    <Box sx={{ minWidth: 400 }}>
                        {addresses.map((address) => (
                            <Paper 
                                key={address.id} 
                                sx={{ 
                                    p: 2, 
                                    mb: 2, 
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 148, 0, 0.04)'
                                    }
                                }}
                                onClick={() => {
                                    setFormData(prev => ({
                                        ...prev,
                                        name: address.name,
                                        phone: address.phone,
                                        address: `${address.province}${address.city}${address.district}${address.detail}`
                                    }));
                                    setOpenAddressDialog(false);
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="subtitle1">{address.name}</Typography>
                                    {address.is_default && (
                                        <Chip 
                                            label="默认" 
                                            size="small" 
                                            sx={{ 
                                                bgcolor: '#ff9400', 
                                                color: 'white',
                                                '& .MuiChip-label': {
                                                    px: 1
                                                }
                                            }} 
                                        />
                                    )}
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {address.phone}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {address.province}{address.city}{address.district}{address.detail}
                                </Typography>
                                {address.postal_code && (
                                    <Typography variant="body2" color="text.secondary">
                                        邮编：{address.postal_code}
                                    </Typography>
                                )}
                            </Paper>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddressDialog(false)}>取消</Button>
                </DialogActions>
            </Dialog>

            {/* 发票选择对话框 */}
            <Dialog open={openInvoiceDialog} onClose={() => setOpenInvoiceDialog(false)}>
                <DialogTitle>选择发票信息</DialogTitle>
                <DialogContent>
                    <Box sx={{ minWidth: 400 }}>
                        {invoices.map((invoice) => (
                            <Paper 
                                key={invoice.id} 
                                sx={{ 
                                    p: 2, 
                                    mb: 2, 
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 148, 0, 0.04)'
                                    }
                                }}
                                onClick={() => {
                                    setFormData(prev => ({
                                        ...prev,
                                        invoiceType: invoice.type,
                                        invoiceTitle: invoice.title,
                                        invoiceTaxNumber: invoice.tax_number || ''
                                    }));
                                    setOpenInvoiceDialog(false);
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="subtitle1">{invoice.title}</Typography>
                                    {invoice.is_default && (
                                        <Chip 
                                            label="默认" 
                                            size="small" 
                                            sx={{ 
                                                bgcolor: '#ff9400', 
                                                color: 'white',
                                                '& .MuiChip-label': {
                                                    px: 1
                                                }
                                            }} 
                                        />
                                    )}
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {invoice.type === 1 ? '个人' : '公司'}
                                </Typography>
                                {invoice.type === 2 && (
                                    <Typography variant="body2" color="text.secondary">
                                        税号：{invoice.tax_number}
                                    </Typography>
                                )}
                                <Typography variant="body2" color="text.secondary">
                                    内容：{invoice.content}
                                </Typography>
                                {invoice.email && (
                                    <Typography variant="body2" color="text.secondary">
                                        邮箱：{invoice.email}
                                    </Typography>
                                )}
                                {invoice.phone && (
                                    <Typography variant="body2" color="text.secondary">
                                        电话：{invoice.phone}
                                    </Typography>
                                )}
                            </Paper>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenInvoiceDialog(false)}>取消</Button>
                </DialogActions>
            </Dialog>

            {/* 添加地址对话框 */}
            <Dialog 
                open={openAddAddressDialog} 
                onClose={() => setOpenAddAddressDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>添加收货地址</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="收货人姓名"
                            name="receiver"
                            value={newAddress.receiver}
                            onChange={handleNewAddressChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="联系电话"
                            name="phone"
                            value={newAddress.phone}
                            onChange={handleNewAddressChange}
                            sx={{ mb: 2 }}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="省份"
                                    name="province"
                                    value={newAddress.province}
                                    onChange={handleNewAddressChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="城市"
                                    name="city"
                                    value={newAddress.city}
                                    onChange={handleNewAddressChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="区/县"
                                    name="district"
                                    value={newAddress.district}
                                    onChange={handleNewAddressChange}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            fullWidth
                            label="详细地址"
                            name="detail"
                            value={newAddress.detail}
                            onChange={handleNewAddressChange}
                            multiline
                            rows={2}
                            sx={{ mt: 2, mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="邮政编码"
                            name="postal_code"
                            value={newAddress.postal_code}
                            onChange={handleNewAddressChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddAddressDialog(false)}>取消</Button>
                    <Button 
                        variant="contained" 
                        onClick={handleSaveAddress}
                        sx={{ bgcolor: '#ff9400', '&:hover': { bgcolor: '#e68600' } }}
                    >
                        保存
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 添加发票对话框 */}
            <Dialog 
                open={openAddInvoiceDialog} 
                onClose={() => setOpenAddInvoiceDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>添加发票信息</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <FormControl component="fieldset" sx={{ mb: 2 }}>
                            <FormLabel component="legend">发票类型</FormLabel>
                            <RadioGroup
                                row
                                name="type"
                                value={newInvoice.type}
                                onChange={(e) => setNewInvoice(prev => ({
                                    ...prev,
                                    type: parseInt(e.target.value)
                                }))}
                            >
                                <FormControlLabel
                                    value={1}
                                    control={<Radio />}
                                    label="个人"
                                />
                                <FormControlLabel
                                    value={2}
                                    control={<Radio />}
                                    label="公司"
                                />
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="发票抬头"
                            name="title"
                            value={newInvoice.title}
                            onChange={handleNewInvoiceChange}
                            sx={{ mb: 2 }}
                        />
                        {newInvoice.type === 2 && (
                            <TextField
                                fullWidth
                                label="纳税人识别号"
                                name="tax_number"
                                value={newInvoice.tax_number}
                                onChange={handleNewInvoiceChange}
                                sx={{ mb: 2 }}
                            />
                        )}
                        <TextField
                            fullWidth
                            label="发票内容"
                            name="content"
                            value={newInvoice.content}
                            onChange={handleNewInvoiceChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="电子邮箱"
                            name="email"
                            value={newInvoice.email}
                            onChange={handleNewInvoiceChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="联系电话"
                            name="phone"
                            value={newInvoice.phone}
                            onChange={handleNewInvoiceChange}
                            sx={{ mb: 2 }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="is_default"
                                    checked={newInvoice.is_default}
                                    onChange={(e) => setNewInvoice(prev => ({
                                        ...prev,
                                        is_default: e.target.checked
                                    }))}
                                />
                            }
                            label="设为默认发票"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddInvoiceDialog(false)}>取消</Button>
                    <Button 
                        variant="contained" 
                        onClick={handleSaveInvoice}
                        sx={{ bgcolor: '#ff9400', '&:hover': { bgcolor: '#e68600' } }}
                    >
                        保存
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={() => setOpenSnackbar(false)} 
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}