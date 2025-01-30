package com.codingassistant.service;

import com.codingassistant.dto.AssessmentCategoryDto;
import com.codingassistant.dto.AssessmentDTO;
import com.codingassistant.dto.PerformanceDTO;
import com.codingassistant.dto.ToolDto;
import com.codingassistant.model.Assessment;
import com.codingassistant.model.AssessmentCategory;
import com.codingassistant.model.AssessmentScore;
import com.codingassistant.model.Tool;
import com.codingassistant.repository.ToolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ToolService {
    private final ToolRepository toolRepository;

    @Autowired
    public ToolService(ToolRepository toolRepository) {
        this.toolRepository = toolRepository;
    }

    @Transactional(readOnly = true)
    public List<ToolDto> getAllTools() {
        List<ToolDto> toolDtos = new ArrayList<>();
        List<Tool> tools = toolRepository.findAll();
        for (Tool tool : tools) {
            toolDtos.add(toolDto(tool));
        }
        return toolDtos;
    }

    @Transactional(readOnly = true)
    public ToolDto getToolDtoById(Long id) {
        return toolDto(toolRepository.findById(id).orElseThrow(() -> new RuntimeException("Tool not found")));
    }

    @Transactional(readOnly = true)
    public Tool getToolById(Long id) {
        return toolRepository.findById(id).orElseThrow(() -> new RuntimeException("Tool not found"));
    }

    @Transactional
    public Tool saveTool(Tool tool) {
        return toolRepository.save(tool);
    }

    public List<PerformanceDTO> getPerformances() {
        List<Tool> tools = toolRepository.findAll();
        List<PerformanceDTO> performanceDtos = new ArrayList<>();
        for (Tool tool : tools) {
            PerformanceDTO performanceDto = new PerformanceDTO();
            performanceDto.setId(tool.getId());
            performanceDto.setName(tool.getName());
            performanceDto.setTotal(tool.getAssessment().getAssessmentScore().getTotal());
            performanceDto.setAcceleration(tool.getAssessment().getAssessmentScore().getAcceleration());
            performanceDto.setIntelligence(tool.getAssessment().getAssessmentScore().getIntelligence());
            performanceDto.setExperience(tool.getAssessment().getAssessmentScore().getExperience());
            performanceDto.setValue(tool.getAssessment().getAssessmentScore().getValue());
            performanceDtos.add(performanceDto);
        }
        return performanceDtos;
    }



    private ToolDto toolDto(Tool tool) {
        ToolDto toolDto = new ToolDto();
        toolDto.setId(tool.getId());
        toolDto.setName(tool.getName());
        toolDto.setDescription(tool.getDescription());
        toolDto.setStatus(tool.getStatus());
        toolDto.setLastAssessment(tool.getLastAssessment());
        toolDto.setCategory(tool.getCategory());
        toolDto.setAssessment(tool.getAssessment() == null ? null : new AssessmentDTO());
        setToolAssessment(toolDto.getAssessment(), tool.getAssessment());
        return toolDto;
    }

    private void setToolAssessment(AssessmentDTO assessmentDto, Assessment assessment) {
        assessmentDto.setId(assessment.getId());
        assessmentDto.setScore(new AssessmentScore());
        setToolAssessmentScore(assessmentDto.getScore(), assessment.getAssessmentScore());
        assessmentDto.setCategories(new ArrayList<>());
        setToolAssessmentCategories(assessmentDto.getCategories(), assessment.getCategories());
    }

    private void setToolAssessmentScore(AssessmentScore assessmentScoreDto, AssessmentScore assessmentScore) {
        assessmentScoreDto.setId(assessmentScore.getId());
        assessmentScoreDto.setAcceleration(assessmentScore.getAcceleration());
        assessmentScoreDto.setExperience(assessmentScore.getExperience());
        assessmentScoreDto.setIntelligence(assessmentScore.getIntelligence());
        assessmentScoreDto.setValue(assessmentScore.getValue());
        assessmentScoreDto.setTotal(assessmentScore.getTotal());
    }

    private void setToolAssessmentCategories(List<AssessmentCategoryDto> assessmentCategoryDtos, List<AssessmentCategory> assessmentCategories) {
        assessmentCategories.forEach(assessmentCategory -> {
            AssessmentCategoryDto assessmentCategoryDto = new AssessmentCategoryDto();
            assessmentCategoryDto.setId(assessmentCategory.getId());
            assessmentCategoryDto.setName(assessmentCategory.getName());
            assessmentCategoryDto.setScore(assessmentCategory.getScore());
            assessmentCategoryDto.setNote(assessmentCategory.getNote());
            assessmentCategoryDtos.add(assessmentCategoryDto);
        });
    }
}