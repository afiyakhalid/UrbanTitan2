package UrbanTitan.code.Entities;

import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "categories")
public class CategoryDocument {
    @Id
    private String id;
    private String name;
    private List<CategoryDocument> subcategories;
    private LocalDateTime createdAt;
}

