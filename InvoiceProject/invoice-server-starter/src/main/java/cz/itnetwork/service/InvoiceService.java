package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.entity.InvoiceStatistics;
import cz.itnetwork.entity.PersonStatistics;
import cz.itnetwork.entity.filter.InvoiceFilter;

import java.util.List;

public interface InvoiceService {

    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    void removeInvoice(long id);

    List<InvoiceDTO> getAll(InvoiceFilter invoiceFilter);


    InvoiceDTO getInvoice(Long id);

    InvoiceDTO editInvoice(long id, InvoiceDTO invoiceDTO);

    InvoiceStatistics getStatistics();
}
