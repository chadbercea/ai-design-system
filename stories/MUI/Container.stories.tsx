import React from 'react';
import { Container, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MUI/Layout/Container',
  component: Container,
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const ContainerDemo = (args: any) => (
  <Container {...args}>
    <Typography>Container Content</Typography>
  </Container>
);

export const Default: Story = {
  render: (args) => <ContainerDemo {...args} />, 
}; 