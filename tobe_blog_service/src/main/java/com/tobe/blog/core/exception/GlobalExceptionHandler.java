package com.tobe.blog.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TobeRuntimeException.class)
    public ResponseEntity<ErrorResponse> handleTobeRuntimeException(TobeRuntimeException ex) {
        log.error("TobeRuntimeException: {}", ex.getMessage());
        
        // Check if the exception is related to email already registered
        if (ex.getMessage().contains("email has been registered")) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse(409, ex.getMessage()));
        }
        
        // Default to BadRequest for other TobeRuntimeExceptions
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(400, ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        log.error("Unhandled exception: ", ex);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(500, "An unexpected error occurred"));
    }

    @Data
    @AllArgsConstructor
    static class ErrorResponse {
        private int code;
        private String message;
    }
} 