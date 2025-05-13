package com.spboot.tx.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import javax.annotation.Resource;
import java.io.File;

@Configuration
public class SwaggerWebMvcConfig extends WebMvcConfigurationSupport {
    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {
            "classpath:/META-INF/resources/", "classpath:/resources/",
            "classpath:/static/", "classpath:/public/" };

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");

        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");

        registry.addResourceHandler(Configure.FILE_PREFIX+"**")
                .addResourceLocations("file:"+Configure.UPLOAD_DIR);

        if (!registry.hasMappingForPattern("/**")) {
            String root = "file:"+System.getProperty("user.dir").replaceAll("\\\\" , "/")+"/src/main/webapp/";
            System.out.println(root);
            registry.addResourceHandler("/**").addResourceLocations(root).addResourceLocations(CLASSPATH_RESOURCE_LOCATIONS);
        }

    }

}
