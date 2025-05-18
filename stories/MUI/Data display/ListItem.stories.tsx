import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Box,
  Stack,
  List,
} from '@mui/material';
import {
  Delete,
  Edit,
  Star,
  StarBorder,
  Person,
  Email,
  Phone,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Data display/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI ListItem component with various states and configurations.',
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
    disableGutters: {
      control: 'boolean',
      description: 'If true, the left and right padding is removed.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disablePadding: {
      control: 'boolean',
      description: 'If true, all padding is removed.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the list item will be disabled.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'If true, the list item will be selected.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const ListItemWrapper = (args: any) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItem {...args}>
          <ListItemText primary="Single-line item" />
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
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText primary="Email" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText primary="Phone" />
        </ListItem>
      </List>
    </Box>
  );
};

const AvatarListDemo = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="John Doe" secondary="Software Engineer" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Jane Smith" secondary="Product Designer" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Mike Johnson" secondary="Project Manager" />
        </ListItem>
      </List>
    </Box>
  );
};

const InteractiveDemo = () => {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        {[0, 1, 2].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <Delete />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`List item ${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

const StatesDemo = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItem>
          <ListItemText primary="Default" />
        </ListItem>
        <ListItem dense>
          <ListItemText primary="Dense" />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="No Gutters" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="No Padding" />
        </ListItem>
      </List>
    </Box>
  );
};

const WithIconDemo = () => (
  <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <ListItem>
      <ListItemIcon>
        <Star />
      </ListItemIcon>
      <ListItemText primary="List item with icon" />
    </ListItem>
  </Box>
);

const WithSecondaryActionDemo = () => (
  <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <ListItem>
      <ListItemText primary="List item with secondary action" />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  </Box>
);

const WithCheckboxDemo = () => {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(0) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': 'checkbox-list-label-0' }}
            onChange={handleToggle(0)}
          />
        </ListItemIcon>
        <ListItemText id="checkbox-list-label-0" primary="List item with checkbox" />
      </ListItem>
    </Box>
  );
};

const WithStarDemo = () => {
  const [selected, setSelected] = React.useState(false);

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemIcon>
          <IconButton onClick={() => setSelected(!selected)}>
            {selected ? <Star /> : <StarBorder />}
          </IconButton>
        </ListItemIcon>
        <ListItemText primary="List item with star" />
      </ListItem>
    </Box>
  );
};

export const Default: Story = {
  args: {
    dense: false,
    disableGutters: false,
    disablePadding: false,
    disabled: false,
    selected: false,
  },
  render: (args) => <ListItemWrapper {...args} />,
};

export const Icons: Story = {
  args: {
    dense: false,
    disableGutters: false,
    disablePadding: false,
  },
  render: () => <IconsDemo />,
};

export const AvatarList: Story = {
  args: {
    dense: false,
    disableGutters: false,
    disablePadding: false,
  },
  render: () => <AvatarListDemo />,
};

export const Interactive: Story = {
  args: {
    dense: false,
    disableGutters: false,
    disablePadding: false,
  },
  render: () => <InteractiveDemo />,
};

export const States: Story = {
  args: {
    dense: false,
    disableGutters: false,
    disablePadding: false,
  },
  render: () => <StatesDemo />,
};

export const WithIcon: Story = {
  render: () => <WithIconDemo />,
};

export const WithSecondaryAction: Story = {
  render: () => <WithSecondaryActionDemo />,
};

export const WithCheckbox: Story = {
  render: () => <WithCheckboxDemo />,
};

export const WithStar: Story = {
  render: () => <WithStarDemo />,
}; 