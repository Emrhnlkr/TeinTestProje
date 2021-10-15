package com.javamaster.springsecurityjwt.controller;


import com.javamaster.springsecurityjwt.entity.UserEntity;
import com.javamaster.springsecurityjwt.exception.ResourceNotFoundException;
import com.javamaster.springsecurityjwt.repository.UserEntityRepository;
import com.javamaster.springsecurityjwt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserEntityRepository userEntityRepository;
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserEntity> getAllUsers(){
        return this.userEntityRepository.findAll();
    }
    @GetMapping("/{id}")
    public UserEntity getUserById(@PathVariable(value = "id")long userId){
        return this.userEntityRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("User not found:"+userId));
    }
    //create user

   // public UserEntity createUser(@RequestBody UserEntity user){
      //  return this.userEntityRepository.save(user);
   // }
    @PostMapping
    public String registerUser(@RequestBody @Valid RegistrationRequest registrationRequest) {
        UserEntity u = new UserEntity();
        u.setPassword(registrationRequest.getPassword());
        u.setFirstName(registrationRequest.getLogin());
        userService.saveUser(u);
        return "OK";
    }

    //update user
    @PutMapping("/{id}")
    public UserEntity updateUser(@RequestBody UserEntity user,@PathVariable ("id")long userId){
        UserEntity existingUser = this.userEntityRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found:" + userId));
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());
        return this.userEntityRepository.save(existingUser);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<UserEntity> deleteUser(@PathVariable ("id") long userId){
        UserEntity existingUser = this.userEntityRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found:" + userId));
        this.userEntityRepository.delete(existingUser);
        return ResponseEntity.ok().build();
    }
}
