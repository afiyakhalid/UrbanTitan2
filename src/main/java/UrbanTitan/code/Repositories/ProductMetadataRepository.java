package UrbanTitan.code.Repositories;

import UrbanTitan.code.Entities.ProductMetaDataDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductMetadataRepository extends MongoRepository<ProductMetaDataDocument, String> {}