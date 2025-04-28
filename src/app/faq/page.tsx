'use client';

import React, { useState } from 'react';
import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '@/components/header';
import Footer from '@/components/Footer';

export default function FAQPage() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: "如何下单购买商品？",
      answer: "您可以在我们的网站上浏览商品，选择您需要的商品后点击'加入购物车'，然后在购物车中确认订单信息并完成支付即可。"
    },
    {
      question: "支持哪些支付方式？",
      answer: "我们支持支付宝、微信支付、银联等多种支付方式，您可以根据自己的需求选择合适的支付方式。"
    },
    {
      question: "商品发货时间是多久？",
      answer: "一般情况下，我们会在您下单后1-2个工作日内发货。如遇特殊情况，我们会及时通知您。"
    },
    {
      question: "如何查询物流信息？",
      answer: "您可以在'我的订单'中查看物流信息，我们会在发货后更新物流单号，您可以通过物流单号查询具体物流信息。"
    },
    {
      question: "商品退换货政策是什么？",
      answer: "我们提供7天无理由退换货服务，商品在收到后7天内，如无质量问题，可以申请退换货。具体细则请查看我们的退换货政策。"
    },
    {
      question: "如何联系客服？",
      answer: "您可以通过以下方式联系我们的客服：1. 在线客服（工作时间：9:00-18:00）；2. 客服电话：+86 123 4567 8900；3. 发送邮件至：support@axial.com"
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          常见问题
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{ mb: 2 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography variant="subtitle1">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
} 