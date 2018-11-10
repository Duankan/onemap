package utiltest;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import com.kingtopware.framework.util.StatisticUtil;
import org.junit.Test;


public class StatisticUtilTest {
	@Test
	public void TestStatisticUtil(){
		List<String> list=new ArrayList<String>();
		list.add("jack");
		list.add("tom");
		list.add("jhon");
		list.add("lisa");
		//输出:[{name:"jack"},{name:"tom"},{name:"jhon"},{name:"lisa"}]
		System.out.println(StatisticUtil.getResult(list, new String[]{"name"}));
	}

	@Test
	public void TestStatisticUtil2(){
		List<TestModel> list=new ArrayList<TestModel>();
		list.add(new TestModel("1","jack"));
		list.add(new TestModel("2","tom"));
		list.add(new TestModel("3","jhon"));
		list.add(new TestModel("4","lisa"));
		//输出:[{name:TestUtil$TestModel@1d16f93d},{name:TestUtil$TestModel@67b92f0a},{name:TestUtil$TestModel@2b9627bc},{name:TestUtil$TestModel@65e2dbf3}]
		System.out.println(StatisticUtil.getResult(list, new String[]{"name"}));
	}

	@Test
	public void TestStatisticUtil3(){
		List<TestModel[]> list=new ArrayList<TestModel[]>();
		list.add(new TestModel[]{new TestModel("1","jack"),new TestModel("2","tom")});
		list.add(new TestModel[]{new TestModel("3","jhon"),new TestModel("4","lisa")});
		//输出:[{name:TestUtil$TestModel@1d16f93d,age:TestUtil$TestModel@67b92f0a},{name:TestUtil$TestModel@2b9627bc,age:TestUtil$TestModel@65e2dbf3}]
		System.out.println(StatisticUtil.getResult(list, new String[]{"name","age"}));
	}

	public class TestModel{
		public String ID;
		public TestModel(String iD, String name) {
			super();
			ID = iD;
			Name = name;
		}
		public String Name;
	}
}
