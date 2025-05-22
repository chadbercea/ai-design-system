import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import type { TypographyProps } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<TypographyProps> = {
  title: 'Foundations/Typography',
  component: Typography,
  argTypes: {
    children: {
      control: 'text',
      description:
        'The content of the component. Takes in a `ReactNode` component.',
      type: {
        required: true,
        name: 'other',
        value: '',
      },
    },
    variant: {
      control: 'select',
      options: [
        'body1',
        'body2',
        'h1',
        'h2',
        'h3',
        'h4',
        'subtitle1',
        'code',
        'inline-code',
        'overline',
      ],
      description:
        'Applies the theme typography styles. View All story for all options.',
      table: {
        defaultValue: {
          summary: 'body1',
        },
      },
    },
    color: {
      control: 'select',
      options: [
        'text.primary',
        'text.secondary',
        'primary',
        'secondary',
        'error',
        'warning',
        'success',
        'premium',
      ],
      description:
        'The color of the component. It supports both default and custom theme colors.',
      table: {
        defaultValue: {
          summary: 'text.primary',
        },
      },
    },
    component: {
      control: 'select',
      options: ['p', 'strong', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'code'],
      description:
        'Applies a different HTML element, while keeping the styling of the `variant`.',
      table: {
        defaultValue: {
          summary: 'p',
        },
      },
    },
    align: {
      control: 'select',
      options: ['inherit', 'left', 'center', 'right', 'justify'],
      description: 'Set the text-align on the component.',
    },
    noWrap: {
      control: 'boolean',
      description: `If \`true\`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
Note that text overflow can only happen with block or inline-block level elements (the element needs to have a width in order to overflow).`,
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    gutterBottom: {
      control: 'boolean',
      description: 'If `true`, the text will have a bottom margin.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
};

export default meta;

export const Playground: StoryObj<TypographyProps> = {
  args: {
    children: 'Lorem ipsum dolor sit amet',
    variant: 'body1',
    align: 'inherit',
    color: 'text.primary',
    component: 'p',
    gutterBottom: false,
    noWrap: false,
  },
  parameters: {
    // Playground story should not be snapshotted by chromatic, since it is only to mess around with the controls
    // and to be able to embed, for example. The All story is the one that will be snapshotted, so we can view changes
    // to all variants in the same snapshot.
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const All = {
  render: () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Scale</TableCell>
            <TableCell>Symbol Name</TableCell>
            <TableCell>Theme Variant</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>REM</TableCell>
            <TableCell>Size (px)</TableCell>
            <TableCell>Letter Spacing</TableCell>
            <TableCell>Typeface</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="h1">h1. Marketing-1</Typography>
            </TableCell>
            <TableCell>marketing-1</TableCell>
            <TableCell>h1</TableCell>
            <TableCell>Medium</TableCell>
            <TableCell>2.5rem</TableCell>
            <TableCell>35</TableCell>
            <TableCell>0</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h1">
                <strong>h1. Marketing-1</strong>
              </Typography>
            </TableCell>
            <TableCell>marketing-1/strong</TableCell>
            <TableCell>h1 + strong</TableCell>
            <TableCell>Bold</TableCell>
            <TableCell>2.5rem</TableCell>
            <TableCell>35</TableCell>
            <TableCell>0</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h2">h2. Marketing-2</Typography>
            </TableCell>
            <TableCell>marketing-2</TableCell>
            <TableCell>h2</TableCell>
            <TableCell>Medium</TableCell>
            <TableCell>2rem</TableCell>
            <TableCell>28</TableCell>
            <TableCell>0</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h2">
                <strong>h2. Marketing-2</strong>
              </Typography>
            </TableCell>
            <TableCell>marketing-2/strong</TableCell>
            <TableCell>h2 + strong</TableCell>
            <TableCell>Bold</TableCell>
            <TableCell>2.5rem</TableCell>
            <TableCell>35</TableCell>
            <TableCell>0</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h3">h3. Product-1</Typography>
            </TableCell>
            <TableCell>product-1</TableCell>
            <TableCell>h3</TableCell>
            <TableCell>Medium</TableCell>
            <TableCell>1.5rem</TableCell>
            <TableCell>21</TableCell>
            <TableCell>0</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h3">
                <strong>h3. Product-1</strong>
              </Typography>
            </TableCell>
            <TableCell>product-1/strong</TableCell>
            <TableCell>h3 + strong</TableCell>
            <TableCell>Bold</TableCell>
            <TableCell>2.5rem</TableCell>
            <TableCell>35</TableCell>
            <TableCell>0</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h4">h4. Product-2</Typography>
            </TableCell>
            <TableCell>product-2</TableCell>
            <TableCell>h4</TableCell>
            <TableCell>Medium</TableCell>
            <TableCell>1.2857rem</TableCell>
            <TableCell>18</TableCell>
            <TableCell>0</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h4">
                <strong>h4. Product-1</strong>
              </Typography>
            </TableCell>
            <TableCell>product-1/strong</TableCell>
            <TableCell>h4 + strong</TableCell>
            <TableCell>Bold</TableCell>
            <TableCell>2.5rem</TableCell>
            <TableCell>35</TableCell>
            <TableCell>0</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">
                subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </Typography>
            </TableCell>
            <TableCell>subtitle</TableCell>
            <TableCell>subtitle1</TableCell>
            <TableCell>Medium</TableCell>
            <TableCell>1.1429rem</TableCell>
            <TableCell>16</TableCell>
            <TableCell>0</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">
                Body. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </Typography>
            </TableCell>
            <TableCell>body</TableCell>
            <TableCell>body1</TableCell>
            <TableCell>Regular</TableCell>
            <TableCell>1rem</TableCell>
            <TableCell>14</TableCell>
            <TableCell>0.02em</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">
                <strong>
                  Body Strong. Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit.
                </strong>
              </Typography>
            </TableCell>
            <TableCell>body/strong</TableCell>
            <TableCell>body1 + strong</TableCell>
            <TableCell>Medium</TableCell>
            <TableCell>1rem</TableCell>
            <TableCell>14</TableCell>
            <TableCell>0.02em</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2">
                Body. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </Typography>
            </TableCell>
            <TableCell>body-small</TableCell>
            <TableCell>body2</TableCell>
            <TableCell>Regular</TableCell>
            <TableCell>0.8571rem</TableCell>
            <TableCell>12</TableCell>
            <TableCell>0.02em</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2">
                <strong>
                  Body Strong. Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit.
                </strong>
              </Typography>
            </TableCell>
            <TableCell>body-small/strong</TableCell>
            <TableCell>body2 + strong</TableCell>
            <TableCell>Medium</TableCell>
            <TableCell>0.8571rem</TableCell>
            <TableCell>12</TableCell>
            <TableCell>0.02em</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">
                <Link href="#">Link body1</Link>
              </Typography>
            </TableCell>
            <TableCell>link</TableCell>
            <TableCell>body1</TableCell>
            <TableCell>Regular</TableCell>
            <TableCell>1rem</TableCell>
            <TableCell>14</TableCell>
            <TableCell>0.02em</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">
                <Link href="#">
                  <strong>Link body1 strong</strong>
                </Link>
              </Typography>
            </TableCell>
            <TableCell>link/strong</TableCell>
            <TableCell>body1 + strong</TableCell>
            <TableCell>Medium</TableCell>
            <TableCell>1rem</TableCell>
            <TableCell>14</TableCell>
            <TableCell>0.02em</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2">
                <Link href="#">Link 2</Link>
              </Typography>
            </TableCell>
            <TableCell>link-small</TableCell>
            <TableCell>body2</TableCell>
            <TableCell>Regular</TableCell>
            <TableCell>0.8751rem</TableCell>
            <TableCell>12</TableCell>
            <TableCell>0.02em</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2">
                <Link href="#">
                  <strong>Link 2 strong</strong>
                </Link>
              </Typography>
            </TableCell>
            <TableCell>link-small/strong</TableCell>
            <TableCell>body2 + strong</TableCell>
            <TableCell>Medium</TableCell>
            <TableCell>0.8571rem</TableCell>
            <TableCell>12</TableCell>
            <TableCell>0.02em</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="code">
                Code. Lorem ipsum dolor sit amet.
              </Typography>
            </TableCell>
            <TableCell>code</TableCell>
            <TableCell>code</TableCell>
            <TableCell>Regular</TableCell>
            <TableCell>1rem</TableCell>
            <TableCell>14</TableCell>
            <TableCell>0.02em</TableCell>
            <TableCell>Roboto Mono</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="code">
                <strong>Code Strong. Lorem ipsum dolor sit amet.</strong>
              </Typography>
            </TableCell>
            <TableCell>code/strong</TableCell>
            <TableCell>code + strong</TableCell>
            <TableCell>Medium</TableCell>
            <TableCell>1rem</TableCell>
            <TableCell>14</TableCell>
            <TableCell>0.02em</TableCell>
            <TableCell>Roboto Mono</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="inline-code">
                Inline Code. Lorem ipsum dolor sit amet.
              </Typography>
            </TableCell>
            <TableCell>inline-code</TableCell>
            <TableCell>inline-code</TableCell>
            <TableCell>Regular</TableCell>
            <TableCell>1rem</TableCell>
            <TableCell>14</TableCell>
            <TableCell>0.02em</TableCell>
            <TableCell>Roboto Mono</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="code-block">
                Code Block. Lorem ipsum dolor sit amet.
              </Typography>
            </TableCell>
            <TableCell>code-block</TableCell>
            <TableCell>code-block</TableCell>
            <TableCell>Regular</TableCell>
            <TableCell>1rem</TableCell>
            <TableCell>14</TableCell>
            <TableCell>0.02em</TableCell>
            <TableCell>Roboto Mono</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="overline">Chip</Typography>
            </TableCell>
            <TableCell>chip</TableCell>
            <TableCell>overline</TableCell>
            <TableCell>Medium - All Caps</TableCell>
            <TableCell>0.7143rem</TableCell>
            <TableCell>10</TableCell>
            <TableCell>0.015em</TableCell>
            <TableCell>Roboto</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ),
};