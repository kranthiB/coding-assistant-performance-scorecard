package com.codingassistant.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class IntelligenceScoreDTO {
    private int autonomy;

    @JsonProperty("outputQuality")
    private int outputQuality;

    @JsonProperty("contextAwareness")
    private int contextAwareness;

    public int getAutonomy() {
        return autonomy;
    }

    public void setAutonomy(int autonomy) {
        this.autonomy = autonomy;
    }

    public int getOutputQuality() {
        return outputQuality;
    }

    public void setOutputQuality(int outputQuality) {
        this.outputQuality = outputQuality;
    }

    public int getContextAwareness() {
        return contextAwareness;
    }

    public void setContextAwareness(int contextAwareness) {
        this.contextAwareness = contextAwareness;
    }
}
