'use client';

import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import Header from '@/components/header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          关于我们
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                公司简介
              </Typography>
              <Typography variant="body1" paragraph>
                Axial E-commerce 是一家专注于提供优质电子产品和配件的电子商务平台。
                我们致力于为客户提供最好的产品和服务，让科技改变生活。
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                我们的使命
              </Typography>
              <Typography variant="body1" paragraph>
                我们的使命是通过提供高质量的产品和卓越的服务，
                帮助客户实现他们的科技梦想，推动行业发展。
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                我们的优势
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    优质产品
                  </Typography>
                  <Typography variant="body2">
                    严格筛选供应商，确保产品质量
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    专业服务
                  </Typography>
                  <Typography variant="body2">
                    专业的客服团队，提供全方位支持
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    快速配送
                  </Typography>
                  <Typography variant="body2">
                    高效的物流系统，确保及时送达
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
} 