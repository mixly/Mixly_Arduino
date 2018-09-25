#!/usr/bin/env python

from distutils.core import setup

setup(
    name = 'apds9960',
    packages = ['apds9960'],
    version = '0.2',
    description = 'Python APDS-9960 Library',
    author = 'Thomas Liske',
    author_email = 'thomas@fiasko-nw.net',
    url = 'https://github.com/liske/python-apds9960/',
    download_url = 'https://github.com/liske/python-apds9960/archive/0.2.tar.gz',
    keywords = 'apds9960',
    license='GPLv3+',
    long_description=open('README.md', 'r').read(),
    long_description_content_type='text/markdown',
    classifiers = [
        'License :: OSI Approved :: GNU General Public License v3 or later (GPLv3+)',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 3',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ],
)
