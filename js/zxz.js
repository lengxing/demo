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
            /*
                切割字符串
            */
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
        },
        hexToRgba: function (co) {
            /*
                计算颜色值
                Z.clacColor('#00538b') --> 0,83,139
            */
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            var sColor = co;
            if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                    var sColorNew = "#";
                    for (var i = 1; i < 4; i += 1) {
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值  
                var sColorChange = [];
                for (var i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                }
                return   sColorChange.join(",");
            } else {
                return sColor;
            }
        },
        rgbToHex: function(rgb){
            /*
                计算颜色值
                Z.rgbToHex('rgba(0,13,139,0.3)') --> hex:"#000d8b" alpha:30
            */
            var rRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/,
                r, g, b, a,
                rsa = rgb.replace(/\s+/g, "").match(rRgba);
            if (rsa) {
                r = (+rsa[1]).toString(16);
                r = r.length == 1 ? "0" + r : r;
                g = (+rsa[2]).toString(16);
                g = g.length == 1 ? "0" + g : g;
                b = (+rsa[3]).toString(16);
                b = b.length == 1 ? "0" + b : b;
                a = (+(rsa[5] ? rsa[5] : 1)) * 100
                return { hex: "#" + r + g + b, alpha: Math.ceil(a) };
            } else {
                return { hex: rgb, alpha: 100 };
            }
        }
    }
    Z.init();
    // window.Z = Z;
    // return Z;
})();