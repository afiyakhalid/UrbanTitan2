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
//package urbantitan.code.configs;
//
//import org.modelmapper.ModelMapper;
//import org.modelmapper.TypeMap;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import urbantitan.code.dto.product.ProductRequestDTO;
//import urbantitan.code.dto.product.ProductResponseDTO;
//import urbantitan.code.entities.Product;
//
//@Configuration
//public class ProductConfig {
//
//    @Bean("productModelMapper")
//    public ModelMapper productModelMapper() {
//
//        ModelMapper mapper = new ModelMapper();
//
//        // ✅ HARD DISABLE AUTO / IMPLICIT MAPPING
//        mapper.getConfiguration()
//                .setImplicitMappingEnabled(false)
//                .setAmbiguityIgnored(true);
//
//        // ✅ CREATE EMPTY TYPE MAP ONLY
//        TypeMap<ProductRequestDTO, Product> typeMap =
//                mapper.createTypeMap(ProductRequestDTO.class, Product.class);
//
//        // ✅ SKIP FIRST (NO AUTO MAPPING EXISTS NOW)
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
//        });
//        TypeMap<Product, ProductResponseDTO> responseMap = mapper.createTypeMap(Product.class, ProductResponseDTO.class);
//        responseMap.addMappings(m -> {
//            // "Strict" mode is too dumb to find these automatically, so we tell it:
//            // "Go inside the Brand object, take the ID, and put it in brandId"
//            m.map(src -> src.getBrand().getId(), ProductResponseDTO::setBrandId);
//            m.map(src -> src.getCategory().getId(), ProductResponseDTO::setCategoryId);
//        });
//        return mapper;
//    }
//}
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

        // 1. DISABLE AUTO-MAPPING (Manual Mode)
        mapper.getConfiguration()
                .setImplicitMappingEnabled(false)
                .setAmbiguityIgnored(true);

        // -----------------------------------------------------------
        // 2. INPUT MAPPING (Request -> Entity)
        // -----------------------------------------------------------
        TypeMap<ProductRequestDTO, Product> requestMap =
                mapper.createTypeMap(ProductRequestDTO.class, Product.class);

        requestMap.addMappings(m -> {
            // Skips
            m.skip(Product::setId);
            m.skip(Product::setBrand);
            m.skip(Product::setCategory);

            // Manual Mappings
            m.map(ProductRequestDTO::getName, Product::setName);
            m.map(ProductRequestDTO::getSlug, Product::setSlug);
            m.map(ProductRequestDTO::getDescription, Product::setDescription);
            m.map(ProductRequestDTO::getBasePrice, Product::setBasePrice);
            m.map(ProductRequestDTO::getIsActive, Product::setIsActive);
            m.map(ProductRequestDTO::getPrimaryImageUrl, Product::setPrimaryImageUrl);
        });

        // -----------------------------------------------------------
        // 3. OUTPUT MAPPING (Entity -> Response) - ADDED MISSING FIELDS HERE
        // -----------------------------------------------------------
        TypeMap<Product, ProductResponseDTO> responseMap =
                mapper.createTypeMap(Product.class, ProductResponseDTO.class);

        responseMap.addMappings(m -> {
            // 1. The IDs (You already had these)
            m.map(src -> src.getBrand().getId(), ProductResponseDTO::setBrandId);
            m.map(src -> src.getCategory().getId(), ProductResponseDTO::setCategoryId);

            // 2. THE MISSING FIELDS (I added these for you)
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
