package urbantitan.code.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import urbantitan.code.dto.product.ProductRequestDTO;
import urbantitan.code.dto.product.ProductResponseDTO;
import urbantitan.code.entities.Product;
import urbantitan.code.entities.Brand;
import urbantitan.code.entities.Category;
import urbantitan.code.repositories.ProductRepository;
import urbantitan.code.repositories.BrandRepository;
import urbantitan.code.repositories.CategoryRepository;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final @Qualifier("productModelMapper") ModelMapper productModelMapper;

    public List<ProductResponseDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> productModelMapper.map(product, ProductResponseDTO.class)).toList();
    }

    public List<ProductResponseDTO> getProductsByCategoryId(UUID categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return products.stream().map(product -> productModelMapper.map(product, ProductResponseDTO.class)).toList();
    }

    public ProductResponseDTO getProductById(UUID id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));
        return productModelMapper.map(product, ProductResponseDTO.class);
    }

    public ProductResponseDTO getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug).orElseThrow(() -> new IllegalArgumentException("Product not found with slug: " + slug));
        return productModelMapper.map(product, ProductResponseDTO.class);
    }

    public ProductResponseDTO createProduct(ProductRequestDTO requestDTO) {
        if (productRepository.existsBySlug(requestDTO.getSlug())) {
            throw new IllegalArgumentException("Product already exists with slug: " + requestDTO.getSlug());
        }

        Product newProduct = productModelMapper.map(requestDTO, Product.class);

        Brand brand = brandRepository.findById(requestDTO.getBrandId()).orElseThrow(() -> new IllegalArgumentException("Brand not found"));

        Category category = categoryRepository.findById(requestDTO.getCategoryId()).orElseThrow(() -> new IllegalArgumentException("Category not found"));

        newProduct.setBrand(brand);
        newProduct.setCategory(category);
        
        Product saved = productRepository.save(newProduct);
        return productModelMapper.map(saved, ProductResponseDTO.class);
    }

    public ProductResponseDTO updatePartialProduct(UUID id, Map<String, Object> updates) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + id));

        updates.forEach((field, value) -> {
            switch (field) {
                case "name" -> product.setName((String) value);

                case "slug" -> {
                    if (productRepository.existsBySlug(value.toString())) {
                        throw new IllegalArgumentException("Slug already exists: " + value);
                    }
                    product.setSlug((String) value);
                }

                case "description" -> product.setDescription((String) value);

                case "basePrice" -> product.setBasePrice(new java.math.BigDecimal(value.toString()));

                case "isActive" -> product.setIsActive(Boolean.valueOf(value.toString()));

                case "primaryImageUrl" -> product.setPrimaryImageUrl((String) value);

                case "brandId" -> {
                    Brand brand = brandRepository.findById(UUID.fromString(value.toString())).orElseThrow(() -> new IllegalArgumentException("Brand not found"));
                    product.setBrand(brand);
                }

                case "categoryId" -> {
                    Category category = categoryRepository.findById(UUID.fromString(value.toString())).orElseThrow(() -> new IllegalArgumentException("Category not found"));
                    product.setCategory(category);
                }

                default -> throw new IllegalArgumentException("Field not allowed for update: " + field);
            }
        });

        Product savedProduct = productRepository.save(product);
        return productModelMapper.map(savedProduct, ProductResponseDTO.class);
    }

    public void deleteProductById(UUID id) {
        if (!productRepository.existsById(id)) {
            throw new IllegalArgumentException("Product does not exist by id: " + id);
        }
        productRepository.deleteById(id);
    }
}