package cz.itnetwork.entity.repository;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.InvoiceStatistics;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.PersonStatistics;
import cz.itnetwork.entity.filter.InvoiceFilter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long>, JpaSpecificationExecutor<InvoiceEntity> {

    @Query("""
            SELECT new cz.itnetwork.entity.InvoiceStatistics(
            COALESCE(SUM(this_year.price),0.0),
            COALESCE(SUM(all_years.price),0.0),
            COUNT(*) AS numberOfInvoices)
            FROM invoice all_years
            LEFT JOIN invoice this_year
            ON all_years.id = this_year.id
            AND YEAR(this_year.issued) = YEAR(CURRENT_DATE)
            """)
    InvoiceStatistics getInvoiceStatistics();

}
