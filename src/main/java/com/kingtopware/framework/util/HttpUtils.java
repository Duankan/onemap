package com.kingtopware.framework.util;
import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.CookieStore;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URI;
import java.util.*;

/**
 * @author dankin
 */
public class HttpUtils {
    private Logger logger = LoggerFactory.getLogger(HttpUtils.class);
    private static CookieStore cookieStore;
    //Http Get 请求示例
    public String doGet(String url) {
        try {
            DefaultHttpClient client = new DefaultHttpClient();
            //发送get请求
            HttpGet request = new HttpGet(url);
            //保存登录信息
            if (cookieStore != null) {
                client.setCookieStore(cookieStore);
            }
            HttpResponse response = client.execute(request);
            cookieStore = client.getCookieStore();
            /**请求发送成功，并得到响应**/
            if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                /**读取服务器返回过来的json字符串数据**/
                String strResult = EntityUtils.toString(response.getEntity(), "utf-8");
                return strResult;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    //封装post请求
    public String doPost(String url, Map params, Map headers) {
        BufferedReader in = null;
        try {
            // 定义HttpClient
            DefaultHttpClient client = new DefaultHttpClient();
            // 实例化HTTP方法
            HttpPost httpPost = new HttpPost();
            //添加头信息
            if (headers != null) {
                for (Iterator iter = headers.keySet().iterator(); iter.hasNext(); ) {
                    String key = (String) iter.next();
                    String value = String.valueOf(headers.get(key));
                    httpPost.addHeader(key, value);
                }
            }
            httpPost.setURI(new URI(url));
            //设置参数
            List<NameValuePair> nvps = new ArrayList<NameValuePair>();
            if (params != null) {
                for (Iterator iter = params.keySet().iterator(); iter.hasNext(); ) {
                    String name = (String) iter.next();
                    String value = String.valueOf(params.get(name));
                    nvps.add(new BasicNameValuePair(name, value));
                }
            }
            httpPost.setEntity(new UrlEncodedFormEntity(nvps, HTTP.UTF_8));
            if (!url.contains("login") && cookieStore != null) {
                client.setCookieStore(cookieStore);
            }
            HttpResponse response = client.execute(httpPost);
            cookieStore = client.getCookieStore();
            int code = response.getStatusLine().getStatusCode();
            if (code == HttpStatus.SC_OK) { //200：请求成功
                in = new BufferedReader(new InputStreamReader(response.getEntity()
                        .getContent(), "utf-8"));
                StringBuffer sb = new StringBuffer("");
                String line = "";
                String NL = System.getProperty("line.separator");
                while ((line = in.readLine()) != null) {
                    sb.append(line + NL);
                }
                in.close();
                return sb.toString();
            }
            //不知道为啥还得手动去关闭响应链接？？？
            httpPost.releaseConnection();
            //302重定向
            if (code == HttpStatus.SC_MOVED_TEMPORARILY) {
                Header header = response.getFirstHeader("location"); // 跳转的目标地址是在 HTTP-HEAD 中的
                // 这就是跳转后的地址，再向这个地址发出新申请，以便得到跳转后的信息是啥。
//                String newuri = "http://localhost:8085/dubboConsumer/"+StringUtils.substringBetween(header.getValue(),"/",";");
                String newuri = "http://www.datalearner.com/" + header.getValue();
                HttpGet newGet = new HttpGet(newuri);
                HttpResponse newResponse = client.execute(newGet);
                code = newResponse.getStatusLine().getStatusCode();
                //200：请求成功
                if (code == HttpStatus.SC_OK) {
                    in = new BufferedReader(new InputStreamReader(newResponse.getEntity()
                            .getContent(), "utf-8"));
                    StringBuffer sb2 = new StringBuffer("");
                    String line = "";
                    String NL = System.getProperty("line.separator");
                    while ((line = in.readLine()) != null) {
                        sb2.append(line + NL);
                    }
                    in.close();
                    return sb2.toString();
                }
            } else {
                System.out.println("状态码：" + code);
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    //添加头，添加参数
    public static List<Map<String,Object>> addHeadAndParam(String heads,String params){
        List<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
        Map<String,Object> head=new HashMap<String, Object>();
        Map<String,Object> param=new HashMap<String, Object>();
        head.put("Content-Type",heads);
        param.put("statistics",params);
        list.add(head);
        list.add(param);
        return list;
    }
}
