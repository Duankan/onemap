package utiltest;

import org.junit.Test;

import com.kingtopware.framework.util.ZipUtil;

public class ZipUtilTest {
	/**
	 * 测试压缩单个目录 测试通过
	 * 
	 * @throws Exception
	 */
	@Test
	public void testZip() throws Exception {
		String zipPath = "D:\\ZipDemo.zip";
		// File[] inFiles = new File(rootDir).listFiles();
		// makeZip(inFiles, zipPath);
		// ZipUtil.makeZip(new String[] { "E:\\jackletter\\04软件设计" }, zipPath);
		ZipUtil.makeZip(new String[] { "D:\\tmp" },
				"c:\\test2.zip");
	}

	/**
	 * 测试压缩多个目录 测试通过
	 * 
	 * @throws Exception
	 */
	@Test
	public void testZip2() throws Exception {
		String zipPath = "D:\\ZipDemo2.zip";
		// File[] inFiles = new File(rootDir).listFiles();
		// makeZip(inFiles, zipPath);
		ZipUtil.makeZip(new String[] { "E:\\jackletter\\04软件设计", "E:\\jackletter\\ETL数据导入\\手册" }, zipPath);
	}

	/**
	 * 测试压缩文件 测试通过
	 * 
	 * @throws Exception
	 */
	@Test
	public void testZipFile() throws Exception {
		String zipPath = "D:\\ZipDemoFile.zip";
		ZipUtil.makeZip(new String[] { "E:\\jackletter\\ETL数据导入\\手册\\数据规则引擎部署手册.docx",
				"E:\\jackletter\\ETL数据导入\\手册\\K-TopETL规则因子操作说明手册V2.0.doc" }, zipPath);
	}

	/**
	 * 测试压缩文件和目录 测试通过
	 * 
	 * @throws Exception
	 */
	@Test
	public void testZipFile2() throws Exception {
		String zipPath = "D:\\ZipDemoFile2.zip";
		// File[] inFiles = new File(rootDir).listFiles();
		// makeZip(inFiles, zipPath);
		ZipUtil.makeZip(
				new String[] { "E:\\jackletter\\04软件设计", "E:\\jackletter\\ETL数据导入\\手册\\K-TopETL规则因子操作说明手册V2.0.doc" },
				zipPath);
	}

	/**
	 * 测试解压缩 测试通过
	 * 
	 * @throws Exception
	 */
	@Test
	public void unZipFile() throws Exception {
		String zipPath = "D:\\ZipDemoFile.zip";
		String outPath = "D:\\Demo";
		ZipUtil.unZip(zipPath, outPath);
	}

}
