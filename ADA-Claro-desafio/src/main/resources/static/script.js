// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Funcionalidade para os cartões de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Adiciona efeito de clique
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            
            // Simula uma ação baseada no serviço clicado
            handleServiceClick(serviceName);
            
            // Adiciona efeito visual de clique
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Adiciona efeito de hover mais suave
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Funcionalidade para os botões do cabeçalho
    const btnContrate = document.querySelector('.btn-contrate');
    const btnMinhaClaro = document.querySelector('.btn-minha-claro');
    
    if (btnContrate) {
        btnContrate.addEventListener('click', function() {
            showMessage('Redirecionando para página de contratação...', 'info');
        });
    }
    
    if (btnMinhaClaro) {
        btnMinhaClaro.addEventListener('click', function() {
            showMessage('Redirecionando para área do cliente...', 'info');
        });
    }
    
    // Funcionalidade para os itens do menu de navegação
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const menuName = this.querySelector('span').textContent;
            showMessage(`Menu "${menuName}" selecionado`, 'info');
        });
    });
    
    // Adiciona animação de entrada suave para os elementos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Observa os elementos para animação
    const elementsToAnimate = document.querySelectorAll('.autoatendimento-section, .movel-section');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Função para lidar com cliques nos serviços
function handleServiceClick(serviceName) {
    const serviceActions = {
        'Fatura fácil': 'Acessando sistema de fatura fácil...',
        '2ª via da fatura': 'Gerando segunda via da fatura...',
        'Débito automático': 'Configurando débito automático...',
        'Faça sua recarga': 'Redirecionando para recarga...',
        'Extrato de recargas': 'Carregando extrato de recargas...',
        'Renegociar fatura': 'Abrindo opções de renegociação...',
        'Suporte técnico': 'Conectando com suporte técnico...',
        'Mude seu plano': 'Carregando opções de planos...',
        'Acompanhar portabilidade': 'Verificando status da portabilidade...',
        'Ativar chip': 'Iniciando ativação do chip...',
        'Bloquear linha': 'Acessando opções de bloqueio...',
        'Fale com a Claro': 'Conectando com atendimento...'
    };
    
    const message = serviceActions[serviceName] || `Serviço "${serviceName}" selecionado`;
    showMessage(message, 'success');
}

// Função para exibir mensagens ao usuário
function showMessage(message, type = 'info') {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Cria nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-popup message-${type}`;
    messageDiv.textContent = message;
    
    // Estilos da mensagem
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-weight: 500;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Adiciona animação CSS
    if (!document.querySelector('#message-styles')) {
        const style = document.createElement('style');
        style.id = 'message-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageDiv);
    
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 3000);
}

// Função para simular carregamento
function showLoading(element) {
    const originalText = element.textContent;
    element.textContent = 'Carregando...';
    element.style.opacity = '0.7';
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.opacity = '1';
    }, 1500);
}

// Adiciona funcionalidade de busca (simulada)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar serviços...';
    searchInput.style.cssText = `
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        margin-bottom: 20px;
        width: 100%;
        max-width: 300px;
        font-size: 14px;
    `;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const cards = document.querySelectorAll('.service-card');
        
        cards.forEach(card => {
            const serviceName = card.querySelector('h3').textContent.toLowerCase();
            if (serviceName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = searchTerm === '' ? 'block' : 'none';
            }
        });
    });
    
    const movelSection = document.querySelector('.movel-section');
    if (movelSection) {
        movelSection.insertBefore(searchInput, movelSection.querySelector('.services-grid'));
    }
}



// Inicializa funcionalidades adicionais
setTimeout(() => {
    addSearchFunctionality();
}, 1000);

//endpoints rest
const API = "http:localhost:8080/api/users";
async function getUsers() {
    const response = await fetch(API);
    const users = await response.json();
    console.log(users);
}


//POST
async function createUser(user) {
    const response = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const newUser = await response.json();
    console.log(newUser);
}