const os = require('os')
const path = require('path');
console.log(os.homedir())
const dir = path.join(os.homedir(), 'images', 'sdqwe');
console.log(dir)