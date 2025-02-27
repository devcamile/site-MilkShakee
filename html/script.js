document.querySelectorAll('.adicionar-carrinho').forEach(button => {
    button.addEventListener('click', (event) => {
        const cardapioItem = event.target.closest('.cardapio-item');
        const nome = cardapioItem.getAttribute('data-nome');
        const precoBase = parseFloat(cardapioItem.getAttribute('data-preco')); // Preço base do milkshake
        const tamanho = cardapioItem.querySelector('.size-selector').value;
        const adicionais = [];

        // Adicionando adicionais selecionados
        cardapioItem.querySelectorAll('.adicionais input:checked').forEach(input => {
            adicionais.push(input.value);
        });

        // Calcular o preço com base no tamanho
        let precoTotal = precoBase;
        switch (tamanho) {
            case 'pequeno':
                precoTotal += 0; // Nenhum ajuste para o tamanho pequeno
                break;
            case 'medio':
                precoTotal += 2.00; // Supondo que o médio tenha um custo adicional
                break;
            case 'grande':
                precoTotal += 4.00; // Supondo que o grande tenha um custo adicional
                break;
        }

        // Adicionando o custo dos adicionais
        adicionais.forEach(adicional => {
            switch (adicional) {
                case 'granulado':
                    precoTotal += 1.50;
                    break;
                case 'chantilly-extra':
                    precoTotal += 2.00;
                    break;
                case 'calda-caramelo':
                    precoTotal += 1.00;
                    break;
                case 'calda-chocolate':
                    precoTotal += 1.00;
                    break;
                case 'marshmello':
                    precoTotal += 1.50;
                    break;
            }
        });

        // Adicionando ao carrinho
        const carrinho = document.getElementById('itens-carrinho');
        const totalCarrinho = document.getElementById('total-carrinho');
        
        const itemCarrinho = document.createElement('li');
        itemCarrinho.textContent = `${nome} (${tamanho}) - R$ ${precoTotal.toFixed(2)} - Adicionais: ${adicionais.join(', ')}`;
        carrinho.appendChild(itemCarrinho);
        
        // Atualizando o total
        let total = parseFloat(totalCarrinho.textContent) || 0; // Se totalCarrinho for vazio, inicializa com 0
        total += precoTotal;
        totalCarrinho.textContent = total.toFixed(2);
    });
});
