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

If you have a gpg fingerprint is authenticated then this command will decrypt the secret and you can run the app as normal.


To run the app, go into the project directory andrun

```bash
npm install
```

then

```bash
npm start
```