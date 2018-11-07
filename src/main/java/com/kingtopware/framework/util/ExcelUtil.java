package com.kingtopware.framework.util;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;

/**
 * excel导出工具类,支持多个sheet导出,支持多表头输出
 * 
 * @author 胡庆杰
 *
 */
public class ExcelUtil {
	private static Map<Workbook, CellStyle[]> styles = new HashMap<Workbook, CellStyle[]>();

	/**
	 * 将指定的集合数据导入到一个excel的多个sheet中
	 * 
	 * @param data
	 *            集合数据
	 * @param headers
	 *            sheet的列名
	 * @param colNames
	 *            要导出的对象的属性名
	 * @param SheetNames
	 *            要导出的sheet的名称
	 * @param SheetTitles
	 *            要导出的sheet的标题
	 * @param combineColIndex
	 *            导出过程中进行纵向等值合并的列 暂未实现
	 * @throws Throwable
	 */
	@SuppressWarnings("resource")
	public static <T> void write(ArrayList<ArrayList<T>> data, ArrayList<ArrayList<String>> colNames,
			ArrayList<ArrayList<String>> colHeaders, ArrayList<String> SheetNames, ArrayList<String> SheetTitles,
			ArrayList<ArrayList<Integer>> combineColIndex, OutputStream os) throws Exception {
		// 首先检查尺寸
		if (colHeaders == null) {
			colHeaders = colNames;
		}
		//
		ArrayList<ArrayList<ArrayList<ColHeader>>> col0 = new ArrayList<ArrayList<ArrayList<ColHeader>>>();
		for (int i = 0; i < colHeaders.size(); i++) {
			// 一个sheet
			ArrayList<ArrayList<ColHeader>> col1 = new ArrayList<ArrayList<ColHeader>>();
			col0.add(col1);
			// 一行
			ArrayList<ColHeader> col2 = new ArrayList<ColHeader>();
			col1.add(col2);
			for (int j = 0; j < colHeaders.size(); j++) {
				// 一个列头
				ColHeader col3 = new ExcelUtil.ColHeader(colHeaders.get(i).get(j), 1, 1);
				col2.add(col3);
			}
		}
		writeComplexHeader(data, colNames, col0, SheetNames, SheetTitles, combineColIndex, os);
	}

	/**
	 * 输出结果为单个sheet的简写形式
	 * 
	 * @param data
	 * @param colNames
	 * @param colHeaders
	 * @param SheetName
	 * @param SheetTitle
	 * @param combineColIndex
	 * @param fileAbsPath
	 * @throws Throwable
	 */
	public static <T> void writeEasy(ArrayList<T> data, ArrayList<String> colNames, ArrayList<String> colHeaders,
			String SheetName, String SheetTitle, ArrayList<Integer> combineColIndex, OutputStream os) throws Exception {
		ArrayList<ArrayList<T>> tmp = new ArrayList<ArrayList<T>>();
		tmp.add(data);

		ArrayList<ArrayList<String>> tmp2 = new ArrayList<ArrayList<String>>();
		tmp2.add(colNames);

		ArrayList<ArrayList<String>> tmp3 = new ArrayList<ArrayList<String>>();
		tmp3.add(colHeaders);

		ArrayList<String> SheetNames = new ArrayList<String>();
		SheetNames.add(SheetName);

		ArrayList<String> SheetTitles = new ArrayList<String>();
		SheetTitles.add(SheetTitle);

		ArrayList<ArrayList<Integer>> tmp4 = new ArrayList<ArrayList<Integer>>();
		tmp4.add(combineColIndex);

		write(tmp, tmp2, tmp3, SheetNames, SheetTitles, tmp4, os);
	}

