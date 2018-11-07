package com.kingtopware.framework.entity;

import java.sql.Date;
import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import com.kingtopware.framework.entity.BaseEntity;

@Entity
public class UserFullEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(generator = "uuidGen")
	@GenericGenerator(name = "uuidGen", strategy = "uuid")
	@Column(name = "ID", length = 36)
	private String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPrimaryValue() {
		return getId();
	}

	public String getPrimaryKey() {
		return "ID";
	}
	
	// 登录名
	@Column(name = "NAME")
	public String name;
	// 电子邮件
	@Column(name = "EMAIL")
	public String email;
	// 手机号码
	@Column(name = "PHONE")
	public String phone;
	// 密码
	@Column(name = "PASSWORD")
	public String password;
	// 编号
	@Column(name = "NO")
	public String no;
	// 真实姓名
	@Column(name = "TRUENAME")
	public String truename;
	// CA证书
	@Column(name = "CANO")
	public String cano;
	// 人员类别
	@Column(name = "TYPE")
	public Integer type;
	// 修改密码最后时间
	@Column(name = "PWDUPDATETIME")
	public Timestamp pwdupdatetime;
	// 用户标记
	@Column(name = "FLAG")
	public Integer flag;
	// 在线状态
	@Column(name = "ONLINESTATUS")
	public Integer onlinestatus;
	// 使用期限
	@Column(name = "USETIME")
	public Date usetime;
	// 登录IP
	@Column(name = "IP")
	public String ip;
	// 组织ID
	@Column(name = "ORGID")
	public String orgid;
	// 岗位ID
	@Column(name = "POSTID")
	public String postid;
	// 责任ID
	@Column(name = "PERMID")
	public String permid;
	// 创建日期
	@Column(name = "SYSCREATETIME")
	public Timestamp syscreatetime;
	// 创建用户
	@Column(name = "SYSCREATOR")
	public String syscreator;
	// 所属岗位
	@Column(name = "SYSTHEPOST")
	public String systhepost;
	// 所属组织
	@Column(name = "SYSTHEORG")
	public String systheorg;
	// 最后修改日期
	@Column(name = "SYSUPDATETIME")
	public Timestamp sysupdatetime;
	// 最后修改用户
	@Column(name = "SYSUPDATER")
	public String sysupdater;
	// 组织名称
	@Column(name = "ORGNAME")
	public String orgname;
	// 父组织编号
	@Column(name = "ORGPARENTID")
	public String orgparentid;
	// 头像
	@Column(name = "PHOTOURI")
	public String photouri;
}
