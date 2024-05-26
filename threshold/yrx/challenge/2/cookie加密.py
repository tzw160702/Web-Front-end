#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time:        2023/10/20 21:09
# @Author:      @远行人
# @targer_url:
# @Software:    PyCharm

# cookie中sign对应的值，OB混淆
# =============================================================================
# 【检测点】
# :cookie对应的js生成的sign值

# 【抓包】
# :接口请求了两次，第一次是混淆的js代码（或者说是cookie的sign值生成的代码）

# 【思路】
# :清理掉掉所有cookie的，然后刷新页面，查看到混淆代码
# :要清楚cookie的原理，这道题在请求接口之前本地的cookie就已经生成了
# :所以我们 hook cookie, 断住之后查看堆栈sign的值在哪里生成的
# =============================================================================
import re
import requests
import subprocess
from lxml import etree


session = requests.Session()
sign = subprocess.check_output(['node', 'ob.js']).decode().split('\n')[0]
print(sign)
cookies = {
    'sessionid': '1rxj05xez36c1e8iztxtjrlccptwo5ck',
    'sign': sign
}
response = session.get('https://www.python-spider.com/challenge/2', cookies=cookies)
html = etree.HTML(response.text)
text = html.xpath('/html/body/h1/text()')[0]
timestamp = re.search(r'[\s]*([\d]+)[\s]*', text).group()

with open('ob.js', encoding='utf-8') as f:
    js_code = f.read().replace('_time', timestamp)
    # js_code = f.read().replace('_time', '1587102734000')

_sign = subprocess.check_output(['node', '-e', js_code]).decode().split('\n')[1]
cookies['sign'] = _sign
print(_sign)

res = session.post('https://www.python-spider.com/challenge/api/check', cookies=cookies, data={'anw': _sign, 'id': 2})
print(res.text)