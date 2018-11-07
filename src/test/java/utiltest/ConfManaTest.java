/**
 * 功能：测试xml操作
 * 作者：胡庆杰
 * 时间：2017-10-31
 * 说明：使用了xpath语法[https://www.w3cschool.cn/xpath/xpath-xpath-tutorialij9m1t5i.html]
 */
package utiltest;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.kingtopware.onemap.service.impl.ConfManaServiceImpl;

public class ConfManaTest {
	/**
	 * 测试更新节点 测试通过
	 * 
	 * @throws Exception
	 */
	@Test
	public void testUpdate() throws Exception {
		ConfManaServiceImpl conf = new ConfManaServiceImpl();
		List<String> paths = new ArrayList<String>();
		paths.add("/App/SystemTheme/ThemeType");
		List<String> names = new ArrayList<String>();
		names.add("WebOS");
		conf.update(paths, names, true);
	}

	/**
	 * 测试新增节点 测试通过
	 */
	@Test
	public void testAdd() {
		ConfManaServiceImpl conf = new ConfManaServiceImpl();
		List<String> paths = new ArrayList<String>();
		paths.add("/App/SystemTheme");
		List<String> names = new ArrayList<String>();
		names.add("demomo22");
		List<String> values = new ArrayList<String>();
		values.add("addkey");
		conf.add(paths, names, values, true);
	}

	/**
	 * 测试删除节点 测试通过
	 */
	@Test
	public void testDelete() {
		ConfManaServiceImpl conf = new ConfManaServiceImpl();
		List<String> paths = new ArrayList<String>();
		paths.add("/App/SystemTheme/demomo22");
		conf.delete(paths, true);
	}

	/**
	 * 测试清空节点 测试通过
	 */
	@Test
	public void testClear() {
		ConfManaServiceImpl conf = new ConfManaServiceImpl();
		List<String> paths = new ArrayList<String>();
		paths.add("/App/Extend/Layers");
		conf.clear(paths, true);
	}

	/**
	 * 测试新增一个图层
	 */
	@Test
	public void testAddLayer() {
		ConfManaServiceImpl conf = new ConfManaServiceImpl();
		List<String> paths = new ArrayList<String>();
		paths.add("/App/SystemMap/ArrayOfMapLayer");
		List<String> names = new ArrayList<String>();
		names.add("MapLayer");
		List<String> values = new ArrayList<String>();
		values.add("<ID>hqj</ID>" + "<Text>专题图层</Text>" + "<!--节点显示图标地址 -->" + "<Icon>Images/labimgs/layers.png</Icon>"
				+ "<Visible>true</Visible>" + "<Open>true</Open>" + "<Checked>false</Checked>");
		conf.add(paths, names, values, true);
	}

	/**
	 * 测试修改图层参数
	 */
	@Test
	public void testUpdateLayerParam() {
		ConfManaServiceImpl conf = new ConfManaServiceImpl();
		List<String> paths = new ArrayList<String>();
		paths.add("/App/SystemMap/ArrayOfMapLayer//MapLayer/ID[text()='hqj']/parent::*/Checked");
		List<String> values = new ArrayList<String>();
		values.add("hqjtrue");
		conf.update(paths, values, true);
	}

}
