#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time:        2023/11/23 19:40
# @Author:      @远行人
# @targer_url:
# @Software:    PyCharm
import time

# ip禁用
# =============================================================================
# 【检测点】
# :翻页提示ip被封禁

# 【抓包】
# :抓包正常，数据重放正常

# 【思路】
# :请求时加代理ip
# =============================================================================
# import random
import time
import urllib3
import requests
import threading
from ip_pool import read_txt
from IpForbidden import logger
# from fake_useragent import UserAgent
from requests.exceptions import ProxyError
from urllib3.exceptions import MaxRetryError
from concurrent.futures import ThreadPoolExecutor, as_completed

# 取消ssl警告
urllib3.disable_warnings()

# ua = UserAgent()
session = requests.Session()

# 线程锁
_lock = threading.Lock()

# user_agent = [
#     'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
#     'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36',
#     'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1',
#     'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.109 Safari/537.36 CrKey/1.54.248666',
#     'Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.188 Safari/537.36 CrKey/1.54.250320',
#     'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
#     'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+',
#     'Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
#     'Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
#     'Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
#     'Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.111 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Safari/537.36',
#     'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true',
#     'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/102.0.0.0 Mobile Safari/537.36',
#     'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 550) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263',
#     'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
#     'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)',
#     'Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13',
#     'Mozilla/5.0 (Linux; Android 9; Pixel 3 Build/PQ1A.181105.017.A1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.158 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 11; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.181 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36',
#     'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36',
#     'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
#     'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
#     'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
#     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
# ]


headers = {
    # "Connection": "keep-alive",
    # "Content-Length": "6",
    # "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
    # "Accept": "application/json, text/javascript, */*; q=0.01",
    # "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    # "X-Requested-With": "XMLHttpRequest",
    # "sec-ch-ua-mobile": "?0",
    # "User-Agent": random.choice(user_agent),
    # "sec-ch-ua-platform": "\"Windows\"",
    # "Origin": "https://www.python-spider.com",
    # "Sec-Fetch-Site": "same-origin",
    # "Sec-Fetch-Mode": "cors",
    # "Sec-Fetch-Dest": "empty",
    # "Referer": "https://www.python-spider.com/challenge/4",
    # "Accept-Encoding": "gzip, deflate, br",
    # "Accept-Language": "zh-CN,zh;q=0.9",
}
cookie = {}


def _requests(url, data=None, proxies=None):
    """
    请求
    :param url:
    :param data: 表单数据
    :return:
    """
    logger.info(f">>>requests url: {url}")
    if data:
        resp = session.post(url, headers=headers, data=data, cookies=cookie, proxies=proxies, verify=False, timeout=15)
    else:
        resp = session.get(url, headers=headers, cookies=cookie, proxies=proxies, verify=False, timeout=15)
    if resp.status_code in [521, 412, 202, 200]:
        logger.info(">>>requests Success!!!")
        return resp
    else:
        logger.info(">>>requests Fail, %s", resp.status_code)
        return '页面加载失败！！！'


def data_handle(data):
    """
    数据处理
    :param data:
    :return:
    """
    datas = [int(list(value.values())[0].replace('\r', '')) for value in data]
    result.extend(datas)


def backend_api(page):
    """
    接口请求
    :param page:
    :return:
    """
    post_url = "https://www.python-spider.com/api/challenge4"
    form_data = {
        'page': page
    }
    proxy = read_txt()
    proxies = {
        # 'http': 'http://127.0.0.1:1997'
        'https': 'http://' + proxy
    }
    logger.info(f">>>代理{proxies}")
    try:
        response = _requests(post_url, form_data, proxies=proxies)
        logger.info(f">>>开始请求第{page}页接口数据-{response.json()}")
        if response.status_code == 403:
            return backend_api(page)
        # 处理数据
        data_handle(response.json()['data'])
    except MaxRetryError:
        return backend_api(page)
    except ProxyError:
        return backend_api(page)
    except Exception as e:
        logger.error(f">>>请求接口数据异常: {e}")


if __name__ == "__main__":
    result = list()
    with ThreadPoolExecutor(max_workers=8) as t:
        obj_list = []
        for page in range(1, 101):
            time.sleep(0.3)
            obj = t.submit(backend_api, page)
            obj_list.append(obj)

        # as_completed() 方法是一个生成器，在没有任务完成的时候，会一直阻塞，除非设置了 timeout
        as_completed(obj_list)
    logger.info(f'>>>当前数据是: {result}\r\n一共[{len(result)}]个据数\r\n最终结果: {sum(result)}')
    # 提交结果
    cookie['sessionid'] = "b3754rwrs4h31x6e9jbsmtaym876bakt"
    answer = _requests('https://www.python-spider.com/challenge/api/check', data={'id': 4, 'anw': sum(result)})
    print(answer.text)

