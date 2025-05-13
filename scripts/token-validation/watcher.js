const nodemon = require('nodemon');
const path = require('path');
const config = require('./config');

// Configure nodemon
nodemon({
  watch: config.patterns.map(pattern => 
    path.join(config.watchDir, pattern)
  ),
  ext: 'json',
  ignore: config.ignore,
  exec: 'node scripts/validation/enforce-rules.js',
  verbose: config.validation.output.verbose
});

// Event handlers
nodemon
  .on('start', () => {
    console.log('\n🔍 Token validation watcher started');
    console.log(`📁 Watching: ${config.watchDir}`);
    console.log('Press Ctrl+C to stop\n');
  })
  .on('quit', () => {
    console.log('\n🛑 Token validation watcher stopped');
    process.exit();
  })
  .on('restart', (files) => {
    console.log('\n🔄 Token files changed:');
    files.forEach(file => console.log(`   ${path.relative(config.watchDir, file)}`));
  })
  .on('crash', () => {
    console.error('\n❌ Watcher crashed! Restarting...');
  });

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down token validation watcher...');
  nodemon.emit('quit');
}); 