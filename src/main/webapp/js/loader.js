/** 
 *  页面加载等待页面 
 *  <在网页下方body上引用的最后一个js >
 */
ctr = new ktw.UCWaitBox({
     Parent: $("body")
});
ctr.Show();
window.onload = function(){  
	ctr.Close();
}