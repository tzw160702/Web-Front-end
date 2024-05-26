#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time:        2023/9/3 13:09
# @Author:      @远行人
# @targer_url:  https://match.yuanrenxue.cn/match/13
# @Software:    PyCharm

import re
import urllib3
import requests
import subprocess

# 取消ssl警告
urllib3.disable_warnings()


class DataCapture:
    URL = "https://match.yuanrenxue.cn/api/match/13"
    HEADERS = {
        "User-Agent": "yuanrenxue.project"
    }
    COOKIE = {}

    # 代理
    PROXIES = {
        'http': 'http://127.0.0.1:1997',
        'https': 'http://127.0.0.1:1997'
    }

    @staticmethod
    def cookie_request():
        """
        get请求
        :return:
        """
        response = session.get(url='https://match.yuanrenxue.cn/match/13',
                               headers=DataCapture.HEADERS,
                               verify=False,
                               proxies=DataCapture.PROXIES,
                               cookies={'sessionid': '402muthtdaw85kxuob7rrmtmsxymkjpe'})

        js_code = 'document={};location={};' + re.search('<script>(.*)</script>', response.text).group(1) + ';console.log(document.cookie)'
        result = subprocess.check_output(['node', '-e', js_code])
        _cookie = re.match('yuanrenxue_cookie=(.*);path=', result.decode()).group(1)
        print(_cookie)

        DataCapture.COOKIE = {'yuanrenxue_cookie': _cookie}


def send_request(page):
    """
    发送请求
    :return:
    """
    print('headers======================', DataCapture.HEADERS)
    print('COOKIE======================', DataCapture.COOKIE)
    params = {'page': page}
    # 最新版本的 requests 模块会对ssl检测的更加严格，所以需要加一个代理
    response = session.get(url=DataCapture.URL,
                           params=params,
                           headers=DataCapture.HEADERS,
                           verify=False,
                           cookies=DataCapture.COOKIE,
                           proxies=DataCapture.PROXIES)

    print('response-----------', response.text)
    return response


if __name__ == "__main__":
    import time
    # requests.Session()对象会自动保存和处理来自服务器的Cookie，并随后发送给服务器，以维持会话状态。
    session = requests.Session()
    DataCapture.cookie_request()
    for i in range(1, 6):
        send_request(i)
