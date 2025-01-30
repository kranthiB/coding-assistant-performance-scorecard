package com.codingassistant.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AccelerationScoreDTO {
    private int capabilities;

    @JsonProperty("iterationSize")
    private int iterationSize;

    @JsonProperty("iterationSpeed")
    private int iterationSpeed;

    public int getCapabilities() {
        return capabilities;
    }

    public void setCapabilities(int capabilities) {
        this.capabilities = capabilities;
    }

    public int getIterationSize() {
        return iterationSize;
    }

    public void setIterationSize(int iterationSize) {
        this.iterationSize = iterationSize;
    }

    public int getIterationSpeed() {
        return iterationSpeed;
    }

    public void setIterationSpeed(int iterationSpeed) {
        this.iterationSpeed = iterationSpeed;
    }
}
