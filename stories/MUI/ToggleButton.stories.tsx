import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Stack,
} from '@mui/material';
import type { ToggleButtonProps } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  ViewList,
  ViewModule,
  ViewQuilt,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Inputs/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI ToggleButton component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
      description: 'The color of the component.',
      table: {
        defaultValue: { summary: 'standard' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled.',
      table: {
        defaultValue: { summary: 'false' },
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
    value: {
      control: 'text',
      description: 'The value of the button.',
    },
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToggleButtonWrapper = (args: ToggleButtonProps) => {
  const [selected, setSelected] = React.useState(false);

  return (
    <Box>
      <ToggleButton
        value={args.value}
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        {...(Object.fromEntries(Object.entries(args).filter(([key]) => key !== 'value')))}
      >
        <FormatBold />
      </ToggleButton>
    </Box>
  );
};

const ColorsDemo = () => {
  const [selected, setSelected] = React.useState(false);

  return (
    <Stack direction="row" spacing={2}>
      <ToggleButton
        value="primary"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        color="primary"
      >
        <FormatBold />
      </ToggleButton>
      <ToggleButton
        value="secondary"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        color="secondary"
      >
        <FormatItalic />
      </ToggleButton>
      <ToggleButton
        value="success"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        color="success"
      >
        <FormatUnderlined />
      </ToggleButton>
    </Stack>
  );
};

const SizesDemo = () => {
  const [selected, setSelected] = React.useState(false);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <ToggleButton
        value="small"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        size="small"
      >
        <FormatBold />
      </ToggleButton>
      <ToggleButton
        value="medium"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        size="medium"
      >
        <FormatBold />
      </ToggleButton>
      <ToggleButton
        value="large"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        size="large"
      >
        <FormatBold />
      </ToggleButton>
    </Stack>
  );
};

const StatesDemo = () => {
  const [selected, setSelected] = React.useState(false);

  return (
    <Stack direction="row" spacing={2}>
      <ToggleButton
        value="default"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
      >
        <FormatBold />
      </ToggleButton>
      <ToggleButton
        value="disabled"
        disabled
      >
        <FormatBold />
      </ToggleButton>
    </Stack>
  );
};

const GroupDemo = () => {
  const [alignment, setAlignment] = React.useState<string | null>('left');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned">
        <FormatAlignLeft />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <FormatAlignCenter />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <FormatAlignRight />
      </ToggleButton>
      <ToggleButton value="justify" aria-label="justified" disabled>
        <FormatAlignJustify />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const MultipleDemo = () => {
  const [formats, setFormats] = React.useState(() => ['bold']);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats);
  };

  return (
    <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
    >
      <ToggleButton value="bold" aria-label="bold">
        <FormatBold />
      </ToggleButton>
      <ToggleButton value="italic" aria-label="italic">
        <FormatItalic />
      </ToggleButton>
      <ToggleButton value="underlined" aria-label="underlined">
        <FormatUnderlined />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const ViewDemo = () => {
  const [view, setView] = React.useState('list');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string,
  ) => {
    setView(nextView);
  };

  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="list" aria-label="list">
        <ViewList />
      </ToggleButton>
      <ToggleButton value="module" aria-label="module">
        <ViewModule />
      </ToggleButton>
      <ToggleButton value="quilt" aria-label="quilt">
        <ViewQuilt />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export const Default: Story = {
  args: {
    color: 'primary',
    disabled: false,
    size: 'medium',
    value: 'check',
  },
  render: (args) => <ToggleButtonWrapper {...args} />,
};

export const Colors: Story = {
  args: {
    value: 'check',
  },
  render: () => <ColorsDemo />,
};

export const Sizes: Story = {
  args: {
    value: 'check',
  },
  render: () => <SizesDemo />,
};

export const States: Story = {
  args: {
    value: 'check',
  },
  render: () => <StatesDemo />,
};

export const Group: Story = {
  args: {
    value: 'check',
  },
  render: () => <GroupDemo />,
};

export const Multiple: Story = {
  args: {
    value: 'check',
  },
  render: () => <MultipleDemo />,
};

export const View: Story = {
  args: {
    value: 'check',
  },
  render: () => <ViewDemo />,
}; 