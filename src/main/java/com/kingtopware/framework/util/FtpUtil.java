package com.kingtopware.framework.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.apache.log4j.Logger;

/**
 * FTP工具类
 * 
 * @author 胡庆杰
 */
public class FtpUtil {
	private static Logger logger = Logger.getLogger(FtpUtil.class);
	// 操作ftp对象
	private FTPClient ftpClient = null;
	// 记录服务器ip地址
	private String server;
	// 记录服务器ftp端口
	private int port;
	// 记录登陆用户名
	private String userName;
	// 记录登陆密码
	private String pwd;
	// 记录目录路径(如:[/onemap/2017])
	public String dirpath;
	// 记录文件名字(如:[1.txt])
	public String filename;

	public FtpUtil(String server, int port, String userName, String pwd) {
		this.server = server;
		this.port = port;
		this.userName = userName;
		this.pwd = pwd;
	}

	public FtpUtil(String server, int port) {
		this.server = server;
		this.port = port;
	}

	public FtpUtil(String server) {
		this.server = server;
		this.port = 21;
	}

	/**
	 * 连接服务器
	 * 
	 * @return 连接成功与否 true:成功， false:失败
	 */
	public boolean open() {
		if (ftpClient != null && ftpClient.isConnected()) {
			return true;
		}
		try {
			ftpClient = new FTPClient();
			// 连接
			ftpClient.connect(this.server, this.port);
			if (this.userName != null) {
				ftpClient.login(this.userName, this.pwd);
			}
			setFtpClient(ftpClient);
			// 检测连接是否成功
			int reply = ftpClient.getReplyCode();
			if (!FTPReply.isPositiveCompletion(reply)) {
				this.close();
				return false;
			}
			ftpClient.setFileType(FTP.BINARY_FILE_TYPE); // 设置上传模式.binally or ascii
			return true;
		} catch (Exception e) {
			this.close();
			logger.error("连接失败(ftp://" + this.userName + ":" + this.pwd + "@" + this.server + ":" + this.port + ")："
					+ e.getMessage(), e);
			return false;
		}
	}

	public static FtpUtil parsePath(String path, Boolean isfile) {
		if (path == null || path.equals("")) {
			logger.error("ftp路径不能为空");
			throw new RuntimeException("ftp路径不能为空!");
		}
		path = path.replace("\\", "/").toLowerCase();
		if (!path.startsWith("ftp://")) {
			logger.error("ftp路径必须以ftp://开头!");
			throw new RuntimeException("ftp路径必须以ftp://开头!");
		}
		path = path.substring(6);
		String userinfo = "";
		Boolean hasuser = false;
		if (path.contains("@")) {
			// 有用户名和密码
			hasuser = true;
//			userinfo = path.split("@")[0];
//			path = path.split("@")[1];
			userinfo=path.substring(0,path.lastIndexOf("@"));
			path=path.substring(path.lastIndexOf("@")+1,path.length());
		}
		// 没有用户名和密码
		if (path.indexOf("/") == -1) {
			path += "/";
		}
		String temp = "";
		temp = path.substring(path.indexOf("/"));
		path = path.substring(0, path.indexOf("/"));
		int port = 21;
		if (path.contains(":")) {
			// 有端口号
			port = Integer.parseInt(path.split(":")[1]);
		}
		String server = path.split(":")[0];
		FtpUtil util = new FtpUtil(server, port);
		if (!isfile) {
			// 解析的是目录
			if (temp.charAt(temp.length() - 1) != '/') {
				temp += "/";
			}
			util.setDirpath(temp);
		} else {
			// 解析的是文件
			if (temp.lastIndexOf("/") == temp.indexOf("/")) {
				// 处理 ftp://localhost:21/1.txt
				util.setDirpath("/");
				util.setFilename(temp.substring(temp.lastIndexOf("/") + 1));
			} else {
				// 处理一般情况
				util.setDirpath(temp.substring(0, temp.lastIndexOf("/") + 1));
				util.setFilename(temp.substring(temp.lastIndexOf("/") + 1));
			}
		}
		if (hasuser) {
			// 有用户名和密码
			String user = userinfo.split(":")[0];
			String pwd = userinfo.split(":")[1];
			util.userName = user;
			util.pwd = pwd;
		}
		return util;
	}

