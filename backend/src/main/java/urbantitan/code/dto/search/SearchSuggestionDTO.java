package urbantitan.code.dto.search;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchSuggestionDTO {

    private String type;


    private String label;


    private String slug;


    private double score;
}
//this works