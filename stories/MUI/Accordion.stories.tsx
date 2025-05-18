import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MUI/Surfaces/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const AccordionDemo = (args: any) => (
  <Accordion {...args}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>Accordion Summary</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>Accordion Details</Typography>
    </AccordionDetails>
  </Accordion>
);

export const Default: Story = {
  render: (args) => <AccordionDemo {...args} />, 
}; 