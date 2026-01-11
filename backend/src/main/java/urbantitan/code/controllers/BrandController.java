package urbantitan.code.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import urbantitan.code.dto.brand.BrandRequestDTO;
import urbantitan.code.dto.brand.BrandResponseDTO;
import urbantitan.code.services.BrandService;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService brandService;

    @PostMapping("/")
    public ResponseEntity<BrandResponseDTO> createBrand(@Valid @RequestBody BrandRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(brandService.createBrand(requestDTO));
    }

    @GetMapping("/")
    public ResponseEntity<List<BrandResponseDTO>> getAllBrands() {
        return ResponseEntity.ok(brandService.getAllBrands());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BrandResponseDTO> getBrand(@PathVariable UUID id) {
        return ResponseEntity.ok(brandService.getBrandById(id));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<BrandResponseDTO> getBrandBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(brandService.getBrandBySlug(slug));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<BrandResponseDTO> updatePartialBrand(@PathVariable UUID id, @RequestBody Map<String, Object> updates) {
        return ResponseEntity.status(HttpStatus.OK).body(brandService.updatePartialBrand(id, updates));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable UUID id) {
        brandService.deleteBrand(id);
        return ResponseEntity.noContent().build();
    }
}