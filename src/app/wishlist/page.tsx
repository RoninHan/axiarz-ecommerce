'use client';

import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, CardActions, Button, IconButton } from '@mui/material';
import { Delete as DeleteIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import Header from '@/components/header';
import Footer from '@/components/Footer';

export default function WishlistPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          我的收藏
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* 收藏商品卡片 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="/product-placeholder.jpg"
                alt="商品图片"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  商品名称
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  商品描述信息
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ¥199.00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<ShoppingCartIcon />}>
                  加入购物车
                </Button>
                <IconButton size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="/product-placeholder.jpg"
                alt="商品图片"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  商品名称
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  商品描述信息
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ¥299.00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<ShoppingCartIcon />}>
                  加入购物车
                </Button>
                <IconButton size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="/product-placeholder.jpg"
                alt="商品图片"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  商品名称
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  商品描述信息
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ¥399.00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<ShoppingCartIcon />}>
                  加入购物车
                </Button>
                <IconButton size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
} 