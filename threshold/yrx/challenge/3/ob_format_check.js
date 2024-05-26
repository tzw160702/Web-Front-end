function C(Y, Z) {
    var a0 = (0xffff & Y) + (0xffff & Z);     // a0 = 65535
    return ((((Y >> 0x10) + (Z >> 0x10)) + (a0 >> 0x10)) << 0x10) | (0xffff & a0);
}
function D(Y, Z) {
    return Y << Z | (Y >>> (0x20 - Z));
}
function E(Y, Z, a0, a1, a2, a3) {
    return C(D(C(C(Z, Y), C(a1, a3)), a2), a0);
}

function F(Y, Z, a0, a1, a2, a3, a4) {
    return E((Z & a0 | (~Z & a1)), Y, Z, a2, a3, a4);
}

function G(Y, Z, a0, a1, a2, a3, a4) {
    return E(((Z & a1) | (a0 & ~a1)), Y, Z, a2, a3, a4);
}

function I(Y, Z, a0, a1, a2, a3, a4) {
    return E((Z ^ a0) ^ a1, Y, Z, a2, a3, a4);
}

function J(Y, Z, a0, a1, a2, a3, a4) {
    return E((a0 ^ (Z | ~a1)), Y, Z, a2, a3, a4);
}

function N(Y, Z) {
    Y[Z >> 0x5] |= (0x80 << (Z % 0x20)), Y[(0xe + (((Z + 0x40) >>>  0x9) << 0x4))] = Z;
    if (1) {            // woe2  qz是一个长度为249的数组, 暂时改写成1
        var a0, a1, a2, a3, a4, a5 = 0x67452301, a6 = -0x10325477, a7 = -0x67452302, a8 = 0x10325476;
    } else {
        // var a0, a1, a2, a3, a4, a5 = 0x0, a6 = -0x0, a7 = -0x0, a8 = 0x0;
    }
    for (a0 = 0x0; a0 < Y['length']; a0 += 0x10)
        a1 = a5,
        a2 = a6,
        a3 = a7,
        a4 = a8,
        a5 = F(a5, a6, a7, a8, Y[a0], 0x7, -0x28955b88),
        a8 = F(a8, a5, a6, a7, Y[a0 + 0x1], 0xc, -0x173848aa),
        a7 = F(a7, a8, a5, a6, Y[a0 + 0x2], 0x11, 0x242070db),
        a6 = F(a6, a7, a8, a5, Y[a0 + 0x3], 0x16, -0x3e423112),
        a5 = F(a5, a6, a7, a8, Y[a0 + 0x4], 0x7, -0xa83f051),
        a8 = F(a8, a5, a6, a7, Y[a0 + 0x5], 0xc, 0x4787c62a),
        a7 = F(a7, a8, a5, a6, Y[a0 + 0x6], 0x11, -0x57cfb9ed),
        // 默认F函数
        a6 = F(a6, a7, a8, a5, Y[a0 + 0x7], 0x16, -0x2b96aff),
        a5 = F(a5, a6, a7, a8, Y[a0 + 0x8], 0x7, 0x69803730),
        a8 = F(a8, a5, a6, a7, Y[a0 + 0x9], 0xc, -0x74bb0851),
        a7 = F(a7, a8, a5, a6, Y[a0 + 0xa], 0x11, -0xa44f),
        a6 = F(a6, a7, a8, a5, Y[a0 + 0xb], 0x16, -0x76a32842),
        // 默认 a0+
        a5 = F(a5, a6, a7, a8, Y[a0 + 0xc], 0x7, 0x6b901122),
        a8 = F(a8, a5, a6, a7, Y[a0 + 0xd], 0xc, -0x2678e6d),
        a7 = F(a7, a8, a5, a6, Y[a0 + 0xe], 0x11, -0x599429f2),
        a6 = F(a6, a7, a8, a5, Y[a0 + 0xf], 0x16, 0x49b40821),

        a5 = G(a5, a6, a7, a8, Y[a0 + 0x1], 0x5, -0x9e1da9e),
        a8 = G(a8, a5, a6, a7, Y[a0 + 0x6], 0x9, -0x3fbf4cc0),
        a7 = G(a7, a8, a5, a6, Y[a0 + 0xb], 0xe, 0x265e5a51),
        a6 = G(a6, a7, a8, a5, Y[a0], 0x14, -0x16493856),
        a5 = G(a5, a6, a7, a8, Y[a0 + 0x5], 0x5, -0x29d0efa3),
        a8 = G(a8, a5, a6, a7, Y[a0 + 0xa], 0x9, 0x2441453),
        a7 = G(a7, a8, a5, a6, Y[a0 + 0xf], 0xe, -0x275e197f),
        a6 = G(a6, a7, a8, a5, Y[a0 + 0x4], 0x14, -0x182c0438),
        a5 = G(a5, a6, a7, a8, Y[a0 + 0x9], 0x5, 0x21e1cde6),
        a8 = G(a8, a5, a6, a7, Y[a0 + 0xe], 0x9, -0x3cc8f82a),
        a7 = G(a7, a8, a5, a6, Y[a0 + 0x3], 0xe, -0xb2af279),
        a6 = G(a6, a7, a8, a5, Y[a0 + 0x8], 0x14, 0x455a14ed),
        a5 = G(a5, a6, a7, a8, Y[a0 + 0xd], 0x5, -0x561c16fb),
        a8 = G(a8, a5, a6, a7, Y[a0 + 0x2], 0x9, -0x3105c08),
        a7 = G(a7, a8, a5, a6, Y[a0 + 0x7], 0xe, 0x676f02d9),
        a6 = G(a6, a7, a8, a5, Y[a0 + 0xc], 0x14, -0x72d5b376),

        a5 = I(a5, a6, a7, a8, Y[a0 + 0x5], 0x4, -0x5c6be),
        a8 = I(a8, a5, a6, a7, Y[a0 + 0x8], 0xb, -0x788e097f),
        a7 = I(a7, a8, a5, a6, Y[a0 + 0xb], 0x10, 0x6d9d6122),
        a6 = I(a6, a7, a8, a5, Y[a0 + 0xe], 0x17, -0x21ac7f4),
        a5 = I(a5, a6, a7, a8, Y[a0 + 0x1], 0x4, -0x5b4115bc),
        a8 = I(a8, a5, a6, a7, Y[a0 + 0x4], 0xb, 0x4bdecfa9),
        a7 = I(a7, a8, a5, a6, Y[a0 + 0x7], 0x10, -0x944b4a0),
        a6 = I(a6, a7, a8, a5, Y[a0 + 0xa], 0x17, -0x41404390),
        a5 = I(a5, a6, a7, a8, Y[a0 + 0xd], 0x4, 0x289b7ec6),
        a8 = I(a8, a5, a6, a7, Y[a0], 0xb, -0x155ed806),
        a7 = I(a7, a8, a5, a6, Y[a0 + 0x3], 0x10, -0x2b10cf7b),
        a6 = I(a6, a7, a8, a5, Y[a0 + 0x6], 0x17, 0x4881d05),
        a5 = I(a5, a6, a7, a8, Y[a0 + 0x9], 0x4, -0x262b2fc7),
        a8 = I(a8, a5, a6, a7, Y[a0 + 0xc], 0xb, -0x1924661b),
        a7 = I(a7, a8, a5, a6, Y[a0 + 0xf], 0x10, 0x1fa27cf8),
        a6 = I(a6, a7, a8, a5, Y[a0 + 0x2], 0x17, -0x3b53a99b),

        a5 = J(a5, a6, a7, a8, Y[a0], 0x6, -0xbd6ddbc),
        a8 = J(a8, a5, a6, a7, Y[a0 + 0x7], 0xa, 0x432aff97),
        a7 = J(a7, a8, a5, a6, Y[a0 + 0xe], 0xf, -0x546bdc59),
        a6 = J(a6, a7, a8, a5, Y[a0 + 0x5], 0x15, -0x36c5fc7),
        a5 = J(a5, a6, a7, a8, Y[a0 + 0xc], 0x6, 0x655b59c3),
        a8 = J(a8, a5, a6, a7, Y[a0 + 0x3], 0xa, -0x70f3336e),
        a7 = J(a7, a8, a5, a6, Y[a0 + 0xa], 0xf, -0x100b83),
        a6 = J(a6, a7, a8, a5, Y[a0 + 0x1], 0x15, -0x7a7ba22f),
        a5 = J(a5, a6, a7, a8, Y[a0 + 0x8], 0x6, 0x6fa87e4f),
        a8 = J(a8, a5, a6, a7, Y[a0 + 0xf], 0xa, -0x1d31920),
        a7 = J(a7, a8, a5, a6, Y[a0 + 0x6], 0xf, -0x5cfebcec),
        a6 = J(a6, a7, a8, a5, Y[a0 + 0xd], 0x15, 0x4e0811a1),
        a5 = J(a5, a6, a7, a8, Y[a0 + 0x4], 0x6, -0x8ac817e),
        a8 = J(a8, a5, a6, a7, Y[a0 + 0xb], 0xa, -0x42c50dcb),
        a7 = J(a7, a8, a5, a6, Y[a0 + 0x2], 0xf, 0x2ad7d2bb),
        a6 = J(a6, a7, a8, a5, Y[a0 + 0x9], 0x15, -0x14792c01),
        a5 = C(a5, a1),
        a6 = C(a6, a2),
        a7 = C(a7, a3),
        a8 = C(a8, a4);
    return [a5, a6, a7, a8];
}

