// Loads build/tokens.mjs and returns a flat object of token key-value pairs
export async function loadTokens() {
  const tokensModule = await import('../build/tokens.mjs');
  // tokens.mjs may export as default or named
  return tokensModule.default || tokensModule;
}
