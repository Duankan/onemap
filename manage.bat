@echo off
set /p vari=要执行的操作(1:清理打包文件,2:清理eclispe工程文件,3:打包,4:运行,5:退出):
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
