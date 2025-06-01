package com.example.demo;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.temporal.TemporalAdjusters;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
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
        List<ChoreEntity> list = StreamSupport.stream(repository.findAll().spliterator(), false).toList();
        System.out.println("Returning chores: " + Arrays.toString(list.toArray()));
        return list;
    }

    @PostMapping(path = "/")
    public ChoreEntity createChore(@RequestBody EditChoreDto newChore) {
        System.out.println("Creating chore: " + newChore);
        return repository.save(ChoreEntity.from(newChore));
    }

    @DeleteMapping(path = "/{id}")
    public void deleteChore(@PathVariable Long id) {
        ChoreEntity chore = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Chore with id %d was not found", id)));
        System.out.println("Deleting chore: " + chore);
        repository.delete(chore);
    }

    @PutMapping(path = "/{id}")
    public ChoreEntity updateChore(@PathVariable Long id, @RequestBody EditChoreDto update) {
        ChoreEntity chore = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Chore with id %d was not found", id)));
        System.out.println("Updating chore: " + chore + " with update: " + update);
        if (Boolean.FALSE.equals(chore.done) && Boolean.TRUE.equals(update.done())) {
            chore.doneDate = new Date();
            if (update.repeatsEveryWeeks() > 0) {
                createRecurring(update);
            }
        }
        if (Boolean.TRUE.equals(chore.done) && Boolean.FALSE.equals(update.done())) {
            chore.doneDate = null;
        }
        chore.update(update);
        return repository.save(chore);
    }

    private void createRecurring(EditChoreDto choreDto) {
        System.out.println("Creating recurring chore for: " + choreDto);
        List<DayOfWeek> daysOfWeek = Helpers.getDaysOfWeek(choreDto);
        Optional<DayOfWeek> nextThisWeek = Helpers.findNextThisWeek(daysOfWeek);
        EditChoreDto nextChore;
        if (nextThisWeek.isPresent()) {
            LocalDate nextDate = LocalDate.now().with(nextThisWeek.get());
            nextChore = choreDto.recurrence(Date.from(nextDate.atStartOfDay().toInstant(ZoneOffset.UTC)));
        } 
        else {
            LocalDate nextDay = Helpers.mondayInWeeks(choreDto.repeatsEveryWeeks()).with(TemporalAdjusters.nextOrSame(daysOfWeek.getFirst()));
            nextChore = choreDto.recurrence(Date.from(nextDay.atStartOfDay().toInstant(ZoneOffset.UTC)));
        }
        createChore(nextChore);
    }
}
