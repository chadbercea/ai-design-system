import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination, Box } from '@mui/material';

const meta = {
  title: 'MUI/Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Pagination component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'number',
      description: 'The total number of pages.',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    page: {
      control: 'number',
      description: 'The current page.',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'standard'],
      description: 'The color of the component.',
      table: {
        defaultValue: { summary: 'standard' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the component.',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    shape: {
      control: 'select',
      options: ['circular', 'rounded'],
      description: 'The shape of the pagination items.',
      table: {
        defaultValue: { summary: 'circular' },
      },
    },
    variant: {
      control: 'select',
      options: ['text', 'outlined'],
      description: 'The variant to use.',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    showFirstButton: {
      control: 'boolean',
      description: 'If true, show the first-page button.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showLastButton: {
      control: 'boolean',
      description: 'If true, show the last-page button.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const PaginationWrapper = (args: any) => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
        page={page}
        onChange={handleChange}
        {...args}
      />
    </Box>
  );
};

const ColorsDemo = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Pagination
        count={10}
        page={page}
        onChange={handleChange}
        color="primary"
      />
      <Pagination
        count={10}
        page={page}
        onChange={handleChange}
        color="secondary"
      />
      <Pagination
        count={10}
        page={page}
        onChange={handleChange}
        color="standard"
      />
    </Box>
  );
};

const SizesDemo = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Pagination
        count={10}
        page={page}
        onChange={handleChange}
        size="small"
      />
      <Pagination
        count={10}
        page={page}
        onChange={handleChange}
        size="medium"
      />
      <Pagination
        count={10}
        page={page}
        onChange={handleChange}
        size="large"
      />
    </Box>
  );
};

const VariantsDemo = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Pagination
        count={10}
        page={page}
        onChange={handleChange}
        variant="text"
      />
      <Pagination
        count={10}
        page={page}
        onChange={handleChange}
        variant="outlined"
      />
    </Box>
  );
};

export const Default: Story = {
  args: {
    count: 10,
    color: 'primary',
    size: 'medium',
    shape: 'circular',
    variant: 'text',
    showFirstButton: false,
    showLastButton: false,
  },
  render: (args) => <PaginationWrapper {...args} />,
};

export const Colors: Story = {
  render: () => <ColorsDemo />,
};

export const Sizes: Story = {
  render: () => <SizesDemo />,
};

export const Variants: Story = {
  render: () => <VariantsDemo />,
}; 