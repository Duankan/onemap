package com.kingtopware.onemap.service;

import java.util.List;

import org.dom4j.Node;

import com.kingtopware.framework.bean.ResultList;

public interface ConfManaService {
	/**
	 * 根据路径去查找节点,返回查找到的节点
	 * 
	 * @param path
	 *            要进行查询的节点的路径
	 * @return 查找到的节点是一个List集合
	 */
	public ResultList<String> select(String path);

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
	public boolean update(List<String> paths, List<String> values, boolean onlyone);

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
	public boolean add(List<String> paths, List<String> names, List<String> values, boolean onlyone);

	/**
	 * 删除节点
	 * 
	 * @param paths
	 *            要删除的节点
	 * @param onlyone
	 *            是否每一次的删除都只删除选中节点中的一条
	 * @return
	 */
	public boolean delete(List<String> paths, boolean onlyone);

	/**
	 * 清空节点
	 * 
	 * @param paths
	 *            要清空的节点的路径
	 * @param onlyone
	 * @return
	 */
	public boolean clear(List<String> paths, boolean onlyone);

	/**
	 * 给节点排序
	 * 
	 * @param parent
	 *            参与排序的节点的父节点
	 * @param items
	 *            参与排序的节点
	 * @return
	 */
	public boolean order(String parent, List<String> items);

	/**
	 * 返回指定节点的内容 相当于javascript中的innerHTML
	 * @param path
	 * @return
	 */
	public ResultList<String> selectContent(String path);

	/**
	 * 移动选中的节点至指定的路径下
	 * @param path
	 * @param li
	 * @return
	 */
	public boolean move(String path, List<String> li,Boolean onlyone);
}
