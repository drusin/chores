package xyz.rusin.choretracker;

import org.springframework.data.repository.CrudRepository;

public interface ChoreRepository extends CrudRepository<ChoreEntity, Long> {
    
}
