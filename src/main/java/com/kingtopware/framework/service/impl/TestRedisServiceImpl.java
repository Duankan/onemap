package com.kingtopware.framework.service.impl;

import com.kingtopware.framework.service.TestRedisSercive;
import org.springframework.stereotype.Service;

@Service
public class TestRedisServiceImpl implements TestRedisSercive{
    @Override
    public void say() {
        System.out.println("hello");
    }
    @Override
    public void play() {
        System.out.println("play");
    }
}