	/**
	 * 输出结果为单个sheet的简写形式——导出复杂表头
	 * 
	 * @param data
	 * @param colNames
	 * @param colHeaders
	 * @param SheetName
	 * @param SheetTitle
	 * @param combineColIndex
	 * @param fileAbsPath
	 * @throws Throwable
	 */
	public static <T> void writeEasyComplexHeader(ArrayList<T> data, ArrayList<String> colNames,
			ArrayList<ArrayList<ColHeader>> colHeaders, String SheetName, String SheetTitle,
			ArrayList<Integer> combineColIndex, OutputStream os) throws Exception {
		ArrayList<ArrayList<T>> tmp = new ArrayList<ArrayList<T>>();
		tmp.add(data);

		ArrayList<ArrayList<String>> tmp2 = new ArrayList<ArrayList<String>>();
		tmp2.add(colNames);

		ArrayList<ArrayList<ArrayList<ColHeader>>> tmp3 = new ArrayList<ArrayList<ArrayList<ColHeader>>>();
		tmp3.add(colHeaders);

		ArrayList<String> SheetNames = new ArrayList<String>();
		SheetNames.add(SheetName);

		ArrayList<String> SheetTitles = new ArrayList<String>();
		SheetTitles.add(SheetTitle);

		ArrayList<ArrayList<Integer>> tmp4 = new ArrayList<ArrayList<Integer>>();
		tmp4.add(combineColIndex);

		writeComplexHeader(tmp, tmp2, tmp3, SheetNames, SheetTitles, tmp4, os);
	}

	/**
	 * 将指定集合数据导出到excel
	 * 
	 * @param data
	 * @param colNames
	 * @param colHeaders
	 * @param SheetNames
	 * @param SheetTitles
	 * @param combineColIndex
	 * @param fileAbsPath
	 * @throws Throwable
	 */
	public static <T> void write(ArrayList<ArrayList<T>> data, ArrayList<ArrayList<String>> colNames,
			ArrayList<ArrayList<String>> colHeaders, ArrayList<String> SheetNames, ArrayList<String> SheetTitles,
			ArrayList<ArrayList<Integer>> combineColIndex, String fileAbsPath) throws Exception {
		FileOutputStream fs = new FileOutputStream(fileAbsPath);
		write(data, colNames, colHeaders, SheetNames, SheetTitles, combineColIndex, fs);
	}

	/**
	 * 将指定集合数据导出到excel——导出复杂表头
	 * 
	 * @param data
	 * @param colNames
	 * @param colHeaders
	 * @param SheetNames
	 * @param SheetTitles
	 * @param combineColIndex
	 * @param fileAbsPath
	 * @throws Throwable
	 */
	public static <T> void writeComplexHeader(ArrayList<ArrayList<T>> data, ArrayList<ArrayList<String>> colNames,
			ArrayList<ArrayList<ArrayList<ColHeader>>> colHeaders, ArrayList<String> SheetNames,
			ArrayList<String> SheetTitles, ArrayList<ArrayList<Integer>> combineColIndex, String fileAbsPath)
			throws Exception {
		FileOutputStream fs = new FileOutputStream(fileAbsPath);
		writeComplexHeader(data, colNames, colHeaders, SheetNames, SheetTitles, combineColIndex, fs);
	}

	/**
	 * 输出结果为单个sheet的简写形式
	 * 
	 * @param data
	 * @param colNames
	 * @param colHeaders
	 * @param SheetName
	 * @param SheetTitle
	 * @param combineColIndex
	 * @param fileAbsPath
	 * @throws Throwable
	 */
	public static <T> void writeEasy(ArrayList<T> data, ArrayList<String> colNames, ArrayList<String> colHeaders,
			String SheetName, String SheetTitle, ArrayList<Integer> combineColIndex, String fileAbsPath)
			throws Exception {
		ArrayList<ArrayList<T>> tmp = new ArrayList<ArrayList<T>>();
		tmp.add(data);

		ArrayList<ArrayList<String>> tmp2 = new ArrayList<ArrayList<String>>();
		tmp2.add(colNames);

		ArrayList<ArrayList<String>> tmp3 = new ArrayList<ArrayList<String>>();
		tmp2.add(colHeaders);

		ArrayList<String> SheetNames = new ArrayList<String>();
		SheetNames.add(SheetName);

		ArrayList<String> SheetTitles = new ArrayList<String>();
		SheetTitles.add(SheetTitle);

		ArrayList<ArrayList<Integer>> tmp4 = new ArrayList<ArrayList<Integer>>();
		tmp4.add(combineColIndex);

		write(tmp, tmp2, tmp3, SheetNames, SheetTitles, tmp4, fileAbsPath);
	}

