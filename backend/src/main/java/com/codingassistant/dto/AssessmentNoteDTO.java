package com.codingassistant.dto;

public class AssessmentNoteDTO {
    private IntelligenceNoteDTO intelligence;
    private AccelerationNoteDTO acceleration;
    private ExperienceNoteDTO experience;
    private ValueNoteDTO value;

    public IntelligenceNoteDTO getIntelligence() {
        return intelligence;
    }

    public void setIntelligence(IntelligenceNoteDTO intelligence) {
        this.intelligence = intelligence;
    }

    public AccelerationNoteDTO getAcceleration() {
        return acceleration;
    }

    public void setAcceleration(AccelerationNoteDTO acceleration) {
        this.acceleration = acceleration;
    }

    public ExperienceNoteDTO getExperience() {
        return experience;
    }

    public void setExperience(ExperienceNoteDTO experience) {
        this.experience = experience;
    }

    public ValueNoteDTO getValue() {
        return value;
    }

    public void setValue(ValueNoteDTO value) {
        this.value = value;
    }
}
