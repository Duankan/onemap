/*
 * 文件名：DocUtil.java
 * 版权：Copyright 2017-2030湖北金拓维信息技术有限公司 版权所有
 * 描述：文件转换工具,支持excel->html,word->pdf,ppt->pdf
 */
package com.kingtopware.framework.util;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;
import com.jacob.com.ComThread;

/**
 * 文件转换工具,支持excel->html,word->pdf,ppt->pdf
 */
public class DocUtil {
	/**
	 * 将excel转换成html
	 * 例:new DocUtil().excelToHtml("D:\\aaa.xls", "D:\\aaa.html");
	 * @param xlsPath 将要转换的excel文件路径
	 * @param htmlPath 转换后html文件路径
	 */
	public void excelToHtml(String xlsPath, String htmlPath) {
		ActiveXComponent app = new ActiveXComponent("Excel.Application");
		try {
			app.setProperty("Visible", new Variant(false));
			Dispatch excels = app.getProperty("Workbooks").toDispatch();
			Dispatch excel = Dispatch.call(excels, "Open", xlsPath, false, true).toDispatch();
			Dispatch.call(excel, "SaveAs", htmlPath, 44);
			Dispatch.call(excel, "Close", false);
		} catch (Exception e) {} finally {
			if (app != null) app.invoke("Quit", new Variant[] {});
			ComThread.Release();
		}
	}
	
	/**
	 * 将excel转换成html
	 * 例:new DocUtil().excelToHtml("D:\\aaa.xls", "D:\\aaa.html");
	 * @param xlsPath 将要转换的excel文件路径
	 * @param htmlPath 转换后html文件路径
	 */
	public void excelToPdf(String xlsPath, String pdfPath) {
		ActiveXComponent app = new ActiveXComponent("Excel.Application");
		try {
			app.setProperty("Visible", new Variant(false));
			Dispatch excels = app.getProperty("Workbooks").toDispatch();
			Dispatch excel = Dispatch.call(excels, "Open", xlsPath, false, true).toDispatch();
			Dispatch.call(excel, "ExportAsFixedFormat",0, pdfPath);
			Dispatch.call(excel, "Close", false);
		} catch (Exception e) {} finally {
			if (app != null) app.invoke("Quit", new Variant[] {});
			ComThread.Release();
		}
	}

	/**
	 * 将word转换成pdf文件
	 * 例:new DocUtil().wordToPdf("D:\\aaa.doc", "D:\\aaa.pdf");
	 * @param docPath 将要转换的doc文件路径
	 * @param pdfPath 转换后的pdf文件路径
	 */
	public void wordToPdf(String docPath, String pdfPath) {
		ActiveXComponent app = new ActiveXComponent("Word.Application");		 
		try {
			app.setProperty("Visible", new Variant(false));
			Dispatch docs = app.getProperty("Documents").toDispatch();
			Dispatch doc = Dispatch.call(docs, "Open", docPath, false, true).toDispatch();
			Dispatch.call(doc, "SaveAs", pdfPath, 17);
			Dispatch.call(doc, "ExportAsFixedFormat", pdfPath, 17);
			Dispatch.call(doc, "Close", false);
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			if (app != null) app.invoke("Quit", 0);
			ComThread.Release();
		}
	}

	/**
	 * 将ppt转换成pdf
	 * 例:new DocUtil().pptToPdf("D:\\aaa.ppt", "D:\\aaa.pdf");
	 * @param pptPath 将要转换的ppt的路径
	 * @param pdfPath 转换后的pdf文件路径
	 */
	public void pptToPdf(String pptPath, String pdfPath) {
		ActiveXComponent app = new ActiveXComponent("Powerpoint.Application");
		try {
			Dispatch ppts = app.getProperty("Presentations").toDispatch();
			Dispatch ppt = Dispatch.call(ppts, "Open", pptPath, true, true, false).toDispatch();
			Dispatch.call(ppt, "SaveAs", pdfPath, 32);
			Dispatch.call(ppt, "Close");
		} catch (Exception e) {} finally {
			if (app != null) app.invoke("Quit");
			ComThread.Release();
		}
	}
}