	/**
	 * 输出结果为单个sheet的简写形式
	 * 
	 * @param data
	 * @param colNames
	 * @param colHeaders
	 * @param SheetName
	 * @param SheetTitle
	 * @param combineColIndex
	 * @param fileAbsPath
	 * @throws Throwable
	 */
	public static <T> void writeEasyComplexHeader(ArrayList<T> data, ArrayList<String> colNames,
			ArrayList<ArrayList<ColHeader>> colHeaders, String SheetName, String SheetTitle,
			ArrayList<Integer> combineColIndex, String fileAbsPath) throws Exception {
		ArrayList<ArrayList<T>> tmp = new ArrayList<ArrayList<T>>();
		tmp.add(data);

		ArrayList<ArrayList<String>> tmp2 = new ArrayList<ArrayList<String>>();
		tmp2.add(colNames);

		ArrayList<ArrayList<ArrayList<ColHeader>>> tmp3 = new ArrayList<ArrayList<ArrayList<ColHeader>>>();
		tmp3.add(colHeaders);
		if (colHeaders == null)
			tmp3 = null;

		ArrayList<String> SheetNames = new ArrayList<String>();
		SheetNames.add(SheetName);
		if (SheetName == null)
			SheetNames = null;

		ArrayList<String> SheetTitles = new ArrayList<String>();
		SheetTitles.add(SheetTitle);
		if (SheetTitle == null)
			SheetTitles = null;

		ArrayList<ArrayList<Integer>> tmp4 = new ArrayList<ArrayList<Integer>>();
		tmp4.add(combineColIndex);
		if (combineColIndex == null)
			tmp4 = null;

		writeComplexHeader(tmp, tmp2, tmp3, SheetNames, SheetTitles, tmp4, fileAbsPath);
	}

	/**
	 * 将指定集合数据导入到excel中并指定要导出对象的哪些属性
	 * 
	 * @param data
	 * @param colNames
	 * @param os
	 * @throws Throwable
	 */
	public static <T> void write(ArrayList<ArrayList<T>> data, ArrayList<ArrayList<String>> colNames, OutputStream os)
			throws Exception {
		write(data, colNames, null, null, null, null, os);
	}

	/**
	 * 输出结果为单个sheet的简写形式
	 * 
	 * @param data
	 * @param colNames
	 * @param os
	 * @throws Throwable
	 */
	public static <T> void writeEasy(ArrayList<T> data, ArrayList<String> colNames, OutputStream os) throws Exception {
		ArrayList<ArrayList<T>> tmp = new ArrayList<ArrayList<T>>();
		tmp.add(data);

		ArrayList<ArrayList<String>> tmp2 = new ArrayList<ArrayList<String>>();
		tmp2.add(colNames);
		write(tmp, tmp2, os);
	}

	/**
	 * 将指定集合对象导出到文件
	 * 
	 * @param data
	 * @param colNames
	 * @param fileAbsPath
	 * @throws Throwable
	 */
	public static <T> void write(ArrayList<ArrayList<T>> data, ArrayList<ArrayList<String>> colNames,
			String fileAbsPath) throws Exception {
		FileOutputStream fs = new FileOutputStream(fileAbsPath);
		write(data, colNames, null, null, null, null, fs);
	}

	/**
	 * 输出结果为单个sheet的简写形式
	 * 
	 * @param data
	 * @param colNames
	 * @param fileAbsPath
	 * @throws Throwable
	 */
	public static <T> void writeEasy(ArrayList<T> data, ArrayList<String> colNames, String fileAbsPath)
			throws Exception {
		ArrayList<ArrayList<T>> tmp = new ArrayList<ArrayList<T>>();
		tmp.add(data);

		ArrayList<ArrayList<String>> tmp2 = new ArrayList<ArrayList<String>>();
		tmp2.add(colNames);
		write(tmp, tmp2, fileAbsPath);
	}

