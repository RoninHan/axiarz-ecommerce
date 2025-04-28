'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Grid, TextField, InputAdornment, Typography, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Product from '@/components/product';
import { get } from '@/utils/request';
import ProductListSkeleton from '@/components/ProductListSkeleton';
import Header from '@/components/header';
import Footer from '@/components/Footer';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async (query: string, pageNum: number) => {
    setLoading(true);
    try {
      const response = await get<any>(`/products/search?q=${encodeURIComponent(query)}&page=${pageNum}`);
      setProducts(response.data);
      setTotalPages(response.total_pages);
      setTotalResults(response.total);
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery, page);
    }
  }, [searchQuery, page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // 更新 URL 参数但不刷新页面
    window.history.pushState(
      {},
      '',
      `/search?q=${encodeURIComponent(searchQuery)}&page=${value}`
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ flex: 1, maxWidth: 1200, margin: '0 auto', padding: 3, width: '100%' }}>
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="搜索产品..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {searchQuery && (
          <Typography variant="h6" sx={{ mb: 2 }}>
            找到 {totalResults} 个结果
          </Typography>
        )}

        {loading ? (
          <ProductListSkeleton count={8} />
        ) : products.length > 0 ? (
          <>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Product {...product} />
                </Grid>
              ))}
            </Grid>
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        ) : searchQuery ? (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
            没有找到相关产品
          </Typography>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
            请输入搜索关键词
          </Typography>
        )}
      </Box>
      <Footer />
    </Box>
  );
} 