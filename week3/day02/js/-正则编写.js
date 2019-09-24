//编写一个正则 可以匹配有效数字
// 可以有正负号 ；可以有小数  ；整数部分不能以0开头

// var reg = /^[+-]?(([1-9]\d*)|0)[.]?\d+$/;

//加减是一个整体，小数部分是一个整体

var reg = /^[+-]?([1-9]\d*|0)(\.\d+)?$/;
//也可以下面这样写
var reg = /^[+-]?([1-9]\d+|\d)(\.\d+)?$/;
console.log(reg.test('01234'));


//-------------------------------------------------
//手机号的正则匹配
var reg = /^1[3-9]\d{9}$/;

//-------------------------------------------------

//qq邮箱的验证
//至少5位，至多1位，不能以0开头

var reg = /^[1-9]\d{4,10}@qq\.com$/

//6-18个字符，可使用字母，数字，下划线，需以字母开头

var reg = /^[a-zA-Z]\w{5,17}$/

//---------------------------------------------------
//密码  8-18位，既有大写 也有小写 还有数字

var str = '';
function judge (str) {
    if(str.length >18 || str.length < 8) return false;
    if(/[A-Z]/.test(str) && /[a-z]/.test(str) && /\d/.test(str) ) return true;
    return false;
}

//-----------------------------------------------------
//身份证号 验证  18位 
//前边的6位是地域，后面是出生年月 男女

var reg = /^\d{6}\d{4}\d{2}\d{2}\d{2}\d(\d|X)$/