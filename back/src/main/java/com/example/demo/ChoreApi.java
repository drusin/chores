package com.example.demo;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ChoreApi {
    
    private final ChoreRepository repository;

	@GetMapping(path = "/") 
    public List<ChoreEntity> getChores() {
        return StreamSupport.stream(repository.findAll().spliterator(), false).toList();
    }

    @PostMapping(path = "/")
    public ChoreEntity createChore(@RequestBody ChoreDto newChore) {
        return repository.save(ChoreEntity.from(newChore));
    }

    @PutMapping(path = "/{id}")
    public ChoreEntity updateChore(@PathVariable Long id, @RequestBody ChoreDto update) {
        ChoreEntity chore = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Chore with id %d was not found", id)));
        if (Boolean.FALSE.equals(chore.done) && Boolean.TRUE.equals(update.done()) && update.repeatsInDays() != null && update.repeatsInDays() > 0) {
            createRecurring(update);
        }
        chore.update(update);
        return repository.save(chore);
    }

    private void createRecurring(ChoreDto choreDto) {
        Instant plannedDate = choreDto.date().toInstant().truncatedTo(ChronoUnit.DAYS);
        Instant now = new Date().toInstant().truncatedTo(ChronoUnit.DAYS);

        while (plannedDate.isBefore(now)) {
            plannedDate = plannedDate.plus(choreDto.repeatsInDays(), ChronoUnit.DAYS);
            
        }

        ChoreDto nextRecurrence = choreDto.recurrence(Date.from(plannedDate));
        repository.save(ChoreEntity.from(nextRecurrence));
    }
}
