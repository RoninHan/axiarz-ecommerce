'use client';

import React from 'react';
import { Box, Typography, Container, Paper, List, ListItem, ListItemText } from '@mui/material';
import Header from '@/components/header';
import Footer from '@/components/Footer';

export default function ShippingPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          配送信息
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. 配送范围
          </Typography>
          <Typography variant="body1" paragraph>
            我们目前支持中国大陆地区的配送服务，包括：
            - 所有省份、直辖市和自治区
            - 香港、澳门特别行政区
            - 台湾地区
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            2. 配送时间
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="普通配送"
                secondary="3-5个工作日送达"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="加急配送"
                secondary="1-2个工作日送达（需额外支付加急费用）"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="偏远地区"
                secondary="可能需要额外1-2个工作日"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            3. 配送费用
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="普通配送"
                secondary="订单满99元免运费，不满99元收取10元运费"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="加急配送"
                secondary="在普通配送基础上加收20元加急费用"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="偏远地区"
                secondary="可能需要额外支付偏远地区配送费用"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            4. 配送状态查询
          </Typography>
          <Typography variant="body1" paragraph>
            您可以通过以下方式查询订单配送状态：
            - 登录账号，在'我的订单'中查看
            - 使用订单号在官网查询
            - 联系客服查询
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            5. 配送注意事项
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="收货地址"
                secondary="请确保收货地址准确完整，包括省市区、街道、门牌号等详细信息"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="收货人信息"
                secondary="请提供正确的收货人姓名和联系电话，以便快递员联系"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="签收检查"
                secondary="收到商品时请检查包装是否完好，如有问题请及时联系客服"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            6. 特殊情况说明
          </Typography>
          <Typography variant="body1" paragraph>
            如遇以下情况，配送时间可能会延长：
            - 法定节假日
            - 恶劣天气
            - 交通管制
            - 其他不可抗力因素
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            7. 联系方式
          </Typography>
          <Typography variant="body1" paragraph>
            如有任何配送相关问题，请联系我们的客服：
            <br />
            客服电话：+86 123 4567 8900
            <br />
            客服邮箱：support@axial.com
            <br />
            工作时间：周一至周五 9:00-18:00
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
} 