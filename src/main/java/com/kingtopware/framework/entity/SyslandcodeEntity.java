
package com.kingtopware.framework.entity;

import java.sql.Timestamp;
import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.kingtopware.framework.entity.BaseEntity;

@Entity
@Table(name = "syslandcode")
public class SyslandcodeEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

    // 土地利用分类名称
    @Column(name = "landname")
	private String landname;

    // 土地利用分类级别(1或2)
    @Column(name = "landlevel")
	private Integer landlevel;

    // 土地管理法的分类(1:农用地,2：建设用地,3：未利用地)
    @Column(name = "lawkind")
	private String lawkind;

    // 土地利用分类代码
    @Id
    @GeneratedValue(generator = "uuidGen")
    @GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "landcode")
	private String landcode;

    // 备注
    @Column(name = "remark")
	private String remark;

    public String getLandname() {
		return landname;
	}

	public void setLandname(String landname) {
		this.landname = landname;
	}

    public Integer getLandlevel() {
		return landlevel;
	}

	public void setLandlevel(Integer landlevel) {
		this.landlevel = landlevel;
	}

    public String getLawkind() {
		return lawkind;
	}

	public void setLawkind(String lawkind) {
		this.lawkind = lawkind;
	}

    public String getLandcode() {
		return landcode;
	}

	public void setLandcode(String landcode) {
		this.landcode = landcode;
	}

	public String getPrimaryValue() {
	    return getLandcode();
	}

	public String getPrimaryKey() {
		return "landcode";
	}
    public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}