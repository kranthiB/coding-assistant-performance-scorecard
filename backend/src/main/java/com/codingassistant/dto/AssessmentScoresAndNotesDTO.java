package com.codingassistant.dto;

public class AssessmentScoresAndNotesDTO {

    private AssessmentScoreDTO scores;
    private AssessmentNoteDTO notes;

    public AssessmentScoreDTO getScores() {
        return scores;
    }

    public void setScores(AssessmentScoreDTO scores) {
        this.scores = scores;
    }

    public AssessmentNoteDTO getNotes() {
        return notes;
    }

    public void setNotes(AssessmentNoteDTO notes) {
        this.notes = notes;
    }
}
