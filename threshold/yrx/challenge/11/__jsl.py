#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time:        2023/12/17 20:47
# @Author:      @远行人
# @targer_url:
# @Software:    PyCharm

# =============================================================================
# 【fiddler抓包】
# 通过抓包发现有两次请求，第一次返回js代码(刷新页面都会得到新的js代码)，第二次拿到真实的数据
# 对比两次请求的区别, 发现第二次请求拿到真实数据的cookie有一个__jsl_clearance 变化的,
# 猜测是第一次请求返回的js代码执行得到第二次请求时携带的cookie

# 【检测点】
# 补环境

# 【思路】
# 1，阅读返回的js代码看做了些什么(设置了document.cookie)，
# 3，补代码相关的环境
# =============================================================================
import re
import urllib3
import requests
import subprocess
from logger.log import LogHandler

# 日志
logger = LogHandler('_jsl.log').logger
# 会话
session = requests.session()
# 取消告警
urllib3.disable_warnings()


def read_js_file(file, old_str=None, replace_content=None):
    """read Javascript file."""
    try:
        with open(file, mode='r', encoding='utf-8') as f:
            js_code = f.read()
        if old_str and replace_content:
            js_code = js_code.replace(old_str, replace_content)
            exec_result = subprocess.check_output(['node', '-e', js_code]).decode()
            return exec_result.split('\n')[0]
    except FileNotFoundError:
        logger.error('>>>js文件不存在!!!')
    except Exception as e:
        logger.error(f'>>>异常-->{e}')


# js代码
def _requests(url, data=None, proxies=None):
    """
    请求
    :param url:
    :param data: 表单数据
    :return:
    """
    logger.info(f">>>requests url: {url}")
    if data:
        resp = session.post(url, headers=headers, data=data,
                            cookies=cookie, proxies=proxies, verify=False,
                            timeout=15)
    else:
        resp = session.get(url, headers=headers, cookies=cookie,
                           proxies=proxies, verify=False, timeout=15)
    if resp.status_code in [521, 412, 202, 200]:
        logger.info(">>>requests Success!!!")
        return resp
    else:
        logger.info(">>>requests Fail, %s", resp.status_code)
        return '页面加载失败！！！'


def update_cookie():
    """更新cookie"""
    text = _requests(url=url).text
    if 'alert' not in text:
        code = re.match('<script>(.*)</script>', text).group(1)
        logger.info(f'>>>匹配结果：{code}')
        if code:
            js_code = read_js_file('__jsl.js', 'js_code', code)
            result = js_code.split(';')[0].split('=')
            return {result[0]: result[1]}
        return dict()
    return dict()


def parse_content(html_content):
    from bs4 import BeautifulSoup
    try:
        soup = BeautifulSoup(html_content, features='lxml')
        tds = soup.find_all('td', class_="info")
        if tds:
            data = list()
            for td in tds:
                res = int(td.string.split()[0])
                data.append(res)
            return data
        return None
    except Exception as e:
        logger.error(f'>>>解析html异常-->{e}')
        return None


def run():
    update_param = update_cookie()
    if update_param:
        cookie.update(update_param)
        logger.info(f'>>>更新cookie-->{cookie}')
        content = _requests(url=url).text
        return parse_content(content)
    else:
        logger.info('>>>请先登录!')


if __name__ == "__main__":
    url = "https://www.python-spider.com/challenge/11"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://www.python-spider.com/challenge/11"
    }
    cookie = {
        'sessionid': 'xqvpgoaztcwxfc1uioxe5ntaeqhrmlpe'
    }
    result = run()
    if result:
        logger.info(f'>>>解析结果: {result}')
        url = "https://www.python-spider.com/challenge/api/check"
        data = {
            'id': 11,
            'anw': sum(result)
        }
        response = _requests(url=url, data=data)
        logger.info(f'>>>提交结果: {response.text}')
