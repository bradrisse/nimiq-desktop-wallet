# Nimiq Desktop Wallet
A dektop wallet for the Nimiq Blockchain https://nimiq.com

### To get started:
* Clone `git clone --recursive https://github.com/bradrisse/nimiq-desktop-wallet.git`
* Run `npm install` or `yarn`

##### Development
* Run `npm run dev` or `yarn dev` to start webpack-dev-server. The app will launch automatically after compilation.

##### Production
_You have two options, an automatic build or two manual steps_

###### One Shot
* Run `npm run package` or `yarn package` to have webpack compile your application into `dist/bundle.js` and `dist/index.html`, and then an electron-packager run will be triggered for the current platform/arch, outputting to `builds/`

###### Manual
_Recommendation: Update the "postpackage" script call in package.json to specify parameters as you choose and use the `npm run package` command instead of running these steps manually_
* Run `npm run build` or `yarn build` to have webpack compile and output your bundle to `dist/bundle.js`
* Then you can call electron-packager directly with any commands you choose

If you want to test the production build (In case you think Babili might be breaking something) after running `npm run build` you can then call `npm run prod`. This will cause the app to load off of the `dist/` build instead of looking for the webpack-dev-server instance. Electron will launch automatically after compilation.
