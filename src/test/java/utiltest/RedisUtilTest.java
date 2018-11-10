package utiltest;
import com.kingtopware.framework.bean.XzqTudi;
import com.kingtopware.framework.util.RedisUtil;
import com.kingtopware.framework.util.SerializeUtil;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class RedisUtilTest {
    @Test
    public void test(){
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:spring/spring-redis.xml");
        RedisUtil redisUtil = (RedisUtil) context.getBean("redisUtil");
        redisUtil.set("dankin","12345");
        Object value = redisUtil.get("dankin");
        XzqTudi xzqTudi=new XzqTudi();
        xzqTudi.setName("1111");
        redisUtil.set("infos", SerializeUtil.serialize(xzqTudi));
        Object obj2= redisUtil.get("infos");
//        XzqTudi xzqTudi2= (XzqTudi) SerializeUtil. unserialize(values);
        System.out.println(obj2);
    }
}
