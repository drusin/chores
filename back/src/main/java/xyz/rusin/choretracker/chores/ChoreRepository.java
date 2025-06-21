package xyz.rusin.choretracker.chores;

import org.springframework.data.repository.CrudRepository;

public interface ChoreRepository extends CrudRepository<ChoreEntity, Long> {
    
}
