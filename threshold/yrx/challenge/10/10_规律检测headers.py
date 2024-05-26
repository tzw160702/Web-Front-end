#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time:        2023/8/28 14:49
# @Author:      @远行人
# @targer_url:
# @Software:    PyCharm

# =============================================================================
# 【检测点】
# :1.headers检测, 用重放功能把没用的检测都删掉
# :2.headers参数顺序检测，需要固定请求头的顺序  *****

# 【fiddler抓包】
# :请求接口正常

# 【思路】
# :request模拟请求的时候返回的js代码，不是接口返回的数据，不要误以为是加密代码，先看看当前页面有没有这个js代码，排除这个可能性
# :没有这个js代码，可能是其它地方生成的，考虑可能有headers检测
# :用删减后的检测去请求，发现还是返回的js代码，在fiddler中对比正常的请求头，发现顺序问题，
# :百度后了解request请求默认情况下，会更改定好的header参数顺序
# =============================================================================

import urllib3
import requests
import threading

# 取消ssl警告
urllib3.disable_warnings()


class DataCapture:
    URL = "https://www.python-spider.com/api/challenge10"
    HEADERS = {
        "Content-Length": "6",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        "Referer": "https://www.python-spider.com/challenge/10",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
    }

    # 请求头里边的cookie单独放出来，更稳定一些，requests源码也是这样单独放出来
    COOKIES = {
        'sessionid': '0q2clat1u0ctaeu1npm2cp92rmk21jbh;'
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
        response = session.post(url=DataCapture.URL,
                                data=data,
                                headers=DataCapture.HEADERS,
                                verify=False,
                                cookies=DataCapture.COOKIES)
        if response.status_code == 200:
            data = response.json()['data']
            print(f'第{page}页数据: ', data)
            self.data_handle(data)
        else:
            response.reason = '请求异常!!!'
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
    # =========================================================================
    session = requests.Session()
    # 先建立session会话，然后session clear，clear这个是比较关键的写法。
    session.headers.clear()
    # 更新cookie
    session.headers.update(DataCapture.COOKIES)
    # =========================================================================

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
    result = data_capture.result
    print(f'>>>当前数据是: {result}\r\n一共[{len(result)}]个据数\r\n最终结果: {sum(result)}')
    cookie = {
        'sessionid': '0q2clat1u0ctaeu1npm2cp92rmk21jbh'
    }
    answer = requests.post(
        url="https://www.python-spider.com/challenge/api/check",
        data={'id': 10, 'anw': sum(result)}, cookies=cookie)
    print(answer.text)