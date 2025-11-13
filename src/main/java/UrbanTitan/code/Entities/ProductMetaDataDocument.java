package urbantitan.code.entities;
import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;
@Document(collection = "product_metadata")
public class ProductMetaDataDocument {
    @Id
    private String id;
    private Long productId;
    private Map<String, Object> attributes;
}
