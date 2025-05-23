package com.tobe.blog.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailNotVerifiedException.class)
    public ResponseEntity<ErrorResponse> handleEmailNotVerifiedException(EmailNotVerifiedException ex) {
        log.warn("Email verification required: {}", ex.getMessage());
        return ErrorResponse.unprocessableEntity(ex.getMessage());
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        log.warn("User not found: {}", ex.getMessage());
        return ErrorResponse.unauthorized("Invalid username or password");
    }

    @ExceptionHandler(TobeRuntimeException.class)
    public ResponseEntity<ErrorResponse> handleTobeRuntimeException(TobeRuntimeException ex) {
        log.error("TobeRuntimeException: {}", ex.getMessage());
        
        // Check if the exception is related to email already registered
        if (ex.getMessage().contains("email has been registered")) {
            return ErrorResponse.conflict(ex.getMessage());
        }
        
        // Default to BadRequest for other TobeRuntimeExceptions
        return ErrorResponse.badRequest(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        log.error("Unhandled exception: ", ex);
        return ErrorResponse.internalServerError("An unexpected error occurred");
    }

    @Data
    @AllArgsConstructor
    public static class ErrorResponse {
        private int code;
        private String message;
        
        public static ResponseEntity<ErrorResponse> unauthorized(String message) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(401, message));
        }
        
        public static ResponseEntity<ErrorResponse> unprocessableEntity(String message) {
            return ResponseEntity
                    .status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body(new ErrorResponse(422, message));
        }
        
        public static ResponseEntity<ErrorResponse> conflict(String message) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse(409, message));
        }
        
        public static ResponseEntity<ErrorResponse> badRequest(String message) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(400, message));
        }
        
        public static ResponseEntity<ErrorResponse> internalServerError(String message) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(500, message));
        }
    }
} 