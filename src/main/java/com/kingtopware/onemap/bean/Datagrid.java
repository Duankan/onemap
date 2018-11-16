package com.kingtopware.onemap.bean;
import java.io.Serializable;
public class Datagrid implements Serializable{
    private static final long serialVersionUID = 1L;
    private String startdate;
    private String order;
    private Double gendi;
    private Double yuan;
    private Double lindi;
    private Double cao;
    private Double jiaot;
    private Double shuili;
    private Double qita;
    private Double chenzhen;
    private String xzqname;
    private String areacode;
    private Double sum;

    public String getStartdate() {
        return startdate;
    }

    public void setStartdate(String startdate) {
        this.startdate = startdate;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public Double getSum() {
        return sum;
    }

    public void setSum(Double sum) {
        sum = sum;
    }

    public String getXzqname() {
        return xzqname;
    }

    public void setXzqname(String xzqname) {
        this.xzqname = xzqname;
    }

    public String getAreacode() {
        return areacode;
    }

    public void setAreacode(String areacode) {
        this.areacode = areacode;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Double getGendi() {
        return gendi;
    }

    public void setGendi(Double gendi) {
        this.gendi = gendi;
    }

    public Double getYuan() {
        return yuan;
    }

    public void setYuan(Double yuan) {
        this.yuan = yuan;
    }

    public Double getLindi() {
        return lindi;
    }

    public void setLindi(Double lindi) {
        this.lindi = lindi;
    }

    public Double getCao() {
        return cao;
    }

    public void setCao(Double cao) {
        this.cao = cao;
    }

    public Double getJiaot() {
        return jiaot;
    }

    public void setJiaot(Double jiaot) {
        this.jiaot = jiaot;
    }

    public Double getShuili() {
        return shuili;
    }

    public void setShuili(Double shuili) {
        this.shuili = shuili;
    }

    public Double getQita() {
        return qita;
    }

    public void setQita(Double qita) {
        this.qita = qita;
    }

    public Double getChenzhen() {
        return chenzhen;
    }

    public void setChenzhen(Double chenzhen) {
        this.chenzhen = chenzhen;
    }
}
