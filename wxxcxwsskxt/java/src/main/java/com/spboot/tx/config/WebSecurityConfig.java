package com.spboot.tx.config;



import com.jntoo.db.ConnectionConfig;
import com.spboot.tx.security.ErrorAuthenticationEntryPoint;
import com.spboot.tx.security.SecurityFilter;
import com.spboot.tx.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.annotation.Resource;
import java.sql.Connection;

/**
 * security配置类
 * @author tanwubo
 */
@Configuration
@EnableWebSecurity
//开启基于方法的安全认证机制，也就是说在web层的controller启用注解机制的安全确认
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

    @Resource
    private UsersService userService;

    @Autowired
    private SecurityFilter securityFilter;

    @Autowired
    private ErrorAuthenticationEntryPoint errorAuthenticationEntryPoint;




    @Autowired
    public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        // 使用 BCryptPasswordEncoder 验证密码
        authenticationManagerBuilder.userDetailsService(this.userService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt 密码
        return new BCryptPasswordEncoder();
    }

    /**
     * 重新实例化bean
     */
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf()
                .disable()
                .sessionManagement()
                // 不创建Session, 使用jwt来管理用户的登录状态
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/files/**").permitAll()
                .antMatchers("/static/**").permitAll()
                .antMatchers("/upload/**").permitAll()
                .antMatchers("/api/user/**").permitAll()
                .antMatchers("/api/wxuser/login").permitAll()
                .antMatchers("/v2/**").permitAll()
                .antMatchers("/websocket/**").permitAll()
                                .antMatchers("/api/admins/insert").permitAll()
                                                                                                                                                                                                                                                               .antMatchers("/api/yonghu/insert").permitAll()
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   .antMatchers("/swagger-resources/**").permitAll()
                .antMatchers("/webjars/**").permitAll()
                .antMatchers("/swagger-ui.html").permitAll()
                .antMatchers("/v2/api-docs").permitAll()
                .antMatchers("/csrf").permitAll()
                .antMatchers("/").permitAll()
                // 其余的全部需要用户认证
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(errorAuthenticationEntryPoint);;
            // 使用WxAppletAuthenticationFilter替换默认的认证过滤器UsernamePasswordAuthenticationFilter
        http.addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);
    }

}
