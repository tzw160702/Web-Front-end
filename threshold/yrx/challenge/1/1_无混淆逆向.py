#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time:        2023/9/10 21:49
# @Author:      @远行人
# @targer_url:
# @Software:    PyCharm

# =============================================================================
# 【检测点】
# : 加密参数

# 【Devtools 抓包】
# :正常抓包，请求时只有一个接口

# 【思路】
# 页面没有跳转可以确定是ajax请求，核心是xmlhttprequest.send()
# 在xhr断点处查看密文(加密参数)是否已经生成，有没有产生。
# 已经生成的参数，在堆栈中向上查找，找打原始加密参数传进来的位置，然后向上找堆栈
# 入口：
# setRequestHeader: function(e, t) {
#                     return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e,
#                     a[e] = t),     // 堆栈这里值跟丢了，打上断点，进行翻页，F8跳断点直到加密参数出来为止，然后向上找堆栈
#                     this
#                 }
# =============================================================================

# 标准md5
import time
import base64
import hashlib
import requests
import threading
import subprocess

# python纯算
# 加密参数
# 10位时间戳
# timestamp = str(int(time.time()))
#
# a = '9622'
# safe = hashlib.md5(base64.b64encode((a+timestamp).encode('utf-8'))).hexdigest()


# js补环境代码
def read_js_file(file):
    with open(file, mode='r', encoding='utf-8') as f:
        js_code = f.read()
    return js_code


contents = subprocess.check_output(['node', '-e', read_js_file('./1.js')]).decode()
param = {line.split(':')[0]: line.split(':')[1] for line in contents.split('\n') if line}
print('content:', param)


class DataCapture:
    URL = "https://www.python-spider.com/api/challenge1"
    HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        # js 代码参数
        "timestamp": param['timestamp'],
        "safe": param['safe'],
        # python 代码参数
        # "timestamp": timestamp,
        # "safe": safe,
        "Origin": "https://www.python-spider.com",
        "Referer": "https://www.python-spider.com/challenge/1",
    }

    COOKIE = {
        "sessionid": "8wozvhc502itb86iserdpevjjg8feu7a;"
    }

    def __init__(self):
        self._res = list()
        self._lock = threading.Lock()

    def send_request(self, page):
        """
        发送请求
        :return:
        """
        data = {'page': page}
        response = requests.post(url=DataCapture.URL,
                                 data=data,
                                 headers=DataCapture.HEADERS,
                                 cookies=DataCapture.COOKIE)
        if response.status_code == 200:
            self.data_handle(response.json()['data'])
            print(f'第{page}页数据:  ', response.json()['data'])
        else:
            response.reason = '请求异常'
            return response.raise_for_status()

    def data_handle(self, data):
        data = [int(list(value.values())[0].replace('\r', '')) for value in data]
        with self._lock:
            self._res.extend(data)

    @property
    def result(self):
        return self._res


class DataHandleThread(threading.Thread):
    """继承Thread类，重写run方法"""
    def __init__(self, request, page):
        super().__init__()
        # 线程名称
        self._request = request
        # 页数
        self._page = page

    def run(self):
        self._request.send_request(self._page)


if __name__ == "__main__":
    data_capture = DataCapture()
    # 线程清除队列
    threads = list()

    for i in range(1, 101):
        thread = DataHandleThread(data_capture, i)
        thread.start()
        # 添加线程到线程列表用于等待线程结束
        threads.append(thread)

    # 等待所有线程完成
    for thread in threads:
        thread.join()

    print(f'最终结果：{data_capture.result} || 总和：{sum(data_capture.result)}')