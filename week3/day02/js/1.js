//正则是引用数据类型，比较时比较的是地址
var reg = /\d/;//字符串中只要有数字即可
var reg = /^\daaa/;//字符串需要以数字开头,并且后面必须是三个a
var reg = /\d$/;//字符串需要以数字结尾
var reg = /^\d$/;//只能匹配单个数字
var reg = /^\d?$/;//只能匹配单个数字或者空字符串
var reg = new RefExp('\\d');

console.log(reg.test('sddef1232'));

var reg = /^[1.2]$/;//中括号里的.就是.本身  而且[]代表或的意思，就是1或者.或者2的意思，只是一个字符

var reg = /^18|19/;// 以18开头 或者 有19   |的优先级比较高，它就把前后分开了  前边  或者  后边
var reg = /^(18|19)/;
console.log(reg.test('11119'));

var reg = /windows(?=95|98|NT|2000)/;//除了匹配windows 后面还要跟着95|98|NT|2000

var reg = /windows(?!95|98|NT|2000)/; //windows后面不能是这几个东西

