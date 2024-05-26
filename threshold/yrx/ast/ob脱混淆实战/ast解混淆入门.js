let parse = require("@babel/parser").parse
let traverse = require("@babel/traverse").default
let generate = require("@babel/generator").default


// 插句话: 首先ast只能解析js代码，不能执行js代码

// ----------------------------------解轻ob混淆-------------------------------
// ob混淆特性：大数组，数组移位。解密函数，业务代码+控制流平坦化
var _$oa = ['WVRGd3c=', 'YVFYbEg=', 'Y3dXcm8=', 'cm91bmQ=', 'VUdCQnc=', 'V0tXU1o=', 'anFxUWQ=', 'c3RhdGVPYmplY3Q=', 'Y1R6d0Y=', 'alZYWUk=', 'Y29va2ll', 'WmZzb3I=', 'VEhIbUY=', 'aXB1dWo=', 'a2xhQk8=', 'aGRzZE4=', 'Y291bnRlcg==', 'UGdIenE=', 'bGlsQ3Q=', 'ck5BTFA=', 'dGVzdA==', 'WGNOdUM=', 'eHRsaHk=', 'ZnVuY3Rpb24gKlwoICpcKQ==', 'cmVsb2Fk', 'SkdPcnY=', 'elBOc3Q=', 'TWhic2I=', 'a0JNRFQ=', 'dEpLY3k=', 'dmFsdWVPZg==', 'SVl2T3I=', 'R0hHanQ=', 'd2hpbGUgKHRydWUpIHt9', 'YXBwbHk=', 'eFJLRk8=', 'Y0NqaUU=', 'a2dqb1Q=', 'TW1RZlo=', 'TmJCZWY=', 'Y2hhaW4=', 'cVFyZFY=', 'bG9n', 'Y0lvSXU=', 'eE5WbGQ=', 'TXNFbHI=', 'VmxxY08=', 'Q2h2c1M=', 'UWlFdFA=', 'aFp3Vlk=', 'YXpWZHc=', 'TVhoSUY=', 'S0pia0U=', 'WWh1QkE=', 'bmprQlU=', 'WkJBVFk=', 'd09heUs=', 'Y29uc3RydWN0b3I=', 'RHBVa2U=', 'T2NBVms=', 'eGhjQnI=', 'bFlEakM=', 'YWN0aW9u', 'SFRubFY=', 'bWlPcEE=', 'VHR4R2w=', 'XCtcKyAqKD86W2EtekEtWl8kXVswLTlhLXpBLVpfJF0qKQ==', 'U25QYUs=', 'WGJQYWI=', 'Z2VkZGs=', 'aERmcXg=', 'Q01aRHc=', 'OyBwYXRoPS8=', 'elFnbng=', 'c2lnbj0=', 'cXRXQXA=', 'THdocFo=', 'UnFidUo=', 'bHliZ1M=', 'R0NMbmw=', 'dWlnTHo=', 'YVJHTGc=', 'YnRvYQ==', 'eXBkU2k=', 'RmxnVGk=', 'Z2dlcg==', 'QnFJdHg=', 'c2dlZ3g=', 'd0hPdHU=', 'YlZlSk0=', 'ZHByVXU=', 'eXZKd1o=', 'cE9UeXY=', 'a09sZGk=', 'bVF3V3I=', 'RHZxaVE=', 'ZG1Ndmc=', 'V0NYVFQ=', 'Z0tsaHo=', 'ZnZEVW8=', 'S2didU4=', 'cWlod20=', 'Q1FERWs=', 'ekxTSG0=', 'eHhMVmo=', 'ZXF3T2s=', 'bnFGQVE=', 'REhkdWQ=', 'R3BoelM=', 'ekZxakE=', 'Tm5RUXo=', 'Y2FsbA==', 'aFhtcmU=', 'aFJkZFc=', 'aW5wdXQ='];
(function(a, b) {  // 数组移位
    var c = function(f) {
        while (--f) {
            a['push'](a['shift']());
        }
    };
    c(++b);
}(_$oa, 0x1e8));
var _$ob = function(a, b) {       // 解密函数
    a = a - 0x0;
    var c = _$oa[a];
    if (_$ob['kLJXHE'] === undefined) {
        (function() {
            var f;
            try {
                var h = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');');
                f = h();
            } catch (i) {
                f = window;
            }
            var g = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            f['atob'] || (f['atob'] = function(j) {
                var k = String(j)['replace'](/=+$/, '');
                var l = '';
                for (var m = 0x0, n, o, p = 0x0; o = k['charAt'](p++); ~o && (n = m % 0x4 ? n * 0x40 + o : o,
                m++ % 0x4) ? l += String['fromCharCode'](0xff & n >> (-0x2 * m & 0x6)) : 0x0) {
                    o = g['indexOf'](o);
                }
                return l;
            }
            );
        }());
        _$ob['DToPHc'] = function(e) {
            var f = atob(e);
            var g = [];
            for (var h = 0x0, j = f['length']; h < j; h++) {
                g += '%' + ('00' + f['charCodeAt'](h)['toString'](0x10))['slice'](-0x2);
            }
            return decodeURIComponent(g);
        }
        ;
        _$ob['SfaNiz'] = {};
        _$ob['kLJXHE'] = !![];
    }
    var d = _$ob['SfaNiz'][a];
    if (d === undefined) {
        c = _$ob['DToPHc'](c);
        _$ob['SfaNiz'][a] = c;
    } else {
        c = d;
    }
    return c;
};

