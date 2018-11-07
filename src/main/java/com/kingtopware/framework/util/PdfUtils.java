package com.kingtopware.framework.util;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtilities;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PiePlot3D;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.data.general.DefaultPieDataset;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.kingtopware.onemap.bean.ZdxxLyxzFull;

/**
 * 
 * =====================================
 * @author： luxiaolin
 * @date： 2017年9月13日
 * @description：生成pdf文件工具类
 * =====================================
 */
public class PdfUtils {

	/**
	 * 测试代码
	 * @param mZdxxLyxzFull
	 * @throws Exception
	 */
	public static void createPdfZdxx(List<ZdxxLyxzFull> mZdxxLyxzFull,String path) throws Exception {
		// 创建Document对象
		Document doc = new Document(PageSize.A4, 0, 0, 50, 0);
		// 获得PdfWriter实例，将文档放到输出流上
		PdfWriter writer = PdfWriter.getInstance(doc, new FileOutputStream(path));
		// PDF版本(默认1.4)
		writer.setPdfVersion(PdfWriter.PDF_VERSION_1_2);

		// 创建BaseFont对象，指明字体，编码方式,是否嵌入
		BaseFont bf = BaseFont.createFont("C:\\Windows\\Fonts\\simkai.ttf", BaseFont.IDENTITY_H, false);
		// 创建Font对象，将基础字体对象，字体大小，字体风格
		Font font = new Font(bf, 13, Font.NORMAL);
		Font font1 = new Font(bf, 15, Font.BOLD);

		ChartUtils.setChartTheme();

		DefaultPieDataset dataset = new DefaultPieDataset();
		for (int i = 0; i < mZdxxLyxzFull.size(); i++) {
			dataset.setValue(mZdxxLyxzFull.get(i).getXZQMC(), new Double(mZdxxLyxzFull.get(i).getZYTD_ZMJ()));
		}
		// JFreeChart chart = ChartFactory.createPieChart(// chart
		// "土地利用现状统计 (单位：公顷)", // title
		// dataset, // data
		// true, // include legend
		// true, false);

		JFreeChart chart = ChartFactory.createPieChart3D(// 3Dchart
				"土地利用现状统计 (单位：公顷)", // title
				dataset, // data
				true, // include legend
				true, false);

		final PiePlot3D plot = (PiePlot3D) chart.getPlot(); // 转换为3D饼状图
		plot.setStartAngle(270);
		plot.setForegroundAlpha(1f);
		plot.setInteriorGap(0.02);

		int width = 640; /* Width of the image */
		int height = 480; /* Height of the image */
		File pieChart = new File("PieChart.jpeg");
		ChartUtilities.saveChartAsJPEG(pieChart, chart, width, height);
		Image image = Image.getInstance("PieChart.jpeg");

		final String fiat = "农用地";
		final String audi = "建设用地";
		final String ford = "未利用地";
		final DefaultCategoryDataset dataset1 = new DefaultCategoryDataset();
		for (int i = 0; i < mZdxxLyxzFull.size(); i++) {
			dataset1.setValue(mZdxxLyxzFull.get(i).getZS_NYD_GDMJ() + mZdxxLyxzFull.get(i).getZS_NYD_LDMJ() + mZdxxLyxzFull.get(i).getZS_NYD_YDMJ()
					+ mZdxxLyxzFull.get(i).getZS_NYD_MCDMJ() + mZdxxLyxzFull.get(i).getZS_NYD_QTMJ(), fiat, mZdxxLyxzFull.get(i).getXZQMC());
			dataset1.setValue(mZdxxLyxzFull.get(i).getZS_JSYDMJ(), audi, mZdxxLyxzFull.get(i).getXZQMC());
			dataset1.setValue(mZdxxLyxzFull.get(i).getZS_WLYDMJ(), ford, mZdxxLyxzFull.get(i).getXZQMC());
		}
		
		// JFreeChart barChart = ChartFactory.createBarChart("土地利用现状统计 (单位：公顷)",
		// "行政区划", "面积", dataset1, PlotOrientation.VERTICAL, true, true, false);
		JFreeChart barChart = ChartFactory.createBarChart3D("土地利用现状统计 (单位：公顷)", "行政区划", "面积", dataset1, PlotOrientation.VERTICAL, true, true, false);// 3D
		File BarChart = new File("BarChart.jpeg");
		ChartUtilities.saveChartAsJPEG(BarChart, barChart, width, height);
		Image image1 = Image.getInstance("BarChart.jpeg");

		PdfPTable table = new PdfPTable(1);

		// 插入图片
		table.addCell(image);
		table.addCell(image1);

		// 文档写入内容
		doc.open();

		Paragraph title = new Paragraph("统计图\n\n\n", font1);
		title.setAlignment(Paragraph.ALIGN_CENTER);
		doc.add(title);
		doc.add(table);

		doc.newPage();
		PdfPTable table1 = new PdfPTable(4);
		Paragraph title1 = new Paragraph("项目流程基本信息\n\n", font1);
		Paragraph titlen = new Paragraph("\n\n\n", font1);
		title1.setAlignment(Paragraph.ALIGN_CENTER);
		table1.addCell(getPDFCell("案件编号", font));
		table1.addCell(getPDFCell("JSYD2017052000001", font));
		table1.addCell(getPDFCell("案件名称", font));
		table1.addCell(getPDFCell("建设用地审批001", font));

		table1.addCell(getPDFCell("受理人", font));
		table1.addCell(getPDFCell("张三", font));
		table1.addCell(getPDFCell("受理时间", font));
		table1.addCell(getPDFCell("2017-5-01", font));

		table1.addCell(getPDFCell("项目名称", font));
		table1.addCell(mergeCol("永州市回龙圩管理区农产品商贸物流园建设项目", font, 3));

		table1.addCell(getPDFCell("申报总面积", font));
		table1.addCell(getPDFCell("6.7401", font));
		table1.addCell(getPDFCell("规划用途", font));
		table1.addCell(getPDFCell("商服用地", font));

		doc.add(title1);
		doc.add(table1);
		doc.add(titlen);

		PdfPTable table3 = new PdfPTable(4);
		Paragraph title3 = new Paragraph("面积校核\n\n", font1);
		title3.setAlignment(Paragraph.ALIGN_CENTER);

		table3.addCell(getPDFCellByColor("面积类别", font, new BaseColor(54, 100, 139)));
		table3.addCell(getPDFCellByColor("申报面积", font, new BaseColor(54, 100, 139)));
		table3.addCell(getPDFCellByColor("计算面积", font, new BaseColor(54, 100, 139)));
		table3.addCell(getPDFCellByColor("相差", font, new BaseColor(54, 100, 139)));

		table3.addCell(getPDFCellByColor("总面积", font, new BaseColor(135, 206, 235)));
		table3.addCell(getPDFCellByColor("5.06", font, new BaseColor(135, 206, 235)));
		table3.addCell(getPDFCellByColor("4.08", font, new BaseColor(135, 206, 235)));
		table3.addCell(getPDFCellByColor("-19.4%", font, new BaseColor(135, 206, 235)));

		table3.addCell(getPDFCell("建设用地", font));
		table3.addCell(getPDFCell("4", font));
		table3.addCell(getPDFCell("3", font));
		table3.addCell(getPDFCell("-25%", font));

		Font fontc = new Font(bf, 13, Font.NORMAL, new BaseColor(238, 44, 44));
		table3.addCell(getPDFCellByColor("农用地面积", font, new BaseColor(135, 206, 235)));
		table3.addCell(getPDFCellByColor("1", font, new BaseColor(135, 206, 235)));
		table3.addCell(getPDFCellByColor("1.02", font, new BaseColor(135, 206, 235)));
		table3.addCell(getPDFCellByColor("2%", fontc, new BaseColor(135, 206, 235)));

		table3.addCell(getPDFCell("未利用面积", font));
		table3.addCell(getPDFCell("0.06", font));
		table3.addCell(getPDFCell("0.06", font));
		table3.addCell(getPDFCell("0%", font));

		doc.add(title3);
		doc.add(table3);

		doc.close();

		
		/**
		 * 删除临时统计图img文件
		 */
		FileUtils.DelFiles("PieChart.jpeg");
		FileUtils.DelFiles("BarChart.jpeg");
	}
	
	
	// 合并行的静态函数
	public static PdfPCell mergeRow(String str, Font font, int i) {

		// 创建单元格对象，将内容及字体传入
		PdfPCell cell = new PdfPCell(new Paragraph(str, font));
		// 设置单元格内容居中
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
		// 将该单元格所在列包括该单元格在内的i行单元格合并为一个单元格
		cell.setRowspan(i);

		return cell;
	}

	// 合并列的静态函数
	public static PdfPCell mergeCol(String str, Font font, int i) {

		PdfPCell cell = new PdfPCell(new Paragraph(str, font));
		cell.setMinimumHeight(25);
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
		// 将该单元格所在行包括该单元格在内的i列单元格合并为一个单元格
		cell.setColspan(i);

		return cell;
	}

	// 获取指定内容与字体的单元格
	public static PdfPCell getPDFCell(String string, Font font) {
		// 创建单元格对象，将内容与字体放入段落中作为单元格内容
		PdfPCell cell = new PdfPCell(new Paragraph(string, font));

		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE);

		// 设置最小单元格高度
		cell.setMinimumHeight(25);
		return cell;
	}

	// 获取指定内容与字体的单元格(指定颜色)
	public static PdfPCell getPDFCellByColor(String string, Font font, BaseColor bc) {
		// 创建单元格对象，将内容与字体放入段落中作为单元格内容
		PdfPCell cell = new PdfPCell(new Paragraph(string, font));

		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE);

		// 设置最小单元格高度
		cell.setMinimumHeight(25);

		cell.setBackgroundColor(bc);

		return cell;
	}

}
