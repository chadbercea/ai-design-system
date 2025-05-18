import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
} from '@mui/material';

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
  title: 'MUI/Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Tabs component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'The value of the currently selected tab.',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    variant: {
      control: 'select',
      options: ['standard', 'fullWidth', 'scrollable'],
      description: 'The variant to use.',
      table: {
        defaultValue: { summary: 'standard' },
      },
    },
    scrollButtons: {
      control: 'select',
      options: ['auto', 'desktop', 'mobile', false],
      description: 'Determine behavior of scroll buttons when tabs are set to scroll.',
      table: {
        defaultValue: { summary: 'auto' },
      },
    },
    textColor: {
      control: 'select',
      options: ['primary', 'secondary', 'inherit'],
      description: 'The color of the text.',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    indicatorColor: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'The color of the tab indicator.',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    centered: {
      control: 'boolean',
      description: 'If true, the tabs will be centered.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const TabsWrapper = (args: any) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} {...args}>
          <Tab label="Item One" {...a11yProps(0)} />
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

const ScrollableTabsDemo = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
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
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
};

const CenteredTabsDemo = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab label="Item One" {...a11yProps(0)} />
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

export const Default: Story = {
  args: {
    value: 0,
    variant: 'standard',
    scrollButtons: 'auto',
    textColor: 'primary',
    indicatorColor: 'primary',
    centered: false,
  },
  render: (args) => <TabsWrapper {...args} />,
};

export const Scrollable: Story = {
  args: {
    value: 0,
    variant: 'scrollable',
    scrollButtons: 'auto',
  },
  render: () => <ScrollableTabsDemo />,
};

export const Centered: Story = {
  args: {
    value: 0,
    centered: true,
  },
  render: () => <CenteredTabsDemo />,
}; 