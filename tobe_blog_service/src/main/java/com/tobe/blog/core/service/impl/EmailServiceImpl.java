package com.tobe.blog.core.service.impl;

import com.tobe.blog.core.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

/**
 * Implementation of the EmailService that sends emails using Spring's JavaMailSender
 * and processes templates with Thymeleaf
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.frontend-url:http://localhost:3000}")
    private String frontendUrl;

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean sendHtmlEmail(String to, String subject, String templateName, Map<String, Object> variables) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            
            Context context = new Context();
            variables.forEach(context::setVariable);
            
            String htmlContent = templateEngine.process(templateName, context);
            helper.setText(htmlContent, true);
            
            javaMailSender.send(message);
            log.info("HTML email sent to {} with subject: {}", to, subject);
            return true;
        } catch (MessagingException e) {
            log.error("Failed to send HTML email to {} with subject: {}", to, subject, e);
            return false;
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean sendSimpleEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            
            javaMailSender.send(message);
            log.info("Simple email sent to {} with subject: {}", to, subject);
            return true;
        } catch (Exception e) {
            log.error("Failed to send simple email to {} with subject: {}", to, subject, e);
            return false;
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean sendPasswordResetEmail(String to, String name, String resetUrl, int expiryMinutes) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("name", name);
        variables.put("resetUrl", resetUrl);
        variables.put("expiryMinutes", expiryMinutes);
        variables.put("email", to);
        
        return sendHtmlEmail(
                to,
                "Reset Your Tobe Blog Password",
                "password-reset-email",
                variables
        );
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean sendWelcomeEmail(String to, String name, String loginUrl) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("name", name);
        variables.put("email", to);
        variables.put("loginUrl", loginUrl != null ? loginUrl : frontendUrl + "/signin");
        
        return sendHtmlEmail(
                to,
                "Welcome to Tobe Blog!",
                "welcome-email",
                variables
        );
    }
} 