package com.tobe.blog.core.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    @Value("${mail.mail-from}")
    private String mailFrom;

    /**
     * Send an email using an HTML template
     * 
     * @param to Recipient email address
     * @param subject Email subject
     * @param templateName Name of the template file without extension
     * @param variables Variables to be used in the template
     */
    public void sendTemplateEmail(String to, String subject, String templateName, Map<String, Object> variables) {
        try {
            // Prepare the context with variables for the template
            Context context = new Context();
            variables.forEach(context::setVariable);

            // Process the HTML template
            String htmlContent = templateEngine.process(templateName, context);

            // Create and send the email
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setTo(to);
            helper.setFrom(mailFrom);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("Email sent successfully to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send email to: {}", to, e);
            throw new RuntimeException("Failed to send email", e);
        }
    }
} 