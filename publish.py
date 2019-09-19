from __future__ import with_statement
from fabric.api import *
import os

# fab run_208 publish_208  -f ./publish.py
@task
def run_208():
    env.hosts = ['192.168.199.208']
    env.user = 'sxwl1080'
    env.password = 'sx'

@task
def publish_208():
    NGNIX_PATH_208 = '/home/sxwl1080/yangxiang/nginx/html'

    local('npm run build')
    local('tar cvzf dist.tgz dist')
    with cd(NGNIX_PATH_208):
        sudo('rm -rf ./*')
        put('dist.tgz', 'dist.tgz')
        run('tar xvf dist.tgz')
        run('rm -rf dist.tgz')
    local('rm -rf publish.pyc dist.tgz')
