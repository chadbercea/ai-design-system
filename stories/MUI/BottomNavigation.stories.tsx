import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from '@mui/material';
import {
  Restore,
  Favorite,
  LocationOn,
  Folder,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Navigation/Bottom Navigation',
  component: BottomNavigation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI BottomNavigation component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showLabels: {
      control: 'boolean',
      description: 'If true, the bottom navigation will show labels.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'number',
      description: 'The value of the currently selected BottomNavigationAction.',
    },
  },
} satisfies Meta<typeof BottomNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

const BottomNavigationWrapper = (args: any) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 500 }}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          {...args}
        >
          <BottomNavigationAction label="Recents" icon={<Restore />} />
          <BottomNavigationAction label="Favorites" icon={<Favorite />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOn />} />
          <BottomNavigationAction label="Folder" icon={<Folder />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

const WithLabelsDemo = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 500 }}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
        >
          <BottomNavigationAction label="Recents" icon={<Restore />} />
          <BottomNavigationAction label="Favorites" icon={<Favorite />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOn />} />
          <BottomNavigationAction label="Folder" icon={<Folder />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export const Default: Story = {
  args: {
    showLabels: false,
  },
  render: (args) => <BottomNavigationWrapper {...args} />,
};

export const WithLabels: Story = {
  render: () => <WithLabelsDemo />,
}; 