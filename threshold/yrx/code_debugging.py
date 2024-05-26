#!/usr/bin/env python
# -*- coding: utf-8 -*-
import execjs
# from execjs._exceptions import ProgramError
import requests

# jscode = """
# """
# js = execjs.compile(jscode)
# form_data = js.call('list', 1)

# respones = requests.post('https://www.python-spider.com/api/challenge14', data=form_data)
# print(respones.text)
# import subprocess
#
#
import subprocess
from logger.log import LogHandler

# 日志
logger = LogHandler('测试日志.log').logger


# def read_js_file(file, old_str=None, replace_content=None):
#     """read Javascript file."""
#     try:
#         print(file)
#         with open(str(file), mode='r', encoding='utf-8') as f:
#             js_code = f.read()
#         if old_str and replace_content:
#             js_code = js_code.replace(old_str, replace_content)
#         exec_result = subprocess.check_output(['node', '-e', js_code]).decode()
#         return exec_result
#     # except FileNotFoundError:
#     #     logger.error('>>>js文件不存在!!!')
#     except Exception as e:
#         logger.error(f'>>>异常-->{e}')


# import time
# a = time.time()
# with open('D:\PythonDevelopment\Js-reverse\yrx\code_debugging.js', mode='r', encoding='utf-8') as f:
#     js_code = f.read()
#
# print(js_code)
# js_code = read_js_file('D:\PythonDevelopment\Js-reverse\yrx\code_debugging.js')
# print(js_code)


# js = execjs.compile(js_code)
# safe = js.call('')
# print(repr(safe))
# print(time.time() - a)
#
# header = {
#     'safe': safe,
#     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
# }
# respones = requests.post('https://www.python-spider.com/api/challenge16', data={'page': 1}, headers=header)
# print(respones.text)

