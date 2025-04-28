'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Header from '@/components/header';
import Footer from '@/components/Footer';

export default function ProductsPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ flex: 1, maxWidth: 1200, margin: '0 auto', padding: 3, width: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          产品列表
        </Typography>
        {/* 这里可以添加产品列表组件 */}
      </Box>
      <Footer />
    </Box>
  );
} 