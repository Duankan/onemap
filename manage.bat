@echo off
set /p vari=Ҫִ�еĲ���(1:�������ļ�,2:����eclispe�����ļ�,3:���,4:����,5:�˳�):
IF %vari%==1 goto clean
IF %vari%==2 goto eclipseclean
IF %vari%==3 goto package
IF %vari%==4 goto run
exit

:clean
mvn clean
exit

:eclipseclean
start /b mvn eclipse:clean
exit

:package
start /b mvn package -DskipTests
exit

:run
start /b mvn tomcat7:run
