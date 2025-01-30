package com.codingassistant.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AccelerationNoteDTO {
    private String capabilities;

    @JsonProperty("iterationSize")
    private String iterationSize;

    @JsonProperty("iterationSpeed")
    private String iterationSpeed;

    public String getCapabilities() {
        return capabilities;
    }

    public void setCapabilities(String capabilities) {
        this.capabilities = capabilities;
    }

    public String getIterationSize() {
        return iterationSize;
    }

    public void setIterationSize(String iterationSize) {
        this.iterationSize = iterationSize;
    }

    public String getIterationSpeed() {
        return iterationSpeed;
    }

    public void setIterationSpeed(String iterationSpeed) {
        this.iterationSpeed = iterationSpeed;
    }
}
