#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time:        2023/11/27 23:04
# @Author:      @远行人
# @targer_url:
# @Software:    PyCharm

import requests
from IpForbidden import logger
from requests.exceptions import RequestException


class IpPool:
    file = 'ip_pool.txt'

    @classmethod
    def get_proxy(cls, number=30):
        """解析代理地址"""
        logger.info(">>>请求代理IP开始")
        # url = f"http://sd.jghttp.alicloudecs.com/get_ip?num={number}&type=2&pro=&city=0&yys=0&port=11&time=6&ts=0&ys=0&cs=0&lb=1&sb=0&pb=4&mr=1&regions=&username=chukou01&spec=1"
        url = f"http://sd.jghttp.alicloudecs.com/get_ip?num={number}&type=2&pro=&city=0&yys=0&port=11&time=6&ts=0&ys=0&cs=0&lb=1&sb=0&pb=4&mr=1&regions=&username=chukou01&spec=1"
        try:
            response = requests.get(url)
            data = response.json()['data']
            try:
                if data[0]:
                    logger.info(">>>请求数据: %s", data)
                    cls.data_handler(data)
            except IndexError:
                logger.error(f">>>代理需要添加白名单!!! {response.json()}")
                raise SystemExit
        except RequestException as e:
            logger.error(">>>代理IP请求异常: %s", e)
            raise SystemExit

    @classmethod
    def data_handler(cls, data: list):
        ips = str()
        for ip in data:
            ips = ips + ip['ip'] + ':' + str(ip['port']) + '\n'
        try:
            logger.info(">>>开始写入文件")
            cls.write_txt(ips)
        except Exception as e:
            logger.error(">>>写入文件异常: %s", e)

    @staticmethod
    def write_txt(ips: str):
        """存文本"""
        with open(IpPool.file, mode='w', encoding='utf-8') as f:
            f.write(ips)
        logger.info(">>>开始写入完成")


def read_txt():
    """文件获取IP"""
    try:
        with open(IpPool.file, mode='r', encoding='utf-8') as r_file:
            lines = r_file.readlines()
        try:
            if lines and lines[0] != '\n':
                proxy = lines[0].replace('\n', '')
                # logger.info(f">>>删除取出的IP: {ip}")
                del lines[0]
                with open(IpPool.file, mode='w', encoding='utf-8') as w_file:
                    w_file.writelines(lines)
                logger.info(">>>返回ip %s", proxy)
                return proxy
            elif not lines:
                # 重新请求代理
                IpPool.get_proxy()
                return read_txt()
            else:
                pass

        except IndexError:
            logger.info(">>>没有可用的代理")
            IpPool.get_proxy()
            return read_txt()

    except Exception as e:
        logger.error(f">>>从文件读取IP异常: {e}")
