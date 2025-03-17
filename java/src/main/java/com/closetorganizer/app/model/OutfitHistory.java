package com.closetorganizer.app.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class OutfitHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToMany
    @JoinTable(
        name = "outfit_history_items",
        joinColumns = @JoinColumn(name = "outfit_history_id"),
        inverseJoinColumns = @JoinColumn(name = "clothing_item_id")
    )
    private List<ClothingItem> items;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String notes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<ClothingItem> getItems() {
        return items;
    }

    public void setItems(List<ClothingItem> items) {
        this.items = items;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
