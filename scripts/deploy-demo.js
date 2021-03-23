var ghpages = require('gh-pages');
var { exec } = require('child_process');
var ora = require('ora');
var { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../.env.demo') });

async function publish() {
  ghpages.publish(
    'dist-demo',
    {
      branch: 'master',
      repo:
        'https://e.coding.net/deskbtm/lonely/lonely-dashboard-demo-site.git',
      message: 'Auto-generated commit',
      user: {
        name: 'sewerganger',
        email: 'wanghan9423@outlook.com',
      },
    },
    (err) => {
      if (err) {
        throw err;
      }
    },
  );
}

async function buildDemo() {
  await new Promise((resolve, reject) => {
    exec('npm run build:demo', (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

(async function name() {
  const spinner = ora('building demo...').start();
  await buildDemo();
  spinner.stop();
  spinner.clear();
  console.log('build Success');
  spinner.start('deploying demo...');
  await publish();
  spinner.stop();
  spinner.clear();
  console.log('deploy Success\n');
  process.env.WEBSITE_URL && console.log(process.env.WEBSITE_URL);
})();
