package com.closetorganizer.app.repository;

import com.closetorganizer.app.model.ClothingItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClothingItemRepository extends JpaRepository<ClothingItem, Long> {
    Page<ClothingItem> findByCategory(String category, Pageable pageable);
    Page<ClothingItem> findByColor(String color, Pageable pageable);
    Page<ClothingItem> findBySeason(String season, Pageable pageable);
    Page<ClothingItem> findByBrand(String brand, Pageable pageable);
}
