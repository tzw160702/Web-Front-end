#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time:        2023/11/8 23:18
# @Author:      @远行人
# @targer_url:
# @Software:    PyCharm

import time
import logging
import colorlog


# 日志等级
level = logging.DEBUG


class LogHandler(object):

    def __init__(self, filename=None):
        self.logger = logging.getLogger('mylog')
        # 设置日志级别
        self.logger.setLevel(level)
        self.log_colors_config = {
            'DEBUG': 'white',
            'INFO': 'green',
            'WARNING': 'yellow',
            'ERROR': 'red',
            'CRITICAL': 'red',
        }
        formatter = colorlog.ColoredFormatter(
            '%(log_color)s%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s',
            log_colors=self.log_colors_config)
        # 往屏幕上输出
        console_handler = logging.StreamHandler()
        # 设置屏幕上显示的格式
        console_handler.setFormatter(formatter)
        # 把对象加到logger里
        self.logger.addHandler(console_handler)
        console_handler.close()

        # 输出到文件
        if filename:
            filename = time.strftime("%Y-%m-%d", time.localtime()) + ' ' + filename
            file_handler = logging.FileHandler(filename=filename, mode='a', encoding='utf8')
            file_formatter = logging.Formatter('%(asctime)s  %(filename)s[line:%(lineno)d] %(levelname)s: %(message)s')

            # 设置写入文件的格式
            file_handler.setFormatter(file_formatter)
            # 把对象加到logger里
            self.logger.addHandler(file_handler)
            file_handler.close()


