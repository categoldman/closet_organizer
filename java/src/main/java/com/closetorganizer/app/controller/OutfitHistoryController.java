package com.closetorganizer.app.controller;

import com.closetorganizer.app.model.OutfitHistory;
import com.closetorganizer.app.repository.OutfitHistoryRepository;
import com.closetorganizer.app.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/outfits/history")
@CrossOrigin(origins = "*")
public class OutfitHistoryController {

    @Autowired
    private OutfitHistoryRepository repository;

    @PostMapping
    public ResponseEntity<OutfitHistory> saveOutfitToDate(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestBody OutfitHistory outfitHistory) {
        outfitHistory.setUser(currentUser.getUser());
        return ResponseEntity.ok(repository.save(outfitHistory));
    }

    @GetMapping
    public ResponseEntity<List<OutfitHistory>> getOutfitHistory(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<OutfitHistory> history = repository.findByUserIdAndDateRange(
            currentUser.getUser().getId(), startDate, endDate);
        return ResponseEntity.ok(history);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOutfitHistory(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PathVariable Long id) {
        return repository.findById(id)
            .map(history -> {
                if (history.getUser().getId().equals(currentUser.getUser().getId())) {
                    repository.delete(history);
                    return ResponseEntity.ok().build();
                }
                return ResponseEntity.badRequest().build();
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> checkOutfitExists(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        boolean exists = repository.existsByUserIdAndDate(currentUser.getUser().getId(), date);
        return ResponseEntity.ok(Map.of("exists", exists));
    }
}