// 第二步: 拿到调用ob解密的ast语法树结构，也就是近乎这种`_$ob('0x19')`, 利用在线工具【https://astexplorer.net/】
ast = parse(` (function() {                        // 注意代码完整性的坑...
        var a = {
            'HTnlV': function(d, e) {
                return d(e);
            },
            'nqFAQ': function(d, e) {
                return d !== e;
            },
            'klaBO': _$ob('0x3d'),
            'hZwVY': _$ob('0x20'),
            'EciCW': function(d, e) {
                return d !== e;
            },
            'ZIJyS': _$ob('0x68'),
            'HLQHx': 'AvoqM',
            'SnPaK': _$ob('0x10'),
            'DvqiQ': _$ob('0x5c'),
            'GphzS': function(d) {
                return d();
            },
            'DHdud': function(d, e) {
                return d + e;
            },
            'fvDUo': 'debu',
            'THHmF': 'gger',
            'kryPl': _$ob('0x5e'),
            'ypdSi': function(d, e) {
                return d === e;
            },
            'sgegx': _$ob('0x28'),
            'hXmre': 'function\x20*\x5c(\x20*\x5c)',
            'kBMDT': _$ob('0x26'),
            'jqqQd': 'init',
            'ChvsS': _$ob('0xc'),
            'FlgTi': _$ob('0x56'),
            'lGfhM': _$ob('0x4c'),
            'POSWo': _$ob('0x22'),
            'hdsdN': function(d, e) {
                return d === e;
            },
            'lilCt': _$ob('0x35'),
            'eqwOk': function(d, e, f) {
                return d(e, f);
            },
            'zPNst': '此网页受【爱锭云盾\x20V1.0\x20动态版】保护',
            'LwhpZ': 'aiding_win',
            'GHGjt': function(d, e) {
                return d(e);
            },
            'ipuuj': function(d, e) {
                return d + e;
            },
            'RIaGj': function(d, e) {
                return d / e;
            },
            'uigLz': _$ob('0x2e'),
            'xRKFO': _$ob('0x2c')
        };
        var b = function() {
            var d = {
                'Zfsor': function(f, g) {
                    return a['EciCW'](f, g);
                },
                'jVXYI': a['ZIJyS'],
                'wHOtu': a['HLQHx']
            };
            if (a['EciCW'](a[_$ob('0x27')], a[_$ob('0x43')])) {
                var e = !![];
                return function(f, g) {
                    var h = {
                        'kOldi': function(j, k) {
                            return a[_$ob('0x23')](j, k);
                        }
                    };
                    if (a[_$ob('0x4e')](a[_$ob('0x65')], a[_$ob('0x15')])) {
                        var i = e ? function() {
                            if (d[_$ob('0x62')](d[_$ob('0x60')], d[_$ob('0x3c')])) {
                                if (g) {
                                    var j = g[_$ob('0x6')](f, arguments);
                                    g = null;
                                    return j;
                                }
                            } else {
                                if (ret) {
                                    return debuggerProtection;
                                } else {
                                    hgSnuv[_$ob('0x41')](debuggerProtection, 0x0);
                                }
                            }
                        }
                        : function() {}
                        ;
                        e = ![];
                        return i;
                    } else {
                        var k = fn['apply'](context, arguments);
                        fn = null;
                        return k;
                    }
                }
                ;
            } else {
                return ![];
            }
        }();
        (function() {
            var d = {
                'KgbuN': function(e) {
                    return a[_$ob('0x50')](e);
                },
                'IYvOr': function(e, f) {
                    return a[_$ob('0x4f')](e, f);
                },
                'dmMvg': a[_$ob('0x47')],
                'hRddW': a[_$ob('0x63')],
                'NnQQz': a['kryPl'],
                'geddk': function(e, f) {
                    return a[_$ob('0x37')](e, f);
                },
                'aQXlH': a[_$ob('0x3b')],
                'MmQfZ': a[_$ob('0x54')],
                'GCLnl': a[_$ob('0x0')],
                'qQrdV': function(e, f) {
                    return a[_$ob('0x23')](e, f);
                },
                'rNALP': a[_$ob('0x5d')],
                'QiEtP': a[_$ob('0x13')],
                'zLSHm': a[_$ob('0x38')],
                'MXhIF': function(e, f) {
                    return a[_$ob('0x23')](e, f);
                },
                'lybgS': function(e, f) {
                    return a[_$ob('0x37')](e, f);
                },
                'cTzwF': a['lGfhM'],
                'zFqjA': function(e, f) {
                    return a['DHdud'](e, f);
                },
                'xBBPX': a['POSWo']
            };
            if (a[_$ob('0x66')](a[_$ob('0x69')], a[_$ob('0x69')])) {
                a[_$ob('0x4d')](b, this, function() {
                    var e = {
                        'XcNuC': function(i, j) {
                            return d['IYvOr'](i, j);
                        },
                        'iSbBy': d[_$ob('0x44')],
                        'YhuBA': d[_$ob('0x55')],
                        'dprUu': d[_$ob('0x52')]
                    };
                    if (d[_$ob('0x29')](d[_$ob('0x58')], d[_$ob('0x58')])) {
                        var f = new RegExp(d[_$ob('0xa')]);
                        var g = new RegExp(d[_$ob('0x33')],'i');
                        var h = d[_$ob('0xd')](_$oc, d[_$ob('0x6a')]);
                        if (!f[_$ob('0x6b')](d[_$ob('0x3')](h, d[_$ob('0x14')])) || !g[_$ob('0x6b')](d[_$ob('0x3')](h, d[_$ob('0x4b')]))) {
                            d[_$ob('0x17')](h, '0');
                        } else {
                            if (d[_$ob('0x32')](d[_$ob('0x5f')], d['cTzwF'])) {
                                d['KgbuN'](_$oc);
                            } else {
                                cruMCw[_$ob('0x48')](_$oc);
                            }
                        }
                    } else {
                        (function() {
                            return ![];
                        }
                        [_$ob('0x1d')](uSgNFZ[_$ob('0x6c')](uSgNFZ['iSbBy'], uSgNFZ[_$ob('0x19')]))['apply'](uSgNFZ[_$ob('0x3e')]));
                    }
                })();
            } else {
                (function() {
                    return !![];
                }
                [_$ob('0x1d')](cruMCw[_$ob('0x51')](cruMCw[_$ob('0x44')], cruMCw['hRddW']))['call'](cruMCw['xBBPX']));
            }
        }());
        console[_$ob('0xe')](a[_$ob('0x71')]);
        var c = new Date()[_$ob('0x2')]();
        token = window[_$ob('0x36')](a[_$ob('0x4f')](a[_$ob('0x30')], a['HTnlV'](String, c)));
        md = a[_$ob('0x4')](hex_md5, window['btoa'](a[_$ob('0x64')](a[_$ob('0x30')], a['GHGjt'](String, Math[_$ob('0x5a')](a['RIaGj'](c, 0x3e8))))));
        document[_$ob('0x61')] = a[_$ob('0x64')](a[_$ob('0x64')](a[_$ob('0x64')](a[_$ob('0x64')](a[_$ob('0x64')](a['ipuuj'](a[_$ob('0x34')], Math[_$ob('0x5a')](a['RIaGj'](c, 0x3e8))), '~'), token), '|'), md), a[_$ob('0x7')]);
        location[_$ob('0x6f')]();
    }());
    function _$oc(a) {
        var b = {
            'tJKcy': _$ob('0x5'),
            'wOayK': _$ob('0x67'),
            'cIoIu': function(d, e) {
                return d === e;
            },
            'OYJkI': _$ob('0x3a'),
            'qtWAp': _$ob('0x2a'),
            'KhNYM': _$ob('0x6e'),
            'ZBATY': '\x5c+\x5c+\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)',
            'Mhbsb': function(d, e) {
                return d(e);
            },
            'KJbkE': 'init',
            'pJefq': function(d, e) {
                return d + e;
            },
            'qihwm': _$ob('0xc'),
            'WCXTT': function(d, e) {
                return d + e;
            },
            'TtxGl': _$ob('0x56'),
            'CQDEk': function(d) {
                return d();
            },
            'pOTyv': function(d, e) {
                return d === e;
            },
            'NbBef': 'WZhtm',
            'YTFww': 'string',
            'njkBU': _$ob('0x42'),
            'YLtBE': _$ob('0x11'),
            'cCjiE': function(d, e) {
                return d === e;
            },
            'yvJwZ': _$ob('0x21'),
            'HDgrO': 'tIDNZ',
            'nOxQh': function(d, e) {
                return d !== e;
            },
            'CMZDw': function(d, e) {
                return d + e;
            },
            'JGOrv': function(d, e) {
                return d / e;
            },
            'bHjpc': 'length',
            'kgjoT': function(d, e) {
                return d === e;
            },
            'xtlhy': function(d, e) {
                return d % e;
            },
            'zQgnx': 'debu',
            'UGBBw': _$ob('0x39'),
            'gPcVA': 'action',
            'VlqcO': function(d, e) {
                return d !== e;
            },
            'miOpA': _$ob('0x59'),
            'TXinf': _$ob('0x5e'),
            'azVdw': function(d, e) {
                return d === e;
            },
            'WeNYY': _$ob('0x46'),
            'WnjZN': 'hqQQc',
            'OcAVk': _$ob('0x31'),
            'DpUke': function(d, e) {
                return d(e);
            }
        };
        function c(d) {
            if (b[_$ob('0x40')](b[_$ob('0xb')], b[_$ob('0xb')])) {
                if (b[_$ob('0x40')](typeof d, b[_$ob('0x57')])) {
                    if (b[_$ob('0x40')](b[_$ob('0x1a')], b['YLtBE'])) {
                        return function(f) {}
                        [_$ob('0x1d')](b[_$ob('0x1')])[_$ob('0x6')](b['wOayK']);
                    } else {
                        return function(f) {}
                        [_$ob('0x1d')](b['tJKcy'])[_$ob('0x6')](b[_$ob('0x1c')]);
                    }
                } else {
                    if (b[_$ob('0x8')](b[_$ob('0x3f')], b['HDgrO'])) {
                        var g = firstCall ? function() {
                            if (fn) {
                                var h = fn[_$ob('0x6')](context, arguments);
                                fn = null;
                                return h;
                            }
                        }
                        : function() {}
                        ;
                        firstCall = ![];
                        return g;
                    } else {
                        if (b['nOxQh'](b[_$ob('0x2b')]('', b[_$ob('0x70')](d, d))[b['bHjpc']], 0x1) || b[_$ob('0x9')](b[_$ob('0x6d')](d, 0x14), 0x0)) {
                            (function() {
                                if (b[_$ob('0xf')](b['OYJkI'], b[_$ob('0x2f')])) {
                                    if (fn) {
                                        var h = fn['apply'](context, arguments);
                                        fn = null;
                                        return h;
                                    }
                                } else {
                                    return !![];
                                }
                            }
                            [_$ob('0x1d')](b[_$ob('0x2b')](b[_$ob('0x2d')], b[_$ob('0x5b')]))[_$ob('0x53')](b['gPcVA']));
                        } else {
                            if (b[_$ob('0x12')](b[_$ob('0x24')], b[_$ob('0x24')])) {
                                var h = new RegExp(b['KhNYM']);
                                var i = new RegExp(b[_$ob('0x1b')],'i');
                                var j = b[_$ob('0x72')](_$oc, b[_$ob('0x18')]);
                                if (!h[_$ob('0x6b')](b['pJefq'](j, b[_$ob('0x49')])) || !i[_$ob('0x6b')](b[_$ob('0x45')](j, b[_$ob('0x25')]))) {
                                    b[_$ob('0x72')](j, '0');
                                } else {
                                    b[_$ob('0x4a')](_$oc);
                                }
                            } else {
                                (function() {
                                    return ![];
                                }
                                ['constructor'](b['CMZDw'](b[_$ob('0x2d')], b[_$ob('0x5b')]))[_$ob('0x6')](b['TXinf']));
                            }
                        }
                    }
                }
                b[_$ob('0x72')](c, ++d);
            } else {
                return !![];
            }
        }
        try {
            if (b[_$ob('0x16')](b['WeNYY'], b['WnjZN'])) {
                return c;
            } else {
                if (a) {
                    return c;
                } else {
                    if (b[_$ob('0x16')](b[_$ob('0x1f')], b[_$ob('0x1f')])) {
                        b[_$ob('0x1e')](c, 0x0);
                    } else {
                        b['Mhbsb'](result, '0');
                    }
                }
            }
        } catch (f) {}
    }`)
// console.log('ast：', ast)

traverse(ast, {
	CallExpression: function (path){
		// console.log(path.toString())
		// console.log(path.node)  //节点类型为`CallExpressio`的ast语法树
		if(path.node.callee.name === '_$ob'){
			// console.log(path.toString())    //  节点为CallExpression符合条件的源码
			// console.log(path.node.arguments[0].value)   // 调用函数的形参
			path.replaceWith({
				type: 'StringLiteral',           // 这里的节点类型是否是替换的节点类型(存疑？)
				value: _$ob(path.node.arguments[0].value)
			})
		}
	}
})
let out_code = generate(ast).code
// console.log('解混淆后:', out_code)


// 文件模块(内置)
const fs = require('fs');
// 文件路径
const filePath = './astDetachob1.js'
fs.writeFile(filePath, out_code, 'utf8', (err) =>{
	if (err){throw  err;}
	console.log('>>>写入文件完成【ok!】')
})

