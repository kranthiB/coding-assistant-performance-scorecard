package com.codingassistant.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tools")
public class Tool {

    @Id
    @SequenceGenerator(
            name = "tools_id_seq_generator",
            sequenceName = "tools_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "tools_id_seq_generator"
    )
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "score")
    private Integer score;

    @Column(name = "status", length = 20, nullable = false)
    private String status;

    @Column(name = "description")
    private String description;

    @Column(name = "last_assessment")
    private LocalDate lastAssessment;

    @Column(name = "category", length = 50)
    private String category;

    @OneToOne(
            mappedBy = "tool",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = true
    )
    private Assessment assessment;


    @Override
    public String toString() {
        return String.format("Tool[id=%d, name='%s', status='%s']",
                id, name, status);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Tool)) return false;
        Tool tool = (Tool) o;
        return id != null && id.equals(tool.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getLastAssessment() {
        return lastAssessment;
    }

    public void setLastAssessment(LocalDate lastAssessment) {
        this.lastAssessment = lastAssessment;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Assessment getAssessment() {
        return assessment;
    }

    public void setAssessment(Assessment assessment) {
        this.assessment = assessment;
        if (assessment != null && assessment.getTool() != this) {
            assessment.setTool(this);
        }
    }
}