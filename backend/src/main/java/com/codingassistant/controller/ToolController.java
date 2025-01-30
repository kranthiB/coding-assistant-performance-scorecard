package com.codingassistant.controller;

import com.codingassistant.dto.*;
import com.codingassistant.model.Assessment;
import com.codingassistant.model.AssessmentCategory;
import com.codingassistant.model.Tool;
import com.codingassistant.service.ToolService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/tools")
public class ToolController {

    private static final Logger logger = LoggerFactory.getLogger(ToolController.class);
    private static final String CATEGORY_SCORE_FORMAT = "{\"score\": %s }";
    private final ToolService toolService;
    private final ObjectMapper objectMapper;

    public ToolController(@Autowired final ToolService toolService) {
        this.toolService = toolService;
        this.objectMapper = new ObjectMapper();
    }

    @GetMapping
    public ResponseEntity<List<ToolDto>> getAllTools() {
        return ResponseEntity.ok(toolService.getAllTools());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToolDto> getToolById(@PathVariable Long id) {
        return ResponseEntity.ok(toolService.getToolDtoById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateTool(@PathVariable Long id, @RequestBody AssessmentScoreDTO assessmentScoreDTO) throws JsonProcessingException {
        Tool tool = toolService.getToolById(id);
        updateScores(assessmentScoreDTO, tool.getAssessment());
        toolService.saveTool(tool);
        return ResponseEntity.ok("SUCCESSFULLY UPDATED");
    }

    private void updateScores(AssessmentScoreDTO assessmentScoreDTO, Assessment assessment) throws JsonProcessingException {
        updateAccelerationScore(assessmentScoreDTO.getAcceleration(), assessment);
        updateIntelligenceScore(assessmentScoreDTO.getIntelligence(), assessment);
        updateExperienceScore(assessmentScoreDTO.getExperience(), assessment);
        updateValueScore(assessmentScoreDTO.getValue(), assessment);
    }

    private void updateAccelerationScore(AccelerationScoreDTO accelerationScoreDTO, Assessment assessment) throws JsonProcessingException {
        int iterationSize = accelerationScoreDTO.getIterationSize();
        int iterationSpeed = accelerationScoreDTO.getIterationSpeed();
        int capabilities = accelerationScoreDTO.getCapabilities();
        int accelerationScore = iterationSize + iterationSpeed + capabilities;
        assessment.getAssessmentScore().setAcceleration(accelerationScore);
        AssessmentCategory category = assessment.getCategories().stream()
                .filter(c -> c.getName().equals("Acceleration"))
                .findFirst()
                .orElse(new AssessmentCategory());
        category.setScore(String.format(CATEGORY_SCORE_FORMAT, objectMapper.writeValueAsString(accelerationScoreDTO)));
    }

    private void updateIntelligenceScore(IntelligenceScoreDTO intelligenceScoreDTO, Assessment assessment) throws JsonProcessingException {
        int contextAwareness = intelligenceScoreDTO.getContextAwareness();
        int outputQuality = intelligenceScoreDTO.getOutputQuality();
        int autonomy = intelligenceScoreDTO.getAutonomy();
        int intelligenceScore = contextAwareness + outputQuality + autonomy;
        assessment.getAssessmentScore().setIntelligence(intelligenceScore);
        AssessmentCategory category = assessment.getCategories().stream()
               .filter(c -> c.getName().equals("Intelligence"))
               .findFirst()
               .orElse(new AssessmentCategory());
        category.setScore(String.format(CATEGORY_SCORE_FORMAT, objectMapper.writeValueAsString(intelligenceScoreDTO)));
    }

    private void updateExperienceScore(ExperienceScoreDTO experienceScoreDTO, Assessment assessment) throws JsonProcessingException {
        int easeOfUse = experienceScoreDTO.getEaseOfUse();
        int flexibility = experienceScoreDTO.getFlexibility();
        int reliability = experienceScoreDTO.getReliability();
        int experienceScore = easeOfUse + flexibility + reliability;
        assessment.getAssessmentScore().setExperience(experienceScore);
        AssessmentCategory category = assessment.getCategories().stream()
                .filter(c -> c.getName().equals("Experience"))
               .findFirst().orElse(new AssessmentCategory());
        category.setScore(String.format(CATEGORY_SCORE_FORMAT, objectMapper.writeValueAsString(experienceScoreDTO)));
    }

    private void updateValueScore(ValueScoreDTO valueScoreDTO, Assessment assessment) throws JsonProcessingException {
        int valueScore = valueScoreDTO.getValue();
        assessment.getAssessmentScore().setValue(valueScore);
        AssessmentCategory category = assessment.getCategories().stream()
                .filter(c -> c.getName().equals("Value"))
                .findFirst().orElse(new AssessmentCategory());
        category.setScore(String.format(CATEGORY_SCORE_FORMAT, objectMapper.writeValueAsString(valueScoreDTO)));
    }
}
