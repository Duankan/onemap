package com.kingtopware.onemap.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.springframework.stereotype.Component;

import com.kingtopware.framework.bean.ResultList;
import com.kingtopware.onemap.service.ConfManaService;

@Component
public class ConfManaServiceImpl implements ConfManaService {
	private static Logger logger = Logger.getLogger(ConfManaServiceImpl.class);
	private String _path = "E:\\app.xml";
	private String _root = "";
	private Document _doc = null;
	// 作为备份使用
	private Document _doc2 = null;

	public ConfManaServiceImpl() {
	}

	public ConfManaServiceImpl(String root, String path) {
		this._root = root.endsWith("/") ? root : root + "/";
		this._path = path;
	}

	private void read() throws Exception {
		SAXReader reader = new SAXReader();
		_doc = reader.read(_path);
		_doc2 = reader.read(_path);
	}

	private void write() throws Exception {
		// 1.指定写出的格式 有空格和换行.
		OutputFormat format = OutputFormat.createPrettyPrint();
		// 2.指定生成的xml文档的编码
		format.setEncoding("UTF-8");
		XMLWriter writer = null;
		String res = "";
		// 首先写入到测试位置
		res = _root + "temp/" + UUID.randomUUID().toString() + ".xml";
		writer = new XMLWriter(new FileOutputStream(res), format);
		writer.setEscapeText(false);
		writer.write(_doc);
		writer.close();
		// 读取测试文件,如果格式有误会报异常
		SAXReader reader = new SAXReader();
		_doc = reader.read(res);
		// 写入备份文件
		File file = new java.io.File(_root + "appbak");
		if (!file.exists()) {
			file.mkdir();
		}
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd-HHmmss.SSS");// 设置日期格式
		res = _root + "appbak/" + df.format(new Date()) + "-" + UUID.randomUUID().toString() + ".xml";
		writer = new XMLWriter(new FileOutputStream(res), format);
		writer.setEscapeText(false);
		writer.write(_doc2);
		writer.close();
		// 写入正式位置
		writer = new XMLWriter(new FileOutputStream(_path), format);
		writer.setEscapeText(false);
		writer.write(_doc);
		writer.close();
	}

	private boolean _update(String path, String value, boolean onlyone) throws Exception {
		List<Node> nodes = _doc.selectNodes(path);
		for (int i = 0; i < nodes.size(); i++) {
			if (onlyone && i > 0)
				break;
			Element ele = ((Element) nodes.get(i));
			ele.clearContent();
			if (value == null) {
				value = "";
			}
			ele.setText(value);
		}
		return true;
	}