	/**
	 * 将ftp上的文件下载到本地
	 * 
	 * @param ftpfilepath
	 *            ftp文件的路径,例如[ftp://administrator:123456@localhost:21/onemap/2017/1.txt]
	 * @param localFilePath,本地文件路径,例如[c:\\1.txt]
	 */
	public static boolean DownLoadFile(String ftpfilepath, String localFilePath) {
		logger.info("将要下载文件:" + ftpfilepath + " 到:" + localFilePath);
		FtpUtil util = FtpUtil.parsePath(ftpfilepath, true);
		Boolean b = util.open();
		if(!b) {
			logger.info("打开连接失败:"+ftpfilepath);
		}
		// 使用根目录"/"作为当前工作目录
		boolean flag = util.download(util.dirpath + util.filename, localFilePath);
		logger.info("下载结果:" + flag + ",下载文件:" + ftpfilepath + " 到:" + localFilePath);
		util.close();
		return flag;
	}

	/**
	 * 将本地文件上传到ftp
	 * 
	 * @param ftpfilepath
	 *            ftp文件的路径,例如[ftp://administrator:123456@localhost:21/onemap/2017/1.txt]
	 * @param localFilePath,本地文件路径,例如[c:\\1.txt]
	 */
	public static void UploadFile(String ftpfilepath, String localFilePath) {
		logger.info("将要上传文件:" + localFilePath + " 到:" + ftpfilepath);
		FtpUtil util = FtpUtil.parsePath(ftpfilepath, true);
		util.open();
		// 使用根目录"/"作为当前工作目录
		boolean flag = util.upload(localFilePath, util.filename, util.dirpath);
		logger.info("上传结果:" + flag + ",上传文件:" + localFilePath + " 到:" + ftpfilepath);
		util.close();
	}

	/**
	 * 确保ftp上存在指定的目录
	 * 
	 * @param ftpdirpath
	 *            例如[ftp://administrator:123456@localhost:21/onemap/2017]
	 */
	public static void MakeDirs(String ftpdirpath) {
		logger.info("将要创建目录:" + ftpdirpath);
		FtpUtil util = FtpUtil.parsePath(ftpdirpath, false);
		util.open();
		boolean flag = util.mkDir(util.dirpath);
		logger.info("创建目录结果:" + flag + ",目录:" + ftpdirpath);
		util.close();
	}

	/**
	 * 删除ftp上的文件
	 * 
	 * @param ftpfilepath
	 *            例如[ftp://administrator:123456@localhost:21/onemap/2017/1.txt]
	 */
	public static void DeleteFile(String ftpfilepath) {
		logger.info("将要删除文件:" + ftpfilepath);
		FtpUtil util = FtpUtil.parsePath(ftpfilepath, true);
		util.open();
		boolean flag = util.deleteFile(util.dirpath + util.filename);
		logger.info("删除文件结果:" + flag + ",文件：" + ftpfilepath);
		util.close();
	}

	/**
	 * 刪除ftp上的目录
	 * 
	 * @param ftpdirpath
	 *            例如[ftp://administrator:123456@localhost:21/onemap/2017]
	 */
	public static void DeleteDir(String ftpdirpath) {
		logger.info("将要删除目录:" + ftpdirpath);
		FtpUtil util = FtpUtil.parsePath(ftpdirpath, false);
		util.open();
		// 因为需要递归所以先把util的实例设置在要删除的目录下
		try {
			util.getFtpClient().changeWorkingDirectory(util.dirpath);
			util.getFtpClient().changeToParentDirectory();
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
			return;
		}
		if (util.dirpath.startsWith("/")) {
			util.dirpath = util.dirpath.substring(1);
		}
		if (util.dirpath.endsWith("/")) {
			util.dirpath = util.dirpath.substring(0, util.dirpath.length() - 1);
		}
		boolean flag = util.deleteDirectory(util.dirpath.split("/")[util.dirpath.split("/").length - 1]);
		logger.info("删除目录结果:" + flag + ",文件：" + ftpdirpath);
		util.close();
	}

