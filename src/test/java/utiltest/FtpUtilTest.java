package utiltest;

import org.junit.Test;

import com.kingtopware.framework.util.FtpUtil;

public class FtpUtilTest {
	/**
	 * 测试解析ftp路径(基础方法) 通过
	 */
	@Test
	public void testParsePath(){
		FtpUtil util=FtpUtil.parsePath("ftp://localhost:21/1.txt", true);
		System.out.println(util);
		
		util=FtpUtil.parsePath("ftp://localhost:21/onemap/2017/1.txt", true);
		System.out.println(util);
		
		util=FtpUtil.parsePath("ftp://ywj:123456@localhost:21/onemap/2017/1.txt", true);
		System.out.println(util);
		
		util=FtpUtil.parsePath("ftp://ywj:123456@localhost:21/1.txt", true);
		System.out.println(util);
		
		System.out.println("------------测试解析目录----------------");
		
		util=FtpUtil.parsePath("ftp://localhost:21/", false);
		System.out.println(util);
		
		util=FtpUtil.parsePath("ftp://localhost:21/onemap/2017", false);
		System.out.println(util);
		
		util=FtpUtil.parsePath("ftp://ywj:123456@localhost:21/onemap/2017", false);
		System.out.println(util);
		
		util=FtpUtil.parsePath("ftp://ywj:123456@localhost:21", false);
		System.out.println(util);
	}
	
	/**
	 * 测试文件下载 通过
	 */
	@Test
	public void testDownload(){
		FtpUtil.DownLoadFile("ftp://localhost:21/onemap/1.txt", "c:\\1.txt");
	}
	
	/**
	 * 测试文件上传 通过
	 */
	@Test
	public void testUpload(){
		FtpUtil.UploadFile("ftp://ywj:123456@localhost:21/onemap/2.txt", "c:\\1.txt");
	}
	
	/**
	 * 测试下载目录 通过
	 */
	@Test
	public void testDownloadDir(){
		FtpUtil.DownLoadDir("ftp://ywj:123456@localhost:21/onemap/", "c:/onemap");
	}
	
	/**
	 * 测试上传目录 通过
	 */
	@Test
	public void testUploadDir(){
		FtpUtil.UpLoadDir("ftp://ywj:123456@localhost:21/onemap", "F:\\test");
	}
	
	/**
	 * 测试创建目录 通过
	 */
	@Test
	public void testMakeDirs(){
		FtpUtil.MakeDirs("ftp://ywj:123456@localhost:21/onemap/1/2/3");
	}
	
	/**
	 * 测试删除文件 通过
	 */
	@Test
	public void testDeleteFile(){
		FtpUtil.DeleteFile("ftp://ywj:123456@localhost:21/onemap/2.txt");
	}
	
	/**
	 * 测试删除目录 刪除目录需要先递归删除子文件和目录
	 */
	@Test
	public void testDeleteDir(){
		//FtpUtil.DeleteDir("ftp://ywj:123456@localhost:21/onemap/test2");
		//FtpUtil.DeleteDir("ftp://ywj:123456@localhost:21/onemap");
		//注意无法直接清空根目录,下面的删除操作不会删除任何东西
		FtpUtil.DeleteDir("ftp://ywj:123456@localhost:21/");
	}
	
	/**
	 * 测试判断是否存在指定的文件 通过
	 */
	@Test
	public void testExistsFile(){
		System.out.println(FtpUtil.ExistsFile("ftp://ywj:123456@localhost:21/onemap/1.txt"));
	}
	
	/**
	 * 测试判断是否存在指定的目录 通过
	 */
	@Test
	public void testExistsDir(){
		System.out.println(FtpUtil.ExistsDir("ftp://ywj:123456@localhost:21/onemap/"));
	}
}
