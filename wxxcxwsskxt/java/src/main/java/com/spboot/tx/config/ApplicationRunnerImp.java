package com.spboot.tx.config;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.stereotype.Component;


/**
 * 系统启动完成后运行该类
 */
@Component
public class ApplicationRunnerImp implements org.springframework.boot.ApplicationRunner {

    @Value("${server.port}")
    private int port;


    private static final Logger logger = LoggerFactory.getLogger(ApplicationRunnerImp.class);

    /**
     * 系统自动运行这个方法
     * @param args
     * @throws Exception
     */
    @Override
    public void run(ApplicationArguments args) throws Exception {
        logger.info("start success :");
        logger.info("click Swagger2 Url to Document: http://localhost:"+port+"/swagger-ui.html");

    }
}
