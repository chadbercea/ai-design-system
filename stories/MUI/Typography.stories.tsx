import React from 'react';
import { Typography, Box } from '@mui/material';
import type { TypographyProps } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<TypographyProps> = {
  title: 'MUI/Data display/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Typography component with various variants and styles.',
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<TypographyProps>;

const TypographyWrapper = (args: any) => (
  <Box sx={{ width: '100%', maxWidth: 500 }}>
    <Typography {...args}>
      {args.variant ? `Typography ${args.variant}` : 'Typography body1'}
    </Typography>
  </Box>
);

const VariantsDemo = () => (
  <Box sx={{ width: '100%', maxWidth: 500 }}>
    <Typography variant="h1" gutterBottom>
      h1. Heading
    </Typography>
    <Typography variant="h2" gutterBottom>
      h2. Heading
    </Typography>
    <Typography variant="h3" gutterBottom>
      h3. Heading
    </Typography>
    <Typography variant="h4" gutterBottom>
      h4. Heading
    </Typography>
    <Typography variant="h5" gutterBottom>
      h5. Heading
    </Typography>
    <Typography variant="h6" gutterBottom>
      h6. Heading
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </Typography>
    <Typography variant="subtitle2" gutterBottom>
      subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </Typography>
    <Typography variant="body1" gutterBottom>
      body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
      dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
    </Typography>
    <Typography variant="body2" gutterBottom>
      body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
      dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
    </Typography>
    <Typography variant="button" display="block" gutterBottom>
      button text
    </Typography>
    <Typography variant="caption" display="block" gutterBottom>
      caption text
    </Typography>
    <Typography variant="overline" display="block" gutterBottom>
      overline text
    </Typography>
  </Box>
);

const ColorsDemo = () => (
  <Box sx={{ width: '100%', maxWidth: 500 }}>
    <Typography variant="h4" component="div" gutterBottom color="primary">
      Primary text
    </Typography>
    <Typography variant="h4" component="div" gutterBottom color="secondary">
      Secondary text
    </Typography>
    <Typography variant="h4" component="div" gutterBottom color="error">
      Error text
    </Typography>
    <Typography variant="h4" component="div" gutterBottom color="warning">
      Warning text
    </Typography>
    <Typography variant="h4" component="div" gutterBottom color="info">
      Info text
    </Typography>
    <Typography variant="h4" component="div" gutterBottom color="success">
      Success text
    </Typography>
  </Box>
);

const AlignmentDemo = () => (
  <Box sx={{ width: '100%', maxWidth: 500 }}>
    <Typography variant="h6" align="left" gutterBottom>
      Left aligned text.
    </Typography>
    <Typography variant="h6" align="center" gutterBottom>
      Center aligned text.
    </Typography>
    <Typography variant="h6" align="right" gutterBottom>
      Right aligned text.
    </Typography>
    <Typography variant="h6" align="justify" gutterBottom>
      Justified text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
      dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
    </Typography>
  </Box>
);

export const Default: Story = {
  render: (args) => <TypographyWrapper {...args} />,
};

export const Variants: Story = {
  render: () => <VariantsDemo />,
};

export const Colors: Story = {
  render: () => <ColorsDemo />,
};

export const Alignment: Story = {
  render: () => <AlignmentDemo />,
}; 