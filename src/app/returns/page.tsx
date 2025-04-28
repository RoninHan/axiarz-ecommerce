'use client';

import React from 'react';
import { Box, Typography, Container, Paper, List, ListItem, ListItemText } from '@mui/material';
import Header from '@/components/header';
import Footer from '@/components/Footer';

export default function ReturnsPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          退换货政策
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. 退换货条件
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="商品质量问题"
                secondary="收到商品后7天内，如发现商品存在质量问题，可申请退换货"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="商品描述不符"
                secondary="收到商品后7天内，如发现商品与描述不符，可申请退换货"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="7天无理由退换"
                secondary="收到商品后7天内，如对商品不满意，可申请无理由退换货（特殊商品除外）"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            2. 不适用退换货的情况
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="超过退换货期限"
                secondary="超过7天退换货期限的商品"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="人为损坏"
                secondary="因人为使用不当或保管不善导致损坏的商品"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="特殊商品"
                secondary="定制商品、个人卫生用品、食品等特殊商品"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            3. 退换货流程
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="申请退换货"
                secondary="登录账号，在我的订单中申请退换货，填写退换货原因"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="等待审核"
                secondary="客服将在24小时内审核您的申请"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="寄回商品"
                secondary="审核通过后，按照客服提供的地址寄回商品"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="退款/换货"
                secondary="收到商品并确认无误后，我们将为您办理退款或换货"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            4. 退款说明
          </Typography>
          <Typography variant="body1" paragraph>
            退款将原路返回至您的支付账户，具体到账时间以银行处理时间为准。
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            5. 注意事项
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="商品包装"
                secondary="退换货时请保持商品原包装完整，配件齐全"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="物流费用"
                secondary="因质量问题导致的退换货，物流费用由我们承担；无理由退换货，物流费用由您承担"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="发票"
                secondary="退换货时请一并退回发票"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            6. 联系方式
          </Typography>
          <Typography variant="body1" paragraph>
            如有任何疑问，请联系我们的客服：
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