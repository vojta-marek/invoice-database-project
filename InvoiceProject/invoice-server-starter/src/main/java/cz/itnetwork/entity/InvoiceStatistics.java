package cz.itnetwork.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceStatistics {

    private double currentYearSum;

    private double allTimeSum;

    private long invoicesCount;
}
