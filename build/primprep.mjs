import tokens from './tokens.mjs';

// Helper to categorize tokens
function categorizeTokens(obj) {
	const categories = {
		dimensions: [],
		typography: [],
		color: [],
		misc: []
	};

	// Process each token
	Object.entries(obj).forEach(([key, value]) => {
		const token = { name: key, value };

		// Categorize based on prefix
		if (key.startsWith('Color')) {
			categories.color.push({ ...token, type: 'color' });
		} else if (
			key.startsWith('FontSizes') ||
			key.startsWith('FontFamilies') ||
			key.startsWith('FontWeights') ||
			key.startsWith('LineHeights') ||
			key.startsWith('LetterSpacings') ||
			key.startsWith('TextCases') ||
			key.startsWith('TextDecorations')
		) {
			categories.typography.push({ ...token, type: 'typography' });
		} else if (
			key.startsWith('Spacings') ||
			key.startsWith('BorderRadius') ||
			key.startsWith('Breakpoints') ||
			key.startsWith('Grid') ||
			key.startsWith('Layout') ||
			key.startsWith('Sizing') ||
			key.startsWith('Stack') ||
			key.startsWith('ParagraphSpacings')
		) {
			categories.dimensions.push({ ...token, type: 'dimension' });
		} else {
			categories.misc.push({ ...token, type: 'misc' });
		}
	});

	return categories;
}

// Process tokens and export
const categorizedTokens = categorizeTokens(tokens);
export default categorizedTokens;