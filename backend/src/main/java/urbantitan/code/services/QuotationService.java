package urbantitan.code.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import urbantitan.code.dto.quotation.QuotationDTO;
import urbantitan.code.dto.quotation.SimilarProductDTO;
import urbantitan.code.entities.DealerQuotation;
import urbantitan.code.entities.Product;
import urbantitan.code.repositories.DealerQuotationRepository;
import urbantitan.code.repositories.ProductRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuotationService {

    private final DealerQuotationRepository quotationRepository;
    private final ProductRepository productRepository;

    public List<QuotationDTO> getQuotationsForProduct(UUID productId) {
        List<DealerQuotation> quotations = quotationRepository.findActiveQuotationsForProduct(productId);
        return quotations.stream()
            .map(this::mapToQuotationDTO)
            .toList();
    }

    public List<SimilarProductDTO> getSimilarProducts(UUID productId, int limit) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        UUID categoryId = product.getCategory() != null ? product.getCategory().getId() : null;
        if (categoryId == null) {
            return Collections.emptyList();
        }

        List<Product> similarProducts = productRepository.findByCategoryIdAndIsActiveTrue(categoryId)
            .stream()
            .filter(p -> !p.getId().equals(productId))
            .limit(limit)
            .toList();

        List<UUID> productIds = similarProducts.stream().map(Product::getId).toList();
        List<DealerQuotation> allQuotations = quotationRepository.findActiveQuotationsForProducts(productIds);

        Map<UUID, List<DealerQuotation>> quotationsByProduct = allQuotations.stream()
            .collect(Collectors.groupingBy(q -> q.getProduct().getId()));

        return similarProducts.stream()
            .map(p -> {
                List<DealerQuotation> productQuotations = quotationsByProduct.getOrDefault(p.getId(), Collections.emptyList());
                QuotationDTO bestQuotation = productQuotations.isEmpty() ? null : mapToQuotationDTO(productQuotations.get(0));

                return SimilarProductDTO.builder()
                    .productId(p.getId().toString())
                    .productName(p.getName())
                    .productSlug(p.getSlug())
                    .brandName(p.getBrand() != null ? p.getBrand().getName() : null)
                    .categoryName(p.getCategory() != null ? p.getCategory().getName() : null)
                    .productImage(p.getPrimaryImageUrl())
                    .basePrice(p.getBasePrice())
                    .mrp(p.getMrp())
                    .rating(p.getRating())
                    .reviewCount(p.getReviewCount())
                    .bestQuotation(bestQuotation)
                    .totalQuotations(productQuotations.size())
                    .build();
            })
            .toList();
    }

    public List<QuotationDTO> compareProducts(List<UUID> productIds) {
        List<DealerQuotation> allQuotations = quotationRepository.findActiveQuotationsForProducts(productIds);
        return allQuotations.stream()
            .map(this::mapToQuotationDTO)
            .toList();
    }

    private QuotationDTO mapToQuotationDTO(DealerQuotation quotation) {
        return QuotationDTO.builder()
            .id(quotation.getId().toString())
            .productId(quotation.getProduct().getId().toString())
            .productName(quotation.getProduct().getName())
            .brandName(quotation.getProduct().getBrand() != null ? quotation.getProduct().getBrand().getName() : null)
            .productImage(quotation.getProduct().getPrimaryImageUrl())
            .dealerId(quotation.getDealer().getId().toString())
            .dealerName(quotation.getDealer().getName())
            .unitPrice(quotation.getUnitPrice())
            .mrp(quotation.getMrp())
            .discountPercent(quotation.getDiscountPercent())
            .minOrderQty(quotation.getMinOrderQty())
            .leadTimeDays(quotation.getLeadTimeDays())
            .stockAvailable(quotation.getStockAvailable())
            .notes(quotation.getNotes())
            .servicesOffered(quotation.getServicesOffered())
            .validUntil(quotation.getValidUntil())
            .createdAt(quotation.getCreatedAt())
            .build();
    }
}
