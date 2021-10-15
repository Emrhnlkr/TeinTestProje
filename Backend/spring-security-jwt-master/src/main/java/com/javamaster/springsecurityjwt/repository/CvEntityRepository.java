package com.javamaster.springsecurityjwt.repository;

import com.javamaster.springsecurityjwt.config.CustomUserDetails;
import com.javamaster.springsecurityjwt.entity.CvEntity;
import com.javamaster.springsecurityjwt.entity.UserEntity;
import com.javamaster.springsecurityjwt.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CvEntityRepository extends JpaRepository<CvEntity, Long> {

    @Query("select c from CvEntity c where c.user_id =:userEntity")
    List<CvEntity> findAllByUser_id(UserEntity userEntity);



}
