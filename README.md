# Personal Page

### Want to help? You can translate translations files in your first language. Once it's done, just fire a pull request!

`assets` directory has been set apart from this repository to respect limited license.

To clone and automatically initiate submodule, use the following command:

    git clone --recurse-submodules git@github.com:pascallapointe/pask-pool.git

To pull all changes in the repo including changes in the submodules:

    git pull --recurse-submodules

### Server setup
First, NodeJs, Yarn, PM2, Nginx and CertBot must be installed on ubuntu server.
If everything is installed, jump to the deployment guide bellow.

#### NodeJs installation
Install nodeJs by running the following cli command:

>If you don't need a specific version, you can jump to Yarn installation since NodeJs will be installed along with it.

    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

>You should use the last LTS version.

#### Yarn installation
Since yarn isn't part of the standard **APT repository**, you first need to make APT aware of it.

1. Download the yarn repository by running the following command:

        curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

2. Add the yarn APT repository to ubuntu software repository list

       curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
       
3. update APT and install Yarn

        sudo apt update
        sudo apt install yarn

#### PM2 installation
PM2 is a daemon process manager that will help you manage and keep your application online 24/7.

1. Install PM2 with yarn:

        yarn global add pm2
        
2. Start PM2 using the config file `ecosystem.config.js` at the project root:

        pm2 start ecosystem.config.js
        
See PM2 documentation on the [official website](https://pm2.keymetrics.io/).

#### Nginx installation

You can figure this one by yourself.

#### CertBot installation

Got to the [official website](https://certbot.eff.org/) for installation instructions.

### Deployment Guide
1. Clone git repository using the **last released version**.
2. Install dependencies by running `yarn install --production=true` in the shell.
3. Copy `.env.dist` file to `.env` and replace parameters values.
4. Start the application using `pm2 start ecosystem.config.js`
5. Add necessary Nginx configuration in `sites-available` to create a reverse proxy to our NodeJs app.
6. Finaly, add https support to your nginx conf. file by running `sudo certbot --nginx`.


