
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
@Table(name = "sysareacode2")
public class Sysareacode2Entity extends BaseEntity {
	private static final long serialVersionUID = 1L;

	//行政区划名称
    @Column(name = "areaname")
	private String areaname;

    //行政区级别（1-5分别代表：省、市、县、乡、村）
    @Column(name = "arealevel")
	private Integer arealevel;

    //行政区全称(比如：湖南省湘潭市湘潭县)
    @Column(name = "fullname")
	private String fullname;

    //统一行政区划代码12位
    @Id
    @GeneratedValue(generator = "uuidGen")
    @GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "areacode")
	private String areacode;

    public String getAreaname() {
		return areaname;
	}

	public void setAreaname(String areaname) {
		this.areaname = areaname;
	}

    public Integer getArealevel() {
		return arealevel;
	}

	public void setArealevel(Integer arealevel) {
		this.arealevel = arealevel;
	}

    public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

    public String getAreacode() {
		return areacode;
	}

	public void setAreacode(String areacode) {
		this.areacode = areacode;
	}

	public String getPrimaryValue() {
	    return getAreacode();
	}

	public String getPrimaryKey() {
		return "areacode";
	}
}