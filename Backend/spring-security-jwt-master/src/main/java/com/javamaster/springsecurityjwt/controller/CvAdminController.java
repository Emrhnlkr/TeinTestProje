package com.javamaster.springsecurityjwt.controller;


import com.javamaster.springsecurityjwt.config.CustomUserDetails;
import com.javamaster.springsecurityjwt.entity.CvEntity;
import com.javamaster.springsecurityjwt.entity.UserEntity;
import com.javamaster.springsecurityjwt.repository.CvEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/cv")
public class CvAdminController {
    @Autowired
    private CvEntityRepository cvEntityRepository;


    @GetMapping
    public List<CvEntity> getAllUsers() {
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return this.cvEntityRepository.findAll();
    }

}
