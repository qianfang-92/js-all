var reg = /d/;
console.log(reg.test('wdaejg27836'));//true
console.log(reg.test('csaieu'));//false
var reg = /\d/;
var reg = new RegExp('\\d') //这里才是\d的意思，第一个\是转义的意思
console.log(reg);
console.log(reg.test('da23hdsb'));//true
console.log(reg.test('dasd'));//false

var reg = /\\d/;
console.log(reg);
console.log(reg.test('wdaejg27836'));//false  要匹配 \d
console.log(reg.test('csai\\deu'));//true
//字符串里的\也是转义 所以这里的字符串里的第一个\也是转义后面的\d的

var reg = /\w/;
console.log(reg.test('_'));//true
console.log(reg.test('------------'));//false

var reg = /\d?/
console.log(reg.test('jkajkhk'));//true
console.log(reg.test('dddjkh2331432kddd'));//true  只要出现过1次，就是true 是从前往后看，看见 了 有一个 就是true

var reg = /\d{2,4}/;
console.log(reg.test('dsde6'));//false
console.log(reg.test('dsda232343434'));//true 只要有2个，就是true

var reg = /^d/;
console.log(reg.test('sda232343434'));//false 不是以d开头
console.log(reg.test('dsda232343434'));//true

var reg = /^\d/;
console.log(reg.test('sda232343434'));//false 
console.log(reg.test('323dsda232343434'));//true

var reg = /\d$/;//以数字结尾
console.log(reg.test('sda232343434'));//true 
console.log(reg.test('323dsda232343434d'));//false

var reg = /\d+$/;
console.log(reg.test('sda232343434'));//true 
console.log(reg.test('323dsda232343434dsa'));//false

var reg = /d{2}$/;
console.log(reg.test('sda232343434'));//false 
console.log(reg.test('323dsda232343434ddd'));//true

var reg = /wd{2}$/;//以两个d结尾，前面是个w
console.log(reg.test('sda232343434'));//false 
console.log(reg.test('323dsda232343434wdd'));//true
console.log(reg.test('daddadaddd'));//false;

var reg = /^d$/;//以d开头 d结尾 中间是个d,就是说只有一个d
console.log(reg.test('d'));//true
console.log(reg.test('dhjkhkdewewd'));//false
console.log(reg.test('ddd'));//false

var reg = /^dd$/;//就是2个d

var reg = /^d\wd$/;//以d开头 d结尾 中间是一个数字字母下划线
console.log(reg.test('d'));//false
console.log(reg.test('dhjkhkdewewd'));//false
console.log(reg.test('ddd'));//true

var reg = /^dd{2,}d$/;
//        /^d{4,}$/
console.log(reg.test('d'));//false
console.log(reg.test('dhjkhkdewewd'));//false
console.log(reg.test('ddddd'));//true

var reg = /(wd){2}$/  //  ()来提升优先级  以两个wd结尾的
console.log(reg.test('sadawdwd'));//true

var reg = /^\d.123$/;//以一个数字开头，以3结尾，中间是个除换行外的字符 只有5位字符
console.log(reg.test('q123.123'));//false
console.log(reg.test('123.123'));//false
console.log(reg.test('123q123'));//false
console.log(reg.test('123q.123'));//false
console.log(reg.test('1=123'));//true
// var reg = /^\d\.123$/  :以一个数字开头，后面是个.然后是123的数字

var reg = /^\d+.123$/;//以一个或多个数字开头，中间有个字符，以123结尾
console.log(reg.test('q123.123'));//false
console.log(reg.test('123.123'));//true
console.log(reg.test('123q123'));//true
console.log(reg.test('123q.123'));//false
console.log(reg.test('1=123'));//true

var reg = /[a-c]/;//只要有abc三个中任意一个就可以
console.log(reg.test('adsjh'));//true

var reg = /^[a-c]/;//只要以abc三个中任意一个开头就可以
console.log(reg.test('adsjh'));//true

var reg = /^[a-c]{2}/;//开头是abc中的任意两个字母 写的时候，要按正常的字母顺序写，如果 [c-a] 会报错
console.log(reg.test('adsjh'));//false

var reg = /[a-z0-9]/;//小写字母和数字 只要有 
console.log(reg.test('ad424sjh'));//true
var reg = /[a-z0-9A-Z_]/;//代表\w

var reg = /[.]/;//中括号中的.代表.本身，不代表特殊含义
