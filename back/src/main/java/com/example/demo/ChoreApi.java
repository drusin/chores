package com.example.demo;

import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ChoreApi {
    
    private final ChoreRepository repository;

    // @Autowired
    // public ChoreApi(ChoreRepository repository) {
	// 	this.repository = repository;
	// }

	@GetMapping(path = "/") 
    public List<ChoreEntity> getChores() {
        return StreamSupport.stream(repository.findAll().spliterator(), false).toList();
    }

    @PostMapping(path = "/")
    public ChoreEntity createChore(@RequestBody ChoreDto newChore) {
        System.out.println(newChore.title());
        return repository.save(ChoreEntity.from(newChore));
    }
}
