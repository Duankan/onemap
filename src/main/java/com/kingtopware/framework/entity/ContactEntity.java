package com.kingtopware.framework.entity;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "KTW_CONTACT")
public class ContactEntity extends BaseEntity {
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
	
	// 工作电话
	@Column(name = "TEL")
	private String tel;
	// 工作头衔
	@Column(name = "RANK")
	private String rank;
	// 家庭电话
	@Column(name = "HOMETEL")
	private String hometel;
	// 家庭住址
	@Column(name = "HOMEADDRESS")
	private String homeaddress;
	// 性别
	@Column(name = "SEX")
	private String sex;
	// 出生日期
	@Column(name = "BIRTHDAY")
	private Date birthday;
	// 政治面貌
	@Column(name = "POLITICAL")
	private String political;
	// 婚姻状况
	@Column(name = "MARITALSTATUS")
	private String maritalstatus;
	// 民族
	@Column(name = "NATION")
	private String nation;
	// 教育水平
	@Column(name = "EDUCATION")
	private String education;
	// 毕业院校
	@Column(name = "GRADUATION")
	private String graduation;
	// 毕业时间
	@Column(name = "GRADUATIONDAY")
	private Date graduationday;
	// 身份证号
	@Column(name = "CARDNO")
	private String cardno;
	// 邮政编码
	@Column(name = "POSTCODE")
	private String postcode;
	// 备注
	@Column(name = "REMARK")
	private String remark;
	// 相片
	@Column(name = "PHOTO")
	private byte[] photo;
	// 照片路径
	@Column(name = "PHOTOURI")
	private String photouri;
	// 用户编号
	@Column(name = "USERID")
	private String userid;

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getRank() {
		return rank;
	}

	public void setRank(String rank) {
		this.rank = rank;
	}

	public String getHometel() {
		return hometel;
	}

	public void setHometel(String hometel) {
		this.hometel = hometel;
	}

	public String getHomeaddress() {
		return homeaddress;
	}

	public void setHomeaddress(String homeaddress) {
		this.homeaddress = homeaddress;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getPolitical() {
		return political;
	}

	public void setPolitical(String political) {
		this.political = political;
	}

	public String getMaritalstatus() {
		return maritalstatus;
	}

	public void setMaritalstatus(String maritalstatus) {
		this.maritalstatus = maritalstatus;
	}

	public String getNation() {
		return nation;
	}

	public void setNation(String nation) {
		this.nation = nation;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public String getGraduation() {
		return graduation;
	}

	public void setGraduation(String graduation) {
		this.graduation = graduation;
	}

	public Date getGraduationday() {
		return graduationday;
	}

	public void setGraduationday(Date graduationday) {
		this.graduationday = graduationday;
	}

	public String getCardno() {
		return cardno;
	}

	public void setCardno(String cardno) {
		this.cardno = cardno;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public byte[] getPhoto() {
		return photo;
	}

	public void setPhoto(byte[] photo) {
		this.photo = photo;
	}

	public String getPhotouri() {
		return photouri;
	}

	public void setPhotouri(String photouri) {
		this.photouri = photouri;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}
}
