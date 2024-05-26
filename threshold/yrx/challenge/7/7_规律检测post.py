#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time:        2023/8/25 17:31
# @Author:      @远行人
# @targer_url:  https://www.python-spider.com/challenge/7 (host规律检测)
# @Software:    PyCharm

# =============================================================================
# 【检测点】
# :抓包请求规律

# 【fiddler抓包】
# :目标网页请求的时候，发现每次请求会多了一次请求

# 【思路】
# :抓包的时候多了一次请求，所以模拟发送请求接口之前需要先请求多出来的那次请求
# =============================================================================
# import time
# import requests
# import threading
#
#
# class DataCapture:
#     def __init__(self, pages):
#         self.url = "https://www.python-spider.com/api/challenge7"
#         self.headers = {
#             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
#         }
#         # 采集页数
#         self.pages = pages
#         self._lock = threading.Lock()
#         # 保存结果
#         self._res = list()
#         self._lock = threading.Lock()
#
#     def send_request(self, page):
#         """
#         发送请求
#         :return:
#         """
#         data = {'page': page}
#         # =====================================================================
#         requests.post(url='https://www.python-spider.com/cityjson')
#         response = requests.post(url=self.url,
#                                 data=data,
#                                 headers=self.headers)
#         # =====================================================================
#         if response.status_code == 200:
#             data = response.json()['data']
#             print(f'第{page}页数据:  ', data)
#             self.data_handle(data)
#         else:
#             if response.status_code == 403:
#                 return self.send_request(page)
#             else:
#                 response.reason = '请求异常'
#                 return response.raise_for_status()
#
#     def data_handle(self, data):
#         data = [int(list(value.values())[0].replace('\r', '')) for value in data]
#         with self._lock:
#             self._res.extend(data)
#
#     @property
#     def result(self):
#         return self._res
#
#
# class DataHandleThread(threading.Thread):
#     """继承Thread类，重写run方法"""
#     def __init__(self, request, page):
#         super().__init__()
#         # 线程名称
#         self._request = request
#         # 页数
#         self._page = page
#
#     def run(self):
#         self._request.send_request(self._page)
#
#
# if __name__ == "__main__":
#     import time
#     ctime = time.time()
#     data_capture = DataCapture(100)
#     # 线程清除队列
#     threads = list()
#
#     for i in range(1, 101):
#         thread = DataHandleThread(data_capture, i)
#         thread.start()
#         # 添加线程到线程列表用于等待线程结束
#         threads.append(thread)
#
#     # 等待所有线程完成
#     for thread in threads:
#         thread.join()
#     result = data_capture.result
#     print(f'>>>当前数据是: {result}\r\n一共[{len(result)}]个据数\r\n最终结果: {sum(result)}')
#     print(f'耗时：{time.time() - ctime}')


import time
import requests
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed


class DataCapture:
    def __init__(self):
        self.url = "https://www.python-spider.com/api/challenge7"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
        }
        self.pages = 100

        self._lock = threading.Lock()
        # 保存结果
        self._res = list()

    def send_data(self, page):
        """
        发送请求
        :page : 页码
        :return:
        """
        datas = {'page': page}
        requests.post(url='https://www.python-spider.com/cityjson')
        response = requests.post(url=self.url,
                                 data=datas,
                                 headers=self.headers)
        if response.status_code == 200:
            data = response.json()['data']
            print(f'第{page}页数据:  ', data)
            self.parse_data(data)
        else:
            if response.status_code == 403:
                return self.send_data(page)
            else:
                response.reason = '请求异常'
                return response.raise_for_status()

    def parse_data(self, data):
        """处理请求数据"""
        data = [int(list(value.values())[0].replace('\r', '')) for value in data]
        self._res.extend(data)

    @property
    def result(self):
        return self._res


if __name__ == '__main__':
    ctime = time.time()
    data_capture = DataCapture()
    with ThreadPoolExecutor(max_workers=9) as t:
        obj_list = []
        for page in range(1, 101):
            # time.sleep(0.2)
            obj = t.submit(data_capture.send_data, page)
            obj_list.append(obj)

        # as_completed() 方法是一个生成器，在没有任务完成的时候，会一直阻塞，除非设置了 timeout
        as_completed(obj_list, timeout=20)
    result = data_capture.result
    print(f'>>>当前数据是: {result}\r\n一共[{len(result)}]个据数\r\n最终结果: {sum(result)}')
    print(f'耗时：{time.time() - ctime}')
    cookie = {
        'sessionid': 'vccuuba7grkn59q326v924bnzgv69xu5'
    }
    answer = requests.post(
        url="https://www.python-spider.com/challenge/api/check",
        data={'id': 7, 'anw': sum(result)}, cookies=cookie)
    print(answer.text)