	public ResultList<String> select(String path) {
		List<Node> nodes = new ArrayList<Node>();
		ResultList<String> res = new ResultList<String>();
		try {
			read();
			nodes = _doc.selectNodes(path);
			List<String> list = new ArrayList<String>();
			for (int i = 0; i < nodes.size(); i++) {
				list.add(nodes.get(i).asXML());
			}
			res.setData(list);
			;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return res;
	}

	/**
	 * 根据路径修改一个节点
	 * 
	 * @param paths
	 *            要进行更新的节点的路径
	 * @param values
	 *            要进行更新的值
	 * @param onlyone
	 *            是否每一次的更新都只更新选中节点中的一条
	 * @return 是否更新成功
	 */
	public boolean update(List<String> paths, List<String> values, boolean onlyone) {
		try {
			read();
			for (int i = 0; i < paths.size(); i++) {
				_update(paths.get(i), values.get(i), onlyone);
			}
			write();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return false;
		}
		return true;
	}

	private boolean _add(String path, String name, String value, boolean onlyone) throws Exception {
		List<Node> nodes = _doc.selectNodes(path);
		for (int i = 0; i < nodes.size(); i++) {
			if (onlyone && i > 0)
				break;
			Element ele = (Element) nodes.get(i);
			Element newele = ele.addElement(name);
			newele.addText(value);
		}
		return true;
	}

	/**
	 * 增加一个节点 示例
	 * 
	 * @param path
	 *            要增加的节点的父节点
	 * @param name
	 *            要增加的节点的名字
	 * @param value
	 *            要增加的节点的值
	 * @param onlyone
	 *            是否每一次的增加都只增加选中节点中的一条
	 * @return 是否增加成功
	 */
	public boolean add(List<String> paths, List<String> names, List<String> values, boolean onlyone) {
		try {
			read();
			for (int i = 0; i < paths.size(); i++) {
				_add(paths.get(i), names.get(i), values.get(i), onlyone);
			}
			write();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return false;
		}
		return true;
	}

	private boolean _delete(String path, boolean onlyone) throws Exception {
		List<Node> nodes = _doc.selectNodes(path);
		for (int i = 0; i < nodes.size(); i++) {
			if (onlyone && i > 0)
				break;
			nodes.get(i).getParent().remove(nodes.get(i));
		}
		return true;
	}

	/**
	 * 删除节点
	 * 
	 * @param paths
	 *            要删除的节点
	 * @param onlyone
	 *            是否每一次的删除都只删除选中节点中的一条
	 * @return
	 */
	public boolean delete(List<String> paths, boolean onlyone) {
		try {
			read();
			for (int i = 0; i < paths.size(); i++) {
				_delete(paths.get(i), onlyone);
			}
			write();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return false;
		}
		return true;
	}

	/**
	 * 清空某个节点
	 * 
	 * @param path
	 * @return
	 */
	public boolean _clear(String path, boolean onlyone) {
		List<Node> nodes = _doc.selectNodes(path);
		for (int i = 0; i < nodes.size(); i++) {
			if (onlyone && i > 0)
				break;
			((Element) nodes.get(i)).clearContent();
		}
		return true;
	}

	/**
	 * 清空节点
	 * 
	 * @param paths
	 *            要清空的节点的路径
	 * @param onlyone
	 * @return
	 */
	public boolean clear(List<String> paths, boolean onlyone) {
		try {
			read();
			for (int i = 0; i < paths.size(); i++) {
				_clear(paths.get(i), onlyone);
			}
			write();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return false;
		}
		return true;
	}

	/**
	 * 给节点排序
	 * 
	 * @param paths
	 *            排序节点的父节点路径
	 * @param item
	 *            参与排序的节点的列表
	 */
	public boolean order(String parent, List<String> item) {
		try {
			read();
			Element eleP = (Element) _doc.selectSingleNode(parent);
			List<Node> children = eleP.selectNodes("*");
			List<Node> selects = new ArrayList<Node>();
			List<Node> selects2 = new ArrayList<Node>();
			for (int i = 0; i < item.size(); i++) {
				Node node = _doc.selectSingleNode(item.get(i));
				if (children.contains(node)) {
					selects.add(node);
					selects2.add(node);
				}
			}
			eleP.clearContent();
			for (int i = 0; i < children.size(); i++) {
				if (selects.contains(children.get(i))) {
					eleP.add((Element) selects2.get(0));
					selects2.remove(0);
				} else {
					eleP.add((Element) children.get(i));
				}
			}
			write();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return false;
		}
		return true;
	}

	public ResultList<String> selectContent(String path) {
		List<Node> nodes = new ArrayList<Node>();
		ResultList<String> res = new ResultList<String>();
		try {
			read();
			nodes = _doc.selectNodes(path);
			List<String> list = new ArrayList<String>();
			for (int i = 0; i < nodes.size(); i++) {
				list.add(getInnerXML(nodes.get(i)));
			}
			res.setData(list);
			;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return res;
	}

	private String getInnerXML(Node node) {
		String nodeName = node.getName(); // 确定节点名
		String outerXML = node.asXML(); // 得到 outerXML

		// 注意起始节点可能会带属性
		String innerXML = outerXML.replaceAll("^<" + nodeName + ".*?>|</" + nodeName + ">$", "");
		return innerXML;
	}

	public boolean move(String path, List<String> li, Boolean onlyone) {
		try {
			read();
			Element eleP = (Element) _doc.selectSingleNode(path);
			for (int i = 0; i < li.size(); i++) {
				List<Node> nodes = _doc.selectNodes(li.get(i));
				if (onlyone) {
					if (nodes.size() > 0) {
						Node node = nodes.get(0);
						node.getParent().remove(node);
						eleP.add(node);
					}
				} else {
					for (int j = 0; j < nodes.size(); j++) {
						Node node = nodes.get(j);
						node.getParent().remove(node);
						eleP.add(node);
					}
				}
			}
			write();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return false;
		}
		return true;
	}
}
