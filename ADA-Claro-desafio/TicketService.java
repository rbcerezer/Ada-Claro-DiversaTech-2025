public package com.ticket.ticket_api.service;

import com.ticket.ticket_api.model.Ticket;
import com.ticket.ticket_api.repository.TicketRepository;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository repository;
    private final Counter ticketsCriadosCounter;

    public TicketService(TicketRepository repository, MeterRegistry meterRegistry) {
        this.repository = repository;
        // Inicializa o contador de métricas
        this.ticketsCriadosCounter = Counter.builder("tickets.criados")
                .description("Total de tickets criados no sistema")
                .register(meterRegistry);
    }

    public Ticket save(Ticket ticket) {
        // Incrementa o contador antes de salvar
        ticketsCriadosCounter.increment();
        return repository.save(ticket);
    }

    public List<Ticket> findAll() {
        return repository.findAll();
    }

    // Métodos adicionais úteis
    public long countAllTickets() {
        return repository.count();
    }

    public Ticket findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket não encontrado com ID: " + id));
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
} TicketService {
    
}
