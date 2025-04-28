'use client';

import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Paper, Avatar, Button, List, ListItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Person, ShoppingCart, Favorite, Settings, ExitToApp, Payment, Help, LocationOn, Receipt, Edit } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/Footer';

export default function AccountPage() {
  const router = useRouter();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13888888888',
    avatar: '/images/avatar.jpg'
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleEditDialogOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleSave = () => {
    // TODO: 实现保存逻辑
    handleEditDialogClose();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Grid container spacing={4}>
          {/* 左侧个人信息 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Avatar
                src={userInfo.avatar}
                sx={{ width: 100, height: 100, margin: '0 auto 20px' }}
              />
              <Typography variant="h6" gutterBottom>
                {userInfo.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                会员等级：普通会员
              </Typography>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={handleEditDialogOpen}
                fullWidth
                sx={{ 
                  mt: 2,
                  bgcolor: '#ff9400',
                  '&:hover': {
                    bgcolor: '#e68600'
                  }
                }}
              >
                编辑资料
              </Button>
            </Paper>
          </Grid>

          {/* 右侧功能列表 */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                我的账户
              </Typography>
              <List>
                <ListItem component="a" href="/orders">
                  <ListItemIcon>
                    <ShoppingCart />
                  </ListItemIcon>
                  <ListItemText primary="我的订单" secondary="查看和管理您的订单" />
                </ListItem>

                <ListItem component="a" href="/wishlist">
                  <ListItemIcon>
                    <Favorite />
                  </ListItemIcon>
                  <ListItemText primary="我的收藏" secondary="查看您收藏的商品" />
                </ListItem>

                <ListItem component="a" href="/payment">
                  <ListItemIcon>
                    <Payment />
                  </ListItemIcon>
                  <ListItemText primary="支付方式" secondary="管理您的支付方式" />
                </ListItem>

                <ListItem component="a" href="/addresses">
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText primary="收货地址" secondary="管理您的收货地址" />
                </ListItem>

                <ListItem component="a" href="/invoices">
                  <ListItemIcon>
                    <Receipt />
                  </ListItemIcon>
                  <ListItemText primary="发票管理" secondary="管理您的发票信息" />
                </ListItem>

                <ListItem component="a" href="/help">
                  <ListItemIcon>
                    <Help />
                  </ListItemIcon>
                  <ListItemText primary="帮助中心" secondary="获取帮助和支持" />
                </ListItem>

                <ListItem component="a" href="/settings">
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="账户设置" secondary="管理您的账户设置" />
                </ListItem>

                <ListItem onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary="退出登录" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />

      {/* 编辑资料对话框 */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>编辑个人资料</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={userInfo.avatar}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Button variant="outlined" size="small">
                更换头像
              </Button>
            </Box>
            <TextField
              label="姓名"
              fullWidth
              size="small"
              defaultValue={userInfo.name}
            />
            <TextField
              label="邮箱"
              fullWidth
              size="small"
              defaultValue={userInfo.email}
              type="email"
            />
            <TextField
              label="手机号码"
              fullWidth
              size="small"
              defaultValue={userInfo.phone}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>取消</Button>
          <Button 
            variant="contained" 
            onClick={handleSave}
            sx={{ 
              bgcolor: '#ff9400',
              '&:hover': {
                bgcolor: '#e68600'
              }
            }}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 