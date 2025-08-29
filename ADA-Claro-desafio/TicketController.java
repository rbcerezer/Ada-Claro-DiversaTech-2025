package com.ticket.ticket_api.controller;

import com.ticket.ticket_api.model.Ticket;
import com.ticket.ticket_api.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService service;

    public TicketController(TicketService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Ticket> create(@RequestBody Ticket ticket) {
        return ResponseEntity.ok(service.save(ticket));
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> list() {
        return ResponseEntity.ok(service.findAll());
    }
}
