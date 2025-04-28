import React from 'react';
import { Box, Skeleton as MuiSkeleton } from '@mui/material';

interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | false;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width = '100%',
  height = '100%',
  animation = 'pulse',
  className,
}) => {
  return (
    <MuiSkeleton
      variant={variant}
      width={width}
      height={height}
      animation={animation}
      className={className}
    />
  );
};

interface SkeletonGroupProps {
  count?: number;
  children: React.ReactNode;
  spacing?: number;
}

export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
  count = 1,
  children,
  spacing = 1,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index}>{children}</Box>
      ))}
    </Box>
  );
};

export default Skeleton; 