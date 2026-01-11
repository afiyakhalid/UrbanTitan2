package urbantitan.code.services.search;

import java.text.Normalizer;

/**
 * Simple fuzzy scoring helpers.
 *
 * Default score uses a Jaro-Winkler similarity (0..1) with small bonuses for:
 * - startsWith match
 * - word-boundary match
 */
public final class FuzzyScorer {

    private FuzzyScorer() {}

    public static String normalize(String s) {
        if (s == null) return "";
        // Normalize unicode + lowercase + collapse whitespace
        String out = Normalizer.normalize(s, Normalizer.Form.NFKC)
                .toLowerCase()
                .trim()
                .replaceAll("\\s+", " ");
        return out;
    }

    public static double score(String queryRaw, String candidateRaw) {
        String q = normalize(queryRaw);
        String c = normalize(candidateRaw);
        if (q.isEmpty() || c.isEmpty()) return 0.0;

        double base = jaroWinkler(q, c);

        // Heuristics: boost prefix and word-boundary matches for typeahead.
        if (c.startsWith(q)) base = Math.min(1.0, base + 0.15);
        if (wordBoundaryMatch(q, c)) base = Math.min(1.0, base + 0.08);

        return base;
    }

    private static boolean wordBoundaryMatch(String q, String c) {
        if (c.startsWith(q)) return true;
        // look for " q" inside candidate (word boundary)
        return c.contains(" " + q);
    }

    /**
     * Jaro-Winkler similarity in [0,1].
     * Implementation adapted from standard definition (no external deps).
     */
    public static double jaroWinkler(String s1, String s2) {
        if (s1.equals(s2)) return 1.0;
        int len1 = s1.length();
        int len2 = s2.length();
        if (len1 == 0 || len2 == 0) return 0.0;

        int matchDistance = Math.max(len1, len2) / 2 - 1;
        boolean[] s1Matches = new boolean[len1];
        boolean[] s2Matches = new boolean[len2];

        int matches = 0;
        for (int i = 0; i < len1; i++) {
            int start = Math.max(0, i - matchDistance);
            int end = Math.min(i + matchDistance + 1, len2);
            for (int j = start; j < end; j++) {
                if (s2Matches[j]) continue;
                if (s1.charAt(i) != s2.charAt(j)) continue;
                s1Matches[i] = true;
                s2Matches[j] = true;
                matches++;
                break;
            }
        }

        if (matches == 0) return 0.0;

        int t = 0;
        int k = 0;
        for (int i = 0; i < len1; i++) {
            if (!s1Matches[i]) continue;
            while (!s2Matches[k]) k++;
            if (s1.charAt(i) != s2.charAt(k)) t++;
            k++;
        }
        double transpositions = t / 2.0;

        double m = matches;
        double jaro = (m / len1 + m / len2 + (m - transpositions) / m) / 3.0;

        // Winkler prefix boost
        int prefix = 0;
        int maxPrefix = 4;
        for (int i = 0; i < Math.min(Math.min(len1, len2), maxPrefix); i++) {
            if (s1.charAt(i) == s2.charAt(i)) prefix++;
            else break;
        }
        double p = 0.1;
        return jaro + prefix * p * (1.0 - jaro);
    }
}

