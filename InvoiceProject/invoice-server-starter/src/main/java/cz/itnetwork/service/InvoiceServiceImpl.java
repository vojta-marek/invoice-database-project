package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.dto.mapper.PersonMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.InvoiceStatistics;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.PersonStatistics;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.PersonRepository;
import cz.itnetwork.entity.repository.specification.InvoiceSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.awt.print.Pageable;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private InvoiceMapper invoiceMapper;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PersonMapper personMapper;

    @Override
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        PersonEntity buyer = personRepository.findById(invoiceDTO.getBuyer().getId())
                .orElseThrow();
        PersonEntity seller = personRepository.findById(invoiceDTO.getSeller().getId())
                .orElseThrow();

        invoiceDTO.setBuyer(personMapper.toDTO(buyer));
        invoiceDTO.setSeller(personMapper.toDTO(seller));

        InvoiceEntity invoiceEntity = invoiceMapper.toEntity(invoiceDTO);


        invoiceEntity = invoiceRepository.save(invoiceEntity);
        return invoiceMapper.toDTO(invoiceEntity);
    }

    @Override
    public void removeInvoice(long invoiceId) {
        try {
            InvoiceEntity invoice = fetchInvoiceById(invoiceId);
            invoiceRepository.delete(invoice);
        } catch (NotFoundException ignored) {
            // The contract in the interface states, that no exception is thrown, if the entity is not found.
        }
    }

    @Override
    public List<InvoiceDTO> getAll(InvoiceFilter invoiceFilter) {
        InvoiceSpecification invoiceSpecification = new InvoiceSpecification(invoiceFilter);

        return invoiceRepository.findAll(invoiceSpecification, PageRequest.of(0, invoiceFilter.getLimit()))
                .stream()
                .map(i -> invoiceMapper.toDTO(i))
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceDTO getInvoice(Long id) {
        InvoiceEntity invoiceEntity = fetchInvoiceById(id);
        return invoiceMapper.toDTO(invoiceEntity);
    }

    @Override
    public InvoiceDTO editInvoice(long id, InvoiceDTO invoiceDTO) {
        invoiceDTO.setInvoiceId(id);

        InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);

        PersonEntity buyer = personRepository.findById(invoiceDTO.getBuyer().getId()).orElseThrow();
        invoiceDTO.setBuyer(personMapper.toDTO(buyer));

        PersonEntity seller = personRepository.findById(invoiceDTO.getSeller().getId()).orElseThrow();
        invoiceDTO.setSeller(personMapper.toDTO(seller));

        invoiceMapper.updateInvoiceEntity(invoiceDTO, entity);
        invoiceRepository.saveAndFlush(entity);

        return invoiceMapper.toDTO(entity);
    }

    @Override
    public InvoiceStatistics getStatistics() {
        return invoiceRepository.getInvoiceStatistics();
    }

    private InvoiceEntity fetchInvoiceById(long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Invoice with id " + id + " wasn't found in the database."));
    }



}
