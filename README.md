A telegram bot.


To add your key replace the file api_secret.js with the following content

```javascript
var exports = module.exports = {};
exports.api_key = 'PUT_API_TOKEN_HERE';
```

If you are one of the collaborators then you can download git-crypt to decrypt the api_secret.

Download git-crypt then cd into the project folder and run

```bash
git-crypt unlock
```

If you have a gpg fingerprint which is authenticated then this command will decrypt the secret and you can run the app as normal.

The following fingerprints are whitelisted.

ED37AAC91797CB91673A13A754290EF89F9B5E2B                                         
1A2BE4304D36F18F6313DC744C722B220806DF78



To run the app, go into the project directory andrun

```bash
npm install
```

then

```bash
npm start
```
