
package com.kingtopware.onemap.entity;

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
@Table(name = "bdc_zdjbxx")
public class ZdjbxxEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

    // 建筑限高
    @Column(name = "jzxg")
	private String jzxg;

    // 法人电话
    @Column(name = "frdh")
	private String frdh;

    // 产别
    @Column(name = "cb")
	private String cb;

    // 申请书号
    @Column(name = "sqsh")
	private String sqsh;

    // 权属性质
    @Column(name = "qsxz")
	private String qsxz;

    // 使用终期限
    @Column(name = "syzqx")
	private String syzqx;

    // 独用面积
    @Column(name = "dymj")
	private String dymj;

    // 审批表号
    @Column(name = "spbh")
	private String spbh;

    // 宗地四至
    @Column(name = "zdsz")
	private String zdsz;

    // 登记类别
    @Column(name = "djlb")
	private String djlb;

    // 代理人电话
    @Column(name = "dlrdh")
	private String dlrdh;

    // 价格
    @Column(name = "jg")
	private String jg;

    // 申报地价
    @Column(name = "sbdj")
	private String sbdj;

    // 代理人姓名
    @Column(name = "dlrxm")
	private String dlrxm;

    // 法人姓名
    @Column(name = "frxm")
	private String frxm;

    // 原土地证号
    @Column(name = "ytdzh")
	private String ytdzh;

    // prj_lock
    @Column(name = "prj_lock")
	private String prj_lock;

    // 经办人
    @Column(name = "jbr")
	private String jbr;

    // 项目号
    @Column(name = "xmh")
	private String xmh;

    // 坐落
    @Column(name = "zl")
	private String zl;

    // 发证机关
    @Column(name = "fzjg")
	private String fzjg;

    // 权属单位名称
    @Column(name = "qsdwmc")
	private String qsdwmc;

    // 要素代码
    @Column(name = "ysdm")
	private String ysdm;

    // 证书系列号
    @Column(name = "zsxlh")
	private String zsxlh;

    // 使用者性质
    @Column(name = "syzxz")
	private String syzxz;

    // 使用权类型
    @Column(name = "syqlx")
	private String syqlx;

    // 缺省指界人
    @Column(name = "qszjr")
	private String qszjr;

    // 权利类型
    @Column(name = "qllx")
	private String qllx;

    // 发证类别
    @Column(name = "fzlb")
	private String fzlb;

    // 等级
    @Column(name = "dj")
	private String dj;

    // 土地使用者
    @Column(name = "tdsyz")
	private String tdsyz;

    // 说明
    @Column(name = "sm")
	private String sm;

    // 东至
    @Column(name = "zdszd")
	private String zdszd;

    // 宗地等级
    @Column(name = "zddj")
	private String zddj;

    // 变更记录号
    @Column(name = "bgjlh")
	private String bgjlh;

    // 变更日期
    @Column(name = "bgrq")
	private Timestamp bgrq;

    // 历史实体数
    @Column(name = "lssts")
	private String lssts;

    // 权利人
    @Column(name = "qlr")
	private String qlr;

    // 分摊总面积
    @Column(name = "ftzmj")
	private String ftzmj;

    // 地籍号2
    @Column(name = "djh2")
	private String djh2;

    // 分摊系数
    @Column(name = "ftxs")
	private String ftxs;

    // 交易地价
    @Column(name = "jydj")
	private String jydj;

    // perimeter
    @Column(name = "perimeter")
	private String perimeter;

    // 西至
    @Column(name = "zdszx")
	private String zdszx;

    // 土地用途
    @Column(name = "tdyt")
	private String tdyt;

    // 面积单位
    @Column(name = "mjdw")
	private String mjdw;

    // 房产证号
    @Column(name = "fczh")
	private String fczh;

    // 共用面积
    @Column(name = "gymj")
	private String gymj;

    // 空间信息
    @Column(name = "geometry")
	private String geometry;

    // 批准用途
    @Column(name = "pzyt")
	private String pzyt;

    // 提交标志
    @Column(name = "tjbz")
	private Integer tjbz;

    // 标志
    @Column(name = "bz1")
	private String bz1;

    // 备注
    @Column(name = "bz")
	private String bz;

    // 状态
    @Column(name = "zt")
	private String zt;

    // 权利设定方式
    @Column(name = "qlsdfs")
	private String qlsdfs;

    // 宗地号
    @Column(name = "zdh")
	private String zdh;

    // 土地所有者
    @Column(name = "tdsyz1")
	private String tdsyz1;

    // 南至
    @Column(name = "zdszn")
	private String zdszn;

    // 法人身份证
    @Column(name = "frsfz")
	private String frsfz;

    // 实测面积
    @Column(name = "scmj")
	private String scmj;

    // 邮政编码
    @Column(name = "yzbm")
	private String yzbm;

    // 使用权面积
    @Column(name = "syqmj")
	private String syqmj;

    // 建筑面积
    @Column(name = "jzmj")
	private String jzmj;

    // 审批日期
    @Column(name = "sprq")
	private String sprq;

    // 宗地代码
    @Column(name = "zddm")
	private String zddm;

    // 出让地价
    @Column(name = "crdj")
	private String crdj;

    // 独自面积
    @Column(name = "dzmj")
	private String dzmj;

    // 土地他项权
    @Column(name = "tdtxq")
	private String tdtxq;

    // 建筑类型
    @Column(name = "jzlx")
	private String jzlx;

    // 代理人身份
    @Column(name = "dlrsf")
	private String dlrsf;

    // 产籍号
    @Column(name = "cjh")
	private String cjh;

    // 使用级别
    @Column(name = "tdjb")
	private String tdjb;

    // 宗地面积
    @Column(name = "zdmj")
	private String zdmj;

    // 正式发证日
    @Column(name = "zsfzr")
	private String zsfzr;

    // 通讯地址
    @Column(name = "txdz")
	private String txdz;

    // 查询密码
    @Column(name = "cxmm")
	private String cxmm;

    // area
    @Column(name = "area")
	private String area;

    // 土地权属来
    @Column(name = "tdqsl")
	private String tdqsl;

    // 用途
    @Column(name = "yt")
	private String yt;

    // 档案号
    @Column(name = "dah")
	private String dah;

    // 主要地类
    @Column(name = "zydl")
	private String zydl;

    // 门牌编号
    @Column(name = "mpbh")
	private String mpbh;

    // 发证面积
    @Column(name = "fzmj")
	private String fzmj;

    // 容积率
    @Column(name = "rjl")
	private String rjl;

    // 单位编号
    @Column(name = "dwbh")
	private String dwbh;

    // 不动产单元号    
    @Column(name = "bdcdyh")   
	private String bdcdyh;

    
    @Id
    @GeneratedValue(generator = "uuidGen")
    @GenericGenerator(name = "uuidGen", strategy = "uuid")
    @Column(name = "id")
    private Integer id;
    
    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
    
    public String getPrimaryValue() {
	    return getId()+"";
	}

	public String getPrimaryKey() {
		return "id";
	}
	
    
    // 土地证号
    @Column(name = "tdzh")
	private String tdzh;

    // 使用起期限
    @Column(name = "syqqx")
	private String syqqx;

    // 取得地价
    @Column(name = "qddj")
	private String qddj;

    // 主管部门
    @Column(name = "zgbm")
	private String zgbm;

    // 受理编号
    @Column(name = "slbh")
	private String slbh;

    // 地籍号
    @Column(name = "djh")
	private String djh;

    // 建筑占地面积
    @Column(name = "jzzdmj")
	private String jzzdmj;

    // 建筑密度
    @Column(name = "jzmd")
	private String jzmd;

    // 建筑权属
    @Column(name = "jzqs")
	private String jzqs;

    // 使用者
    @Column(name = "syz")
	private String syz;

    // 空洞值
    @Column(name = "kdz")
	private String kdz;

    // 发证日期
    @Column(name = "fzrq")
	private String fzrq;

    // 档案索引
    @Column(name = "dasy")
	private String dasy;

    // 标定地价
    @Column(name = "bddj")
	private String bddj;

    // 发证状态
    @Column(name = "fzzt")
	private String fzzt;

    // 北至
    @Column(name = "zdszb")
	private String zdszb;

    // 经办人意见
    @Column(name = "jbryj")
	private String jbryj;

    // 宗地特征码
    @Column(name = "zdtzm")
	private String zdtzm;

    // 建筑物限高
    @Column(name = "jzwxg")
	private String jzwxg;

    // 标识码
    @Column(name = "bsm")
	private String bsm;

    // 分摊面积
    @Column(name = "ftmj")
	private String ftmj;

    // 原土地使用
    @Column(name = "ytdsy")
	private String ytdsy;

    // 历史实体号
    @Column(name = "lssth")
	private String lssth;

    // 权利性质
    @Column(name = "qlxz")
	private String qlxz;

    // 图幅号
    @Column(name = "tfh")
	private String tfh;

    // 变更项目
    @Column(name = "bgxm")
	private String bgxm;

    public String getJzxg() {
		return jzxg;
	}

	public void setJzxg(String jzxg) {
		this.jzxg = jzxg;
	}

    public String getFrdh() {
		return frdh;
	}

	public void setFrdh(String frdh) {
		this.frdh = frdh;
	}

    public String getCb() {
		return cb;
	}

	public void setCb(String cb) {
		this.cb = cb;
	}

    public String getSqsh() {
		return sqsh;
	}

	public void setSqsh(String sqsh) {
		this.sqsh = sqsh;
	}

    public String getQsxz() {
		return qsxz;
	}

	public void setQsxz(String qsxz) {
		this.qsxz = qsxz;
	}

    public String getSyzqx() {
		return syzqx;
	}

	public void setSyzqx(String syzqx) {
		this.syzqx = syzqx;
	}

    public String getDymj() {
		return dymj;
	}

	public void setDymj(String dymj) {
		this.dymj = dymj;
	}

    public String getSpbh() {
		return spbh;
	}

	public void setSpbh(String spbh) {
		this.spbh = spbh;
	}

    public String getZdsz() {
		return zdsz;
	}

	public void setZdsz(String zdsz) {
		this.zdsz = zdsz;
	}

    public String getDjlb() {
		return djlb;
	}

	public void setDjlb(String djlb) {
		this.djlb = djlb;
	}

    public String getDlrdh() {
		return dlrdh;
	}

	public void setDlrdh(String dlrdh) {
		this.dlrdh = dlrdh;
	}

    public String getJg() {
		return jg;
	}

	public void setJg(String jg) {
		this.jg = jg;
	}

    public String getSbdj() {
		return sbdj;
	}

	public void setSbdj(String sbdj) {
		this.sbdj = sbdj;
	}

    public String getDlrxm() {
		return dlrxm;
	}

	public void setDlrxm(String dlrxm) {
		this.dlrxm = dlrxm;
	}

    public String getFrxm() {
		return frxm;
	}

	public void setFrxm(String frxm) {
		this.frxm = frxm;
	}

    public String getYtdzh() {
		return ytdzh;
	}

	public void setYtdzh(String ytdzh) {
		this.ytdzh = ytdzh;
	}

    public String getPrj_lock() {
		return prj_lock;
	}

	public void setPrj_lock(String prj_lock) {
		this.prj_lock = prj_lock;
	}

    public String getJbr() {
		return jbr;
	}

	public void setJbr(String jbr) {
		this.jbr = jbr;
	}

    public String getXmh() {
		return xmh;
	}

	public void setXmh(String xmh) {
		this.xmh = xmh;
	}

    public String getZl() {
		return zl;
	}

	public void setZl(String zl) {
		this.zl = zl;
	}

    public String getFzjg() {
		return fzjg;
	}

	public void setFzjg(String fzjg) {
		this.fzjg = fzjg;
	}

    public String getQsdwmc() {
		return qsdwmc;
	}

	public void setQsdwmc(String qsdwmc) {
		this.qsdwmc = qsdwmc;
	}

    public String getYsdm() {
		return ysdm;
	}

	public void setYsdm(String ysdm) {
		this.ysdm = ysdm;
	}

    public String getZsxlh() {
		return zsxlh;
	}

	public void setZsxlh(String zsxlh) {
		this.zsxlh = zsxlh;
	}

    public String getSyzxz() {
		return syzxz;
	}

	public void setSyzxz(String syzxz) {
		this.syzxz = syzxz;
	}

    public String getSyqlx() {
		return syqlx;
	}

	public void setSyqlx(String syqlx) {
		this.syqlx = syqlx;
	}

    public String getQszjr() {
		return qszjr;
	}

	public void setQszjr(String qszjr) {
		this.qszjr = qszjr;
	}

    public String getQllx() {
		return qllx;
	}

	public void setQllx(String qllx) {
		this.qllx = qllx;
	}

    public String getFzlb() {
		return fzlb;
	}

	public void setFzlb(String fzlb) {
		this.fzlb = fzlb;
	}

    public String getDj() {
		return dj;
	}

	public void setDj(String dj) {
		this.dj = dj;
	}

    public String getTdsyz() {
		return tdsyz;
	}

	public void setTdsyz(String tdsyz) {
		this.tdsyz = tdsyz;
	}

    public String getSm() {
		return sm;
	}

	public void setSm(String sm) {
		this.sm = sm;
	}

    public String getZdszd() {
		return zdszd;
	}

	public void setZdszd(String zdszd) {
		this.zdszd = zdszd;
	}

    public String getZddj() {
		return zddj;
	}

	public void setZddj(String zddj) {
		this.zddj = zddj;
	}

    public String getBgjlh() {
		return bgjlh;
	}

	public void setBgjlh(String bgjlh) {
		this.bgjlh = bgjlh;
	}

    public Timestamp getBgrq() {
		return bgrq;
	}

	public void setBgrq(Timestamp bgrq) {
		this.bgrq = bgrq;
	}

    public String getLssts() {
		return lssts;
	}

	public void setLssts(String lssts) {
		this.lssts = lssts;
	}

    public String getQlr() {
		return qlr;
	}

	public void setQlr(String qlr) {
		this.qlr = qlr;
	}

    public String getFtzmj() {
		return ftzmj;
	}

	public void setFtzmj(String ftzmj) {
		this.ftzmj = ftzmj;
	}

    public String getDjh2() {
		return djh2;
	}

	public void setDjh2(String djh2) {
		this.djh2 = djh2;
	}

    public String getFtxs() {
		return ftxs;
	}

	public void setFtxs(String ftxs) {
		this.ftxs = ftxs;
	}

    public String getJydj() {
		return jydj;
	}

	public void setJydj(String jydj) {
		this.jydj = jydj;
	}

    public String getPerimeter() {
		return perimeter;
	}

	public void setPerimeter(String perimeter) {
		this.perimeter = perimeter;
	}

    public String getZdszx() {
		return zdszx;
	}

	public void setZdszx(String zdszx) {
		this.zdszx = zdszx;
	}

    public String getTdyt() {
		return tdyt;
	}

	public void setTdyt(String tdyt) {
		this.tdyt = tdyt;
	}

    public String getMjdw() {
		return mjdw;
	}

	public void setMjdw(String mjdw) {
		this.mjdw = mjdw;
	}

    public String getFczh() {
		return fczh;
	}

	public void setFczh(String fczh) {
		this.fczh = fczh;
	}

    public String getGymj() {
		return gymj;
	}

	public void setGymj(String gymj) {
		this.gymj = gymj;
	}

    public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}

    public String getPzyt() {
		return pzyt;
	}

	public void setPzyt(String pzyt) {
		this.pzyt = pzyt;
	}

    public Integer getTjbz() {
		return tjbz;
	}

	public void setTjbz(Integer tjbz) {
		this.tjbz = tjbz;
	}

    public String getBz1() {
		return bz1;
	}

	public void setBz1(String bz1) {
		this.bz1 = bz1;
	}

    public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

    public String getZt() {
		return zt;
	}

	public void setZt(String zt) {
		this.zt = zt;
	}

    public String getQlsdfs() {
		return qlsdfs;
	}

	public void setQlsdfs(String qlsdfs) {
		this.qlsdfs = qlsdfs;
	}

    public String getZdh() {
		return zdh;
	}

	public void setZdh(String zdh) {
		this.zdh = zdh;
	}

    public String getTdsyz1() {
		return tdsyz1;
	}

	public void setTdsyz1(String tdsyz1) {
		this.tdsyz1 = tdsyz1;
	}

    public String getZdszn() {
		return zdszn;
	}

	public void setZdszn(String zdszn) {
		this.zdszn = zdszn;
	}

    public String getFrsfz() {
		return frsfz;
	}

	public void setFrsfz(String frsfz) {
		this.frsfz = frsfz;
	}

    public String getScmj() {
		return scmj;
	}

	public void setScmj(String scmj) {
		this.scmj = scmj;
	}

    public String getYzbm() {
		return yzbm;
	}

	public void setYzbm(String yzbm) {
		this.yzbm = yzbm;
	}

    public String getSyqmj() {
		return syqmj;
	}

	public void setSyqmj(String syqmj) {
		this.syqmj = syqmj;
	}

    public String getJzmj() {
		return jzmj;
	}

	public void setJzmj(String jzmj) {
		this.jzmj = jzmj;
	}

    public String getSprq() {
		return sprq;
	}

	public void setSprq(String sprq) {
		this.sprq = sprq;
	}

    public String getZddm() {
		return zddm;
	}

	public void setZddm(String zddm) {
		this.zddm = zddm;
	}

    public String getCrdj() {
		return crdj;
	}

	public void setCrdj(String crdj) {
		this.crdj = crdj;
	}

    public String getDzmj() {
		return dzmj;
	}

	public void setDzmj(String dzmj) {
		this.dzmj = dzmj;
	}

    public String getTdtxq() {
		return tdtxq;
	}

	public void setTdtxq(String tdtxq) {
		this.tdtxq = tdtxq;
	}

    public String getJzlx() {
		return jzlx;
	}

	public void setJzlx(String jzlx) {
		this.jzlx = jzlx;
	}

    public String getDlrsf() {
		return dlrsf;
	}

	public void setDlrsf(String dlrsf) {
		this.dlrsf = dlrsf;
	}

    public String getCjh() {
		return cjh;
	}

	public void setCjh(String cjh) {
		this.cjh = cjh;
	}

    public String getTdjb() {
		return tdjb;
	}

	public void setTdjb(String tdjb) {
		this.tdjb = tdjb;
	}

    public String getZdmj() {
		return zdmj;
	}

	public void setZdmj(String zdmj) {
		this.zdmj = zdmj;
	}

    public String getZsfzr() {
		return zsfzr;
	}

	public void setZsfzr(String zsfzr) {
		this.zsfzr = zsfzr;
	}

    public String getTxdz() {
		return txdz;
	}

	public void setTxdz(String txdz) {
		this.txdz = txdz;
	}

    public String getCxmm() {
		return cxmm;
	}

	public void setCxmm(String cxmm) {
		this.cxmm = cxmm;
	}

    public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

    public String getTdqsl() {
		return tdqsl;
	}

	public void setTdqsl(String tdqsl) {
		this.tdqsl = tdqsl;
	}

    public String getYt() {
		return yt;
	}

	public void setYt(String yt) {
		this.yt = yt;
	}

    public String getDah() {
		return dah;
	}

	public void setDah(String dah) {
		this.dah = dah;
	}

    public String getZydl() {
		return zydl;
	}

	public void setZydl(String zydl) {
		this.zydl = zydl;
	}

    public String getMpbh() {
		return mpbh;
	}

	public void setMpbh(String mpbh) {
		this.mpbh = mpbh;
	}

    public String getFzmj() {
		return fzmj;
	}

	public void setFzmj(String fzmj) {
		this.fzmj = fzmj;
	}

    public String getRjl() {
		return rjl;
	}

	public void setRjl(String rjl) {
		this.rjl = rjl;
	}

    public String getDwbh() {
		return dwbh;
	}

	public void setDwbh(String dwbh) {
		this.dwbh = dwbh;
	}

    public String getBdcdyh() {
		return bdcdyh;
	}

	public void setBdcdyh(String bdcdyh) {
		this.bdcdyh = bdcdyh;
	}

    public String getTdzh() {
		return tdzh;
	}

	public void setTdzh(String tdzh) {
		this.tdzh = tdzh;
	}

    public String getSyqqx() {
		return syqqx;
	}

	public void setSyqqx(String syqqx) {
		this.syqqx = syqqx;
	}

    public String getQddj() {
		return qddj;
	}

	public void setQddj(String qddj) {
		this.qddj = qddj;
	}

    public String getZgbm() {
		return zgbm;
	}

	public void setZgbm(String zgbm) {
		this.zgbm = zgbm;
	}

    public String getSlbh() {
		return slbh;
	}

	public void setSlbh(String slbh) {
		this.slbh = slbh;
	}

    public String getDjh() {
		return djh;
	}

	public void setDjh(String djh) {
		this.djh = djh;
	}

    public String getJzzdmj() {
		return jzzdmj;
	}

	public void setJzzdmj(String jzzdmj) {
		this.jzzdmj = jzzdmj;
	}

    public String getJzmd() {
		return jzmd;
	}

	public void setJzmd(String jzmd) {
		this.jzmd = jzmd;
	}

    public String getJzqs() {
		return jzqs;
	}

	public void setJzqs(String jzqs) {
		this.jzqs = jzqs;
	}

    public String getSyz() {
		return syz;
	}

	public void setSyz(String syz) {
		this.syz = syz;
	}

    public String getKdz() {
		return kdz;
	}

	public void setKdz(String kdz) {
		this.kdz = kdz;
	}

    public String getFzrq() {
		return fzrq;
	}

	public void setFzrq(String fzrq) {
		this.fzrq = fzrq;
	}

    public String getDasy() {
		return dasy;
	}

	public void setDasy(String dasy) {
		this.dasy = dasy;
	}

    public String getBddj() {
		return bddj;
	}

	public void setBddj(String bddj) {
		this.bddj = bddj;
	}

    public String getFzzt() {
		return fzzt;
	}

	public void setFzzt(String fzzt) {
		this.fzzt = fzzt;
	}

    public String getZdszb() {
		return zdszb;
	}

	public void setZdszb(String zdszb) {
		this.zdszb = zdszb;
	}

    public String getJbryj() {
		return jbryj;
	}

	public void setJbryj(String jbryj) {
		this.jbryj = jbryj;
	}

    public String getZdtzm() {
		return zdtzm;
	}

	public void setZdtzm(String zdtzm) {
		this.zdtzm = zdtzm;
	}

    public String getJzwxg() {
		return jzwxg;
	}

	public void setJzwxg(String jzwxg) {
		this.jzwxg = jzwxg;
	}

    public String getBsm() {
		return bsm;
	}

	public void setBsm(String bsm) {
		this.bsm = bsm;
	}

    public String getFtmj() {
		return ftmj;
	}

	public void setFtmj(String ftmj) {
		this.ftmj = ftmj;
	}

    public String getYtdsy() {
		return ytdsy;
	}

	public void setYtdsy(String ytdsy) {
		this.ytdsy = ytdsy;
	}

    public String getLssth() {
		return lssth;
	}

	public void setLssth(String lssth) {
		this.lssth = lssth;
	}

    public String getQlxz() {
		return qlxz;
	}

	public void setQlxz(String qlxz) {
		this.qlxz = qlxz;
	}

    public String getTfh() {
		return tfh;
	}

	public void setTfh(String tfh) {
		this.tfh = tfh;
	}

    public String getBgxm() {
		return bgxm;
	}

	public void setBgxm(String bgxm) {
		this.bgxm = bgxm;
	}

}