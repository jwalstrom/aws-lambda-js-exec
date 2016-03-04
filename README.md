# aws-lambda-js-exec
Extend you application by executing user custom scripts using AWS Lambda as a sandbox.

User custom scripts must adhere to the following template and when finished call the callback with common node.js err,data result.
```javascript
exports.main = function(input, callback) {
    // custom code that acts on the input
    
    callback(err, data);
};
```

## Input

Takes an script url, and input that will be passed to the user custom script.  Returns the result back in the callback.

```json
{
 "scriptUrl": "https://s3-us-west-2.amazonaws.com/mcuploads01/user-script01.js",
 "input": {
   "type": "dining",
   "amount": 20.00,
   "service": 4
  }
}
```

#### Example custom user script (user-script01.js)
```javascript
exports.main = function(input, callback) {
  var total = input.amount;
  if(input.service >= 4) {
    total = total * 1.2;
  }
  else {
    total = total * 1.15;
  }
  callback(null, {total: total});
};
```

## Output

```json
{
  "total": 24
}
```

## Configuration

1. The js-runner has `require` so you can add libraries to your package.json and they will be available for your users in thier custom scripts. ex. (request, lodash, etc.) 
2. Have fun!