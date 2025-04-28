'use client';

import React from 'react';
import { Box, Typography, Container, Grid, Paper, TextField, Button } from '@mui/material';
import Header from '@/components/header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          联系我们
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                联系方式
              </Typography>
              <Typography variant="body1" paragraph>
                客服电话：400-123-4567
              </Typography>
              <Typography variant="body1" paragraph>
                邮箱：support@example.com
              </Typography>
              <Typography variant="body1" paragraph>
                工作时间：周一至周五 9:00-18:00
              </Typography>
              <Typography variant="body1" paragraph>
                地址：北京市朝阳区某某大厦
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                在线留言
              </Typography>
              <form>
                <TextField
                  fullWidth
                  label="姓名"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="邮箱"
                  type="email"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="主题"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="留言内容"
                  multiline
                  rows={4}
                  margin="normal"
                  required
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  提交
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
} 