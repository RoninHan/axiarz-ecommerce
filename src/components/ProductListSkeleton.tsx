import React from 'react';
import { Box, Grid } from '@mui/material';
import Skeleton, { SkeletonGroup } from './Skeleton';

const ProductListSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
            <Skeleton variant="rectangular" height={200} />
            <Box sx={{ mt: 2 }}>
              <Skeleton variant="text" height={24} />
              <Skeleton variant="text" height={20} width="60%" />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Skeleton variant="text" height={20} width="30%" />
                <Skeleton variant="text" height={20} width="20%" />
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductListSkeleton; 