	/**
	 * 将ftp上指定的目录下载到本地
	 * 
	 * @param ftpdirpath
	 *            例如[ftp://administrator:123456@localhost:21/onemap/2017]
	 * @param localdirpath
	 *            例如[c:\\2017]
	 */
	public static void DownLoadDir(String ftpdirpath, String localdirpath) {
		logger.info("将要下载目录:" + ftpdirpath + " 到：" + localdirpath);
		FtpUtil util = FtpUtil.parsePath(ftpdirpath, false);
		util.open();
		try {
			util.getFtpClient().changeWorkingDirectory(util.dirpath);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
			return;
		}
		boolean flag = util.downloadDir(util.dirpath, localdirpath);
		logger.info("下载目录结果:" + flag + ",目录：" + ftpdirpath + " 到:" + localdirpath);
		util.close();
	}

	/**
	 * 将本地目录上传到ftp上
	 * 
	 * @param ftpdirpath
	 *            例如[ftp://administrator:123456@localhost:21/onemap/2017]
	 * @param localdirpath
	 *            例如[c:\\2017]
	 */
	public static void UpLoadDir(String ftpdirpath, String localdirpath) {
		logger.info("将要上传目录:" + localdirpath + " 到：" + ftpdirpath);
		FtpUtil util = FtpUtil.parsePath(ftpdirpath, false);
		util.open();
		try {
			util.getFtpClient().changeWorkingDirectory(util.dirpath);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
			return;
		}
		boolean flag = util.uploadDir(localdirpath, util.dirpath);
		logger.info("上传目录结果:" + flag + ",目录：" + localdirpath + " 到:" + ftpdirpath);
		util.close();
	}

	/**
	 * 判断ftp上是否存在指定的文件
	 * 
	 * @param ftpfilepath
	 * @return
	 */
	public static boolean ExistsFile(String ftpfilepath) {
		FtpUtil util = FtpUtil.parsePath(ftpfilepath, true);
		util.open();
		if (util.cd(util.dirpath)) {
			boolean flag = util.existFile(util.filename);
			util.close();
			return flag;
		} else {
			util.close();
			return false;
		}

	}

	/**
	 * 判断ftp上是否存在指定的目录
	 */
	public static Boolean ExistsDir(String ftpdirpath) {
		FtpUtil util = FtpUtil.parsePath(ftpdirpath, false);
		util.open();
		boolean flag = util.cd(util.dirpath);
		util.close();
		return flag;
	}

	/**
	 * 切换到父目录
	 * 
	 * @return 切换结果 true：成功， false：失败
	 */
	private boolean changeToParentDir() {
		try {
			return ftpClient.changeToParentDirectory();
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
			return false;
		}
	}

	/**
	 * 改变当前目录到指定目录
	 * 
	 * @param dir
	 *            目的目录
	 * @return 切换结果 true：成功，false：失败
	 */
	private boolean cd(String dir) {
		try {
			return ftpClient.changeWorkingDirectory(dir);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
			return false;
		}
	}

	/**
	 * 判断是否存在指定文件名的文件
	 * 
	 * @param filename
	 * @return
	 */
	public boolean existFile(String filename) {
		try {
			FTPFile[] files = ftpClient.listFiles();
			for (int i = 0; i < files.length; i++) {
				if (files[i].getName().equals(filename)) {
					return true;
				}
			}
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
			return false;
		}
		return false;
	}

	/**
	 * 获取目录下所有的文件名称
	 * 
	 * @param filePath
	 *            指定的目录
	 * @return 文件列表,或者null
	 */
	private FTPFile[] getFileList(String filePath) {
		try {
			return ftpClient.listFiles(filePath);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
			return null;
		}
	}

	/**
	 * 层层切换工作目录
	 * 
	 * @param ftpPath
	 *            目的目录
	 * @return 切换结果
	 */
	public boolean changeDir(String ftpPath) {
		if (!ftpClient.isConnected()) {
			return false;
		}
		try {
			// 将路径中的斜杠统一
			char[] chars = ftpPath.toCharArray();
			StringBuffer sbStr = new StringBuffer(256);
			for (int i = 0; i < chars.length; i++) {
				if ('\\' == chars[i]) {
					sbStr.append('/');
				} else {
					sbStr.append(chars[i]);
				}
			}
			ftpPath = sbStr.toString();
			if (ftpPath.indexOf('/') == -1) {
				// 只有一层目录
				ftpClient.changeWorkingDirectory(new String(ftpPath.getBytes(), "iso-8859-1"));
			} else {
				// 多层目录循环创建
				String[] paths = ftpPath.split("/");
				for (int i = 0; i < paths.length; i++) {
					ftpClient.changeWorkingDirectory(new String(paths[i].getBytes(), "iso-8859-1"));
				}
			}
			return true;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return false;
		}
	}

