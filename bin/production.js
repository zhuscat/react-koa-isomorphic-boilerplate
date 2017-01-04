#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

try {
  fs.statSync(path.join(__dirname, '../dist'));
} catch (e) {
  console.log(e);
  console.log('please run `npm run build` first!');
  process.exit(0);
}
process.env.NODE_ENV = 'production';
require('../dist');
