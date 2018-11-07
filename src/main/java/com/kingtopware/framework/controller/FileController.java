package com.kingtopware.framework.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.kingtopware.framework.bean.FileInfo;
import com.kingtopware.framework.bean.Result;
import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.framework.entity.FileEntity;
import com.kingtopware.framework.service.FileService;

@RestController
@RequestMapping(value = "/file")
public class FileController extends BaseController<FileEntity> {
	private static Logger logger = Logger.getLogger(FileController.class);
	String basePath=null;
	@Resource
	public FileService srv;
	
	@Override
	public void getBaseSrv() {
		if (baseSrv == null)
			baseSrv = srv;		
	}

	/**
	 * 文件上传
	 * 
	 * @param files：文件字节流集合
	 * @param reluri：文件保存的相对路径
	 * @param response：响应上下文
	 * @param request：请求上下文
	 */
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public ResultList<FileInfo> upload(@RequestParam("ktwfile") MultipartFile[] files,
			@RequestParam("reluri") String reluri, HttpServletResponse response, HttpServletRequest request) {
		try {
			if(basePath==null){
				basePath=ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/");
			}
			return srv.upload(files,
					reluri,basePath);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new ResultList<FileInfo>(false,"执行失败");
		}
	}

	/**
	 * 文件下载
	 * 
	 * @param response：响应上下文
	 * @param reluri：文件的相对路径
	 * @param filename：保存时的文件名
	 */
	@RequestMapping("/download")
	public void download(HttpServletResponse response, @RequestParam("reluri") String reluri,
			@RequestParam("filename") String filename) {
		if(basePath==null){
			basePath=ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/");
		}
		if (filename.isEmpty()) filename = reluri.substring(reluri.lastIndexOf('/') + 1);
		File file = new File(basePath + reluri);
		try {
			FileInputStream stream = new FileInputStream(file);
			response.setContentType("multipart/form-data");
			response.setHeader("Content-Length", String.valueOf(stream.getChannel().size()));
			response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(filename, "UTF-8"));
			int b = 0;
			byte[] buffer = new byte[4096];
			while ((b = stream.read(buffer)) != -1) {
				response.getOutputStream().write(buffer, 0, b);
			}
			stream.close();
			response.getOutputStream().close();
			response.getOutputStream().flush();
		} catch (IOException e) {
			response.setHeader("Content-Length", "");
			response.setHeader("Content-Disposition", "");
			response.setContentType("application/json;charset=UTF-8");
			try {
				Result<FileInfo> hr = new Result<FileInfo>(false,"执行失败");
				response.getOutputStream().write(JSON.toJSONString(hr).getBytes());
				response.getOutputStream().close();
				response.getOutputStream().flush();
			} catch (Exception e1) {
				logger.error(e.getMessage(),e);
			}
		}
	}

	/**
	 * doc(docx)、ppt(pptx)、xls(xlsx)格式文档转换为html能打开的文件
	 * 
	 * @param reluri:需要转换的文件相对网络路径
	 * @return 转换后的文件相对网络路径
	 */
	@RequestMapping("/view")
	public Result view(@RequestParam("reluri") String reluri) {
		try {
			if(basePath==null){
				basePath=ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/");
			}
			return srv.view(reluri, basePath);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result(false,"执行失败");
		}
	}

	@Override
	public Result<String> deleteByID(@PathVariable("id") String id) {
		try {
			if(basePath==null){
				basePath=ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/");
			}
			return srv.deleteByID(basePath, id);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<String>(false,"执行失败");
		}
	}

	@Override
	public Result<String> delete(@RequestBody FileEntity entity) {
		if (entity != null && !entity.getId().isEmpty()) return deleteByID(entity.getId());
		else return new Result<String>(false,"执行失败");
	}

	@Override
	public Result<String> deletes(@RequestBody List<FileEntity> entitys) {
		try {
			if(basePath==null){
				basePath=ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/");
			}
			return srv.deleteInfo(basePath, entitys);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new Result<String>(false,"执行失败");
		}
	}

	/**
	 * 新增文件集合
	 * 
	 * @param entitys：文件实体
	 * @return：返回新增文件的主键集合
	 */
	@RequestMapping(value = "/adds/ex", method = RequestMethod.POST)
	public ResultList<String> insertEx(@RequestBody List<FileEntity> entitys) {
		try {
			return srv.insertEx(entitys);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return new ResultList<String>(false,"执行失败");
		}
	}
}
