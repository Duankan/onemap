package utiltest;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import org.junit.Test;

public class EncodeTest {

	@Test
	public void writeUTF8() throws Exception {
		String json = "要写入的JSON字符串";
		String file = "D:\\1.txt";
		FileOutputStream writerStream = new FileOutputStream(file);    
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(writerStream, "UTF8")); 
		writer.write(json);
		writer.close();  
	}
	
	@Test	
	public void write() {
		try {  
		    FileInputStream fis = new FileInputStream("E:\\jackletter\\OneMap\\V2.0\\Code\\trunk\\onemap\\src\\main\\webapp\\config\\app.xml");  
		    InputStreamReader isr = new InputStreamReader(fis, "UTF-8");  
		    BufferedReader br = new BufferedReader(isr);  
		  
		    FileOutputStream fos = new FileOutputStream("E:\\jackletter\\OneMap\\V2.0\\Code\\trunk\\onemap\\src\\main\\webapp\\config\\appjavautf8.xml");  
		    fos.write(new byte[]{(byte)0xEF, (byte)0xBB, (byte)0xBF});  
		    OutputStreamWriter osw = new OutputStreamWriter(fos, "UTF-8");  
		    BufferedWriter bw = new BufferedWriter(osw);  
		    String line=null;
		    while((line = br.readLine()) != null) {  
		        bw.write(line);  
		        bw.newLine();  
		    }  
		    bw.close();  
		    br.close();  
		} catch (IOException e) {  
		    System.out.println(e.toString());  
		}  
	}
}
