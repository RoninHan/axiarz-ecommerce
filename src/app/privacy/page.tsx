'use client';

import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import Header from '@/components/header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          隐私政策
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. 信息收集
          </Typography>
          <Typography variant="body1" paragraph>
            我们收集的信息包括但不限于：您的姓名、联系方式、地址、支付信息等。这些信息将用于处理您的订单、提供客户服务以及改进我们的服务。
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. 信息使用
          </Typography>
          <Typography variant="body1" paragraph>
            我们使用收集的信息来：
            - 处理您的订单和付款
            - 提供客户支持
            - 发送订单更新和促销信息
            - 改进我们的产品和服务
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. 信息保护
          </Typography>
          <Typography variant="body1" paragraph>
            我们采取适当的安全措施来保护您的个人信息，包括：
            - 使用加密技术保护数据传输
            - 限制员工访问权限
            - 定期进行安全审计
          </Typography>

          <Typography variant="h6" gutterBottom>
            4. 信息共享
          </Typography>
          <Typography variant="body1" paragraph>
            我们不会向第三方出售或出租您的个人信息。仅在以下情况下，我们可能会共享您的信息：
            - 获得您的明确同意
            - 法律要求
            - 保护我们的合法权益
          </Typography>

          <Typography variant="h6" gutterBottom>
            5. Cookie使用
          </Typography>
          <Typography variant="body1" paragraph>
            我们使用Cookie来改善您的浏览体验，记住您的偏好，并分析网站流量。您可以通过浏览器设置来管理Cookie。
          </Typography>

          <Typography variant="h6" gutterBottom>
            6. 您的权利
          </Typography>
          <Typography variant="body1" paragraph>
            您有权：
            - 访问您的个人信息
            - 更正不准确的信息
            - 要求删除您的信息
            - 撤回同意
            - 投诉数据保护问题
          </Typography>

          <Typography variant="h6" gutterBottom>
            7. 政策更新
          </Typography>
          <Typography variant="body1" paragraph>
            我们可能会不时更新本隐私政策。更新后的政策将在网站上公布，并注明更新日期。
          </Typography>

          <Typography variant="h6" gutterBottom>
            8. 联系我们
          </Typography>
          <Typography variant="body1" paragraph>
            如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
            <br />
            邮箱：privacy@axial.com
            <br />
            电话：+86 123 4567 8900
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
} 