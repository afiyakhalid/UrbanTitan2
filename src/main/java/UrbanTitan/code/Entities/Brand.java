package UrbanTitan.code.Entities;


import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "brands")
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID brandId;

    private String name;
    private String logoUrl;
    private String description;
}