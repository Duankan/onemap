package com.kingtopware.onemap.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.kingtopware.framework.entity.BaseEntity;

@Entity
@Table(name = "K_FLOW")
public class K_FLOWEntity extends BaseEntity {
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
	// 父主键
		@Column(name = "PID")
		private String pid;
	
		// 排序ID
		@Column(name = "OID")
		private int oid;
	// 文本值
		@Column(name = "KVALUE")
		private String kvalue;
	// 文本值
		@Column(name = "KTEXT")
		private String ktext;
		public String getKtext() {
				return ktext;
			}

		public void setKtext(String ktext) {
			this.ktext = ktext;
		}
		// 类型：FlowType-流程类型,Flow-流程,Node-节点
		@Column(name = "KTYPE")
		private String ktype;
	// 辅助审批项ID串
		@Column(name = "APPROVES")
		private String approves;
	// 模拟审批的表单地址
		@Column(name = "SIMURL")
		private String simurl;
		public String getPid() {
			return pid;
		}

		public void setPid(String pid) {
			this.pid = pid;
		}

		public int getOid() {
			return oid;
		}

		public void setOid(int oid) {
			this.oid = oid;
		}

		public String getKvalue() {
			return kvalue;
		}

		public void setKvalue(String kvalue) {
			this.kvalue = kvalue;
		}

		public String getKtype() {
			return ktype;
		}

		public void setKtype(String ktype) {
			this.ktype = ktype;
		}

		public String getApproves() {
			return approves;
		}

		public void setApproves(String approves) {
			this.approves = approves;
		}

		public String getSimurl() {
			return simurl;
		}

		public void setSimurl(String simurl) {
			this.simurl = simurl;
		}
}
