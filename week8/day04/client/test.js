let {writeFile} = require('./promiseFs');

writeFile('./test.txt','qqq');
writeFile('./test.txt','aaa');
writeFile('./test.txt','ccc');   // 同时写的时候，会有问题，因为异步的关系 三个同时写，最后谁写上的不一定