package com.codingassistant.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "assessment_categories")
public class AssessmentCategory {
    @Id
    @SequenceGenerator(
            name = "assessment_categories_id_seq_generator",
            sequenceName = "assessment_categories_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "assessment_categories_id_seq_generator"
    )
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assessment_id", nullable = false)
    private Assessment assessment;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "score", columnDefinition = "jsonb")
    private String score;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onPersist() {
        createdAt = LocalDateTime.now();
        if (name != null) {
            name = name.trim();
        }
    }

    @Override
    public String toString() {
        return String.format("AssessmentCategory[id=%d, name='%s']",
                id, name);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AssessmentCategory)) return false;
        AssessmentCategory that = (AssessmentCategory) o;
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

    public Assessment getAssessment() {
        return assessment;
    }

    public void setAssessment(Assessment assessment) {
        this.assessment = assessment;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}