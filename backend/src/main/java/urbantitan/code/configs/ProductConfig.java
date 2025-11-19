package urbantitan.code.configs;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import urbantitan.code.dto.product.ProductRequestDTO;
import urbantitan.code.entities.Product;

@Configuration
public class ProductConfig {

    @Bean("productModelMapper")
    public ModelMapper productModelMapper() {
        ModelMapper mapper = new ModelMapper();

        TypeMap<ProductRequestDTO, Product> typeMap = mapper.createTypeMap(ProductRequestDTO.class, Product.class);

        typeMap.addMappings(m -> {
            m.map(ProductRequestDTO::getName, Product::setName);
            m.map(ProductRequestDTO::getSlug, Product::setSlug);
            m.map(ProductRequestDTO::getDescription, Product::setDescription);
            m.map(ProductRequestDTO::getBasePrice, Product::setBasePrice);
            m.map(ProductRequestDTO::getIsActive, Product::setIsActive);
            m.map(ProductRequestDTO::getPrimaryImageUrl, Product::setPrimaryImageUrl);

            m.skip(Product::setBrand);
            m.skip(Product::setCategory);
        });

        return mapper;
    }
}