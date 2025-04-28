'use client';

import React, { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: 实现登录逻辑
      console.log('登录信息:', { email, password });
      // 登录成功后跳转到首页
      router.push('/');
    } catch (err) {
      setError('登录失败，请检查邮箱和密码');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Header />
      <Container maxWidth="sm" sx={{ flex: 1, py: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            maxWidth: 400,
            mx: 'auto',
            borderRadius: 2,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              color: '#333',
              fontWeight: 'bold',
              mb: 4
            }}
          >
            欢迎登录
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="邮箱"
              type="email"
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ff9400',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#ff9400',
                }
              }}
              size="small"
            />
            <TextField
              fullWidth
              label="密码"
              type="password"
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ff9400',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#ff9400',
                }
              }}
              size="small"
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ 
                mt: 2,
                mb: 3,
                py: 1,
                borderRadius: 1,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                bgcolor: '#ff9400',
                '&:hover': {
                  bgcolor: '#e68600'
                }
              }}
            >
              登录
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link 
                href="/register" 
                variant="body2"
                sx={{ 
                  color: '#666',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#1976d2',
                    textDecoration: 'underline'
                  }
                }}
              >
                还没有账号？立即注册
              </Link>
            </Box>
          </form>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
} 