package urbantitan.code.repositories.search;

/**
 * Projection for DB-side trigram search results.
 *
 * Used with native queries returning (label, slug, score).
 */
public interface TrigramSearchRow {
    String getLabel();
    String getSlug();
    double getScore();
}

