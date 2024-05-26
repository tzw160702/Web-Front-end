#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
@File    :   3.py
@Time    :   2023/11/02 00:13:08
@Author  :   路未明
'''

# cookie中m对应的值，OB混淆格式化检测
# =============================================================================
# 【检测点】
# :cookie对应的js生成的m值

# 【抓包】
# :接口请求了三次，第一次返回是ob混淆的格式化检测js代码（或者说是cookie的m值生成的代码）
# :第二次请求返回正常页面，
# :第三次请求携带加密参数返回接口数据

# 【思路】
# :清理掉掉所有cookie的，然后刷新页面，查看到混淆代码
# :要清楚cookie的原理，这道题在请求接口之前本地的cookie的参数就已经生成了
# :所以我们 hook cookie, 断住之后向上查看堆栈,找 m 的值在哪里生成的
# =============================================================================
import requests
import threading
import subprocess
from logger.log import LogHandler
from concurrent.futures import ThreadPoolExecutor, as_completed


# logger = LogHandler(filename='ob混淆格式化检测.log').logger
logger = LogHandler().logger
session = requests.Session()
# 线程锁
_lock = threading.Lock()


def execute():
    try:
        m = subprocess.check_output(['node', 'ob_format_check.js']).decode().split('\n')[0]
        logger.info(f'>>>加密参数m: {m}')
        cookie['m'] = m
    except Exception as e:
        logger.error(f'>>>执行js代码错误: {e}', )


headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
}
cookie = {
    'sessionid': '0e9s941ezj5slvveovewsmetv710mfuf',
    'm': ''
}


def _requests(url, data=None):
    """
    请求
    :param url:
    :param data: 表单数据
    :return:
    """
    if data:
        resp = session.post(url, headers=headers, data=data, cookies=cookie, timeout=10)
    else:
        resp = session.get(url, headers=headers, cookies=cookie, timeout=10)
    logger.info(f">>>requests {url}")
    if resp.status_code in [521, 412, 202, 200]:
        logger.info(">>>requests Success!!!")
        return resp
    else:
        logger.info(">>>requests Fail!!!")
        return '页面记载失败！！！'


def index():
    """
    页面请求
    :return:
    """
    index_url = "https://www.python-spider.com/challenge/3"
    _requests(index_url)


def backend_api(page):
    """
    接口请求
    :param page:
    :return:
    """
    # 更新cookie的m参数
    execute()
    # 请求页面
    index()

    post_url = "https://www.python-spider.com/api/challenge3"
    form_data = {
        'page': page
    }
    response = _requests(post_url, form_data)
    logger.info(f">>>第{page}页接口数据-{response.text}")

    # 处理数据
    data_handle(response.json()['data'])


def data_handle(data):
    """
    数据处理
    :param data:
    :return:
    """
    datas = [int(list(value.values())[0].replace('\r', '')) for value in data]
    with _lock:
        result.extend(datas)


if __name__ == "__main__":
    result = list()
    with ThreadPoolExecutor(max_workers=8) as t:
        obj_list = []
        for page in range(1, 101):
            obj = t.submit(backend_api, page)
            obj_list.append(obj)

        # as_completed() 方法是一个生成器，在没有任务完成的时候，会一直阻塞，除非设置了 timeout
        as_completed(obj_list)
    logger.info(f'一共[{len(result)}]个据数, 最终结果: {sum(result)}')

    # 提交结果
    answer = _requests('https://www.python-spider.com/challenge/api/check', data={'id': 3, 'anw': sum(result)})
    print(answer.text)












