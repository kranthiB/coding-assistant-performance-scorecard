package com.codingassistant.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ExperienceNoteDTO {
    @JsonProperty("easeOfUse")
    private String easeOfUse;

    private String flexibility;
    private String reliability;

    public String getEaseOfUse() {
        return easeOfUse;
    }

    public void setEaseOfUse(String easeOfUse) {
        this.easeOfUse = easeOfUse;
    }

    public String getFlexibility() {
        return flexibility;
    }

    public void setFlexibility(String flexibility) {
        this.flexibility = flexibility;
    }

    public String getReliability() {
        return reliability;
    }

    public void setReliability(String reliability) {
        this.reliability = reliability;
    }
}
