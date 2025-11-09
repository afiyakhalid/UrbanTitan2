package UrbanTitan.code.Repositories;

import UrbanTitan.code.Entities.CategoryDocument;
import UrbanTitan.code.Entities.ProductMetaDataDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<CategoryDocument, String> {}


