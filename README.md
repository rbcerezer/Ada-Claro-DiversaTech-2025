# 📌 Projeto AdaTech+Claro DiversaTech  

![Java](https://img.shields.io/badge/Java-17-orange?logo=java)  
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-brightgreen?logo=springboot)  
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue)  

---

## 📝 Introdução  
Este projeto implementa um **sistema de registro de tickets para problemas de internet**, desenvolvido em **Java com Spring Boot**.  
O objetivo é permitir que clientes registrem ocorrências de falhas de conexão, armazenando informações relevantes do incidente, incluindo o **IP público do usuário**, obtido por meio da API externa [ipify](https://www.ipify.org/).  

Com isso, cada ticket gerado contém dados mais completos para análise do suporte, ajudando na identificação rápida de falhas e reduzindo o tempo de resolução.  

---

## ⚙️ Como funciona  
🔹 **Fluxo básico do sistema:**  
1. O usuário envia um **POST** para `/tickets` com a descrição do problema.  
2. O backend consulta a API externa `https://api.ipify.org?format=json`.  
3. O IP retornado é adicionado automaticamente ao ticket.  
4. O ticket é então salvo e pode ser consultado posteriormente.  

---

## 🧪 Testando a API Externa (ipify)  

### 🔍 Teste direto (fora da aplicação)  
```bash
curl "https://api.ipify.org?format=json"
Resposta esperada:

json
Copiar código
{
  "ip": "187.45.221.120"
}
💻 Testando dentro da aplicação
Suba o projeto com:

bash
Copiar código
mvn spring-boot:run
Envie um ticket de teste:

bash
Copiar código
curl -X POST http://localhost:8080/tickets \
-H "Content-Type: application/json" \
-d '{"descricao":"Cliente sem internet"}'
Resposta de exemplo:

json
Copiar código
{
  "id": 1,
  "descricao": "Cliente sem internet",
  "ipOrigem": "187.45.221.120"
}
✅ Se o campo ipOrigem estiver preenchido, significa que a integração com o ipify funcionou corretamente.

🚨 Procedimentos em caso de falha
Durante a chamada à API ipify ou ao registrar o ticket, falhas podem ocorrer. Para padronizar as ações, elas são classificadas em níveis de alerta:

--------------
🔹 Baixo — Instabilidade de Rede
Sintomas: demora no retorno do ipify, falhas ocasionais.

Ação:

Repetir a tentativa após alguns segundos.

Registrar o ticket mesmo sem IP (ipOrigem = "indisponível").

Exemplo de log:

json
Copiar código
{
  "level": "WARN",
  "timestamp": "2025-08-27T15:45:12",
  "error": "Timeout ao consultar ipify",
  "action": "Tentando novamente em 5 segundos"
}
-------------------

🔸 Médio — Instabilidade do Sistema
Sintomas: falhas consistentes de comunicação entre o backend e o ipify.

Ação:

Acionar o Time de Aplicações.

Criar log detalhado no sistema de monitoramento.

Revisar dependências externas e conexões do serviço.

Exemplo de log:

json
Copiar código
{
  "level": "ERROR",
  "timestamp": "2025-08-27T15:50:22",
  "error": "Falha ao integrar com ipify",
  "system": "TicketService",
  "action": "Escalonar para Time de Aplicações"
}
----------------------

🔴 Crítico — Instabilidade do Servidor
Sintomas: indisponibilidade total do backend, falhas graves de performance.

Ação:

Acionar o Time de Infraestrutura imediatamente.

Executar plano de contingência (failover/backup).

Comunicar gestores e stakeholders-chave.

Exemplo de log:

json
Copiar código
{
  "level": "FATAL",
  "timestamp": "2025-08-27T15:55:40",
  "error": "Servidor indisponível",
  "system": "BackendSpringBoot",
  "action": "Escalonar imediatamente para Time de Infraestrutura"
}
-------------------------

📞 Escalonamento de Incidentes
A falha deve ser escalonada conforme o nível de gravidade e tempo de resposta.

🚦 Nível de Incidente	👨‍💻 Time Responsável	📧 Contato
🔹 Baixo (rede)	Time de Suporte N1	suporte-n1@provedor.com · (11) 4000-1000
🔸 Médio (aplicação)	Time de Aplicações	aplicacoes@provedor.com · (11) 4000-2000
🔴 Crítico (infra/servidor)	Time de Infraestrutura	infraestrutura@provedor.com · (11) 4000-3000
-----------------------------------------

⚠️ Regras de Escalonamento:

Registrar o incidente no sistema de monitoramento.

Escalonar após 15 minutos sem resolução.

Incidentes críticos devem ser escalonados imediatamente.

📊 Fluxo do Sistema
mermaid
Copiar código
flowchart TD
    A[👤 Cliente] -->|POST /tickets| B[🖥️ Backend Spring Boot]
    B -->|🌐 Chama API externa| C[ipify.org]
    C -->|📡 Retorna IP| B
    B -->|💾 Salva Ticket com IP| D[📂 Base de Dados / Resposta ao Cliente]


✅ Conclusão
O Projeto AdaTech+Claro DiversaTech oferece uma solução robusta para registro de tickets de problemas de internet, integrando captura automática de IP do usuário via API externa.
Com planos de ação bem definidos para falhas e um processo claro de escalonamento, o sistema garante eficiência, rastreabilidade e suporte rápido ao cliente.
