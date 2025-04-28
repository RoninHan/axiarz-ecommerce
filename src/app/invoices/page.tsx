'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import Header from '@/components/header';
import Footer from '@/components/Footer';

export default function InvoicesPage() {
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      type: '个人',
      title: '个人发票',
      taxNumber: '',
      isDefault: true
    },
    {
      id: 2,
      type: '企业',
      title: '某某科技有限公司',
      taxNumber: '123456789012345',
      isDefault: false
    }
  ]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setInvoices(invoices.map(invoice => ({
      ...invoice,
      isDefault: invoice.id === id
    })));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h1">
              发票管理
            </Typography>
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
              添加发票信息
            </Button>
          </Box>

          <List>
            {invoices.map((invoice) => (
              <Paper key={invoice.id} elevation={1} sx={{ mb: 2 }}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1">
                          {invoice.title}
                        </Typography>
                        {invoice.isDefault && (
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
                            默认发票
                          </Typography>
                        )}
                      </Box>
                    }
                    secondary={
                      invoice.type === '企业' ? `企业发票 | 税号：${invoice.taxNumber}` : '个人发票'
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(invoice.id)}>
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

      {/* 添加/编辑发票对话框 */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>添加发票信息</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <FormControl>
              <RadioGroup row defaultValue="个人">
                <FormControlLabel value="个人" control={<Radio />} label="个人发票" />
                <FormControlLabel value="企业" control={<Radio />} label="企业发票" />
              </RadioGroup>
            </FormControl>
            <TextField
              label="发票抬头"
              fullWidth
              size="small"
            />
            <TextField
              label="税号"
              fullWidth
              size="small"
              disabled={true}
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
    </Box>
  );
} 