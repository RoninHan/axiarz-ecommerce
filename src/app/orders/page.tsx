'use client';

import React from 'react';
import { Box, Typography, Container, Paper, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Header from '@/components/header';
import Footer from '@/components/Footer';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`order-tabpanel-${index}`}
      aria-labelledby={`order-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          我的订单
        </Typography>
        
        <Paper elevation={3} sx={{ mt: 3 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="订单状态标签"
          >
            <Tab label="全部订单" />
            <Tab label="待付款" />
            <Tab label="待发货" />
            <Tab label="待收货" />
            <Tab label="已完成" />
          </Tabs>

          <TabPanel value={value} index={0}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>订单编号</TableCell>
                    <TableCell>商品信息</TableCell>
                    <TableCell>订单金额</TableCell>
                    <TableCell>订单状态</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>ORD202404280001</TableCell>
                    <TableCell>商品名称 x 1</TableCell>
                    <TableCell>¥199.00</TableCell>
                    <TableCell>待付款</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small">立即付款</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ORD202404270001</TableCell>
                    <TableCell>商品名称 x 2</TableCell>
                    <TableCell>¥398.00</TableCell>
                    <TableCell>待发货</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small">查看物流</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>订单编号</TableCell>
                    <TableCell>商品信息</TableCell>
                    <TableCell>订单金额</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>ORD202404280001</TableCell>
                    <TableCell>商品名称 x 1</TableCell>
                    <TableCell>¥199.00</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small">立即付款</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>订单编号</TableCell>
                    <TableCell>商品信息</TableCell>
                    <TableCell>订单金额</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>ORD202404270001</TableCell>
                    <TableCell>商品名称 x 2</TableCell>
                    <TableCell>¥398.00</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small">查看物流</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={value} index={3}>
            <Typography>暂无待收货订单</Typography>
          </TabPanel>

          <TabPanel value={value} index={4}>
            <Typography>暂无已完成订单</Typography>
          </TabPanel>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
} 