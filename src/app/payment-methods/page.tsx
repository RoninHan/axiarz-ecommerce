'use client';

import React from 'react';
import { Box, Typography, Container, Paper, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import { CreditCard, AccountBalance, Payment } from '@mui/icons-material';
import Header from '@/components/header';
import Footer from '@/components/Footer';

export default function PaymentMethodsPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          支付方式
        </Typography>

        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            已保存的支付方式
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <CreditCard />
              </ListItemIcon>
              <ListItemText
                primary="信用卡"
                secondary="**** **** **** 1234"
              />
              <Button color="error">删除</Button>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText
                primary="银行账户"
                secondary="工商银行 **** **** **** 5678"
              />
              <Button color="error">删除</Button>
            </ListItem>
          </List>
        </Paper>

        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            添加新的支付方式
          </Typography>
          
          <List>
            <Button
              fullWidth
              sx={{ textAlign: 'left', justifyContent: 'flex-start' }}
            >
              <ListItemIcon>
                <CreditCard />
              </ListItemIcon>
              <ListItemText primary="添加信用卡" />
            </Button>

            <Button
              fullWidth
              sx={{ textAlign: 'left', justifyContent: 'flex-start' }}
            >
              <ListItemIcon>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText primary="添加银行账户" />
            </Button>

            <Button
              fullWidth
              sx={{ textAlign: 'left', justifyContent: 'flex-start' }}
            >
              <ListItemIcon>
                <Payment />
              </ListItemIcon>
              <ListItemText primary="添加其他支付方式" />
            </Button>
          </List>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
} 