package com.codingassistant.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "assessments")
public class Assessment {
    @Id
    @SequenceGenerator(name = "assessments_id_seq_generator", sequenceName = "assessments_id_seq", allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "assessments_id_seq_generator"
    )
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tool_id", unique = true, nullable = false)
    private Tool tool;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "assessment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private AssessmentScore assessmentScore;

    @OneToMany(mappedBy = "assessment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AssessmentCategory> categories = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return String.format("Assessment[id=%d, toolId=%d]",
                id, tool.getId());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Assessment)) return false;
        Assessment that = (Assessment) o;
        return id != null && id.equals(that.id);
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

    public Tool getTool() {
        return tool;
    }

    public void setTool(Tool tool) {
        this.tool = tool;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public AssessmentScore getAssessmentScore() {
        return assessmentScore;
    }

    public void setAssessmentScore(AssessmentScore assessmentScore) {
        this.assessmentScore = assessmentScore;
    }

    public List<AssessmentCategory> getCategories() {
        return categories;
    }

    public void setCategories(List<AssessmentCategory> categories) {
        this.categories = categories;
    }
}
