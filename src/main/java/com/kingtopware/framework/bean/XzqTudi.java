package com.kingtopware.framework.bean;

import java.io.Serializable;

public class XzqTudi implements Serializable{
    private Double sum;
    private String name;
    public Double getSum() {
        return sum;
    }
    public void setSum(Double sum) {
        this.sum = sum;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
