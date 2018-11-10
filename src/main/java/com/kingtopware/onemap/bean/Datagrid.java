package com.kingtopware.onemap.bean;
import java.io.Serializable;
public class Datagrid implements Serializable{
    private static final long serialVersionUID = 1L;
    private String startdate;
    private String order;
    private String gendi;
    private String yuan;
    private String lindi;
    private String cao;
    private String jiaot;
    private String shuili;
    private String qita;
    private String chenzhen;
    private String xzqname;
    private String areacode;
    private String sum;

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

    public String getSum() {
        return sum;
    }

    public void setSum(String sum) {
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

    public String getGendi() {
        return gendi;
    }

    public void setGendi(String gendi) {
        this.gendi = gendi;
    }

    public String getYuan() {
        return yuan;
    }

    public void setYuan(String yuan) {
        this.yuan = yuan;
    }

    public String getLindi() {
        return lindi;
    }

    public void setLindi(String lindi) {
        this.lindi = lindi;
    }

    public String getCao() {
        return cao;
    }

    public void setCao(String cao) {
        this.cao = cao;
    }

    public String getJiaot() {
        return jiaot;
    }

    public void setJiaot(String jiaot) {
        this.jiaot = jiaot;
    }

    public String getShuili() {
        return shuili;
    }

    public void setShuili(String shuili) {
        this.shuili = shuili;
    }

    public String getQita() {
        return qita;
    }

    public void setQita(String qita) {
        this.qita = qita;
    }

    public String getChenzhen() {
        return chenzhen;
    }

    public void setChenzhen(String chenzhen) {
        this.chenzhen = chenzhen;
    }
}
