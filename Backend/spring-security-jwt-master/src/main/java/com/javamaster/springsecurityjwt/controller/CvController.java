package com.javamaster.springsecurityjwt.controller;


import com.javamaster.springsecurityjwt.config.CustomUserDetails;
import com.javamaster.springsecurityjwt.entity.CvEntity;
import com.javamaster.springsecurityjwt.entity.RoleEntity;
import com.javamaster.springsecurityjwt.entity.UserEntity;
import com.javamaster.springsecurityjwt.exception.ResourceNotFoundException;
import com.javamaster.springsecurityjwt.repository.CvEntityRepository;
import com.javamaster.springsecurityjwt.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3002")
@RestController
@RequestMapping("/user/cv")
public class CvController {
    @Autowired
    private CvEntityRepository cvEntityRepository;

    @Autowired
    private UserEntityRepository userEntityRepository;


    @GetMapping
    public List<CvEntity> getAllUsers() {
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserEntity userEntity = userEntityRepository.findByLogin(customUserDetails.getUsername());
        return this.cvEntityRepository.findAllByUser_id(userEntity);
    }

    //create cv
    @PostMapping
    public CvEntity createCV(@RequestBody CvEntity cv) {
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserEntity userEntity = userEntityRepository.findByLogin(customUserDetails.getUsername());
        cv.setUser_id(userEntity);
        return this.cvEntityRepository.save(cv);
    }

    @GetMapping("/{id}")
    public CvEntity getCvById(@PathVariable(value = "id") long userId) {
        return this.cvEntityRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found:" + userId));
    }

    //Put cv
    @PutMapping("/{id}")
    public CvEntity updateUser(@RequestBody CvEntity cv, @PathVariable("id") long userId) {
        CvEntity existingCV = this.cvEntityRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found:" + userId));
        existingCV.setUniversityName(cv.getUniversityName());
        existingCV.setCareerObjective(cv.getCareerObjective());
        existingCV.setDepartmentName(cv.getDepartmentName());
        existingCV.setTelNo(cv.getTelNo());
        return this.cvEntityRepository.save(existingCV);
    }

    //Delete cv
    @DeleteMapping("/{id}")
    public ResponseEntity<CvEntity> deleteCv(@PathVariable("id") long userId) {
        CvEntity existingCv = this.cvEntityRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found:" + userId));
        this.cvEntityRepository.delete(existingCv);
        return ResponseEntity.ok().build();
    }
}
