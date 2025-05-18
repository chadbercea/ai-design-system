import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
} from '@mui/material';
import {
  Inbox as InboxIcon,
  Drafts as DraftsIcon,
  Star as StarIcon,
  Send as SendIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  Work as WorkIcon,
  BeachAccess as BeachAccessIcon,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Data display/List',
  component: List,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI List component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    dense: {
      control: 'boolean',
      description: 'If true, compact vertical padding designed for keyboard and mouse input will be used.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disablePadding: {
      control: 'boolean',
      description: 'If true, vertical padding will be removed from the list.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    subheader: {
      control: 'object',
      description: 'The content of the subheader, normally ListSubheader.',
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

const ListWrapper = (args: any) => (
  <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <List {...args}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </ListItem>
    </List>
  </Box>
);

const InteractiveListDemo = () => {
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
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
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
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </ListItemButton>
      </List>
    </Box>
  );
};

const FolderListDemo = () => (
  <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </List>
  </Box>
);

export const Default: Story = {
  args: {
    dense: false,
    disablePadding: false,
  },
  render: (args) => <ListWrapper {...args} />,
};

export const Interactive: Story = {
  render: () => <InteractiveListDemo />,
};

export const Folder: Story = {
  render: () => <FolderListDemo />,
}; 