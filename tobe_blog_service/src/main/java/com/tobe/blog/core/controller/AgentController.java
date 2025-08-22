package com.tobe.blog.core.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tobe.blog.beans.dto.agent.AgentChatRequestDTO;
import com.tobe.blog.beans.dto.agent.AgentChatResponseDTO;
import com.tobe.blog.core.service.AgentService;
import com.tobe.blog.core.utils.AuthenticationUtil;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/v1/agent")
@RequiredArgsConstructor
public class AgentController {

    private final AgentService agentService;

    /**
     * Send a chat request to the AI agent
     * @param request The chat request
     * @return The chat response
     */
    @PostMapping("/chat")
    public ResponseEntity<AgentChatResponseDTO> chat(@Valid @RequestBody AgentChatRequestDTO request) {
        return AuthenticationUtil.withAuthenticatedUser(user -> {
            AgentChatResponseDTO response = agentService.sendChatRequest(request);
            
            if (response.getError() != null) {
                log.error("Agent chat error: {}", response.getError());
                return ResponseEntity.badRequest().body(response);
            }
            
            return ResponseEntity.ok(response);
        });
    }

    /**
     * Send a streaming chat request to the AI agent
     * @param request The chat request
     * @param response HTTP response for setting headers
     * @return Server-Sent Events stream
     */
    @PostMapping(value = "/chat/stream", produces = "text/event-stream;charset=UTF-8")
    public void streamChat(@RequestBody AgentChatRequestDTO request, HttpServletResponse response) {
        // Set proper headers for SSE with UTF-8 encoding
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/event-stream;charset=UTF-8");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Connection", "keep-alive");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "Cache-Control");
        
        try {
            // Process the streaming request
            agentService.sendStreamingChatRequest(request)
                .forEach(chunk -> {
                    try {
                        // Send chunk directly
                        response.getWriter().write("data: " + chunk + "\n\n");
                        response.getWriter().flush();
                        
                        // Add a small delay to simulate real streaming
                        Thread.sleep(10);
                    } catch (IOException | InterruptedException e) {
                        log.error("Error sending chunk to client", e);
                    }
                });
            
            // Send completion event
            response.getWriter().write("data: [DONE]\n\n");
            response.getWriter().flush();
            
        } catch (Exception e) {
            log.error("Error processing streaming request", e);
            try {
                response.getWriter().write("data: Error: " + e.getMessage() + "\n\n");
                response.getWriter().flush();
            } catch (IOException ex) {
                log.error("Error sending error event to client", ex);
            }
        }
    }
} 