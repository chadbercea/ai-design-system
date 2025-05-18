import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Box,
  Stack,
  Divider,
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
  title: 'MUI/Data display/ListItemButton',
  component: ListItemButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI ListItemButton component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'If true, the component is selected.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    dense: {
      control: 'boolean',
      description: 'If true, compact vertical padding designed for keyboard and mouse input is used.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof ListItemButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const ListItemButtonWrapper = (args: any) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItemButton {...args}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
      </List>
    </Box>
  );
};

const StatesDemo = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Default" />
        </ListItemButton>
        <ListItemButton selected>
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          <ListItemText primary="Selected" />
        </ListItemButton>
        <ListItemButton disabled>
          <ListItemIcon>
            <Star />
          </ListItemIcon>
          <ListItemText primary="Disabled" />
        </ListItemButton>
      </List>
    </Box>
  );
};

const DenseDemo = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List dense>
        <ListItemButton>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Dense List Item" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          <ListItemText primary="Dense List Item" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Star />
          </ListItemIcon>
          <ListItemText primary="Dense List Item" />
        </ListItemButton>
      </List>
    </Box>
  );
};

const InteractiveDemo = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <Star />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export const Default: Story = {
  args: {
    disabled: false,
    selected: false,
    dense: false,
  },
  render: (args) => <ListItemButtonWrapper {...args} />,
};

export const States: Story = {
  render: () => <StatesDemo />,
};

export const Dense: Story = {
  render: () => <DenseDemo />,
};

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
}; 