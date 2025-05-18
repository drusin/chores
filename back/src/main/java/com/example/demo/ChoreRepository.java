package com.example.demo;

import org.springframework.data.repository.CrudRepository;

public interface ChoreRepository extends CrudRepository<ChoreEntity, Long> {
    
}
