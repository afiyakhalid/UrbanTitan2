package urbantitan.code.configs;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {
    
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.typeMap(urbantitan.code.entities.Category.class, urbantitan.code.dto.category.CategoryResponseDTO.class)
            .addMappings(mapper -> mapper.map(
                src -> src.getParent() != null ? src.getParent().getId() : null,
                urbantitan.code.dto.category.CategoryResponseDTO::setParent_id
            ));
        return modelMapper;
    }
}