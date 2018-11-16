package com.kingtopware.onemap.listener;

import com.kingtopware.framework.util.RedisUtil;
import com.kingtopware.onemap.controller.JsydspController;
import com.kingtopware.onemap.controller.hubeiSHENGTING.NongController;
import net.sf.json.JSONObject;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.io.File;
/**
 * @author dankin
 * 容器初始化监听器，提前加载部分数据
 */
public class ContainerInitListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        try {
            ServletContext application = servletContextEvent.getServletContext();//在spring容器中拿
            ApplicationContext ac = WebApplicationContextUtils.getWebApplicationContext(application); // 获取Spring的监听器中创建的Spring容器对象
            String paramSTR=readLocalJson(application);
            JSONObject object=null;
            if(!StringUtils.isEmpty(paramSTR)){
                object=JSONObject.fromObject(paramSTR);
            }
            String key1="staticsBiao_"+object.get("BIAOGE").toString();
            String key2="getLandUseStatus_"+object.get("XZQMJ").toString();
            RedisUtil redisUtil = (RedisUtil) ac.getBean("redisUtil");
            NongController controller = (NongController) ac.getBean("nongController");
            if (!redisUtil.exists(key1)||!redisUtil.exists(key2)) {
                System.out.println("正在初始化数据......");
                controller.getLandUseStatus(object.get("XZQMJ").toString());
                controller.staticsBiao(object.get("BIAOGE").toString());
            }
            System.out.println("数据初始化完毕!!!!!!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    /**
     * 读取本地hubeiProject.json文件
     */
    public String readLocalJson(ServletContext context) {
        try {
            String dir=context.getRealPath("/config/hubeiProject/param.json");
            File file = new File(dir);
            String str= FileUtils.readFileToString(file, "UTF-8");
            return str;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
    }
}
