package utiltest;

import com.kingtopware.framework.bean.XzqTudi;
import com.kingtopware.framework.incetor.MethodCacheInterceptor;
import com.kingtopware.framework.util.RedisUtil;
import net.sf.json.JSONObject;
import org.apache.commons.io.FileUtils;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.ClassPathResource;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * @author dankin
 */
public class RedisUtilTest {
    @Test
    public void test() {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:spring/spring-redis.xml");
        RedisUtil redisUtil = (RedisUtil) context.getBean("redisUtil");
        MethodCacheInterceptor methodCacheInterceptor = (MethodCacheInterceptor) context.getBean("methodCacheInterceptor");
        redisUtil.set("dankin", "12345");
        Object value = redisUtil.get("dankin");
        List<XzqTudi> ls = new ArrayList<XzqTudi>();
        XzqTudi xzqTudi = new XzqTudi();
        XzqTudi xzqTudi2 = new XzqTudi();
        xzqTudi.setName("1111");
        xzqTudi2.setName("dankin");
        ls.add(xzqTudi);
        ls.add(xzqTudi2);
        redisUtil.set("infos", ls);
        Object obj2 = redisUtil.get("infos");
//        XzqTudi xzqTudi2= (XzqTudi) SerializeUtil. unserialize(values);
        System.out.println(obj2);
    }

    @Test
    public void test2() {
        String jstr="{\"XZQMJ\":{\"url\":\"http://192.168.1.63:8080/hgis/ows\",\"typename\":\"ktw:dileituban\",\"groupFields\":\"行政区\",\"statisticsFields\":[{\"operate\":\"sum\",\"field\":\"TBMJ\"}],\"clip\":\"0\"},\"BIAOGE\":{\"url\":\"http://192.168.1.63:8080/hgis/ows\",\"typename\":\"ktw:dileituban\",\"groupFields\":\"行政区\",\"statisticsFields\":[{\"operate\":\"sum\",\"field\":\"TBMJ\"}],\"clip\":\"0\",\"cql\":[\"01\",\"02\",\"03\",\"04\",\"10\",\"11\",\"12\",\"20\"]}}";
        JSONObject jsonObject = JSONObject.fromObject(jstr);
        JSONObject object= (JSONObject) jsonObject.get("BIAOGE");
        System.out.println(1);
    }

    @Test
    public void test3() {
        try {
            ClassPathResource resource = new ClassPathResource("param.json");
            File filePath = resource.getFile();
            //读取文件
            String input = FileUtils.readFileToString(filePath, "UTF-8");
            //将读取的数据转换为JSONObject
            JSONObject jsonObject = JSONObject.fromObject(input);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