	/**
	 * 将指定集合对象导出的excel并指定要导出的对象的属性和使用的列头
	 * 
	 * @param data
	 * @param colNames
	 * @param colHeaders
	 * @param os
	 * @throws Throwable
	 */
	public static <T> void write(ArrayList<ArrayList<T>> data, ArrayList<ArrayList<String>> colNames,
			ArrayList<ArrayList<String>> colHeaders, OutputStream os) throws Exception {
		write(data, colNames, colHeaders, null, null, null, os);
	}

	/**
	 * 输出结果为单个sheet的简写形式
	 * 
	 * @param data
	 * @param colNames
	 * @param colHeaders
	 * @param os
	 * @throws Throwable
	 */
	public static <T> void writeEasy(ArrayList<T> data, ArrayList<String> colNames, ArrayList<String> colHeaders,
			OutputStream os) throws Exception {
		ArrayList<ArrayList<T>> tmp = new ArrayList<ArrayList<T>>();
		tmp.add(data);

		ArrayList<ArrayList<String>> tmp2 = new ArrayList<ArrayList<String>>();
		tmp2.add(colNames);

		ArrayList<ArrayList<String>> tmp3 = new ArrayList<ArrayList<String>>();
		tmp3.add(colHeaders);
		write(tmp, tmp2, tmp3, os);
	}

	/**
	 * 将指定集合对象导出到文件
	 * 
	 * @param data
	 * @param colNames
	 * @param colHeaders
	 * @param fileAbsPath
	 * @throws Throwable
	 */
	public static <T> void write(ArrayList<ArrayList<T>> data, ArrayList<ArrayList<String>> colNames,
			ArrayList<ArrayList<String>> colHeaders, String fileAbsPath) throws Exception {
		FileOutputStream fs = new FileOutputStream(fileAbsPath);
		write(data, colNames, colHeaders, null, null, null, fs);
	}

	/**
	 * 输出结果为单个sheet的简写形式
	 * 
	 * @param data
	 * @param colNames
	 * @param colHeaders
	 * @param fileAbsPath
	 * @throws Throwable
	 */
	public static <T> void writeEasy(ArrayList<T> data, ArrayList<String> colNames, ArrayList<String> colHeaders,
			String fileAbsPath) throws Exception {
		ArrayList<ArrayList<T>> tmp = new ArrayList<ArrayList<T>>();
		tmp.add(data);

		ArrayList<ArrayList<String>> tmp2 = new ArrayList<ArrayList<String>>();
		tmp2.add(colNames);

		ArrayList<ArrayList<String>> tmp3 = new ArrayList<ArrayList<String>>();
		tmp3.add(colHeaders);
		write(tmp, tmp2, tmp3, fileAbsPath);
	}

	/**
	 * 将指定集合对象导出到excel,将所有属性都导出
	 * 
	 * @param data
	 * @param os
	 * @throws Throwable
	 */
	public static <T> void write(ArrayList<ArrayList<T>> data, OutputStream os) throws Exception {
		ArrayList<ArrayList<String>> colNames = new ArrayList<ArrayList<String>>();
		if (data != null && data.size() > 0 && data.get(0).size() > 0 && data.get(0).get(0) != null) {
			Map<String, String> map = BeanUtils.describe(data.get(0).get(0));
			ArrayList<String> arr = new ArrayList<String>();
			for (Map.Entry<String, String> entry : map.entrySet()) {
				String key = entry.getKey();
				if (key.equals("class"))
					continue;
				arr.add(key);
			}
			for (int i = 0; i < data.size(); i++) {
				colNames.add(arr);
			}
			write(data, colNames, os);
		}

	}

