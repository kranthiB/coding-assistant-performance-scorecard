package com.codingassistant.model;

import jakarta.persistence.*;

@Entity
@Table(name = "assessment_scores")
public class AssessmentScore {
    @Id
    @SequenceGenerator(name = "assessment_scores_id_seq_generator", sequenceName = "assessment_scores_id_seq", allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "assessment_scores_id_seq_generator"
    )
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assessment_id", unique = true, nullable = false)
    private Assessment assessment;

    @Column(name = "total")
    private Integer total;

    @Column(name = "intelligence")
    private Integer intelligence;

    @Column(name = "acceleration")
    private Integer acceleration;

    @Column(name = "experience")
    private Integer experience;

    @Column(name = "value")
    private Integer value;


    @Override
    public String toString() {
        return String.format("AssessmentScore[id=%d, total=%.2f]",
                id, total);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AssessmentScore)) return false;
        AssessmentScore that = (AssessmentScore) o;
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

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getIntelligence() {
        return intelligence;
    }

    public void setIntelligence(Integer intelligence) {
        this.intelligence = intelligence;
    }

    public Integer getAcceleration() {
        return acceleration;
    }

    public void setAcceleration(Integer acceleration) {
        this.acceleration = acceleration;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }
}