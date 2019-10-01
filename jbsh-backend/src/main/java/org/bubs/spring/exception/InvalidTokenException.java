package org.bubs.spring.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException() {
        super("You are not authorized to delete this resource.");
    }
}
