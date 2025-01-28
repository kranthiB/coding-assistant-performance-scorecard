package com.codingassistant.repository;

import com.codingassistant.model.Tool;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
@Repository
public interface ToolRepository extends JpaRepository<Tool, Long> {

}