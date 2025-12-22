package urbantitan.code.configs;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import urbantitan.code.dto.product.ProductRequestDTO;
import urbantitan.code.dto.product.ProductResponseDTO;
import urbantitan.code.entities.Product;

@Configuration
public class ProductConfig {

    @Bean("productModelMapper")
    public ModelMapper productModelMapper() {

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration()
                .setImplicitMappingEnabled(false)
                .setAmbiguityIgnored(true);
        TypeMap<ProductRequestDTO, Product> requestMap =
                mapper.createTypeMap(ProductRequestDTO.class, Product.class);

        requestMap.addMappings(m -> {
            m.skip(Product::setId);
            m.skip(Product::setBrand);
            m.skip(Product::setCategory);
            m.map(ProductRequestDTO::getName, Product::setName);
            m.map(ProductRequestDTO::getSlug, Product::setSlug);
            m.map(ProductRequestDTO::getDescription, Product::setDescription);
            m.map(ProductRequestDTO::getBasePrice, Product::setBasePrice);
            m.map(ProductRequestDTO::getIsActive, Product::setIsActive);
            m.map(ProductRequestDTO::getPrimaryImageUrl, Product::setPrimaryImageUrl);
        });
        TypeMap<Product, ProductResponseDTO> responseMap =
                mapper.createTypeMap(Product.class, ProductResponseDTO.class);

        responseMap.addMappings(m -> {
            m.map(src -> src.getBrand().getId(), ProductResponseDTO::setBrandId);
            m.map(src -> src.getCategory().getId(), ProductResponseDTO::setCategoryId);

            m.map(Product::getId, ProductResponseDTO::setId);
            m.map(Product::getName, ProductResponseDTO::setName);
            m.map(Product::getSlug, ProductResponseDTO::setSlug);
            m.map(Product::getDescription, ProductResponseDTO::setDescription);
            m.map(Product::getBasePrice, ProductResponseDTO::setBasePrice);
            m.map(Product::getIsActive, ProductResponseDTO::setIsActive);
            m.map(Product::getPrimaryImageUrl, ProductResponseDTO::setPrimaryImageUrl);
            m.map(Product::getCreatedAt, ProductResponseDTO::setCreatedAt);
            m.map(Product::getUpdatedAt, ProductResponseDTO::setUpdatedAt);
        });

        return mapper;
    }
}