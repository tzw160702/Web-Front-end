#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time:        2023/12/29 18:23
# @Author:      @远行人
# @targer_url:
# @Software:    PyCharm

# =============================================================================
# 【检测点】
# jsfuck混淆

# 【fiddler抓包】
# :请求接口正常

# 【思路】
# 有一段用jsfuck语法写的js逻辑，具体没什么特别简便的方法，只能打断点单步往下执行看逻辑。
# 这个jsfuck内部有很多单独的逻辑块，利用eval、Function特征好像也没什么用。只能一步一步执行，跟逻辑
# 可以先让js代码报个错，看看能不能拿到解码后的js, 报错可以拿到解码后的代码
# =============================================================================
import execjs
import requests
import threading
from logger.log import LogHandler

logger = LogHandler('jsfuck.log').logger


jscode = """
    const CryptoJS = require('crypto-js');
    k = 'wdf2ff*TG@*(F4)*YH)g430HWR(*)' + 'wse';
    t = Date.parse(new Date()) / 1000;
    m = CryptoJS.enc.Utf8.parse(k);
    a = function (word) {
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, m, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
     };
    function list(num){
        return {
            "page": String(num),
            "uc": a(t + '|' + num)
        };
    }
"""


def _execjs(page):
    """执行js代码"""
    js = execjs.compile(jscode)
    form_data = js.call('list', page)
    logger.info(f'>>>js代码请求结果---:{form_data}')
    return form_data


class DataCapture:
    URL = "https://www.python-spider.com/api/challenge14"
    HEADERS = {}
    COOKIE = {
        "sessionid": "xwzrchvocxoo9nkogalyy0tdhwrhyi72"
    }

    def __init__(self):
        self._res = list()
        self._lock = threading.Lock()

    def send_request(self, page):
        """
        发送请求
        :return:
        """
        data = _execjs(page)
        response = requests.post(url=DataCapture.URL,
                                 data=data)
        if response.status_code == 200:
            data = response.json()['data']
            logger.info(f">>>第{page}页数据---: {data}")
            self.data_handle(data)
        else:
            response.reason = '请求异常'
            logger.info(f">>>请求异常---:{response.raise_for_status()}")
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
    result = data_capture.result
    logger.info(f'>>>最终结结果---: {result}  总和---:{sum(result)}')
    if len(result) == 1000:
        url = "https://www.python-spider.com/challenge/api/check"
        data = {
            'id': 14,
            'anw': sum(result)
        }
        response = requests.post(url=url, data=data, cookies=DataCapture.COOKIE)
        logger.info(f'>>>提交结果: {response.text}')

    else:
        logger.info('>>>数据不完整！！！')

