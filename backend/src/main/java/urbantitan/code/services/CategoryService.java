package urbantitan.code.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import urbantitan.code.dto.category.CategoryRequestDTO;
import urbantitan.code.dto.category.CategoryResponseDTO;
import urbantitan.code.entities.Category;
import urbantitan.code.repositories.CategoryRepository;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll().stream().map(cat -> modelMapper.map(cat, CategoryResponseDTO.class)).toList();
    }

    public CategoryResponseDTO getCategoryById(UUID id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Category not found with id: " + id));
        return modelMapper.map(category, CategoryResponseDTO.class);
    }

    public CategoryResponseDTO getCategoryBySlug(String slug) {
        Category category = categoryRepository.findBySlug(slug).orElseThrow(() -> new IllegalArgumentException("Category not found with slug: " + slug));
        return modelMapper.map(category, CategoryResponseDTO.class);
    }

    public CategoryResponseDTO createCategory(CategoryRequestDTO dto) {

        if (categoryRepository.existsBySlug(dto.getSlug())) {
            throw new IllegalArgumentException("Category slug already exists: " + dto.getSlug());
        }

        if (categoryRepository.existsByName(dto.getName())) {
            throw new IllegalArgumentException("Category name already exists: " + dto.getName());
        }

        Category category = modelMapper.map(dto, Category.class);
        Category saved = categoryRepository.save(category);

        return modelMapper.map(saved, CategoryResponseDTO.class);
    }

    public CategoryResponseDTO updatePartialCategory(UUID id, Map<String, Object> updates) {

        Category category = categoryRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Category not found with id: " + id));

        updates.forEach((field, value) -> {
            switch (field) {
                case "name" -> {
                    String newName = value.toString();
                    if (!category.getName().equals(newName)
                            && categoryRepository.existsByName(newName)) {
                        throw new IllegalArgumentException("Category name already exists: " + newName);
                    }
                    category.setName(newName);
                }

                case "slug" -> {
                    String newSlug = value.toString();
                    if (!category.getSlug().equals(newSlug)
                            && categoryRepository.existsBySlug(newSlug)) {
                        throw new IllegalArgumentException("Category slug already exists: " + newSlug);
                    }
                    category.setSlug(newSlug);
                }

                case "description" -> category.setDescription(value.toString());

                case "isActive" -> category.setIsActive(value != null && Boolean.parseBoolean(value.toString()));

                default -> throw new IllegalArgumentException("Field not allowed for update: " + field);
            }
        });

        Category saved = categoryRepository.save(category);
        return modelMapper.map(saved, CategoryResponseDTO.class);
    }

    public void deleteCategory(UUID id) {
        if (!categoryRepository.existsById(id)) {
            throw new IllegalArgumentException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }
}