function O(Y) {
    var Z, a0 = '', a1 = 0x20 * Y['length'];
    for (Z = 0x0; Z < a1; Z += 0x8)
        a0 += String['fromCharCode']((Y[Z >> 0x5] >>> (Z % 0x20)) & 0xff);
    return a0;
}

function P(Y) {
    var Z, a0 = [];
    for (Z = 0x0; Z < a0['length']; Z += 0x1)
        a0[Z] = 0x0;
    var a1 = 0x8 * Y['length'];

    for (Z = 0x0; Z < a1; Z += 0x8)
        a0[Z >> 0x5] |= ((0xff & Y['charCodeAt'](Z / 0x8)) << (Z % 0x20))
    return a0

}

function Q(Y) {
    return O(N(P(Y), 0x8 * Y['length']))
}

function R(Y) {
    var Z, a0, a1 = '0123456789abcdef', a2 = '';
    for (a0 = 0x0; a0 < Y['length']; a0 += 0x1)
        Z = Y['charCodeAt'](a0),
        a2 += a1['charAt'](((Z >>> 0x4) & 0xf)) + a1['charAt'](0xf & Z);
    return a2;
}

function T(Y){
    return Q(decodeURI(encodeURIComponent(Y)))
}

function U(Y) {
    return R(T(Y))
}

function V(Y, Z, a0) {
    // M();           // woe1 可能存在问题, M函数里边有检测环境的case分支
    return U(Y)
}

var Y = Date['parse'](new Date())
m = V(Y);
console.log(m + '|' + Y)