	/**
	 * 输出结果为单个sheet的简写形式
	 * 
	 * @param data
	 * @param os
	 * @throws Throwable
	 */
	public static <T> void writeEasy(ArrayList<T> data, OutputStream os) throws Exception {
		ArrayList<ArrayList<T>> tmp = new ArrayList<ArrayList<T>>();
		tmp.add(data);
		write(tmp, os);
	}

	/**
	 * 将指定集合对象导出到文件
	 * 
	 * @param data
	 * @param fileAbsPath
	 * @throws Throwable
	 */
	public static <T> void write(ArrayList<ArrayList<T>> data, String fileAbsPath) throws Exception {
		FileOutputStream fs = new FileOutputStream(fileAbsPath);
		write(data, fs);
	}

	/**
	 * 输出结果为单个sheet的简写形式
	 * 
	 * @param data
	 * @param fileAbsPath
	 * @throws Throwable
	 */
	public static <T> void writeEasy(ArrayList<T> data, String fileAbsPath) throws Exception {
		ArrayList<ArrayList<T>> tmp = new ArrayList<ArrayList<T>>();
		tmp.add(data);
		write(tmp, fileAbsPath);
	}

	private static String GenerateSheetName(List<String> names, Integer i) {
		if (names != null && names.size() > i) {
			return names.get(i) == null ? "Sheet" + ((Integer) (i + 1)).toString() : names.get(i);
		} else {
			return "Sheet" + ((Integer) (i + 1)).toString();
		}
	}

	/**
	 * 给单元格设置样式
	 * 
	 * @param workbook
	 * @param styleType
	 *            0-普通单元格,1-列头,2-sheet标题
	 * @return
	 */
	private static HSSFCellStyle createCellStyle(HSSFWorkbook workbook, int styleType) {
		if (!styles.containsKey(workbook)) {
			HSSFCellStyle[] ss = new HSSFCellStyle[3];
			styles.put(workbook, ss);
			ss[0] = createCellStyleFinal(workbook, 0);
			ss[1] = createCellStyleFinal(workbook, 1);
			ss[2] = createCellStyleFinal(workbook, 2);
		}
		return (HSSFCellStyle) styles.get(workbook)[styleType];
	}

	private static HSSFCellStyle createCellStyleFinal(HSSFWorkbook workbook, int styleType) {
		HSSFCellStyle style = workbook.createCellStyle();
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		if (styleType == 1 || styleType == 2)
			style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		HSSFFont font = workbook.createFont();
		if (styleType == 1) {
			font.setFontHeightInPoints((short) 12);
			font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		} else if (styleType == 2) {
			font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			font.setFontHeightInPoints((short) 14);
		} else {
			font.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
			font.setFontHeightInPoints((short) 10);
		}
		style.setFont(font);
		return style;
	}

