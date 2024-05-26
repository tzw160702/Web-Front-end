#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time:        2023/12/13 2:42
# @Author:      @远行人
# @targer_url:
# @Software:    PyCharm

# ob混淆格式化检测
# 记录：浪费了很多时间，但是有所收获，下一次及得将混淆代码保存一份，防止重头再来
import requests
import subprocess


# js代码
def read_js_file(file, replace_content=None):
    with open(file, mode='r', encoding='utf-8') as f:
        js_code = f.read()
    if replace_content:
        js_code = js_code.replace('c_time', replace_content)
    result = subprocess.check_output(['node', '-e', js_code]).decode()
    result = result.split('\n')[0]
    return result


url = 'https://www.python-spider.com/challenge/api/check'
data = {
    'anw': read_js_file('ob_trends.js', replace_content='1589023846363'),
    'id': 9
}
cookie = {'sessionid': 'z65tb10oow1di8milhprdre47zaw36id'}
response = requests.post(url=url, data=data, cookies=cookie)
print(response.text)

