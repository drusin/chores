package com.example.demo;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.GeneratedValue;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChoreEntity {
    @Id @GeneratedValue Long id;
    String assignedTo;
    String title;
    Date date;
    Integer repeatsInDays;
   
    public static ChoreEntity from(ChoreDto chore) {
        return new ChoreEntity(null, chore.assignedTo(), chore.title(), chore.date(), chore.repeatsInDays());
    }
    
}
