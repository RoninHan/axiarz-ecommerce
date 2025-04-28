'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, Alert } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import Header from '@/components/header';
import Footer from '@/components/Footer';

export default function AddressesPage() {
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState<number[]>([]);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: '张三',
      phone: '13888888888',
      province: '广东省',
      city: '广州市',
      district: '天河区',
      detail: '珠江新城A区1栋1单元101',
      isDefault: true
    },
    {
      id: 2,
      name: '李四',
      phone: '13999999999',
      province: '北京市',
      city: '北京市',
      district: '朝阳区',
      detail: '朝阳门内大街1号',
      isDefault: false
    }
  ]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirmOpen = () => {
    if (selectedAddresses.length > 0) {
      setDeleteConfirmOpen(true);
    }
  };

  const handleDeleteConfirmClose = () => {
    setDeleteConfirmOpen(false);
  };

  const handleDelete = () => {
    setAddresses(addresses.filter(address => !selectedAddresses.includes(address.id)));
    setSelectedAddresses([]);
    handleDeleteConfirmClose();
  };

  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
  };

  const handleSelectAddress = (id: number) => {
    setSelectedAddresses(prev => 
      prev.includes(id) 
        ? prev.filter(addrId => addrId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedAddresses.length === addresses.length) {
      setSelectedAddresses([]);
    } else {
      setSelectedAddresses(addresses.map(addr => addr.id));
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h1">
              收货地址管理
            </Typography>
            <Box>
              {selectedAddresses.length > 0 && (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteConfirmOpen}
                  sx={{ mr: 2 }}
                >
                  批量删除
                </Button>
              )}
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
                sx={{ 
                  bgcolor: '#ff9400',
                  '&:hover': {
                    bgcolor: '#e68600'
                  }
                }}
              >
                添加新地址
              </Button>
            </Box>
          </Box>

          <List>
            <ListItem>
              <Checkbox
                checked={selectedAddresses.length === addresses.length}
                indeterminate={selectedAddresses.length > 0 && selectedAddresses.length < addresses.length}
                onChange={handleSelectAll}
              />
              <Typography variant="subtitle2" sx={{ ml: 1 }}>
                全选
              </Typography>
            </ListItem>
            {addresses.map((address) => (
              <Paper key={address.id} elevation={1} sx={{ mb: 2 }}>
                <ListItem>
                  <Checkbox
                    checked={selectedAddresses.includes(address.id)}
                    onChange={() => handleSelectAddress(address.id)}
                  />
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1">
                          {address.name} {address.phone}
                        </Typography>
                        {address.isDefault && (
                          <Typography
                            variant="caption"
                            sx={{
                              ml: 1,
                              px: 1,
                              py: 0.5,
                              bgcolor: '#ff9400',
                              color: 'white',
                              borderRadius: 1
                            }}
                          >
                            默认地址
                          </Typography>
                        )}
                      </Box>
                    }
                    secondary={`${address.province}${address.city}${address.district}${address.detail}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      aria-label="delete" 
                      onClick={() => {
                        setSelectedAddresses([address.id]);
                        setDeleteConfirmOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            ))}
          </List>
        </Paper>
      </Container>
      <Footer />

      {/* 添加/编辑地址对话框 */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>添加新地址</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="收货人姓名"
              fullWidth
              size="small"
            />
            <TextField
              label="手机号码"
              fullWidth
              size="small"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>省份</InputLabel>
                <Select label="省份">
                  <MenuItem value="广东省">广东省</MenuItem>
                  <MenuItem value="北京市">北京市</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>城市</InputLabel>
                <Select label="城市">
                  <MenuItem value="广州市">广州市</MenuItem>
                  <MenuItem value="北京市">北京市</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>区/县</InputLabel>
                <Select label="区/县">
                  <MenuItem value="天河区">天河区</MenuItem>
                  <MenuItem value="朝阳区">朝阳区</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              label="详细地址"
              fullWidth
              multiline
              rows={2}
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button 
            variant="contained" 
            onClick={handleClose}
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

      {/* 删除确认对话框 */}
      <Dialog open={deleteConfirmOpen} onClose={handleDeleteConfirmClose}>
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            您确定要删除选中的地址吗？此操作不可恢复。
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose}>取消</Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleDelete}
          >
            确认删除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 