package urbantitan.code.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import urbantitan.code.dto.brand.BrandRequestDTO;
import urbantitan.code.dto.brand.BrandResponseDTO;
import urbantitan.code.entities.Brand;
import urbantitan.code.repositories.BrandRepository;
import urbantitan.code.services.search.FuzzyScorer;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository brandRepository;
    private final ModelMapper modelMapper;

    public List<BrandResponseDTO> getAllBrands() {
        return brandRepository.findAll().stream().map(brand -> modelMapper.map(brand, BrandResponseDTO.class)).toList();
    }

    public BrandResponseDTO getBrandById(UUID id) {
        Brand brand = brandRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Brand not found with ID: " + id));
        return modelMapper.map(brand, BrandResponseDTO.class);
    }

    public BrandResponseDTO getBrandBySlug(String slug) {
        Brand brand = brandRepository.findBySlug(slug).orElseThrow(() -> new IllegalArgumentException("Brand not found with slug: " + slug));
        return modelMapper.map(brand, BrandResponseDTO.class);
    }

    public BrandResponseDTO createBrand(BrandRequestDTO dto) {

        if (brandRepository.existsBySlug(dto.getSlug())) {
            throw new IllegalArgumentException("Brand already exists with slug: " + dto.getSlug());
        }
        Brand brand = modelMapper.map(dto, Brand.class);

        Brand saved = brandRepository.save(brand);
        return modelMapper.map(saved, BrandResponseDTO.class);
    }

    public BrandResponseDTO updatePartialBrand(UUID id, Map<String, Object> updates) {

        Brand brand = brandRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Brand not found with ID: " + id));

        updates.forEach((field, value) -> {
            switch (field) {
                case "name" -> brand.setName(value.toString());

                case "slug" -> {
                    if (brandRepository.existsBySlug(value.toString())) {
                        throw new IllegalArgumentException("Slug already exists: " + value);
                    }
                    brand.setSlug(value.toString());
                }

                case "description" -> brand.setDescription(value.toString());

                case "logoUrl" -> brand.setLogoUrl(value.toString());

                case "websiteUrl" -> brand.setWebsiteUrl(value.toString());

                default -> throw new IllegalArgumentException("Field not allowed for update: " + field);
            }
        });

        Brand updated = brandRepository.save(brand);
        return modelMapper.map(updated, BrandResponseDTO.class);
    }

    public void deleteBrand(UUID id) {
        if (!brandRepository.existsById(id)) {
            throw new IllegalArgumentException("Brand does not exist with ID: " + id);
        }
        brandRepository.deleteById(id);
    }

    public boolean existsBySlug(String slug) {
        return brandRepository.existsBySlug(slug);
    }

    public List<BrandResponseDTO> searchBrands(String q, int limit) {
        String query = q == null ? "" : q.trim();
        if (query.isEmpty()) {
            return List.of();
        }
        int safeLimit = Math.max(1, Math.min(limit, 50));

        int likeLimit = Math.max(50, safeLimit * 20);
        int fallbackLimit = Math.max(200, safeLimit * 40);

        List<Brand> candidates = brandRepository.findSearchCandidates(
                query.toLowerCase(java.util.Locale.ROOT),
                org.springframework.data.domain.PageRequest.of(0, likeLimit)
        );
        if (candidates.size() < Math.max(10, safeLimit * 3)) {
            candidates = brandRepository.findFallbackCandidates(
                    org.springframework.data.domain.PageRequest.of(0, fallbackLimit)
            );
        }

        return candidates.stream()
                .map(b -> new java.util.AbstractMap.SimpleEntry<>(b, Math.max(
                        FuzzyScorer.score(query, b.getName()),
                        FuzzyScorer.score(query, b.getSlug())
                )))
                .filter(e -> e.getValue() >= 0.20)
                .sorted((a, b) -> Double.compare(b.getValue(), a.getValue()))
                .limit(safeLimit)
                .map(e -> modelMapper.map(e.getKey(), BrandResponseDTO.class))
                .toList();
    }
}