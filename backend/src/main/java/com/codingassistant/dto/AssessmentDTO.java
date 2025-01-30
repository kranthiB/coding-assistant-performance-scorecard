package com.codingassistant.dto;

import com.codingassistant.model.AssessmentScore;

import java.util.List;

public class AssessmentDTO {

    private long id;
    private AssessmentScore score;
    private List<AssessmentCategoryDto>  categories;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public AssessmentScore getScore() {
        return score;
    }

    public void setScore(AssessmentScore score) {
        this.score = score;
    }

    public List<AssessmentCategoryDto> getCategories() {
        return categories;
    }

    public void setCategories(List<AssessmentCategoryDto> categories) {
        this.categories = categories;
    }
}
