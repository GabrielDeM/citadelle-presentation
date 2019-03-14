const { exec } = require('child_process');
const publish = message => {
  exec('git add .');
  exec(`git commit -m ${message}`);
  exec(`git push`);
}

module.exports = publish;
