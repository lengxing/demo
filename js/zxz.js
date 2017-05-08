;
(function () {
    var GLOBAL = {
        version: 1,
        settings: {
            opaqueness: 100,
        }
    };
    Z = {
        init: function () {
            Z.resize();
            window.onresize = function () {
                Z.resize();
            };
        },
        resize: function () {
            var e = 1080
                , t = document.documentElement.clientHeight || document.body.clientHeight;
            $("body").css("zoom", t / e)
        },

        clone: function (obj) {
            /**
             * 对象克隆&深拷贝（公用方法）
             * @param obj
             * @returns {{}}
             */
            // Handle the 3 simple types, and null or undefined
            if (null == obj || "object" != typeof obj) return obj;

            // Handle Date
            if (obj instanceof Date) {
                var copy = new Date();
                copy.setTime(obj.getTime());
                return copy;
            }

            // Handle Array
            if (obj instanceof Array) {
                var copy = [];
                for (var i = 0, len = obj.length; i < len; ++i) {
                    copy[i] = clone(obj[i]);
                }
                return copy;
            }

            // Handle Object
            if (obj instanceof Object) {
                var copy = {};
                for (attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
                }
                return copy;
            }

            throw new Error("Unable to copy obj! Its type isn't supported.");
        },
        getStringLen: function (Str) {
            /*
                获取字符串的长度
            */
            var i, len, code;
            if (Str == null || Str == "") return 0;
            len = Str.length;
            for (i = 0; i < Str.length; i++) {
                code = Str.charCodeAt(i);
                if (code > 255) {
                    len++;
                }
            }
            return len;
        },
        autoAddEllipsis: function (pStr, pLen) {
            if (pStr == '' || pStr == null || pStr == undefined) {
                pStr == '';
                return '';
            } else {
                var _ret = cutString(pStr, pLen);
                var _cutFlag = _ret.cutflag;
                var _cutStringn = _ret.cutstring;

                if ("1" == _cutFlag) {
                    return _cutStringn + "...";
                } else {
                    return _cutStringn;
                }
            }

            function cutString(pStr, pLen) {
                // 原字符串长度  
                var _strLen = pStr.length;
                var _tmpCode;
                var _cutString;
                // 默认情况下，返回的字符串是原字符串的一部分  
                var _cutFlag = "1";
                var _lenCount = 0;
                var _ret = false;
                if (_strLen <= pLen / 2) {
                    _cutString = pStr;
                    _ret = true;
                }

                if (!_ret) {
                    for (var i = 0; i < _strLen; i++) {
                        if (isFull(pStr.charAt(i))) {
                            _lenCount += 2;
                        } else {
                            _lenCount += 1;
                        }

                        if (_lenCount > pLen) {
                            _cutString = pStr.substring(0, i);
                            _ret = true;
                            break;
                        } else if (_lenCount == pLen) {
                            _cutString = pStr.substring(0, i + 1);
                            _ret = true;
                            break;
                        }
                    }
                }

                if (!_ret) {
                    _cutString = pStr;
                    _ret = true;
                }

                if (_cutString.length == _strLen) {
                    _cutFlag = "0";
                }

                return {
                    "cutstring": _cutString,
                    "cutflag": _cutFlag
                };
            }

            function isFull(pChar) {
                if ((pChar.charCodeAt(0) > 128)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
    window.Z = Z;
    Z.init();
    return Z;
})();