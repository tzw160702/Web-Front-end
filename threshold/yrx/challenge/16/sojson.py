#!/usr/bin/env python
# -*- coding: utf-8 -*-
import execjs
import requests
import threading
from logger.log import LogHandler

# 日志
logger = LogHandler('sojson.log').logger


def read_js_file(file, old_str=None, replace_content=None):
    """read Javascript file."""
    try:
        with open(file, mode='r', encoding='utf-8') as f:
            js_code = f.read()
        if old_str and replace_content:
            js_code = js_code.replace(old_str, replace_content)
            return js_code
        return js_code
    except FileNotFoundError:
        logger.error('>>>读取js路劲文件不存在!!!')
    except Exception as e:
        logger.error(f'>>>异常-->{e}')

code = read_js_file('./sojson.js')

class DataCapture:
    URL = "https://www.python-spider.com/api/challenge16"
    HEADERS = {
        'safe': None,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
    COOKIE = {
        "sessionid": "rpzunqhm0obmdy0cwhf6vvoq96dl2vlr"
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
        js = execjs.compile(code)
        safe = js.call('token')
        logger.info(f">>>safe---:{safe}")
        self.HEADERS['safe'] = safe
        response = requests.post(url=DataCapture.URL,
                                 data=data,
                                 headers=DataCapture.HEADERS)
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
    import time
    a = time.time()
    for i in range(1, 101):
        thread = DataHandleThread(data_capture, i)
        thread.start()
        # 添加线程到线程列表用于等待线程结束
        threads.append(thread)

    # 等待所有线程完成
    for thread in threads:
        thread.join()
    result = data_capture.result
    logger.info(f'>>>最终结结果---: {result} 共:{len(result)}条数据')
    logger.info(f'>>>执行时间: {time.time() - a}')
    # if len(result) == 1000:
    #     url = "https://www.python-spider.com/challenge/api/check"
    #     data = {
    #         'id': 14,
    #         'anw': sum(result)
    #     }
    #     response = requests.post(url=url, data=data, cookies=DataCapture.COOKIE)
    #     logger.info(f'>>>提交结果: {response.text}')
    #
    # else:
    #     logger.info('>>>数据不完整！！！')