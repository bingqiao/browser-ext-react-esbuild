# browser-ext-react-esbuild

See article on [dev.to](https://dev.to/bingqiao/creating-a-browser-extension-for-safari-and-chrome-493m).  

Run `npm install` first.

To build this extension for Chrome:
```
npm run package
```
Then load `dist` as unpacked extension for Chrome.

To build for Safari:
```
npm run deploy
```
The above will build the same extension resources in `dist`, then copy its  
contents to the extension "Resources" folder of the Swift project [browser-ext](https://github.com/bingqiao/browser-ext).

Together the two projects serve as a template of creating browser extension  
for both Safari and Chrome (possibly Mozilla Firefox, but not tested) using  
React, TypeScript and esbuild.

The full AutoRefresh app (free and without Ads) implemented in a similar way  
can be found in App store [download](https://apps.apple.com/gb/app/autorefresh/id1592466003) (free and no Ads).