	/**
	 * 
	 * 将指定的集合数据导入到一个excel的多个sheet中
	 * 
	 * @param data
	 *            集合数据
	 * @param colHeaders
	 *            sheet的列名支持跨行和跨列的表头,要配合组合才行
	 * @param colNames
	 *            要导出的对象的属性名
	 * @param SheetNames
	 *            要导出的sheet的名称
	 * @param SheetTitles
	 *            要导出的sheet的标题
	 * @param combineColIndex
	 *            导出过程中进行纵向等值合并的列 暂未实现
	 * @throws Throwable
	 */
	@SuppressWarnings("resource")
	public static <T> void writeComplexHeader(ArrayList<ArrayList<T>> data, ArrayList<ArrayList<String>> colNames,
			ArrayList<ArrayList<ArrayList<ColHeader>>> colHeaders, ArrayList<String> SheetNames,
			ArrayList<String> SheetTitles, ArrayList<ArrayList<Integer>> combineColIndex, OutputStream os)
			throws Exception {
		// 首先检查尺寸
		if (colHeaders == null) {
			return;
		}
		HSSFWorkbook workbook = new HSSFWorkbook();// 声明一个工作薄
		if (data == null || data.size() == 0)
			return;
		for (int sheetIndex = 0; sheetIndex < data.size(); sheetIndex++) {
			// 循环创建sheet
			HSSFSheet sheet = workbook.createSheet(GenerateSheetName(SheetNames, sheetIndex));// 生成一个表格
			HSSFRow row;
			int rowIndex = 0;
			// 首先生成表格标题
			if (SheetTitles != null && SheetTitles.size() > sheetIndex) {
				row = sheet.createRow(rowIndex);
				rowIndex++;
				if (colHeaders != null && colHeaders.size() > sheetIndex) {
					// 如果指定了列表头就是用列表头个数设置sheet标题宽度
					int tmp = 0;
					if (colHeaders.size() > 0) {
						for (; tmp < colHeaders.get(sheetIndex).size(); tmp++) {
							row.createCell(tmp);
						}
					}

					sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, --tmp));
					sheet.getRow(0).getCell(0).setCellValue(SheetTitles.get(sheetIndex));
					sheet.getRow(0).getCell(0).setCellStyle(createCellStyle(workbook, 2));
				} else if (colNames != null && colNames.size() > sheetIndex) {
					// 如果存在列属性名称就是用列属性名称个数设置sheet标题宽度
					int tmp = 0;
					if (colNames.size() > 0) {
						for (; tmp < colNames.get(sheetIndex).size(); tmp++) {
							row.createCell(tmp);
						}
					}

					sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, --tmp));
					sheet.getRow(0).getCell(0).setCellValue(SheetTitles.get(sheetIndex));
					sheet.getRow(0).getCell(0).setCellStyle(createCellStyle(workbook, 2));
				}
			}
			// 首先生成表格头
			if (colHeaders != null && colHeaders.size() > sheetIndex && colHeaders.get(sheetIndex) != null) {
				for (int j = 0; j < colHeaders.get(sheetIndex).size(); j++) {
					row = sheet.createRow(rowIndex);
					ArrayList<ColHeader> cols = colHeaders.get(sheetIndex).get(j);
					for (int k = 0; k < cols.size(); k++) {
						HSSFCell cell = row.createCell(k);
						cell.setCellValue(new HSSFRichTextString(cols.get(k).text));
						cell.setCellStyle(createCellStyle(workbook, 1));
						if (cols.get(k).rowspan > 1 || cols.get(k).colspan > 1) {
							sheet.addMergedRegion(new CellRangeAddress(rowIndex, rowIndex + cols.get(k).rowspan - 1, k,
									k + cols.get(k).colspan - 1));
						}
					}
					rowIndex++;
				}

			}
			// 生成表表格数据
			if (data.get(sheetIndex) != null) {
				int end = data.get(sheetIndex).size() + rowIndex;
				int dataIndex = 0;
				for (; rowIndex < end; rowIndex++, dataIndex++) {
					// 生成表格数据
					row = sheet.createRow(rowIndex);
					if (colNames != null && colNames.size() > sheetIndex && colNames.get(sheetIndex) != null) {
						for (int colIndex = 0; colIndex < colNames.get(sheetIndex).size(); colIndex++) {
							HSSFCell cell = row.createCell(colIndex);
							String val;
							try {
								BeanUtils.describe(data.get(sheetIndex).get(dataIndex));			
								val = BeanUtils.getProperty(data.get(sheetIndex).get(dataIndex),
										colNames.get(sheetIndex).get(colIndex));
								if (val != null) {
									cell.setCellValue(val);
									cell.setCellStyle(createCellStyle(workbook, 0));
								}
							} catch (Exception ex) {
								ex.printStackTrace();
							}

						}
					}
				}
			}

		}
		workbook.write(os);
		os.flush();
		os.close();
		if (styles.containsKey(workbook)) {
			styles.remove(workbook);
		}
	}

	public static class ColHeader {
		public String text;
		public int rowspan;
		public int colspan;

		public ColHeader(String text, int rowspan, int colspan) {
			super();
			this.text = text;
			this.rowspan = rowspan;
			this.colspan = colspan;
		}
	}
}