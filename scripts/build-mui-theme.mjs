import tokens from '../build/tokens.js';
import { mapTokensToMuiTheme } from '../src/mapTokensToMuiTheme.js';
import fs from 'fs';

const muiTheme = mapTokensToMuiTheme(tokens);
const output = 'export default ' + JSON.stringify(muiTheme, null, 2) + ';\n';

fs.mkdirSync('./build/mui', { recursive: true });
fs.writeFileSync('./build/mui/theme.js', output);

console.log('MUI theme generated at build/mui/theme.js'); 