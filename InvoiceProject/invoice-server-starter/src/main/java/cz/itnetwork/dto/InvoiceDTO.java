package cz.itnetwork.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.DateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDTO {

    @JsonProperty("_id")
    private Long invoiceId;

    private int invoiceNumber;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date issued;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dueDate;

    private String product;

    private float price;

    private int vat;

    private String note;

    private PersonDTO buyer;

    private PersonDTO seller;

}
