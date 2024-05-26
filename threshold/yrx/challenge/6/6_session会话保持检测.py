#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time:        2023/8/28 21:43
# @Author:      @远行人
# @targer_url:
# @Software:    PyCharm

# =============================================================================
# 【检测点】
# :session 会话保持检测

# 【fiddler抓包】
# :请求接口, 每次都会返回一个sign值

# 【思路】
# :请求时保持Session会话, 请求到第50页的时候会出现脏数据，考虑cookie获取的最大数据量达到上限，
# :在第50页获取数据之后，清除掉cookie, 重新获取sessonid即可获取正常数据
# =============================================================================
import time
import urllib3
import requests
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed

# 取消ssl警告
urllib3.disable_warnings()

_lock = threading.Lock()


def data_handle(data):
    """
    数据处理
    :param data:
    :return:
    """
    datas = [int(list(value.values())[0].replace('\r', '')) for value in data]
    result.extend(datas)


def send_request(page: int):
    """
    发送请求
    :return:
    """
    datas = {
        'page': page
    }
    # 最新版本的 requests 模块会对ssl检测的更加严格，所以需要加一个代理
    response = session.post(url=url,
                            data=datas,
                            headers=headers,
                            verify=False)
    cookies = session.cookies
    # if page == 50:
        # cookies.clear()
    print('cookie------', cookies)
    data = response.json()['data']
    print(f'第{page}页数据: ', data)
    # 处理数据
    data_handle(data)


if __name__ == "__main__":
    url = "https://www.python-spider.com/api/challenge6"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    }
    # requests.Session()对象会自动保存和处理来自服务器的Cookie，并随后发送给服务器，以维持会话状态。
    session = requests.Session()
    result = list()
    for page in range(1, 101):
        send_request(page)
    print(f'>>>当前数据是: {result}\r\n一共[{len(result)}]个据数\r\n最终结果: {sum(result)}')
    cookie = {
        'sessionid': '0q2clat1u0ctaeu1npm2cp92rmk21jbh'
    }
    answer = requests.post(url="https://www.python-spider.com/challenge/api/check", data={'id': 6, 'anw': sum(result)}, headers=headers, cookies=cookie)
    print(answer.text)

