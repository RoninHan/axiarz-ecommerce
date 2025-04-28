import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* 公司信息 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Axial E-commerce
            </Typography>
            <Typography variant="body2" color="text.secondary">
              提供优质的电子产品和配件
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* 快速链接 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              快速链接
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/" color="inherit" underline="hover">
                首页
              </Link>
              <Link href="/products" color="inherit" underline="hover">
                产品
              </Link>
              <Link href="/about" color="inherit" underline="hover">
                关于我们
              </Link>
              <Link href="/contact" color="inherit" underline="hover">
                联系我们
              </Link>
            </Box>
          </Grid>

          {/* 客户服务 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              客户服务
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/faq" color="inherit" underline="hover">
                常见问题
              </Link>
              <Link href="/shipping" color="inherit" underline="hover">
                配送信息
              </Link>
              <Link href="/returns" color="inherit" underline="hover">
                退换货政策
              </Link>
              <Link href="/privacy" color="inherit" underline="hover">
                隐私政策
              </Link>
            </Box>
          </Grid>

          {/* 联系方式 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              联系我们
            </Typography>
            <Typography variant="body2" color="text.secondary">
              邮箱: support@axial.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              电话: +86 123 4567 8900
            </Typography>
            <Typography variant="body2" color="text.secondary">
              地址: 中国广东省深圳市
            </Typography>
          </Grid>
        </Grid>

        {/* 版权信息 */}
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Axial E-commerce. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 