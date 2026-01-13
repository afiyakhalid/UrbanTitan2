package urbantitan.code.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import urbantitan.code.dto.category.CategoryRequestDTO;
import urbantitan.code.dto.category.CategoryResponseDTO;
import urbantitan.code.entities.Category;
import urbantitan.code.repositories.CategoryRepository;
import urbantitan.code.services.search.FuzzyScorer;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAllWithParent().stream().map(this::mapToResponseDTO).toList();
    }

    public CategoryResponseDTO getCategoryById(UUID id) {
        Category category = categoryRepository.findByIdWithParent(id).orElseThrow(() -> new IllegalArgumentException("Category not found with id: " + id));
        return mapToResponseDTO(category);
    }

    public CategoryResponseDTO getCategoryBySlug(String slug) {
        Category category = categoryRepository.findBySlugWithParent(slug).orElseThrow(() -> new IllegalArgumentException("Category not found with slug: " + slug));
        return mapToResponseDTO(category);
    }

    private CategoryResponseDTO mapToResponseDTO(Category category) {
        CategoryResponseDTO dto = modelMapper.map(category, CategoryResponseDTO.class);
        // Manually set parent_id to handle lazy loading
        if (category.getParent() != null) {
            dto.setParent_id(category.getParent().getId());
        }
        return dto;
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

        return mapToResponseDTO(saved);
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

                case "parent_id" -> {
                    if (value == null) {
                        category.setParent(null);
                    } else {
                        UUID parentId = UUID.fromString(value.toString());
                        if (parentId.equals(category.getId())) {
                            throw new IllegalArgumentException("Category cannot be its own parent");
                        }
                        Category parentCategory = categoryRepository.findById(parentId)
                                .orElseThrow(() -> new IllegalArgumentException("Parent category not found with id: " + parentId));
                        category.setParent(parentCategory);
                    }
                }

                default -> throw new IllegalArgumentException("Field not allowed for update: " + field);
            }
        });

        Category saved = categoryRepository.save(category);
        return mapToResponseDTO(saved);
    }

    public void deleteCategory(UUID id) {
        if (!categoryRepository.existsById(id)) {
            throw new IllegalArgumentException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }

    public boolean existsBySlug(String slug) {
        return categoryRepository.existsBySlug(slug);
    }

    public List<CategoryResponseDTO> searchCategories(String q, int limit) {
        String query = q == null ? "" : q.trim();
        if (query.isEmpty()) {
            return List.of();
        }
        int safeLimit = Math.max(1, Math.min(limit, 50));

        // Start with LIKE candidates; if too few (typos), fallback to a broader pool.
        List<Category> candidates = categoryRepository.findSearchCandidates(query.toLowerCase(java.util.Locale.ROOT), Math.max(50, safeLimit * 20));
        if (candidates.size() < Math.max(10, safeLimit * 3)) {
            candidates = categoryRepository.findFallbackCandidates(Math.max(200, safeLimit * 40));
        }

        return candidates.stream()
                .map(c -> new java.util.AbstractMap.SimpleEntry<>(c, Math.max(
                        FuzzyScorer.score(query, c.getName()),
                        FuzzyScorer.score(query, c.getSlug())
                )))
                .filter(e -> e.getValue() >= 0.20)
                .sorted((a, b) -> Double.compare(b.getValue(), a.getValue()))
                .limit(safeLimit)
                .map(e -> mapToResponseDTO(e.getKey()))
                .toList();
    }
}