# from fake_useragent import UserAgent
# ua = UserAgent(browsers='chrome', os="windows")
# session = requests.session()
#
# header = {
#     'Sec-Ch-Ua-Platform': 'Windows',
#     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.36'
# }
# cookie = {
#     "asf-urs": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJmaXJzdF9uYW1lIjoiXHU4ZmRjXHU4ODRjXHU0ZWJhIiwibGFzdF9uYW1lIjoiYXByaWwgYmxvb20iLCJ1cnMtdXNlci1pZCI6ImFwcmlsYmxvb20iLCJ1cnMtYWNjZXNzLXRva2VuIjoiZXlKMGVYQWlPaUpLVjFRaUxDSnZjbWxuYVc0aU9pSkZZWEowYUdSaGRHRWdURzluYVc0aUxDSnphV2NpT2lKbFpHeHFkM1J3ZFdKclpYbGZiM0J6SWl3aVlXeG5Jam9pVWxNeU5UWWlmUS5leUowZVhCbElqb2lUMEYxZEdnaUxDSmpiR2xsYm5SZmFXUWlPaUpDVDE5dU4yNVVTV3hOYkdwa2RsVTJhMUpTUWpObklpd2laWGh3SWpveE56QTNNemd6T1RVekxDSnBZWFFpT2pFM01EUTNPVEU1TlRNc0ltbHpjeUk2SWtWaGNuUm9aR0YwWVNCTWIyZHBiaUlzSW5WcFpDSTZJbUZ3Y21sc1lteHZiMjBpZlEud252cnQ3R05ocE1iMVBlcXNJTjFSS2IxR0tROGM1Z0ZXV1RTWWowb1dyZWhDcEVUVldCbUdUanJiQ0R6MHRuMU9Ha2M5OHQ0MjZqLXVBbW1MbElPcUVJUUVoSGtiLW02bVhQNWg0Y1FacTYwd3ZqNWJyWVdDclF4T1RBNGFsWUtSTzgySWx1U2hMbVhzUzk2NFd3WmotVi1oMV9fTVVlY0N1UkM3OWZQVUVESU9JV0VERzFNTkFDZ2tuRHNUOE9VekgxdkkzZTRWZXdVbzBaR2dBUC03eG11MXJTN2k4Mk41TTBVSDhEZXZEYVRVMnZxRzFlbTFkY1FSQTZMN0ZmeTdvRHBBNUpUX19DMjhSekd1RWlfZFRwQU1fTU1YRVFBMWR4WENYNWo3WnQtSTBSSzQ3TTZhSFBIU1NxQnJhUnR1NFp4Y0t5X2pDVnFyVUFhRDRpZ3FRIiwidXJzLWdyb3VwcyI6W10sImlhdCI6MTcwNDc5MTk1NCwiZXhwIjoxNzA1Mzk2NzU0fQ.aoMB4Xr2X_ioT8kWxSlLZR6piigHVJ11T05wBl1qKup6CgWESnYvY990EIsIIVvJ63XS1o1ELi3zfRm9OOgVL9PnHxAzlzHfwtPHiKO4yb62fDoc6HU-RVMhpjC1Ssp2SyBYOdoH7V653gEY1LwT8Piu-8j7JNHIOUE7c2HKZzEDBIJyVo9SLZVsY0KGgIr-8RyySWDzntoXiaowDhRYT32VOttmTvdB6qwfQPI3OZ7SVp87B1iz3gimEHIHs8IcnhQo9G8wRLkirM0OdUdW1_-8Z7d3vePLUBG5Z-h8eGWFenGmJ9fxTu0nw6NIQ-fZSGancsSXXcA3HPYn_gzgTePF6Xgjf5DUh1qKryF72NiDRxy_jC6tnk3n2DybqZHjebTVAfrptTh_8HPhIwK5Lr9cN7SL1_W5O75OIzJfJvy4PUXXU3c2SFzuk5VYWzL-trPMfaYf9DpD1mfLknjtBHnm01GOwgCQvbj0oYe8iLOWaqTPFhyIHWVQ11OWpJi1MX2zipGwYbA8-zHy3Tf_p2DHsQQZCoHnr7RHwBzIJFfCVwqn-Aq3f1kBAzCG6Gp9TGxCsG45ro1z52zNqPmyEqcpeB1nF5u2BypSW2IsnrcCTomoAHPmHv-qP0cTcu8TJYpAykCyFo7Q7JKi7N-x2HJ_hoGH54D5ae7K56yTSEM",
#     "urs-access-token": "eyJ0eXAiOiJKV1QiLCJvcmlnaW4iOiJFYXJ0aGRhdGEgTG9naW4iLCJzaWciOiJlZGxqd3RwdWJrZXlfb3BzIiwiYWxnIjoiUlMyNTYifQ.eyJ0eXBlIjoiT0F1dGgiLCJjbGllbnRfaWQiOiJCT19uN25USWxNbGpkdlU2a1JSQjNnIiwiZXhwIjoxNzA3MzgzOTUzLCJpYXQiOjE3MDQ3OTE5NTMsImlzcyI6IkVhcnRoZGF0YSBMb2dpbiIsInVpZCI6ImFwcmlsYmxvb20ifQ.wnvrt7GNhpMb1PeqsIN1RKb1GKQ8c5gFWWTSYj0oWrehCpETVWBmGTjrbCDz0tn1OGkc98t426j-uAmmLlIOqEIQEhHkb-m6mXP5h4cQZq60wvj5brYWCrQxOTA4alYKRO82IluShLmXsS964WwZj-V-h1__MUecCuRC79fPUEDIOIWEDG1MNACgknDsT8OUzH1vI3e4VewUo0ZGgAP-7xmu1rS7i82N5M0UH8DevDaTU2vqG1em1dcQRA6L7Ffy7oDpA5JT__C28RzGuEi_dTpAM_MMXEQA1dxXCX5j7Zt-I0RK47M6aHPHSSqBraRtu4ZxcKy_jCVqrUAaD4igqQ"
# }
# proxy = {
#     'http': 'http://127.0.0.1:7890',
#     'https': 'http://127.0.0.1:7890'
# }
# url = 'https://s1qc.asf.alaska.edu/aux_poeorb/'
# session.get(url=url, headers=header, proxies=proxy)
# res = session.get(url+'S1A_OPER_AUX_POEORB_OPOD_20140822T122852_V20140731T225944_20140802T005944.EOF', headers=header, proxies=proxy, cookies=cookie)
#
# print(res.text)



# 定义要执行的 JavaScript 文件路径
js_file_path = ".\code_debugging.js"

# 使用 Node.js 执行 JavaScript 文件
# try:
#     process = subprocess.Popen(["node", js_file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#     output, error = process.communicate()
#     # 输出执行结果
#     if output:
#         print("输出：", output.decode("utf-8"))
#     if error:
#         print("错误：", error.decode("utf-8"))
# except SyntaxError:
#     print('js文件语法错误')
# except Exception as e:
#     print('js异常')



# def read_js_file(file, old_str=None, replace_content=None):
#     """read Javascript file."""
#     print(file)
#     with open(str(file), mode='r', encoding='utf-8') as f:
#         js_code = f.read()
#     print(js_code)
#     if old_str and replace_content:
#         js_code = js_code.replace(old_str, replace_content)
#     exec_result = subprocess.check_output(['node', file]).decode()
#     return exec_result



# file = '.\code_debugging.js'
# exec_result = subprocess.check_output(['node', file]).decode()
# print(exec_result)

