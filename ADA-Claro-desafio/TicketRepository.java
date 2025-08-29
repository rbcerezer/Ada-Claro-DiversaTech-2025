package com.ticket.ticket_api.repository;

import com.ticket.ticket_api.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
