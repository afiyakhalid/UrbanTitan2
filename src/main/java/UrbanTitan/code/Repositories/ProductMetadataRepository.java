package urbantitan.code.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import urbantitan.code.entities.ProductMetaDataDocument;

@Repository
public interface ProductMetadataRepository extends MongoRepository<ProductMetaDataDocument, String> {}