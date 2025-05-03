'use client';

import React, { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/Footer';
import { post } from '@/utils/request';
import { useUserStore } from '@/store/userStore';

export default function RegisterPage() {
  const router = useRouter();
  const setToken = useUserStore((state) => state.setToken);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<string>('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    if (!gender) {
      setError('请选择性别');
      return;
    }
    try {
      const response:any = await post('/api/register', { 
        name: username, 
        email, 
        password,
        phone: phone,
        sex: gender
      });
      if (response.token) {
        setToken(response.token);
      }
      router.push('/login');
    } catch (err) {
      setError('注册失败，请稍后重试');
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
            创建账号
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="用户名"
              margin="normal"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              label="手机号码"
              margin="normal"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                性别
                <Typography component="span" sx={{ color: 'error.main', ml: 0.5 }}>*</Typography>
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant={gender === '1' ? 'contained' : 'outlined'}
                  onClick={() => setGender('1')}
                  sx={{ 
                    flex: 1,
                    bgcolor: gender === '1' ? '#ff9400' : 'transparent',
                    color: gender === '1' ? '#fff' : '#666',
                    borderColor: !gender ? 'error.main' : '#ff9400',
                    '&:hover': {
                      bgcolor: gender === '1' ? '#e68600' : 'transparent',
                      borderColor: !gender ? 'error.main' : '#e68600'
                    }
                  }}
                >
                  男
                </Button>
                <Button
                  variant={gender === '2' ? 'contained' : 'outlined'}
                  onClick={() => setGender('2')}
                  sx={{ 
                    flex: 1,
                    bgcolor: gender === '2' ? '#ff9400' : 'transparent',
                    color: gender === '2' ? '#fff' : '#666',
                    borderColor: !gender ? 'error.main' : '#ff9400',
                    '&:hover': {
                      bgcolor: gender === '2' ? '#e68600' : 'transparent',
                      borderColor: !gender ? 'error.main' : '#e68600'
                    }
                  }}
                >
                  女
                </Button>
              </Box>
              {!gender && (
                <Typography variant="caption" sx={{ color: 'error.main', mt: 0.5, display: 'block' }}>
                  请选择性别
                </Typography>
              )}
            </Box>
            <TextField
              fullWidth
              label="密码"
              type="password"
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              label="确认密码"
              type="password"
              margin="normal"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              注册
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link 
                href="/login" 
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
                已有账号？立即登录
              </Link>
            </Box>
          </form>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
} 