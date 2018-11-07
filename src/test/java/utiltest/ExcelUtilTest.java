package utiltest;

import java.io.FileOutputStream;
import java.util.ArrayList;

import org.junit.Test;

import com.kingtopware.framework.util.ExcelUtil;

public class ExcelUtilTest {
	/**
	 * 测试生成多表头(跨行跨列)的表格 通过,注意多表头时的传参
	 * 
	 * @throws Exception
	 */
	@Test
	public void Test2() throws Exception {
		ArrayList<Student> data = new ArrayList<ExcelUtilTest.Student>();
		Student s1 = new Student("xiaoming1", 21, "tianming1");
		Student s2 = new Student("xiaoming2", 22, "tianming2");
		Student s3 = new Student("xiaoming3", 23, "tianming3");
		data.add(s1);
		data.add(s2);
		data.add(s3);
		String filePath = "d:\\tmp\\temp.xls";

		ArrayList<String> cols = new ArrayList<String>();
		cols.add("name");
		cols.add("age");
		cols.add("addr");
		ArrayList<ArrayList<ExcelUtil.ColHeader>> col1 = new ArrayList<ArrayList<ExcelUtil.ColHeader>>();
		// 1 第一行表头
		ArrayList<ExcelUtil.ColHeader> cols2 = new ArrayList<ExcelUtil.ColHeader>();
		col1.add(cols2);
		cols2.add(new ExcelUtil.ColHeader("序号", 4, 1));
		cols2.add(new ExcelUtil.ColHeader("统计时间", 4, 1));
		cols2.add(new ExcelUtil.ColHeader("县市区", 4, 1));
		cols2.add(new ExcelUtil.ColHeader("审批合计", 1, 5));

		// 2 第二行表头
		ArrayList<ExcelUtil.ColHeader> cols3 = new ArrayList<ExcelUtil.ColHeader>();
		col1.add(cols3);
		cols3.add(new ExcelUtil.ColHeader("", 1, 1));
		cols3.add(new ExcelUtil.ColHeader("", 1, 1));
		cols3.add(new ExcelUtil.ColHeader("", 1, 1));
		cols3.add(new ExcelUtil.ColHeader("总面积", 3, 1));
		cols3.add(new ExcelUtil.ColHeader("新增建设用地", 1, 4));

		// 3 第三行表头
		ArrayList<ExcelUtil.ColHeader> cols4 = new ArrayList<ExcelUtil.ColHeader>();
		col1.add(cols4);
		cols4.add(new ExcelUtil.ColHeader("", 1, 1));
		cols4.add(new ExcelUtil.ColHeader("", 1, 1));
		cols4.add(new ExcelUtil.ColHeader("", 1, 1));
		cols4.add(new ExcelUtil.ColHeader("", 1, 1));
		cols4.add(new ExcelUtil.ColHeader("总面积", 2, 1));
		cols4.add(new ExcelUtil.ColHeader("农用地转用", 1, 2));
		cols4.add(new ExcelUtil.ColHeader("", 1, 1));
		cols4.add(new ExcelUtil.ColHeader("未利用地面积", 2, 1));

		// 4 第四行表头
		ArrayList<ExcelUtil.ColHeader> cols5 = new ArrayList<ExcelUtil.ColHeader>();
		col1.add(cols5);
		cols5.add(new ExcelUtil.ColHeader("", 1, 1));
		cols5.add(new ExcelUtil.ColHeader("", 1, 1));
		cols5.add(new ExcelUtil.ColHeader("", 1, 1));
		cols5.add(new ExcelUtil.ColHeader("", 1, 1));
		cols5.add(new ExcelUtil.ColHeader("", 1, 1));
		cols5.add(new ExcelUtil.ColHeader("总面积", 1, 1));
		cols5.add(new ExcelUtil.ColHeader("耕地面积", 1, 1));
		ExcelUtil.writeEasyComplexHeader(data, cols, col1, null, null, null, filePath);
	}

	/**
	 * 测试生成excel
	 * 
	 * @throws Throwable
	 */
	@Test
	public void Test1() throws Throwable {
		ArrayList<Student> cs = new ArrayList<ExcelUtilTest.Student>();
		Student s1 = new Student("xiaoming", 20, "tianming");
		Student s2 = new Student("xiaoming", 20, "tianming");
		Student s3 = new Student("xiaoming", 20, "tianming");
		cs.add(s1);
		cs.add(s2);
		cs.add(s3);
		FileOutputStream fs = new FileOutputStream("d:\\temp.xls");
		ArrayList<ArrayList<Student>> data = new ArrayList<ArrayList<Student>>();
		data.add(cs);

		ArrayList<ArrayList<String>> colNames = new ArrayList<ArrayList<String>>();
		ArrayList<String> cols = new ArrayList<String>();
		cols.add("name");
		cols.add("age");
		cols.add("addr");
		colNames.add(cols);
		ArrayList<ArrayList<String>> colHeaders = new ArrayList<ArrayList<String>>();
		ArrayList<String> cols2 = new ArrayList<String>();
		cols2.add("小明");
		cols2.add("年龄");
		cols2.add("地址");
		colHeaders.add(cols2);
		ArrayList<String> SheetNames = new ArrayList<String>();
		ArrayList<String> SheetTitles = new ArrayList<String>();
		ArrayList<ArrayList<Integer>> combineColIndex = new ArrayList<ArrayList<Integer>>();
		ExcelUtil.write(data, colNames, colHeaders, null, null, null, fs);

	}

	public class Student {

		public Student(String name, Integer age, String addr) {
			super();
			this.name = name;
			this.age = age;
			this.addr = addr;
		}

		private String name;
		private Integer age;
		private String addr;

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public Integer getAge() {
			return age;
		}

		public void setAge(Integer age) {
			this.age = age;
		}

		public String getAddr() {
			return addr;
		}

		public void setAddr(String addr) {
			this.addr = addr;
		}
	}

}
