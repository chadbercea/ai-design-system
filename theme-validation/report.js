// Formats the validator output for CLI
export function printReport({ found, missing, unmatched }) {
  console.log('--- Theme Mapping Validation Report ---\n');
  found.forEach(({ muiKey, ddsKey, value }) => {
    console.log(`✅ ${muiKey} → ${ddsKey} (${value})`);
  });
  if (missing.length) {
    console.log('\n--- Missing Mappings ---');
    missing.forEach(({ muiKey, ddsKey }) => {
      console.log(`❌ ${muiKey} → ${ddsKey}`);
    });
  }
  if (unmatched.length) {
    console.log('\n--- Unmatched Tokens (not mapped) ---');
    unmatched.forEach(tokenKey => {
      console.log(`- ${tokenKey}`);
    });
  }
  const coverage = ((found.length / (found.length + missing.length)) * 100).toFixed(1);
  console.log(`\nCoverage: ${coverage}% (${found.length} of ${found.length + missing.length} mapped)`);
}
