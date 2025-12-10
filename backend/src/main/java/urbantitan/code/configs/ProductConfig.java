//package urbantitan.code.configs;
//
//import org.modelmapper.ModelMapper;
//import org.modelmapper.TypeMap;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import urbantitan.code.dto.product.ProductRequestDTO;
//import urbantitan.code.entities.Product;
//
//@Configuration
//public class ProductConfig {
//
//    @Bean("productModelMapper")
//    public ModelMapper productModelMapper() {
//        ModelMapper mapper = new ModelMapper();
//
//        mapper.getConfiguration().setAmbiguityIgnored(true);
//
//        // ✅ CREATE EMPTY TYPE MAP (THIS IS THE KEY FIX)
//        TypeMap<ProductRequestDTO, Product> typeMap =
//                mapper.createTypeMap(ProductRequestDTO.class, Product.class);
//
//        typeMap.addMappings(m -> {
//            m.skip(Product::setId);
//            m.skip(Product::setBrand);
//            m.skip(Product::setCategory);
//
//            m.map(ProductRequestDTO::getName, Product::setName);
//            m.map(ProductRequestDTO::getSlug, Product::setSlug);
//            m.map(ProductRequestDTO::getDescription, Product::setDescription);
//            m.map(ProductRequestDTO::getBasePrice, Product::setBasePrice);
//            m.map(ProductRequestDTO::getIsActive, Product::setIsActive);
//            m.map(ProductRequestDTO::getPrimaryImageUrl, Product::setPrimaryImageUrl);
//
//            m.skip(Product::setBrand);
//            m.skip(Product::setCategory);
//        });
//        typeMap.implicitMappings();
//        return mapper;
//    }
//}
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

        // ✅ HARD DISABLE AUTO / IMPLICIT MAPPING
        mapper.getConfiguration()
                .setImplicitMappingEnabled(false)
                .setAmbiguityIgnored(true);

        // ✅ CREATE EMPTY TYPE MAP ONLY
        TypeMap<ProductRequestDTO, Product> typeMap =
                mapper.createTypeMap(ProductRequestDTO.class, Product.class);

        // ✅ SKIP FIRST (NO AUTO MAPPING EXISTS NOW)
        typeMap.addMappings(m -> {
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

        return mapper;
    }
}
