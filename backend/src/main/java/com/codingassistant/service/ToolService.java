package com.codingassistant.service;

import com.codingassistant.model.Tool;
import com.codingassistant.repository.ToolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public List<Tool> getAllTools() {
        return toolRepository.findAllByOrderByScoreDesc();
    }

    @Transactional(readOnly = true)
    public List<Tool> getActiveTools() {
        return toolRepository.findByStatus("active");
    }

    @Transactional(readOnly = true)
    public Tool getToolById(Long id) {
        return toolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tool not found"));
    }

    @Transactional
    public Tool saveTool(Tool tool) {
        return toolRepository.save(tool);
    }

    @Transactional
    public void deleteTool(Long id) {
        toolRepository.deleteById(id);
    }
}