package xyz.rusin.choretracker.chores;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import xyz.rusin.choretracker.DateHelper;
import xyz.rusin.choretracker.users.UserEntity;
import xyz.rusin.choretracker.users.UserRepository;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/chores")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ChoreApi {

    private final ChoreRepository repository;
    private final UserRepository userRepository;

    @GetMapping(path = "/")
    public List<ChoreEntity> getChores() {
        Date oneDayAgo = new Date(System.currentTimeMillis() - 24 * 60 * 60 * 1000);
        List<ChoreEntity> chores = repository.findByDoneFalseOrDoneDateAfter(oneDayAgo);
        System.out.println("Returning chores: " + Arrays.toString(chores.toArray()));
        return chores;
    }

    @PostMapping(path = "/")
    public ChoreEntity createChore(@RequestBody EditChoreDto newChore) {
        System.out.println("Creating chore: " + newChore);
        UserEntity user = userRepository.findById(newChore.assignedTo())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("User with id %d was not found", newChore.assignedTo())));
        return repository.save(ChoreEntity.from(newChore, user));
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
        if (!chore.isDone() && update.done()) {
            chore.setDoneDate(new Date());
            if (update.repeatMode() != RepeatMode.NONE) {
                createRecurring(update);
            }
        }
        if (chore.isDone() && !update.done()) {
            chore.setDoneDate(null);
        }
        UserEntity user = userRepository.findById(update.assignedTo())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("User with id %d was not found", update.assignedTo())));
        chore.update(update, user);
        return repository.save(chore);
    }

    private void createRecurring(EditChoreDto choreDto) {
        System.out.println("Creating recurring chore for: " + choreDto);
        Date newDate = choreDto.repeatMode() == RepeatMode.DAYS ?
                DateHelper.nextOccurrence(new Date(), choreDto.repeatsEveryDays()) :
                DateHelper.nextOccurrence(new Date(), choreDto);
        EditChoreDto nextChore = choreDto.recurrence(newDate);
        createChore(nextChore);
    }
}