	/**
	 * 循环创建目录并保留当前目录
	 * 
	 * @param ftpPath
	 *            需要创建的目录
	 * @return
	 */
	public boolean mkDir(String ftpPath) {
		if (!ftpClient.isConnected()) {
			return false;
		}

		try {
			String curr = "/";
			String[] rt = ftpClient.doCommandAsStrings("pwd", "");
			Pattern p = Pattern.compile("\"(.*?)\"");
			Matcher m = p.matcher(rt[0]);
			if (m.find()) {
				curr = m.group(0).replace("\"", "");
			}
			// 将路径中的斜杠统一
			char[] chars = ftpPath.toCharArray();
			StringBuffer sbStr = new StringBuffer(256);
			for (int i = 0; i < chars.length; i++) {
				if ('\\' == chars[i]) {
					sbStr.append('/');
				} else {
					sbStr.append(chars[i]);
				}
			}
			ftpPath = sbStr.toString();
			System.out.println("ftpPath:" + ftpPath);
			if (ftpPath.indexOf('/') == -1) {
				// 只有一层目录
				ftpClient.makeDirectory(new String(ftpPath.getBytes(), "iso-8859-1"));
				ftpClient.changeWorkingDirectory(new String(ftpPath.getBytes(), "iso-8859-1"));
			} else {
				// 多层目录循环创建
				String[] paths = ftpPath.split("/");
				for (int i = 0; i < paths.length; i++) {
					ftpClient.makeDirectory(new String(paths[i].getBytes(), "iso-8859-1"));
					ftpClient.changeWorkingDirectory(new String(paths[i].getBytes(), "iso-8859-1"));
				}
			}
			ftpClient.changeWorkingDirectory(curr);
			return true;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return false;
		}
	}

	/**
	 * 上传文件到FTP服务器并保留当前目录
	 * 
	 * @param localDirectoryAndFileName
	 *            本地文件目录和文件名
	 * @param ftpFileName
	 *            上传到服务器的文件名
	 * @param ftpDirectory
	 *            FTP目录如:/path1/pathb2/,如果目录不存在会自动创建目录
	 * @return
	 */
	public boolean upload(String localDirectoryAndFileName, String ftpFileName, String ftpDirectory) {
		if (!ftpClient.isConnected()) {
			return false;
		}
		boolean flag = false;
		if (ftpClient != null) {
			File srcFile = new File(localDirectoryAndFileName);
			FileInputStream fis = null;
			try {
				fis = new FileInputStream(srcFile);
				// 创建目录
				// 首先记录上传之前的工作目录
				String curr = "/";
				String[] rt = ftpClient.doCommandAsStrings("pwd", "");
				Pattern p = Pattern.compile("\"(.*?)\"");
				Matcher m = p.matcher(rt[0]);
				if (m.find()) {
					curr = m.group(0).replace("\"", "");
				}
				// 先将目录转移到根目录
				this.getFtpClient().changeWorkingDirectory("/");
				this.mkDir(ftpDirectory);
				ftpClient.setBufferSize(100000);
				ftpClient.setControlEncoding("UTF-8");
				// 设置文件类型（二进制）
				ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
				ftpClient.changeWorkingDirectory(ftpDirectory);
				// 上传
				flag = ftpClient.storeFile(new String(ftpFileName.getBytes(), "gbk"), fis);
				// 上传完文件后再将工作目录切换到之前的未上传文件之前的目录
				this.changeDir(curr);
				logger.info(ftpClient.getReplyString());
				if (flag) {
					logger.info("上传文件成功，本地文件名： " + localDirectoryAndFileName + "，上传到目录：" + ftpDirectory + ftpFileName);
				}
				return flag;
			} catch (Exception e) {
				this.close();
				logger.error(e.getMessage(), e);
				return false;
			} finally {
				try {
					fis.close();
				} catch (IOException e) {
					logger.error(e.getMessage(), e);
				}
			}
		}
		logger.error("调用失败,ftp连接未创建!");
		return flag;
	}

