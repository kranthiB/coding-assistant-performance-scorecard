package com.codingassistant.dto;

import com.codingassistant.model.AssessmentCategory;
import com.codingassistant.model.AssessmentScore;

import java.time.LocalDateTime;
import java.util.List;

public class AssessmentDto {

    private long id;
    private AssessmentScoreDto score;
    private List<AssessmentCategoryDto>  categories;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public AssessmentScoreDto getScore() {
        return score;
    }

    public void setScore(AssessmentScoreDto score) {
        this.score = score;
    }

    public List<AssessmentCategoryDto> getCategories() {
        return categories;
    }

    public void setCategories(List<AssessmentCategoryDto> categories) {
        this.categories = categories;
    }
}
