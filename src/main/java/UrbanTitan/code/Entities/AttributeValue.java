package UrbanTitan.code.Entities;

import jakarta.persistence.*;

import java.util.UUID;


@Entity
@Table(name = "attribute_values")
public class AttributeValue {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "attribute_value", nullable = false)
    private String value;
}