package com.codingassistant.model;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tools")
public class Tool {

    @Id
    @SequenceGenerator(name = "tools_id_seq_generator", sequenceName = "tools_id_seq", allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "tools_id_seq_generator"
    )
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "score")
    private Double score;

    @Column(name = "status")
    private String status;

    @Column(name = "description")
    private String description;

    @Column(name = "last_assessment")
    private LocalDate lastAssessment;

    @Column(name = "category")
    private String category;

    @PrePersist
    @PreUpdate
    protected void validateData() {
        if (score != null) {
            score = Math.round(score * 100.0) / 100.0; // Ensure 2 decimal places
        }
        if (name != null) {
            name = name.trim();
        }
        if (status != null) {
            status = status.trim().toLowerCase();
        }
        if (category != null) {
            category = category.trim();
        }
    }

    /**
     * Creates a summary string of the tool's key information.
     * @return A string containing the tool's ID, name, and status
     */
    @Override
    public String toString() {
        return String.format("Tool[id=%d, name='%s', status='%s']",
                id, name, status);
    }

    /**
     * Custom equals method to compare tools based on their ID.
     * @param o The object to compare with
     * @return true if the tools have the same ID, false otherwise
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Tool)) return false;
        Tool tool = (Tool) o;
        return id != null && id.equals(tool.id);
    }

    /**
     * Custom hashCode method based on the tool's ID.
     * @return The hash code value for this tool
     */
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

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

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
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
}