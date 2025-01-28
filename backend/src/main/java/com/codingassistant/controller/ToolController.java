package com.codingassistant.controller;

import com.codingassistant.dto.AssessmentCategoryDto;
import com.codingassistant.dto.AssessmentDto;
import com.codingassistant.dto.ToolDto;
import com.codingassistant.model.Assessment;
import com.codingassistant.model.AssessmentCategory;
import com.codingassistant.model.Tool;
import com.codingassistant.service.ToolService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/tools")
public class ToolController {

    private static final Logger logger = LoggerFactory.getLogger(ToolController.class);
    private final ToolService toolService;

    @Autowired
    public ToolController(ToolService toolService) {
        this.toolService = toolService;
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
    public ResponseEntity<ToolDto> updateTool(@PathVariable Long id, @RequestBody ToolDto toolDto) {
        ToolDto updatedToolDto = new ToolDto();
        Tool tool = toolService.getToolById(id);
        updateToolFields(tool, toolDto);
        toolService.saveTool(tool);
        return ResponseEntity.ok(toolService.getToolDtoById(id));
    }

    private void updateToolFields(Tool tool, ToolDto toolDto) {
        tool.setName(toolDto.getName());
        tool.setScore(toolDto.getScore());
        tool.setStatus(toolDto.getStatus());
        tool.setCategory(toolDto.getCategory());
        tool.setDescription(toolDto.getDescription());
        updateAssessmentFields(tool.getAssessment(), toolDto.getAssessment());
    }

    private void updateAssessmentFields(Assessment assessment, AssessmentDto assessmentDto) {
        int intelligenceScore = 0;
        int accelerationScore = 0;
        int experienceScore = 0;
        int valueScore = 0;
        int totalScore = 0;
        for (AssessmentCategoryDto assessmentCategoryDto : assessmentDto.getCategories()) {
            AssessmentCategory assessmentCategory = assessment.getCategories().stream()
                   .filter(category -> category.getId().equals(assessmentCategoryDto.getId()))
                   .findFirst()
                   .orElse(new AssessmentCategory());
            updateAssessmentCategoryFields(assessmentCategory, assessmentCategoryDto);
            switch (assessmentCategoryDto.getName()) {
                case "Intelligence":
                    intelligenceScore += calculateTotalScore(assessmentCategoryDto.getScore());
                    break;
                case "Acceleration":
                    accelerationScore += calculateTotalScore(assessmentCategoryDto.getScore());
                    break;
                case "Experience":
                    experienceScore += calculateTotalScore(assessmentCategoryDto.getScore());
                    break;
                case "Value":
                    valueScore += calculateTotalScore(assessmentCategoryDto.getScore());
                    break;
            }
            assessment.getCategories().add(assessmentCategory);
        }
        totalScore = intelligenceScore + accelerationScore + experienceScore + valueScore;
        assessment.getAssessmentScore().setIntelligence(intelligenceScore);
        assessment.getAssessmentScore().setAcceleration(accelerationScore);
        assessment.getAssessmentScore().setExperience(experienceScore);
        assessment.getAssessmentScore().setValue(valueScore);
        assessment.getAssessmentScore().setTotal(totalScore);

    }

    private void updateAssessmentCategoryFields(AssessmentCategory assessmentCategory, AssessmentCategoryDto assessmentCategoryDto) {
        assessmentCategory.setName(assessmentCategoryDto.getName());
        assessmentCategory.setScore(assessmentCategoryDto.getScore());
    }

    private int calculateTotalScore(String jsonString) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(jsonString);
            JsonNode scoreNode = rootNode.get("score");

            if (scoreNode == null || !scoreNode.isObject()) {
                return 0;
            }

            int total = 0;
            Iterator<JsonNode> scoreValues = scoreNode.elements();
            while (scoreValues.hasNext()) {
                JsonNode value = scoreValues.next();
                if (value.isNumber()) {
                    total += value.asInt();
                }
            }

            return total;
        } catch (Exception e) {
            logger.error("Error parsing JSON score: " + e.getMessage(), e);
            return 0;
        }
    }
}
