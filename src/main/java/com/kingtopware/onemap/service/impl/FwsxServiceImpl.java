
package com.kingtopware.onemap.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kingtopware.framework.service.impl.BaseServiceImpl;
import com.kingtopware.onemap.bean.DJFull;
import com.kingtopware.onemap.dao.FwsxDao;
import com.kingtopware.onemap.entity.CfEntity;
import com.kingtopware.onemap.entity.CodetblEntity;
import com.kingtopware.onemap.entity.DyEntity;
import com.kingtopware.onemap.entity.FwsxEntity;
import com.kingtopware.onemap.service.FwsxService;

@Component
public class FwsxServiceImpl extends BaseServiceImpl<FwsxEntity> implements FwsxService {
	@Resource
	public FwsxDao dao;

	@Override
	public void getBaseDao() {
		if (baseDao == null)
			baseDao = dao;
	}

	public FwsxServiceImpl() {
		tableName = "fc_fwsx";
	}

	private Map<String, String> map = null;

	public List<FwsxEntity> getByFilterlike(String where, Object object) {

		if (map == null || map.size() < 1) {
			map = new HashMap<String, String>();
			List<CodetblEntity> codetabl = getBySql("select * from fc_codetbl", CodetblEntity.class);
			for (CodetblEntity codetblEntity : codetabl) {
				map.put(codetblEntity.getCodetype().trim() + codetblEntity.getCode().trim(),
						codetblEntity.getCodename().trim());
			}
		}

		String sql = " select * from (SELECT *,   rank() OVER (PARTITION BY bdcdyh ORDER BY tssj DESC) as rank_row FROM fc_fwsx  where "
				+ where + " ) a where  a.rank_row = 1";
		List<FwsxEntity> list = getBySql(sql);
		
		// 抵押
		String sqldy = " select * from (SELECT *,   rank() OVER (PARTITION BY bdcdyh ORDER BY tssj DESC) as rank_row FROM fc_dy  where "
				+ where + " ) a where  a.rank_row = 1";
		List<DyEntity> listdy = getBySql(sqldy,DyEntity.class);
		Map<String, DyEntity> dymap = new HashMap<String, DyEntity>();
		for (DyEntity dyEntity : listdy) {
			dymap.put((dyEntity.getBdcdyh()+"").trim(), dyEntity);
		}
		
		// 查封
		String sqlcf = " select * from (SELECT *,   rank() OVER (PARTITION BY bdcdyh ORDER BY tssj DESC) as rank_row FROM fc_cf  where "
				+ where + " ) a where  a.rank_row = 1";
		List<CfEntity> listcf = getBySql(sqlcf, CfEntity.class);
		Map<String, CfEntity> cfmap = new HashMap<String, CfEntity>();
		for (CfEntity cfEntity : listcf) {
			cfmap.put((cfEntity.getBdcdyh()+"").trim(), cfEntity);
		}
		
		for (int i = 0; i < list.size(); i++) {
			String bdcdyh =(list.get(i).getBdcdyh()+"").trim();
			
			
			String jzjg = "建筑结构" + (list.get(i).getBstruct()+"").trim();
			if (map.containsKey(jzjg))
				list.get(i).setBstruct(map.get(jzjg));

			String fwyt = "房屋用途" + (list.get(i).getBuse()+"").trim();
			if (map.containsKey(fwyt))
				list.get(i).setBuse(map.get(fwyt));

			// 抵押		
			DyEntity  dy=null;
			if(dymap.containsKey(bdcdyh))
				dy = dymap.get(bdcdyh);
			
			// 查封
			CfEntity  cf=null;
			if(cfmap.containsKey(bdcdyh))
				cf = cfmap.get(bdcdyh);
			
			// 赋值
			if (dy == null ) {

				if (cf != null && "1".equals(cf.getStatus().trim())) {
					list.get(i).setRegisterType("2");
				} else {
					list.get(i).setRegisterType("0");
				}

			} else {
				if (cf != null ) {
					if (dy.getTssj().compareTo(cf.getTssj()) <= 0) {
						if ("1".equals(cf.getStatus().trim())) {
							list.get(i).setRegisterType("2");
						} else {
							list.get(i).setRegisterType("0");
						}
					} else {
						list.get(i).setRegisterType("1");
					}
				} else {
					list.get(i).setRegisterType("1");
				}
			}

		}
		return list;
	}

	public List<DJFull> getDJFull(String where, Object object) {
		List<DJFull> list=new ArrayList<DJFull>();
		
		String sqldy = " select * from  fc_dy  where "+ where ;
		List<DyEntity> listdy = getBySql(sqldy,DyEntity.class);
		
		String sqlcf = " select * from  fc_cf  where "+ where ;
		List<CfEntity> listcf = getBySql(sqlcf,CfEntity.class);
		
       for (CfEntity cfEntity : listcf) {
    	   DJFull dj=new DJFull();
    	   dj.setDjJG(cfEntity.getSealcorp());
    	   dj.setDjTime(cfEntity.getAprldate());
    	   if("1".equals((cfEntity.getStatus()+"").trim()))
    	       dj.setDjType("查封登记");
    	   if("2".equals((cfEntity.getStatus()+"").trim()))
        	   dj.setDjType("解封登记");
    	   list.add(dj);
	   }
       
       for (DyEntity dyEntity : listdy) {
    	   DJFull dj=new DJFull();
    	   dj.setDjJG(dyEntity.getDyqr()+"、"+dyEntity.getDyr());
    	   dj.setDjTime(dyEntity.getDjsj());
    	   if("1".equals((dyEntity.getIsyg()+"").trim()))
    	       dj.setDjType("抵押登记(已预告)");
    	   if("0".equals((dyEntity.getIsyg()+"").trim()))
        	   dj.setDjType("抵押登记(未预告)");
    	   list.add(dj);
	   }
		
		return list;
	}
}