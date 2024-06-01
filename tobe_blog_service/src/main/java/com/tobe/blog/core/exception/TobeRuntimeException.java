package com.tobe.blog.core.exception;

public class TobeRuntimeException extends RuntimeException {

    public TobeRuntimeException(String message) {
        super(message);
    }

    public TobeRuntimeException() {
        super();
    }

    public TobeRuntimeException(String message, Throwable cause) {
        super(message, cause);
    }

    public TobeRuntimeException(Throwable cause) {
        super(cause);
    }

}
