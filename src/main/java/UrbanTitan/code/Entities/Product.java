package UrbanTitan.code.Entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "product")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double basePrice;
    private Integer stockQuantity;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Seller seller;

    // Reference to MongoDB category and metadata
    private String mongoCategoryId;
    private String mongoMetadataId;

    private Double avgRating;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
