package urbantitan.code.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import urbantitan.code.dto.category.CategoryRequestDTO;
import urbantitan.code.dto.category.CategoryResponseDTO;
import urbantitan.code.services.CategoryService;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/")
    public ResponseEntity<CategoryResponseDTO> createCategory(@Valid @RequestBody CategoryRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createCategory(requestDTO));
    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }
    @GetMapping("/{category-name}")
    public ResponseEntity<CategoryResponseDTO> getCategoryBySlug(@PathVariable("category-name") String slug) {
        return ResponseEntity.ok(categoryService.getCategoryBySlug(slug));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> getCategory(@PathVariable UUID id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> updatePartialCategory(@PathVariable UUID id, @RequestBody Map<String, Object> updates) {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.updatePartialCategory(id, updates));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}