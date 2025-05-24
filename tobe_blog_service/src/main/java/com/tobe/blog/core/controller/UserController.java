package com.tobe.blog.core.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.user.UserCreationDTO;
import com.tobe.blog.beans.dto.user.UserGeneralDTO;
import com.tobe.blog.beans.dto.user.UserUpdateDTO;
import com.tobe.blog.core.service.UserService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * API to get all users, only open to admin
     */
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Page<UserGeneralDTO>> getUsers(
        @RequestParam(value = "current", required = false, defaultValue = "1") int current,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
        @RequestParam(value = "keyword", required = false) String keyword,
        @RequestParam(value = "emailVerified", required = false) Boolean emailVerified
    ) {
        return ResponseEntity.ok(userService.getUsers(current, size, keyword, emailVerified));
    }

    /**
     * API to get a specific user profile by a user id
     */
    @GetMapping("{id}")
    public ResponseEntity<UserGeneralDTO> getUser(@PathVariable long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    /**
     * API to create a new user
     */
    @PostMapping
    public ResponseEntity<UserGeneralDTO> createUser(@RequestBody @Validated UserCreationDTO dto) {
        return ResponseEntity.ok(userService.createUser(dto));
    }

    /**
     * API to update a specific user's profile
     */
    @PutMapping("{id}")
    public ResponseEntity<UserGeneralDTO> updateUser(
        @PathVariable long id,
        @RequestBody @Validated UserUpdateDTO dto) 
    {
        return ResponseEntity.ok(userService.updateUser(dto));
    }

    /**
     * API to soft-delete a specific user by id, only open to admin
     */
    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<UserGeneralDTO> deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(null);
    }

    /**
     * API to update user roles, only open to admin
     */
    @PutMapping("{id}/roles")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<UserGeneralDTO> updateUserRoles(
        @PathVariable long id,
        @RequestBody java.util.List<String> roles
    ) {
        return ResponseEntity.ok(userService.updateUserRoles(id, roles));
    }
}
