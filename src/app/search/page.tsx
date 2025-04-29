'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Grid, TextField, InputAdornment, Typography, Pagination, Button, Card, CardContent, CardMedia, Container, List, ListItem, ListItemText, ListItemIcon, Divider, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Product from '@/components/product';
import { get } from '@/utils/request';
import ProductListSkeleton from '@/components/ProductListSkeleton';
import Header from '@/components/header';
import Footer from '@/components/Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import CategoryIcon from '@mui/icons-material/Category';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LaptopIcon from '@mui/icons-material/Laptop';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MouseIcon from '@mui/icons-material/Mouse';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import TvIcon from '@mui/icons-material/Tv';
import WatchIcon from '@mui/icons-material/Watch';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  path: string;
}

interface CategoryWithIcon extends Omit<Category, 'icon'> {
  icon: React.ReactElement;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);

  const handleSearch = async (query: string, pageNum: number, categoryId?: number) => {
    setLoading(true);
    try {
      let url = `/api/product/get?page=${pageNum}`;
      if (query) {
        url += `&q=${encodeURIComponent(query)}`;
      }
      if (categoryId) {
        url += `&categories_id=${categoryId}`;
      }
      const response = await get<any>(url);
      setProducts(response.data);
      setTotalPages(response.total_pages);
      setTotalResults(response.num_pages);
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(searchQuery, 1);
      // 更新 URL 参数
      window.history.pushState(
        {},
        '',
        `/search?q=${encodeURIComponent(searchQuery.trim())}&page=1`
      );
    }
  };

  const handleCategoryClick = (category: any) => {
    setSearchQuery(''); // 清空搜索框
    handleSearch('', 1, category.id);
    // 更新 URL 参数
    window.history.pushState(
      {},
      '',
      `/search?categories_id=${category.id}&page=1`
    );
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery, page);
    }
  }, [searchQuery, page]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response:any = await get('/api/category/get');

        setCategories(response.categories);
      } catch (error) {
        console.error('获取分类失败:', error);
      }
    };

    fetchCategories();
  }, []);

  // 根据图标名称返回对应的图标组件
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'smartphone':
        return <SmartphoneIcon />;
      case 'laptop':
        return <LaptopIcon />;
      case 'headphones':
        return <HeadphonesIcon />;
      case 'mouse':
        return <MouseIcon />;
      case 'keyboard':
        return <KeyboardIcon />;
      case 'tv':
        return <TvIcon />;
      case 'watch':
        return <WatchIcon />;
      case 'camera':
        return <CameraAltIcon />;
      default:
        return <CategoryIcon />;
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.history.pushState(
        {},
        '',
        `/search?q=${encodeURIComponent(searchQuery)}&page=${newPage}`
      );
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.history.pushState(
        {},
        '',
        `/search?q=${encodeURIComponent(searchQuery)}&page=${page - 1}`
      );
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.history.pushState(
        {},
        '',
        `/search?q=${encodeURIComponent(searchQuery)}&page=${page + 1}`
      );
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 第一页按钮
    if (startPage > 1) {
      pages.push(
        <Button
          key="first"
          variant={page === 1 ? "contained" : "outlined"}
          onClick={() => handlePageChange(1)}
          sx={{ minWidth: '40px' }}
        >
          1
        </Button>
      );
      if (startPage > 2) {
        pages.push(
          <Typography key="ellipsis1" sx={{ mx: 1 }}>
            ...
          </Typography>
        );
      }
    }

    // 页码按钮
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={page === i ? "contained" : "outlined"}
          onClick={() => handlePageChange(i)}
          sx={{ minWidth: '40px' }}
        >
          {i}
        </Button>
      );
    }

    // 最后一页按钮
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <Typography key="ellipsis2" sx={{ mx: 1 }}>
            ...
          </Typography>
        );
      }
      pages.push(
        <Button
          key="last"
          variant={page === totalPages ? "contained" : "outlined"}
          onClick={() => handlePageChange(totalPages)}
          sx={{ minWidth: '40px' }}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', gap: 3, p: { xs: 1, md: 3 } }}>
          {/* 左侧分类导航 */}
          <Box
            component="aside"
            sx={{
              width: { xs: '100%', md: 240 },
              flexShrink: 0,
              display: { xs: 'none', md: 'block' },
              bgcolor: 'background.paper',
              borderRadius: 1,
              boxShadow: 1,
              overflow: 'hidden'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
                fontWeight: 'medium'
              }}
            >
              商品分类
            </Typography>
            {loading ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <List component="nav" sx={{ p: 1 }}>
                {categories.map((category) => (
                  <React.Fragment key={category.id}>
                    <ListItem
                      component="div"
                      onClick={() => handleCategoryClick(category)}
                      sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'action.hover',
                          '& .MuiListItemIcon-root': {
                            color: 'primary.main'
                          },
                          '& .MuiListItemText-primary': {
                            color: 'primary.main'
                          }
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {category.icon}
                      </ListItemIcon>
                      <ListItemText primary={category.name} />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            )}
          </Box>

          {/* 主要内容区域 */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
              boxShadow: 1,
              p: { xs: 2, md: 3 }
            }}
          >
            {/* 搜索栏 */}
            <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="搜索商品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          bgcolor: '#ff9400',
                          '&:hover': {
                            bgcolor: '#e68600'
                          }
                        }}
                      >
                        搜索
                      </Button>
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ff9400'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ff9400'
                    }
                  }
                }}
              />
            </Box>

            <Typography variant="h5" gutterBottom>
              搜索结果
            </Typography>
            <Grid container spacing={3}>
              {products.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Product 
                    context={''} 
                    {...product} 
                    id={product.id.toString()} 
                  />
                </Grid>
              ))}
            </Grid>
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1, alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  disabled={page === 1}
                  onClick={() => handlePageChange(1)}
                  startIcon={<FirstPageIcon />}
                >
                  首页
                </Button>
                <Button
                  variant="outlined"
                  disabled={page === 1}
                  onClick={handlePrevPage}
                  startIcon={<ArrowBackIcon />}
                >
                  上一页
                </Button>
                {renderPageNumbers()}
                <Button
                  variant="outlined"
                  disabled={page === totalPages}
                  onClick={handleNextPage}
                  endIcon={<ArrowForwardIcon />}
                >
                  下一页
                </Button>
                <Button
                  variant="outlined"
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(totalPages)}
                  endIcon={<LastPageIcon />}
                >
                  末页
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
} 