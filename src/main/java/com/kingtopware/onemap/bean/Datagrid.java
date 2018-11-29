package com.kingtopware.onemap.bean;
import java.io.Serializable;
public class Datagrid implements Serializable{
    private static final long serialVersionUID = 1L;
    private String startdate;
    private String order;
    private double gendi;
    private double yuan;
    private double lindi;
    private double cao;
    private double jiaot;
    private double shuili;
    private double qita;
    private double chenzhen;
    private String xzqname;
    private String areacode;
    private double sum;
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
    public double getSum() {
        return this.gendi+this.lindi+this.yuan+this.cao+this.jiaot+this.shuili+this.chenzhen+this.qita;
    }
    public void setSum(double sum) {
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
    public double getGendi() {
        return gendi;
    }
    public void setGendi(double gendi) {
        this.gendi = gendi;
    }
    public double getYuan() {
        return yuan;
    }
    public void setYuan(double yuan) {
        this.yuan = yuan;
    }
    public double getLindi() {
        return lindi;
    }
    public void setLindi(double lindi) {
        this.lindi = lindi;
    }
    public double getCao() {
        return cao;
    }
    public void setCao(double cao) {
        this.cao = cao;
    }
    public double getJiaot() {
        return jiaot;
    }
    public void setJiaot(double jiaot) {
        this.jiaot = jiaot;
    }
    public double getShuili() {
        return shuili;
    }
    public void setShuili(double shuili) {
        this.shuili = shuili;
    }
    public double getQita() {
        return qita;
    }
    public void setQita(double qita) {
        this.qita = qita;
    }
    public double getChenzhen() {
        return chenzhen;
    }
    public void setChenzhen(double chenzhen) {
        this.chenzhen = chenzhen;
    }
}
