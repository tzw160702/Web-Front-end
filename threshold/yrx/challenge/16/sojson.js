function sha1_ft(IiIi, iI1ll1, IlI1Il, l1il1l) {
    var liIil = {
        'i1IIi': function(IllI1I, liIii) {
            return IllI1I < liIii;
        },
        'IIII1I': function(II1ll1, IlI1Ii) {
            return II1ll1 & IlI1Ii;
        },
        'Iii111': function(i11I1I, l1il1i) {
            return i11I1I ^ l1il1i;
        },
        'l1l1II': function(ll1, iI1llI) {
            return ll1 | iI1llI;
        },
        'Iil1I1': function(llliii, IllI11) {
            return llliii & IllI11;
        },
        'Ii1iII': function(l1llIi, II1llI) {
            return l1llIi ^ II1llI;
        }
    };
    if (liIil['i1IIi'](IiIi, 0x14)) {
        return liIil['IIII1I'](iI1ll1, IlI1Il) | ~iI1ll1 & l1il1l;
    }
    if (IiIi < 0x28) {
        return liIil['Iii111'](liIil['Iii111'](iI1ll1, IlI1Il), l1il1l);
    }
    if (IiIi < 0x3c) {
        return liIil['l1l1II'](liIil['IIII1I'](iI1ll1, IlI1Il) | iI1ll1 & l1il1l, liIil['Iil1I1'](IlI1Il, l1il1l));
    }
    return liIil['Ii1iII'](iI1ll1 ^ IlI1Il, l1il1l);
}
function safe_add(iIII1I, ilil1i) {
    var IlIIi = {
        'iIIl1I': function(iIII1I, ilil1i) {
            return iIII1I + ilil1i;
        },
        'I1iIli': function(iIII1I, ilil1i) {
            return iIII1I & ilil1i;
        },
        'lI1Ill': function(iIII1I, ilil1i) {
            return iIII1I & ilil1i;
        },
        'lI1Ili': function(iIII1I, ilil1i) {
            return iIII1I >> ilil1i;
        },
        'IliilI': function(iIII1I, ilil1i) {
            return iIII1I << ilil1i;
        }
    };
    var lI1liI = IlIIi['iIIl1I'](IlIIi['I1iIli'](iIII1I, 0xffff), IlIIi['lI1Ill'](ilil1i, 0xffff));
    var i1i1Ii = (iIII1I >> 0x10) + IlIIi['lI1Ili'](ilil1i, 0x10) + (lI1liI >> 0x10);
    return IlIIi['IliilI'](i1i1Ii, 0x10) | lI1liI & 0xffff;
}
function sha1_kt(i11I11) {
    var l1llIl = {
        'II11II': function(ii1I1l, ii1I1i) {
            return ii1I1l < ii1I1i;
        }
    };
    return l1llIl['II11II'](i11I11, 0x14) ? 0x5a827999 : l1llIl['II11II'](i11I11, 0x28) ? 0x6ed9eba1 : l1llIl['II11II'](i11I11, 0x3c) ? -0x70e44324 : -0x359d3e2a;

}
function rol(lllii, iI11Ii) {
    var iIII1l = {
        'iIIl11': function(lllil, iI11Il) {
            return lllil | iI11Il;
        },
        'l1l1I1': function(iIII1i, iil1i1) {
            return iIII1i - iil1i1;
        }
    };
    return iIII1l['iIIl11'](lllii << iI11Ii, lllii >>> iIII1l['l1l1I1'](0x20, iI11Ii));
}
function core_sha1(liliI, ll1lI) {
    var l1iii = {
        'i1l1ll': function(liliI, l1iil) {
            return liliI >> l1iil;
        },
        'I1iIiI': function(liliI, lIIill) {
            return liliI << lIIill;
        },
        'li1I1': function(liliI, I1ilII) {
            return liliI & I1ilII;
        },
        'i1ilil': function(liliI, l1l11l) {
            return liliI % l1l11l;
        },
        'i1ill1': function(liliI, l1iIi) {
            return liliI + l1iIi;
        },
        'iIIl1l': function(liliI, l1iIl) {
            return liliI >> l1iIl;
        },
        'llIli1': function(liliI, iIli1I) {
            return liliI < iIli1I;
        },
        'iliIII': 'I1iIl1',                      // woe1 原函数写死可能有问题
        'iIIl1i': '4|3|6|9|10|1|7|0|2|8|5',      // woe2 同上
        'I1lllI': function(Iiil1, iiilli, l1iIIl) {
            return Iiil1(iiilli, l1iIIl);
        },
        'ill111': function(liliI, lI11Il) {
            return liliI < lI11Il;
        },
        'Iliil1': function(lIII1i, l11i11, IilIl1) {
            return lIII1i(l11i11, IilIl1);
        },
        'i1III': function(liliI, l1iIIi) {
            return liliI ^ l1iIIi;
        },
        'Ii1iIi': function(liliI, l1l11I) {
            return liliI ^ l1l11I;
        },
        'iliIIl': function(liliI, IilIlI) {
            return liliI - IilIlI;
        },
        'Ii1iIl': function(liliI, Iiiil) {
            return liliI - Iiiil;
        },
        'iliIIi': function(liliI, l11i1I) {
            return liliI - l11i1I;
        },
        'ill11I': function(IiII, llIIli, lIII1I) {
            return IiII(llIIli, lIII1I);
        },
        'Iliiil': function(illIlI, liIiI, l1il1I) {
            return illIlI(liIiI, l1il1I);
        },
        'li1Il': function(Iiili, IilIli, li1) {
            return Iiili(IilIli, li1);
        },
        'li1Ii': function(illIl1, l1llII) {
            return illIl1(l1llII);
        },
        'Iliiii': function(IilIll, lI11Ii, Iiill) {
            return IilIll(lI11Ii, Iiill);
        },
        'i1illI': function(l11i1i, lI11I1, l1il11) {
            return l11i1i(lI11I1, l1il11);
        },
        'i1IIl': function(IiI1, liI, illIli, l11i1l, lIII11, IiilI) {
            return IiI1(liI, illIli, l11i1l, lIII11, IiilI);
        }
    };
    liliI[ll1lI >> 0x5] |= l1iii['I1iIiI'](0x80, 0x18 - l1iii['i1ilil'](ll1lI, 0x20));
    liliI[l1iii['i1ill1'](l1iii['I1iIiI'](l1iii['iIIl1l'](l1iii['i1ill1'](ll1lI, 0x40), 0x9), 0x4), 0xf)] = ll1lI;
    var ii1I11 = Array(0x50);
    var liIi1 = 0x67452301;
    var lI11II = -0x10325477;
    var l1llI1 = -0x67452302;
    var llIIll = 0x10325476;
    var IillIi = -0x3c2d1e10;
    for (var lii = 0x0; l1iii['llIli1'](lii, liliI['length']); lii += 0x10) {
        if ('i1ii' !== l1iii['iliIII']) {
            var IllI1i = l1iii['iIIl1i']['split']('\x7c')
              , i11I1l = 0x0;
            while (!![]) {
                switch (IllI1i[i11I1l++]) {
                case '\x30':
                    lI11II = l1iii['I1lllI'](safe_add, lI11II, llliil);
                    continue;
                case '\x31':
                    for (var lil = 0x0; lil < 0x50; lil++) {
                        var IllI1l = '4|6|0|1|5|3|2'['split']('\x7c')
                          , i11I1i = 0x0;
                        while (!![]) {
                            switch (IllI1l[i11I1i++]) {
                            case '\x30':
                                IillIi = llIIll;
                                continue;
                            case '\x31':
                                llIIll = l1llI1;
                                continue;
                            case '\x32':
                                liIi1 = IillIl;
                                continue;
                            case '\x33':
                                lI11II = liIi1;
                                continue;
                            case '\x34':
                                if (l1iii['ill111'](lil, 0x10)) {
                                    ii1I11[lil] = liliI[l1iii['i1ill1'](lii, lil)];
                                } else {
                                    ii1I11[lil] = l1iii['Iliil1'](rol, l1iii['i1III'](l1iii['Ii1iIi'](ii1I11[l1iii['iliIIl'](lil, 0x3)] ^ ii1I11[l1iii['Ii1iIl'](lil, 0x8)], ii1I11[l1iii['Ii1iIl'](lil, 0xe)]), ii1I11[l1iii['iliIIi'](lil, 0x10)]), 0x1);
                                }
                                continue;
                            case '\x35':
                                l1llI1 = rol(lI11II, 0x1e);
                                continue;
                            case '\x36':
                                var IillIl = safe_add(safe_add(l1iii['ill11I'](rol, liIi1, 0x5), sha1_ft(lil, lI11II, l1llI1, llIIll)), l1iii['Iliiil'](safe_add, l1iii['li1Il'](safe_add, IillIi, ii1I11[lil]), l1iii['li1Ii'](sha1_kt, lil)));
                                continue;
                            }
                            break;
                        }
                    }
                    continue;
                case '\x32':
                    l1llI1 = l1iii['Iliiii'](safe_add, l1llI1, II1lll);
                    continue;
                case '\x33':
                    var llliil = lI11II;
                    continue;
                case '\x34':
                    var liIl1 = liIi1;
                    continue;
                case '\x35':
                    IillIi = l1iii['Iliiii'](safe_add, IillIi, ii1I1I);
                    continue;
                case '\x36':
                    var II1lll = l1llI1;
                    continue;
                case '\x37':
                    liIi1 = l1iii['Iliiii'](safe_add, liIi1, liIl1);
                    continue;
                case '\x38':
                    llIIll = l1iii['i1illI'](safe_add, llIIll, II1lli);
                    continue;
                case '\x39':
                    var II1lli = llIIll;
                    continue;
                case '\x31\x30':
                    var ii1I1I = IillIi;
                    continue;
                }
                break;
            }
        } else {

        }
    }
    // console.log(liIi1, lI11II, l1llI1, llIIll, IillIi);
    return l1iii['i1IIl'](Array, liIi1, lI11II, l1llI1, llIIll, IillIi);
}
var hexcase = 0x0;
var b64pad = '';
var chrsz = 0x8;
function str2binb(il1i11) {
    var IlIll1 = {
        'I1lliI': function(IlIII, ilil1l) {
            return IlIII + ilil1l;
        },
        'llIllI': function(illlIi, I1lIii) {
            return illlIi & I1lIii;
        },
        'I1ilI1': function(IiI1I, illlIl) {
            return IiI1I >> illlIl;
        },
        'iillll': function(i11ill, IIIIIi) {
            return i11ill + IIIIIi;
        },
        'lIIilI': function(IIIIIl, I1lIil) {
            return IIIIIl * I1lIil;
        },
        'II1li1': function(IIIl1i, liiII1) {
            return IIIl1i - liiII1;
        },
        'l1lIlI': function(IIIl1l, lllll) {
            return IIIl1l % lllll;
        },
        'IiiIl1': function(i11ili, iil1l1) {
            return i11ili >> iil1l1;
        },
        'lIIil1': function(lllli, iiili1) {
            return lllli - iiili1;
        },
        'II1liI': function(ill11i) {
            return ill11i();
        },
        'IlI1i1': function(lllill, ill11l) {
            return lllill << ill11l;
        },
        'l1lIl1': function(I1lIiI, lllili) {
            return I1lIiI < lllili;
        },
        'IiiIlI': function(IliiiI, Ill11) {
            return IliiiI * Ill11;
        },
        'Iilli1': function(liiIII, li1i11) {
            return liiIII === li1i11;
        },
        'I1l1Il': 'i1il',
        'llIll1': function(iI11I1, il1i1l) {
            return iI11I1 / il1i1l;
        },
        'Illl1l': function(IlIlll, IIIl1I) {
            return IlIlll % IIIl1I;
        }
    };
    var iil1ii = IlIll1['II1liI'](Array);
    var IlIlli = IlIll1['lIIil1'](IlIll1['IlI1i1'](0x1, chrsz), 0x1);
    for (var il1i1i = 0x0; IlIll1['l1lIl1'](il1i1i, IlIll1['IiiIlI'](il1i11['length'], chrsz)); il1i1i += chrsz) {
        if (IlIll1['Iilli1'](IlIll1['I1l1Il'], 'lI1Il1')) {
            il1i11 += IlIll1['I1lliI'](hex_tab['charAt'](IlIll1['llIllI'](binarray[IlIll1['I1ilI1'](il1i1i, 0x2)] >> IlIll1['iillll'](IlIll1['lIIilI'](IlIll1['II1li1'](0x3, IlIll1['l1lIlI'](il1i1i, 0x4)), 0x8), 0x4), 0xf)), hex_tab['charAt'](IlIll1['llIllI'](IlIll1['I1ilI1'](binarray[IlIll1['IiiIl1'](il1i1i, 0x2)], IlIll1['lIIil1'](0x3, il1i1i % 0x4) * 0x8), 0xf)));
        } else {
            iil1ii[IlIll1['IiiIl1'](il1i1i, 0x5)] |= IlIll1['llIllI'](il1i11['charCodeAt'](IlIll1['llIll1'](il1i1i, chrsz)), IlIlli) << IlIll1['lIIil1'](0x18, IlIll1['Illl1l'](il1i1i, 0x20));
        }
    }
    return iil1ii;
}
function binb2hex(iil1ll) {
    var iiilil = {
        'I1i11i': '0123456789abcdef',
        'I1i11l': function(iil1li, lillIl) {
            return iil1li < lillIl;
        },
        'llIlii': function(iIiIl, iiilii) {
            return iIiIl * iiilii;
        },
        'llIlil': function(li1i1i, IlIli1) {
            return li1i1i + IlIli1;
        },
        'IIlil': function(illIiI, lI1lli) {
            return illIiI >> lI1lli;
        },
        'ilI1lI': function(Ill1l, llI1Il) {
            return Ill1l - llI1Il;
        },
        'IiiIll': function(ii1iii, i11iil) {
            return ii1iii % i11iil;
        },
        'IIlii': function(Ill1i, ii1iil) {
            return Ill1i & ii1iil;
        },
        'IlI1il': function(lllI1l, i11iii) {
            return lllI1l >> i11iii;
        },
        'IilliI': function(llI1Ii, lllI1i) {
            return llI1Ii * lllI1i;
        },
        'IlI1ii': function(li1i1l, II1i1) {
            return li1i1l % II1i1;
        }
    };
    var lI1lll = hexcase ? '0123456789ABCDEF' : iiilil['I1i11i'];
    var iIiII = '';
    for (var iil1lI = 0x0; iiilil['I1i11l'](iil1lI, iiilil['llIlii'](iil1ll['length'], 0x4)); iil1lI++) {
        iIiII += iiilil['llIlil'](lI1lll['charAt'](iiilil['IIlil'](iil1ll[iil1lI >> 0x2], iiilil['llIlii'](iiilil['ilI1lI'](0x3, iiilil['IiiIll'](iil1lI, 0x4)), 0x8) + 0x4) & 0xf), lI1lll['charAt'](iiilil['IIlii'](iil1ll[iiilil['IlI1il'](iil1lI, 0x2)] >> iiilil['IilliI'](iiilil['ilI1lI'](0x3, iiilil['IlI1ii'](iil1lI, 0x4)), 0x8), 0xf)));
    }
    return iIiII;
}
function hex_sha1(lIIii1) {
    var ll1i1 = {
        'lI1Iii': function(IIli1i, I1iIi1, lliil1) {
            return IIli1i(I1iIi1, lliil1);
        },
        'i1li': function(IIllI, lliilI) {
            return IIllI * lliilI;
        }
    };
    return binb2hex(ll1i1['lI1Iii'](core_sha1, str2binb(lIIii1), ll1i1['i1li'](lIIii1['length'], chrsz)));
}
function binb2b64(iiiliI) {
    var li1i1I = {
        'iI1lli': function(illIii, ii1il1) {
            return illIii(ii1il1);
        },
        'iI1lll': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        'l1lIll': function(lI1llI, illIil) {
            return lI1llI !== illIil;
        },
        'I1l1II': 'lilIi1',
        'IIli1I': 'IiilII',
        'I1i11I': function(Ill1I, i11iiI) {
            return Ill1I | i11iiI;
        },
        'llIliI': function(lIli11, lllI1I) {
            return lIli11 & lllI1I;
        },
        'I1l1I1': function(lillI1, IlIlii) {
            return lillI1 >> IlIlii;
        },
        'I1i111': function(i1l1i1, liil11) {
            return i1l1i1 - liil11;
        },
        'ilI1li': function(iiillI, l1l111) {
            return iiillI % l1l111;
        },
        'IIliI': function(l1iIII, llI1I1) {
            return l1iIII + llI1I1;
        },
        'ilI1ll': function(IlIlil, lIli1I) {
            return IlIlil - lIli1I;
        },
        'Iillii': function(II1il, lllI11) {
            return II1il % lllI11;
        },
        'IlI1iI': function(I1lIll, I1lIli) {
            return I1lIll + I1lIli;
        },
        'Iillil': function(II1ii, IIIIII) {
            return II1ii & IIIIII;
        },
        'l1lIli': function(lillII, ii1ilI) {
            return lillII > ii1ilI;
        },
        'lIIiiI': function(lI1ll1, iIiI1) {
            return lI1ll1 * iIiI1;
        },
        'II1lil': function(liil1I, i11ii1) {
            return liil1I * i11ii1;
        },
        'IIli1l': function(IlIliI, l1iII1) {
            return IlIliI & l1iII1;
        },
        'II1lii': function(iiill1, lIli1i) {
            return iiill1 - lIli1i;
        }
    };
    var IIIII1 = li1i1I['iI1lll'];
    var I1lIlI = '';
    for (var ii1ill = 0x0; ii1ill < iiiliI['length'] * 0x4; ii1ill += 0x3) {
        if (li1i1I['l1lIll'](li1i1I['I1l1II'], li1i1I['IIli1I'])) {
            var II1iI = li1i1I['I1i11I'](li1i1I['I1i11I'](li1i1I['llIliI'](li1i1I['I1l1I1'](iiiliI[ii1ill >> 0x2], 0x8 * li1i1I['I1i111'](0x3, li1i1I['ilI1li'](ii1ill, 0x4))), 0xff) << 0x10, li1i1I['llIliI'](iiiliI[li1i1I['IIliI'](ii1ill, 0x1) >> 0x2] >> 0x8 * li1i1I['ilI1ll'](0x3, li1i1I['Iillii'](li1i1I['IlI1iI'](ii1ill, 0x1), 0x4)), 0xff) << 0x8), li1i1I['Iillil'](iiiliI[ii1ill + 0x2 >> 0x2] >> 0x8 * (0x3 - li1i1I['IlI1iI'](ii1ill, 0x2) % 0x4), 0xff));
            for (var llI1II = 0x0; llI1II < 0x4; llI1II++) {
                if (li1i1I['l1lIli'](li1i1I['IlI1iI'](ii1ill * 0x8, li1i1I['lIIiiI'](llI1II, 0x6)), li1i1I['II1lil'](iiiliI['length'], 0x20))) {
                    I1lIlI += b64pad;
                } else {
                    I1lIlI += IIIII1['charAt'](li1i1I['IIli1l'](II1iI >> li1i1I['II1lil'](0x6, li1i1I['II1lii'](0x3, llI1II)), 0x3f));
                }
            }
        } else {
            console.log('射了~, 放心不会走这的，射不了一点');
        }
    }
    return I1lIlI;
}
function b64_sha1(lili1) {
    var ll1l1 = {
        'IliI11': function(IllIIi, IllIIl) {
            return IllIIi(IllIIl);
        },
        'i1ll': function(IiiIi1, l1ii1, ii1ll) {
            return IiiIi1(l1ii1, ii1ll);
        },
        'i1l1lI': function(IliI1l, lliiil) {
            return IliI1l * lliiil;
        }
    };
    return ll1l1['IliI11'](binb2b64, ll1l1['i1ll'](core_sha1, ll1l1['IliI11'](str2binb, lili1), ll1l1['i1l1lI'](lili1['length'], chrsz)));
}
function token() {
    a = String(Date.parse(new Date()) / 1000);
    safe = btoa(a)+('|')+binb2b64(hex_sha1(btoa(core_sha1(a)))) + b64_sha1(a);
    return safe
}

