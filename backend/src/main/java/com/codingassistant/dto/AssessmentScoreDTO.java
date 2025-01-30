package com.codingassistant.dto;

public class AssessmentScoreDTO {
    private IntelligenceScoreDTO intelligence;
    private AccelerationScoreDTO acceleration;
    private ExperienceScoreDTO experience;
    private ValueScoreDTO value;

    public IntelligenceScoreDTO getIntelligence() {
        return intelligence;
    }

    public void setIntelligence(IntelligenceScoreDTO intelligence) {
        this.intelligence = intelligence;
    }

    public AccelerationScoreDTO getAcceleration() {
        return acceleration;
    }

    public void setAcceleration(AccelerationScoreDTO acceleration) {
        this.acceleration = acceleration;
    }

    public ExperienceScoreDTO getExperience() {
        return experience;
    }

    public void setExperience(ExperienceScoreDTO experience) {
        this.experience = experience;
    }

    public ValueScoreDTO getValue() {
        return value;
    }

    public void setValue(ValueScoreDTO value) {
        this.value = value;
    }
}
