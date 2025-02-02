package com.codingassistant.dto;

import java.time.LocalDate;

public class ToolDto {

    private long id;
    private String name;
    private String status;
    private String description;
    private LocalDate lastAssessment;
    private String category;
    private AssessmentDTO assessment;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getLastAssessment() {
        return lastAssessment;
    }

    public void setLastAssessment(LocalDate lastAssessment) {
        this.lastAssessment = lastAssessment;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public AssessmentDTO getAssessment() {
        return assessment;
    }

    public void setAssessment(AssessmentDTO assessment) {
        this.assessment = assessment;
    }
}
