package com.example.demo;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public record ChoreEntity(
    @Id Integer id,
    String assignedTo,
    String title,
    Date date
) {
    
}
