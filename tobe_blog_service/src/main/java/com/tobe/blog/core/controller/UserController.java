package com.tobe.blog.core.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tobe.blog.beans.dto.user.UserCreationDTO;
import com.tobe.blog.beans.dto.user.UserGeneralDTO;
import com.tobe.blog.beans.dto.user.UserUpdateDTO;
import com.tobe.blog.core.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/v1/users")
@AllArgsConstructor
public class UserController {

    private UserService userService;

    /**
     * API to get all users, only open to admin
     */
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Page<UserGeneralDTO>> getUsers(
            @RequestParam(value = "current", required = false, defaultValue = "1") int current,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(userService.getUsers(current, size));
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
    public ResponseEntity<UserGeneralDTO> updateUser(@PathVariable long id,
                                                     @RequestBody @Validated UserUpdateDTO dto) {
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
}
