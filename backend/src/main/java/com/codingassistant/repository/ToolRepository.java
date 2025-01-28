package com.codingassistant.repository;

import com.codingassistant.model.Tool;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToolRepository extends JpaRepository<Tool, Long> {
    List<Tool> findAllByOrderByScoreDesc();
    List<Tool> findByStatus(String status);
}