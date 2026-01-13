package urbantitan.code.services.search;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;

/**
 * Simple fuzzy scoring helpers.
 *
 * Default score uses a Jaro-Winkler similarity (0..1) with small bonuses for:
 * - startsWith match
 * - word-boundary match
 *
 * Enhanced:
 * - token-aware scoring (best word/token match)
 * - typo tolerance via normalized Levenshtein similarity
 */
public final class FuzzyScorer {

    private FuzzyScorer() {}

    public static String normalize(String s) {
        if (s == null) return "";
        // Normalize unicode + lowercase + collapse whitespace
        return Normalizer.normalize(s, Normalizer.Form.NFKC)
                .toLowerCase()
                .trim()
                .replaceAll("\\s+", " ");
    }

    /**
     * Main fuzzy score in [0,1].
     * Works for full-string matches and also tolerates typos by:
     * 1) comparing query vs full candidate
     * 2) comparing query vs each token in candidate (best token wins)
     * 3) blending Jaro-Winkler with edit-distance similarity
     */
    public static double score(String queryRaw, String candidateRaw) {
        String q = normalize(queryRaw);
        String c = normalize(candidateRaw);
        if (q.isEmpty() || c.isEmpty()) return 0.0;

        // 1) full-string score
        double full = blendedSimilarity(q, c);

        // Heuristics: boost prefix and word-boundary matches for typeahead.
        if (c.startsWith(q)) full = Math.min(1.0, full + 0.15);
        if (wordBoundaryMatch(q, c)) full = Math.min(1.0, full + 0.08);

        // 2) token score (handles cases like "cemt" -> "cement" inside "ACC ... Cement")
        double tokenBest = 0.0;
        for (String tok : tokens(c)) {
            if (tok.isEmpty()) continue;
            double s = blendedSimilarity(q, tok);
            if (tok.startsWith(q)) s = Math.min(1.0, s + 0.12);
            tokenBest = Math.max(tokenBest, s);
        }

        // 3) final: prefer strong token matches, but keep full-string context
        return clamp01(Math.max(full, tokenBest));
    }

    private static double blendedSimilarity(String a, String b) {
        // Jaro-Winkler is good for transpositions; Levenshtein is good for typos/missing chars.
        double jw = jaroWinkler(a, b);
        double lev = levenshteinSimilarity(a, b);

        // Weighted blend (tuned to keep existing behavior while improving typos).
        double blended = 0.70 * jw + 0.30 * lev;

        // Extra tiny boost if query is a subsequence (e.g., "stel" in "steel")
        if (isSubsequence(a, b)) blended = Math.min(1.0, blended + 0.05);

        return blended;
    }

    private static List<String> tokens(String s) {
        // split on non-alphanumeric, keep words together
        String[] parts = s.split("[^a-z0-9]+");
        List<String> out = new ArrayList<>(parts.length);
        for (String p : parts) {
            if (!p.isEmpty()) out.add(p);
        }
        return out;
    }

    private static boolean isSubsequence(String q, String c) {
        int i = 0, j = 0;
        while (i < q.length() && j < c.length()) {
            if (q.charAt(i) == c.charAt(j)) i++;
            j++;
        }
        return i == q.length();
    }

    private static boolean wordBoundaryMatch(String q, String c) {
        if (c.startsWith(q)) return true;
        // look for " q" inside candidate (word boundary)
        return c.contains(" " + q);
    }

    private static double clamp01(double v) {
        if (v < 0.0) return 0.0;
        if (v > 1.0) return 1.0;
        return v;
    }

    /**
     * Normalized similarity from Levenshtein distance.
     * Returns 1.0 for exact match, 0.0 for very far strings.
     */
    public static double levenshteinSimilarity(String s1, String s2) {
        if (s1.equals(s2)) return 1.0;
        int len1 = s1.length();
        int len2 = s2.length();
        if (len1 == 0 || len2 == 0) return 0.0;

        int dist = levenshteinDistance(s1, s2);
        int maxLen = Math.max(len1, len2);
        return 1.0 - (dist / (double) maxLen);
    }

    /**
     * Levenshtein distance (iterative, O(n*m) time, O(min(n,m)) memory).
     */
    public static int levenshteinDistance(String a, String b) {
        // Ensure b is the shorter string to save memory
        if (a.length() < b.length()) {
            String tmp = a; a = b; b = tmp;
        }
        int n = a.length();
        int m = b.length();

        int[] prev = new int[m + 1];
        int[] curr = new int[m + 1];

        for (int j = 0; j <= m; j++) prev[j] = j;

        for (int i = 1; i <= n; i++) {
            curr[0] = i;
            char ca = a.charAt(i - 1);
            for (int j = 1; j <= m; j++) {
                char cb = b.charAt(j - 1);
                int cost = (ca == cb) ? 0 : 1;
                int del = prev[j] + 1;
                int ins = curr[j - 1] + 1;
                int sub = prev[j - 1] + cost;
                curr[j] = Math.min(Math.min(del, ins), sub);
            }
            int[] tmp = prev; prev = curr; curr = tmp;
        }
        return prev[m];
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
