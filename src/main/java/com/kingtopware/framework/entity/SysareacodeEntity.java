
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
@Table(name = "sysareacode")
public class SysareacodeEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

	//统一行政区划代码12位
    @Id
    @GeneratedValue(generator = "uuidGen")
    @GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "areacode")
	private String areacode;

    //行政区全称(比如：湖南省湘潭市湘潭县)
    @Column(name = "fullname")
	private String fullname;
 
    //标识位（默认为0，为1表示当前系统在该行政区划下激活）
    @Column(name = "flag")
	private Integer flag;

    //行政区级别（1-5分别代表：省、市、县、乡、村）
    @Column(name = "arealevel")
	private Integer arealevel;

    //行政区简称（暂时只存放省份简称）
    @Column(name = "shortname")
	private String shortname;

    //行政区划名称
    @Column(name = "areaname")
	private String areaname;

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
    public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

    public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

    public Integer getArealevel() {
		return arealevel;
	}

	public void setArealevel(Integer arealevel) {
		this.arealevel = arealevel;
	}

    public String getShortname() {
		return shortname;
	}

	public void setShortname(String shortname) {
		this.shortname = shortname;
	}

    public String getAreaname() {
		return areaname;
	}

	public void setAreaname(String areaname) {
		this.areaname = areaname;
	}

}