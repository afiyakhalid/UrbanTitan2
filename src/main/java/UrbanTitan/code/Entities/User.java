package UrbanTitan.code.Entities;

import jakarta.persistence.Entity;

// Hello there

@Entity
@Table(name = "categories")
public class Category {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID categoryId;

    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Category parentCategory;

    private Instant createdAt = Instant.now();
}

@Entity
@Table(name = "brands")
public class Brand {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID brandId;

    private String name;
    private String logoUrl;
    private String description;

    private Instant createdAt = Instant.now();
}

@Entity
@Table(name = "products")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID productId;

    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private boolean isActive = true;
    private Instant createdAt = Instant.now();
}

@Entity
@Table(name = "product_attributes")
public class ProductAttribute {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID productAttributeId;

    private String name; // e.g. Voltage, Power, Size, Material
    private String unit; // e.g. V, W, mm, PSI
}

@Entity
@Table(name = "attribute_values")
public class AttributeValue {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String value; // e.g. 230V, 600W, 10mm
}

@Entity
@Table(
    name = "product_attribute_values",
    uniqueConstraints = @UniqueConstraint(columnNames = {"productAttributeId", "attributeValueId"})
)
public class ProductAttributeValue {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID productAttributeValueId;

    @ManyToOne
    @JoinColumn(name = "productAttributeId")
    private ProductAttribute attribute;

    @ManyToOne
    @JoinColumn(name = "attributeValueId")
    private AttributeValue value;

    private Instant createdAt = Instant.now();
}

@Entity
@Table(name = "product_variants")
public class ProductVariant {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID productVariantId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String sku;
    private int stockQuantity;
    private BigDecimal price;
    private boolean isDefault;
    private boolean isActive = true;

    @Column(columnDefinition = "jsonb")
    private String productMedia;

    @Column(columnDefinition = "jsonb")
    private String otherData;

    private Instant createdAt = Instant.now();
}

@Entity
@Table(name = "product_variant_attribute_values")
@IdClass(ProductVariantAttributeId.class)
public class ProductVariantAttributeValue {
    @Id
    private UUID productVariantId;

    @Id
    private UUID productAttributeValueId;

    private Instant createdAt = Instant.now();
}

@Entity
@Table(name = "contracts")
public class Contract {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID contractId;

    private String name;
    private String type; // e.g. "corporate", "government", "retail"
    private Instant startDate;
    private Instant endDate;
}

@Entity
@Table(name = "contract_category_discounts", uniqueConstraints = @UniqueConstraint(columnNames = {"contractId", "categoryId"}))
public class ContractCategoryDiscount {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID discountId;

    @ManyToOne @JoinColumn(name = "contractId")
    private Contract contract;

    @ManyToOne @JoinColumn(name = "categoryId")
    private Category category;

    private String discountType; // percentage or fixed
    private BigDecimal discountValue;
}

@Entity
@Table(name = "contract_brand_discounts", uniqueConstraints = @UniqueConstraint(columnNames = {"contractId", "brandId"}))
public class ContractBrandDiscount {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID discountId;

    @ManyToOne @JoinColumn(name = "contractId")
    private Contract contract;

    @ManyToOne @JoinColumn(name = "brandId")
    private Brand brand;

    private String discountType;
    private BigDecimal discountValue;
}

@Entity
@Table(name = "contract_product_discounts", uniqueConstraints = @UniqueConstraint(columnNames = {"contractId", "productId"}))
public class ContractProductDiscount {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID discountId;

    @ManyToOne @JoinColumn(name = "contractId")
    private Contract contract;

    @ManyToOne @JoinColumn(name = "productId")
    private Product product;

    private String discountType;
    private BigDecimal discountValue;
}