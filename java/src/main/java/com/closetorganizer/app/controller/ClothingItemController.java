package com.closetorganizer.app.controller;

import com.closetorganizer.app.model.ClothingItem;
import com.closetorganizer.app.repository.ClothingItemRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/clothes")
@CrossOrigin(origins = "*")
public class ClothingItemController {

    @Autowired
    private ClothingItemRepository repository;

    // Create a new clothing item
    @PostMapping
    public ClothingItem createClothingItem(@Valid @RequestBody ClothingItem item) {
        return repository.save(item);
    }

    // Get all clothing items with pagination and sorting
    @GetMapping
    public Page<ClothingItem> getAllClothingItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return repository.findAll(pageable);
    }

    // Get a single clothing item by ID
    @GetMapping("/{id}")
    public ResponseEntity<ClothingItem> getClothingItemById(@PathVariable Long id) {
        Optional<ClothingItem> item = repository.findById(id);
        return item.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    // Update a clothing item
    @PutMapping("/{id}")
    public ResponseEntity<ClothingItem> updateClothingItem(
            @PathVariable Long id,
            @Valid @RequestBody ClothingItem newItem) {
        return repository.findById(id)
            .map(item -> {
                item.setName(newItem.getName());
                item.setCategory(newItem.getCategory());
                item.setColor(newItem.getColor());
                item.setSize(newItem.getSize());
                item.setSeason(newItem.getSeason());
                item.setBrand(newItem.getBrand());
                item.setDescription(newItem.getDescription());
                return ResponseEntity.ok(repository.save(item));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // Delete a clothing item
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClothingItem(@PathVariable Long id) {
        return repository.findById(id)
            .map(item -> {
                repository.delete(item);
                return ResponseEntity.ok().build();
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // Search by category with pagination and sorting
    @GetMapping("/category/{category}")
    public Page<ClothingItem> getByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return repository.findByCategory(category, pageable);
    }

    // Search by color with pagination and sorting
    @GetMapping("/color/{color}")
    public Page<ClothingItem> getByColor(
            @PathVariable String color,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return repository.findByColor(color, pageable);
    }

    // Search by season with pagination and sorting
    @GetMapping("/season/{season}")
    public Page<ClothingItem> getBySeason(
            @PathVariable String season,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return repository.findBySeason(season, pageable);
    }

    // Search by brand with pagination and sorting
    @GetMapping("/brand/{brand}")
    public Page<ClothingItem> getByBrand(
            @PathVariable String brand,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return repository.findByBrand(brand, pageable);
    }
}
