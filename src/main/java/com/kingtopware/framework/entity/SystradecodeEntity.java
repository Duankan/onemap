package com.kingtopware.framework.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "systradecode")
public class SystradecodeEntity extends BaseEntity{
   
	private static final long serialVersionUID = 1L;
	
	//分类代码如：A0111
	@Id
	@GeneratedValue(generator = "uuidGen")
	@GenericGenerator(name = "uuidGen", strategy = "uuid")
	@Column(name="tradecode")
	private String tradecode;
	
	//分类名称如：稻谷种植
	@Column(name="tradename")
	private String tradename;
	
	//分类等级（1-门类，2-大类，3-中类，4-小类）
	@Column(name="tradelevel")
	private int tradelevel;
	
	//备注
	@Column(name="remark")
	private String remark;
	
	
	public String getPrimaryValue() {
		return getTradecode();
	}

	public String getPrimaryKey() {
		return "tradecode";
	}

	public String getTradecode() {
		return tradecode;
	}

	public void setTradecode(String tradecode) {
		this.tradecode = tradecode;
	}

	public String getTradename() {
		return tradename;
	}

	public void setTradename(String tradename) {
		this.tradename = tradename;
	}

	public int getTradelevel() {
		return tradelevel;
	}

	public void setTradelevel(int tradelevel) {
		this.tradelevel = tradelevel;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
