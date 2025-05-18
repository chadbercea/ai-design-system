import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ListItemIcon,
  ListItem,
  List,
  Box,
  Stack,
} from '@mui/material';
import {
  Inbox,
  Drafts,
  Star,
  Send,
  Delete,
  Report,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Data display/ListItemIcon',
  component: ListItemIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI ListItemIcon component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListItemIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

const ListItemIconWrapper = (args: any) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItem>
          <ListItemIcon {...args}>
            <Inbox />
          </ListItemIcon>
          Inbox
        </ListItem>
      </List>
    </Box>
  );
};

const IconsDemo = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItem>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          Inbox
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          Drafts
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Star />
          </ListItemIcon>
          Star
        </ListItem>
      </List>
    </Box>
  );
};

const ColorsDemo = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItem>
          <ListItemIcon sx={{ color: 'primary.main' }}>
            <Send />
          </ListItemIcon>
          Send
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <Delete />
          </ListItemIcon>
          Delete
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ color: 'warning.main' }}>
            <Report />
          </ListItemIcon>
          Report
        </ListItem>
      </List>
    </Box>
  );
};

const SizesDemo = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItem>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <Inbox fontSize="small" />
          </ListItemIcon>
          Small Icon
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          Medium Icon
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ minWidth: 56 }}>
            <Inbox fontSize="large" />
          </ListItemIcon>
          Large Icon
        </ListItem>
      </List>
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <ListItemIconWrapper {...args} />,
};

export const Icons: Story = {
  render: () => <IconsDemo />,
};

export const Colors: Story = {
  render: () => <ColorsDemo />,
};

export const Sizes: Story = {
  render: () => <SizesDemo />,
}; 