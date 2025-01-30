package com.codingassistant.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class IntelligenceNoteDTO {
    private String autonomy;

    @JsonProperty("outputQuality")
    private String outputQuality;

    @JsonProperty("contextAwareness")
    private String contextAwareness;

    public String getAutonomy() {
        return autonomy;
    }

    public void setAutonomy(String autonomy) {
        this.autonomy = autonomy;
    }

    public String getOutputQuality() {
        return outputQuality;
    }

    public void setOutputQuality(String outputQuality) {
        this.outputQuality = outputQuality;
    }

    public String getContextAwareness() {
        return contextAwareness;
    }

    public void setContextAwareness(String contextAwareness) {
        this.contextAwareness = contextAwareness;
    }
}
