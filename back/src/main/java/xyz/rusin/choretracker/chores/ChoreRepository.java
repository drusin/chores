package xyz.rusin.choretracker.chores;

import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface ChoreRepository extends CrudRepository<ChoreEntity, Long> {
    List<ChoreEntity> findByDoneFalseOrDoneDateAfter(Date date);
}
