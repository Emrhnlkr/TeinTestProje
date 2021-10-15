package com.javamaster.springsecurityjwt.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "cv_table")
@Data
public class CvEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String tel_no;
    @Column
    private String university_name;
    @Column
    private String career_objective;
    @Column
    private String department_name;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user_id;

    public CvEntity() {

    }
    public CvEntity(String university_name,String department_name,String tel_no,String career_objective){
        super();
        this.university_name=university_name;
        this.department_name=department_name;
        this.career_objective=career_objective;
        this.tel_no=tel_no;
    }
    public long getId(){
        return id;
    }
    public void setId(long id){
        this.id=id;
    }

    public String getUniversityName() {
        return university_name;
    }
    public void setUniversityName(String university_name) {
        this.university_name = university_name;
    }
    public String getCareerObjective(){return career_objective; }
    public void setCareerObjective(String career_objective){this.career_objective=career_objective;}

    public String getDepartmentName() {
        return department_name;
    }
    public void setDepartmentName(String department_name) {
        this.department_name = department_name;
    }

    public String getTelNo() {
        return tel_no;
    }
    public void setTelNo(String tel_no) {
        this.tel_no = tel_no;
    }



}