	/**
	 * 上传目录
	 * 
	 * @param localdirpath
	 *            本地目录
	 * @param ftpdirpath
	 *            ftp目录 如:[/onemap]
	 * @return
	 */
	public boolean uploadDir(String localdirpath, String ftpdirpath) {
		File src = new File(localdirpath);
		if (!ftpdirpath.endsWith("/")) {
			ftpdirpath += "/";
		}
		try {
			ftpdirpath = ftpdirpath + src.getName() + "/";
			boolean flag = ftpClient.makeDirectory(ftpdirpath);
			if (!flag) {
				System.out.println(ftpClient.getReplyString());
			}
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
		File[] allFile = src.listFiles();
		for (int currentFile = 0; currentFile < allFile.length; currentFile++) {
			if (!allFile[currentFile].isDirectory()) {
				String srcName = allFile[currentFile].getPath().toString();
				upload(srcName, new File(srcName).getName(), ftpdirpath);
			}
		}
		for (int currentFile = 0; currentFile < allFile.length; currentFile++) {
			if (allFile[currentFile].isDirectory()) {
				// 递归
				uploadDir(allFile[currentFile].getPath().toString(), ftpdirpath);
			}
		}
		return true;
	}

	/**
	 * 从FTP服务器上下载文件并保留当前工作目录
	 * 
	 * @param ftpDirectoryAndFileName
	 *            ftp服务器文件路径，以/dir形式开始
	 * @param localDirectoryAndFileName
	 *            保存到本地的目录
	 * @return
	 */
	public boolean download(String ftpDirectoryAndFileName, String localDirectoryAndFileName) {
		logger.info("将要下载目录:" + ftpDirectoryAndFileName + " 到：" + localDirectoryAndFileName);
		if (!ftpClient.isConnected()) {
			logger.info("未打开连接");
			return false;
		}
		ftpClient.enterLocalPassiveMode(); // Use passive mode as default
		try {
			// 将路径中的斜杠统一
			char[] chars = ftpDirectoryAndFileName.toCharArray();
			StringBuffer sbStr = new StringBuffer(256);
			for (int i = 0; i < chars.length; i++) {
				if ('\\' == chars[i]) {
					sbStr.append('/');
				} else {
					sbStr.append(chars[i]);
				}
			}
			ftpDirectoryAndFileName = sbStr.toString();
			String filePath = ftpDirectoryAndFileName.substring(0, ftpDirectoryAndFileName.lastIndexOf("/"));
			String fileName = ftpDirectoryAndFileName.substring(ftpDirectoryAndFileName.lastIndexOf("/") + 1);
			String curr = "/";
			String[] rt = ftpClient.doCommandAsStrings("pwd", "");
			if(rt!=null&&rt.length>0) {
				Pattern p = Pattern.compile("\"(.*?)\"");
				Matcher m = p.matcher(rt[0]);
				if (m.find()) {
					curr = m.group(0).replace("\"", "");
				}
			}			
			this.changeDir(filePath);
			FileOutputStream fs = new FileOutputStream(localDirectoryAndFileName);
			if (ftpClient.retrieveFile(new String(fileName.getBytes(), "gbk"), fs)) {// file
				try {
					fs.flush();
					fs.close();
				} catch (Exception ex) {
					logger.error(ex.getMessage(), ex);
				}
				logger.info(ftpClient.getReplyString());
				logger.info("[success]从ftp服务器上下载文件：" + ftpDirectoryAndFileName + "， 保存到：" + localDirectoryAndFileName);
			} else {// file
				try {
					fs.flush();
					fs.close();
				} catch (Exception ex) {
					logger.error(ex.getMessage(), ex);
				}
				logger.info(ftpClient.getReplyString());
				logger.info("[fail]从ftp服务器上下载文件：" + ftpDirectoryAndFileName + "， 保存到：" + localDirectoryAndFileName);
				return false;
			}
			this.changeDir(curr);

			return true;
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
			return false;
		}
	}

	/**
	 * 从ftp上下载目录
	 * 
	 * @param ftpdirpath
	 *            如:[/onemap]
	 * @param localdirpath
	 * @return
	 */
	public boolean downloadDir(String ftpdirpath, String localdirpath) {
		try {
			if (!ftpdirpath.endsWith("/")) {
				ftpdirpath += "/";
			}
			String fileName = new File(ftpdirpath).getName();
			if (!localdirpath.endsWith("/")) {
				localdirpath += "/";
			}
			localdirpath = localdirpath + fileName + "/";
			new File(localdirpath).mkdirs();
			FTPFile[] allFile;
			allFile = this.ftpClient.listFiles(ftpdirpath);
			for (int currentFile = 0; currentFile < allFile.length; currentFile++) {
				if (!allFile[currentFile].isDirectory()) {
					download(ftpdirpath + allFile[currentFile].getName(),
							localdirpath + allFile[currentFile].getName());
				}
			}
			for (int currentFile = 0; currentFile < allFile.length; currentFile++) {
				if (allFile[currentFile].isDirectory()) {
					// 递归调用
					String strremoteDirectoryPath = ftpdirpath + allFile[currentFile].getName();
					downloadDir(strremoteDirectoryPath, localdirpath);
				}
			}
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
			return false;
		}
		return true;
	}

	/**
	 * 返回FTP目录下的文件列表
	 * 
	 * @param pathName
	 * @return
	 */
	public String[] getFileNameList(String pathName) {
		try {
			return ftpClient.listNames(pathName);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
			return null;
		}
	}

	/**
	 * 删除FTP上的文件
	 * 
	 * @param ftpDirAndFileName
	 *            路径开头不能加/，比如应该是test/filename1
	 * @return
	 */
	public boolean deleteFile(String ftpDirAndFileName) {
		if (!ftpClient.isConnected()) {
			return false;
		}
		try {
			return ftpClient.deleteFile(ftpDirAndFileName);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
			return false;
		}
	}

	/**
	 * 删除FTP目录
	 * 
	 * @param ftpDirectory
	 *            要删除的目录,如[onemap]
	 * @return
	 */
	public boolean deleteDirectory(String ftpDirectory) {
		if (!ftpClient.isConnected()) {
			return false;
		}
		try {
			FTPFile[] files = ftpClient.listFiles();
			for (int i = 0; i < files.length; i++) {
				if (files[i].isDirectory() && files[i].getName().equals(ftpDirectory)) {
					// 找到要删除的文件夹
					// 首先观察这个文件夹是否是空的
					ftpClient.changeWorkingDirectory(files[i].getName());
					if (ftpClient.listFiles().length > 0) {
						// 如果这个文件夹不是空的,就先删除所有的问价,然后递归删除所有的子文件夹
						FTPFile[] tmps = ftpClient.listFiles();
						for (int j = 0; j < tmps.length; j++) {
							if (tmps[j].isFile()) {
								ftpClient.deleteFile(tmps[j].getName());
							}
						}
						for (int k = 0; k < tmps.length; k++) {
							if (tmps[k].isDirectory()) {
								deleteDirectory(tmps[k].getName());
							}
						}
					}
					// 处理完所有子文件夹后返回父目录删除当前文件夹
					ftpClient.changeToParentDirectory();
					ftpClient.removeDirectory(files[i].getName());
				}
			}
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
		return true;
	}

	/**
	 * 关闭链接
	 */
	public void close() {
		try {
			if (ftpClient != null && ftpClient.isConnected()) {
				ftpClient.disconnect();
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}

	public FTPClient getFtpClient() {
		return ftpClient;
	}

	public void setFtpClient(FTPClient ftpClient) {
		this.ftpClient = ftpClient;
	}

	public String getDirpath() {
		return dirpath;
	}

	public void setDirpath(String dirpath) {
		this.dirpath = dirpath;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	@Override
	public String toString() {
		return "[ip:" + this.server + "][port:" + this.port + "][username:" + this.userName + "][pwd:" + this.pwd
				+ "][dirpath:" + this.dirpath + "][filename:" + this.filename + "]";
	}
}