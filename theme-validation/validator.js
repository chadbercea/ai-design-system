// Compares mapping-table.json keys to loaded tokens
export function validateMapping(mapping, tokens) {
  const found = [];
  const missing = [];
  const unmatched = [];

  for (const [muiKey, ddsKey] of Object.entries(mapping)) {
    if (ddsKey in tokens) {
      found.push({ muiKey, ddsKey, value: tokens[ddsKey] });
    } else {
      missing.push({ muiKey, ddsKey });
    }
  }

  // Optionally, find tokens that aren't mapped at all
  for (const tokenKey of Object.keys(tokens)) {
    if (!Object.values(mapping).includes(tokenKey)) {
      unmatched.push(tokenKey);
    }
  }

  return { found, missing, unmatched };
}
