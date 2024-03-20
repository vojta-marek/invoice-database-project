package cz.itnetwork.dto.mapper;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.entity.InvoiceEntity;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {

    InvoiceEntity toEntity(InvoiceDTO source);

    InvoiceDTO toDTO(InvoiceEntity source);

    @Mapping(target = "seller", ignore = true)
    @Mapping(target = "buyer", ignore = true)
    InvoiceEntity updateInvoiceEntity(InvoiceDTO source, @MappingTarget InvoiceEntity target);
}
