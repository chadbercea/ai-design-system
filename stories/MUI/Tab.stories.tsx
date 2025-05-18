import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Tab,
  Tabs,
  Box,
  Typography,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Favorite as FavoriteIcon,
  PersonPin as PersonPinIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const meta = {
  title: 'MUI/Navigation/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Tab component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'If true, the tab will be disabled.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: 'object',
      description: 'The icon element.',
    },
    iconPosition: {
      control: 'select',
      options: ['top', 'bottom', 'start', 'end'],
      description: 'The position of the icon relative to the label.',
      table: {
        defaultValue: { summary: 'top' },
      },
    },
    label: {
      control: 'text',
      description: 'The label element.',
    },
    wrapped: {
      control: 'boolean',
      description: 'If true, the label will wrap and the tab will take the full width.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

const TabWrapper = (args: any) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab {...args} {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};

const IconTabsDemo = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
          <Tab icon={<PhoneIcon />} label="RECENTS" {...a11yProps(0)} />
          <Tab icon={<FavoriteIcon />} label="FAVORITES" {...a11yProps(1)} />
          <Tab icon={<PersonPinIcon />} label="NEARBY" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};

const IconLabelTabsDemo = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
          <Tab icon={<PhoneIcon />} label="RECENTS" {...a11yProps(0)} />
          <Tab icon={<FavoriteIcon />} label="FAVORITES" {...a11yProps(1)} />
          <Tab icon={<PersonPinIcon />} label="NEARBY" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};

export const Default: Story = {
  args: {
    label: 'Item One',
    disabled: false,
    wrapped: false,
  },
  render: (args) => <TabWrapper {...args} />,
};

export const IconTabs: Story = {
  render: () => <IconTabsDemo />,
};

export const IconLabelTabs: Story = {
  render: () => <IconLabelTabsDemo />,
}; 