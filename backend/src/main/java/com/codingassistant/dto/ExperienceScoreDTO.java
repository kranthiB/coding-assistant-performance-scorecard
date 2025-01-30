package com.codingassistant.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ExperienceScoreDTO {
    @JsonProperty("easeOfUse")
    private int easeOfUse;

    private int flexibility;
    private int reliability;

    public int getEaseOfUse() {
        return easeOfUse;
    }

    public void setEaseOfUse(int easeOfUse) {
        this.easeOfUse = easeOfUse;
    }

    public int getFlexibility() {
        return flexibility;
    }

    public void setFlexibility(int flexibility) {
        this.flexibility = flexibility;
    }

    public int getReliability() {
        return reliability;
    }

    public void setReliability(int reliability) {
        this.reliability = reliability;
    }
}
