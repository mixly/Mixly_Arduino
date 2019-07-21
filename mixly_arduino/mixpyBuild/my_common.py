#coding=utf-8
#
"""
my custom common module
"""
import json
import base64

# sdk账号信息
APP_ID = '10676432'
API_KEY = 'Hy1D1urUTdXzTOzqr9LeN3gc'
SECRET_KEY = 'foS4GMg2w3QZtO9XNoSQF17Kkk007xWk'


def print_json(obj):
    """json格式打印信息

    Args:
        obj 待打印的对象信息
    """
    print(json.dumps(obj, ensure_ascii=False))


def print_error(err_code, err_msg):
    """格式化打印错误信息

    Args:
        err_code: 错误码
        err_msg: 错误信息
    """
    print(u"[{0}]: {1}".format(err_code, err_msg))


def get_image_base64_content(image_file):
    """获取图片base64编码信息

    Args:
        image_file: 图片

    Returns:
        base64编码的图片信息
    """
    with open(image_file, 'rb') as fp:
        return str(base64.b64encode(fp.read()), 'utf-8')

