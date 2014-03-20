# Buggr
## Better Debug and Console output for Node.js

#### What are you?

I am a prettifier and extender for the console in node.js.

#### OK Cool.  So what can you do?

Pretty basic stuff really.  I prepend some useful information to your console (at the moment, *date*, *time*, *call paths* and *line numbers*)

#### Sounds Good!  Can you show me?

Sure.  This:

```
info  - socket.io started
Generic function started
debug - served static content /socket.io.js
debug - client authorized
info  - handshake authorized pkbzdKdMabYg1ExRzp4V
debug - setting request GET /socket.io/1/websocket/pkbzdKdMabYg1ExRzp4V
debug - set heartbeat interval for client pkbzdKdMabYg1ExRzp4V
debug - client authorized for 
debug - websocket writing 1::
debug - websocket writing 5:::{"name":"news","args":[{"hello":"world"}]}
A GENERIC ERROR FROM SOME FUNCTION CALL!!!!1111111
```

Becomes This:

```
[2014/02/12 - 15:54:38] | /node_modules/socket.io/lib/logger.js:78     info  - socket.io started
[2014/02/12 - 15:54:39] | /server.js:11  Generic function started
[2014/02/12 - 15:54:52] | /node_modules/socket.io/lib/logger.js:78     debug - served static content /socket.io.js
[2014/02/12 - 15:54:52] | /node_modules/socket.io/lib/logger.js:78     debug - client authorized
[2014/02/12 - 15:54:52] | /node_modules/socket.io/lib/logger.js:78     info  - handshake authorized pkbzdKdMabYg1ExRzp4V
[2014/02/12 - 15:54:52] | /node_modules/socket.io/lib/logger.js:78     debug - setting request GET /socket.io/1/websocket/pkbzdKdMabYg1ExRzp4V
[2014/02/12 - 15:54:52] | /node_modules/socket.io/lib/logger.js:78     debug - set heartbeat interval for client pkbzdKdMabYg1ExRzp4V
[2014/02/12 - 15:54:52] | /node_modules/socket.io/lib/logger.js:78     debug - client authorized for 
[2014/02/12 - 15:54:52] | /node_modules/socket.io/lib/logger.js:78     debug - websocket writing 1::
[2014/02/12 - 15:54:52] | /node_modules/socket.io/lib/logger.js:78     debug - websocket writing 5:::{"name":"news","args":[{"hello":"world"}]}
[2014/02/12 - 15:54:58] | /server.js:20  A GENERIC ERROR FROM SOME FUNCTION CALL!!!!1111111
```

#### Awesome!  I wants!  How do I install this magical piece of functionality?

Simple:

Via NPM:
```
npm install buggr
```
```javascript
var console = require('buggr');
```

Manually:
Copy the whole directory structure above to wherever you serve your node plugins from.
```javascript
var console = require('buggr');
```

### Wow.  Such Package.  Many Debug.  So Options.

Console options are simple:

```javascript
var console = require('buggr');
console.log('Log');
console.warn('Warn');
console.error('Error');
console.success('Success');
console.info('Info');
console.emphasis('Emphasis')
console.assert(new Error());
```

The major important thing to note is that this function will override `console.assert` and cause the application to quit upon hitting an assert, which is *the correct way to do things!*.




### License
Copyright (C) 2014 Stephen C Wright <ste.c.wr@gmail.com>


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.