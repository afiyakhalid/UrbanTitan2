package urbantitan.code.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import urbantitan.code.dto.quotation.QuotationDTO;
import urbantitan.code.dto.quotation.SimilarProductDTO;
import urbantitan.code.services.QuotationService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class QuotationController {

    private final QuotationService quotationService;

    @GetMapping("/{productId}/quotations")
    public ResponseEntity<List<QuotationDTO>> getQuotationsForProduct(@PathVariable UUID productId) {
        List<QuotationDTO> quotations = quotationService.getQuotationsForProduct(productId);
        return ResponseEntity.ok(quotations);
    }

    @GetMapping("/{productId}/similar")
    public ResponseEntity<List<SimilarProductDTO>> getSimilarProducts(
            @PathVariable UUID productId,
            @RequestParam(defaultValue = "10") int limit) {
        List<SimilarProductDTO> similarProducts = quotationService.getSimilarProducts(productId, limit);
        return ResponseEntity.ok(similarProducts);
    }

    @PostMapping("/compare")
    public ResponseEntity<List<QuotationDTO>> compareProducts(@RequestBody List<String> productIds) {
        List<UUID> uuids = productIds.stream().map(UUID::fromString).toList();
        List<QuotationDTO> quotations = quotationService.compareProducts(uuids);
        return ResponseEntity.ok(quotations);
    }
}
