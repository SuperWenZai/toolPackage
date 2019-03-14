import Vue from 'vue';

// 全局混入
Vue.mixin({
  data() {
    return {
      banChat: ['\'', '*', '&', '^', '#', '"', '\\', '/', '!', '$']
    };
  },
  created() {},
  methods: {
    radio(rule, value, callback) {
      if (value > -1) {
        callback();
      } else {
        callback(new Error('请选一项'));
      }
    },
    checkbox(rule, value, callback) {
      if (value.length > 0) {
        callback();
      } else {
        callback(new Error('请至少选一项'));
      }
    },
    phones(rule, value, callback) {
      // if(!value){
      //     callback(new Error('请输入手机号码'));
      // }
      let ok = true;
      let phones = value.split(",");
      for (let i = 0, l = phones.length; i < l; i++) {
        if (!phones[i] || !/^(\d{8}|\d{11}|\d{13}|\d{3}-\d{8}|\d{4}-\d{8})$/.test(phones[i])) {
          ok = false;
        }
      }
      if (!ok) {
        callback(new Error('请输入正确的手机号码格式 8位/11位/3位或4位区号-8位 数字'));
      } else {
        callback();
      }
    }
    //电话号码去除-并且可以为10为数
    ,
    phoneNumber(rule, value, callback) {
      // if(!value){
      //     callback(new Error('请输入手机号码'));
      // }
      let ok = true;
      let phones = value.split(",");
      for (let i = 0, l = phones.length; i < l; i++) {
        if (!phones[i] || !/^(\d{8}|\d{11}|\d{10}|\d{13}|\d{3}\d{8}|\d{4}-\d{8})$/.test(phones[i])) {
          ok = false;
        }
      }
      if (!ok) {
        callback(new Error('请输入正确的手机号码格式 8位/10位/11位/3位或4位区号-8位 数字'));
      } else {
        callback();
      }
    }


    ,
    announcement(rule, value, callback) {

      if (value == "") {
        callback(new Error('公告不能为空'));
      } else if (value.length >= 36) {
        callback('公告不能超过36个字')
      } else {
        callback()
      }
    },
    nameChat(rule, value, callback) {
      // if(!value){
      //     callback(new Error('请填写该项'));
      // }

      let errStr = '支持16个中文字符或32个英文字符,并且不包含 /\\\'*&^"#!$ 等特殊字符'
      let hasBan = false;
      for (let i = -1, bc; bc = this.banChat[++i];) {
        if (value.indexOf(bc) > -1) {
          hasBan = true;
          break;
        }
      }
      if (hasBan) {
        callback(new Error(errStr));
      } else {
        let len = 0;
        for (let i = 0, l = value.length; i < l; i++) {
          if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value[i])) {
            len += 1;
          } else {
            len += 0.5;
          }
        }
        if (len > 16) {
          callback(new Error(errStr));
        } else {
          callback();
        }
      }

    }

    // 过滤特殊字符
    ,
    expChat(rule, value, callback) {
      let hasBan = false;
      let errStr = '请确保不包含 /\\\'*&^"#!$ 等特殊字符'
      for (let i = -1, bc; bc = this.banChat[++i];) {
        if (value.indexOf(bc) > -1) {
          hasBan = true;
          break;
        }
      }
      if (hasBan) {
        callback(new Error(errStr));
      } else {
        callback();
      }
    }

    //邮箱格式
    ,
    emailChat(rule, value, callback) {
      // if(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)){

      if (/^([a-zA-Z0-9]+[_|\-|.]+)*[a-zA-Z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入有效的邮箱'));
      }
    }

    ,
    emailChats(rule, value, callback) {
      if (value) {
        let ok = true;
        let email = value.split(",");
        for (let i = 0, l = email.length; i < l; i++) {
          if (!/^([a-zA-Z0-9]+[_|\-|.]+)*[a-zA-Z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email[i])) {
            ok = false;
          }
        }
        if (!ok) {
          callback(new Error('请输入有效的邮箱'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
    // 常规名称（中文、英文、数字） param length 长度限制 -by Allen
    ,
    commonNameChat(length, tip = '', value, callback) {
      length = length || 16;
      tip = tip || `请输入${length}位以内英文或数字的组合`;
      if (value.length <= length && /^[a-zA-Z\d\u4e00-\u9fa5]+$/.test(value)) {
        callback();
      } else {
        callback(new Error(tip));
      }

    }
    // 最多输入多少个字 chat 长度限制，中文长度，tip: 错误提示语
    ,
    validatorChat(
      chat = 16,
      tip = "",
      value,
      callback
    ) {
      let len = 0;
      for (let i = 0, l = value.length; i < l; i++) {
        if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value[i])) {
          len += 1;
        } else {
          len += 0.5;
        }
      }
      if (len > chat) {
        tip = tip || `最多输入${chat}个字`;
        callback(new Error(tip));
      } else {
        callback();
      }

    },
    englishChat(chat = 32, value, callback) {
      let errStr = `支持${chat}个英文字符,并且不包含 /\'*&^"#!$ 等特殊字符`
      let hasBan = false;
      for (let i = -1, bc; bc = this.banChat[++i];) {
        if (value.indexOf(bc) > -1) {
          hasBan = true;
          break;
        }
      }

      if (hasBan) {
        callback(new Error(errStr));
      } else {
        let len = 0;
        for (let i = 0, l = value.length; i < l; i++) {
          if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value[i])) {
            callback(new Error(errStr));
            break;
          }
          len += 1;
        }
        if (len > chat) {
          callback(new Error(errStr));
        } else {
          callback();
        }
      }

    },

    /**
     * 自定义字符输入验证
     * @param value 要验证的字符
     * @param chat 限制字符数，默认16个中文字符或32个英文字符
     * @return true/false;
     */
    // 自定义验证
    //  moren输入最多16个中文字符或32个英文字符，并且不包含 /\'*&^"#!$ 等特殊字符
    validatorNameChat(value, chat) {
      chat = chat ? chat : 16;
      let hasBan = false;
      for (let i = -1, bc; bc = this.banChat[++i];) {
        if (value.indexOf(bc) > -1) {
          hasBan = true;
          break;
        }
      }
      if (hasBan) {
        return false;
      } else {
        let len = 0;
        for (let i = 0, l = value.length; i < l; i++) {
          if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value[i])) {
            len += 1;
          } else {
            len += 0.5;
          }
        }
        if (len > chat) {
          return false;
        } else {
          return true;
        }
      }
    },
    //  输入最多16个中文字符或32个英文字符
    alidatorChat(value, chat) {
      chat = chat ? chat : 16;
      let len = 0;
      for (let i = 0, l = value.length; i < l; i++) {
        if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value[i])) {
          len += 1;
        } else {
          len += 0.5;
        }
      }
      if (len > chat) {
        return false;
      } else {
        return true;
      }
    },

    /**
     * 自定义字符输入验证
     * @param value 要验证的字符
     * @param chat 限制字符数，默认16个中文字符或32个英文字符
     * @param isSpecial 是否限制特殊字符，默认不限制
     * @return value;
     */
    onlyEgnlishrChat(value, chat, isSpecial) {
      chat = chat ? chat : 32;
      let val = value;
      // let hasBan = false;

      if (isSpecial) {

        for (let i = -1, bc; bc = this.banChat[++i];) {
          if (value.indexOf(bc) > -1) {
            // hasBan = true;
            val = value.substring(0, value.length - 1)
            return val;
          }
        }
      }
      // if(hasBan){
      //     return false;
      // }else{
      let len = 0;
      for (let i = 0, l = value.length; i < l; i++) {
        if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value[i])) {
          val = value.replace(/[\u4E00-\u9FA5\uF900-\uFA2D]/gi, '')
          return val;

        }
        len += 1;
      }
      if (len > chat) {
        let _val = val.substring(0, chat);
        console.log(_val, '855');
        return _val
      } else {
        return val;
      }
    },

    //格式化日期
    dateFormat(date, fmt) {
      if (!date) {
        date = new Date();
      }

      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds(), //毫秒  1-3 位  只能一位占位符
        "U+": date.getMilliseconds() //毫秒   可以1-3位占位符
      };
      fmt = fmt || "yyyy-MM-dd hh:mm";
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    },

    // 处理时间

    // 获取本周的开始日期
    getFirstDayOfThisWeek() {
      let day = new Date();
      let num = day.getDay() - 1;
      day.setDate(day.getDate() - num); //本周第一天
      let str = Com.dateFormat(day, "yyyy-MM-dd");
      return str;
    },

    // 获取本月的开始日期
    getFirstDayOfThisMouth() {
      let day = new Date();
      day.setDate(1); //本月第一天
      let str = Com.dateFormat(day, "yyyy-MM-dd");
      return str;
    },

    // 过滤html标签
    delHtml(val) {
      var value = val.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
      return value;
    },

    // 格式化时间
    formatTime(value) { // 需要格式化的值
      //   var value = $event.target.value;
      if (value == "") {
        return;
      }
      var hour = 0,
        minute = 0;
      if (value.indexOf(":") > -1) {
        var valArr = value.split(":");
        hour = parseInt(isNaN(valArr[0]) ? 0 : valArr[0]);
        if (hour > 23) {
          hour = 23;
        }
        if (valArr.length == 2) {
          valArr[1] = valArr[1] ? valArr[1] : 0;
          minute = parseInt(isNaN(valArr[1]) ? 0 : valArr[1]);
        } else {
          var tempMinute = 0;
          for (var i = 1, l = valArr.length; i < l; i++) {
            tempMinute += parseInt(isNaN(valArr[i]) ? 0 : valArr[1]);
          }
          minute = tempMinute;
        }
        if (minute > 59) {
          minute = 59;
        }

      } else {
        value = value.toString().substring(0, 4);

        var lastLength = value.toString().length;
        var _value = value;

        value = parseInt(isNaN(value) ? 0 : value);

        if (value.toString().length == 3) {
          if (lastLength == 3) {
            if (_value[0] == "0") { //0355

            } else { //125
              value *= 10;
            }
          }
        }
        //23
        if (value <= 24) {
          hour = value;
          minute = 0;
        } else if (value > 2359) {
          hour = 23;
          minute = 59;
        } else {
          if (value.toString().length == 4) {
            hour = value.toString().substring(0, 2) || 0;
            minute = value.toString().substring(2, 4) || 0;
          } else if (value.toString().length == 3) {
            hour = value.toString().substring(0, 1) || 0;
            minute = value.toString().substring(1, 3) || 0;
          } else {
            hour = 0;
            minute = value;
          }
          if (hour > 23) {
            hour = 23;
          }
          if (minute > 59) {
            minute = 59;
          }
        }
      }
      if (hour < 0) {
        hour = 0 - hour;
      }
      if (minute < 0) {
        minute = 0 - minute;
      }

      var that = this;
      //   $event = fixNum(hour)+":"+fixNum(minute)
      // setTimeout(function(){

      // });

      return fixNum(hour) + ":" + fixNum(minute);
    }


  }
});
