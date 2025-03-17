package com.closetorganizer.app.repository;

import com.closetorganizer.app.model.OutfitHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface OutfitHistoryRepository extends JpaRepository<OutfitHistory, Long> {
    List<OutfitHistory> findByUserIdOrderByDateDesc(Long userId);
    
    @Query("SELECT oh FROM OutfitHistory oh WHERE oh.user.id = :userId AND oh.date BETWEEN :startDate AND :endDate")
    List<OutfitHistory> findByUserIdAndDateRange(
        @Param("userId") Long userId,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );
    
    boolean existsByUserIdAndDate(Long userId, LocalDate date);
}
