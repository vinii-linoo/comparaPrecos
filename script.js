/*
  Lógica de Programação

  [x] Pegar os dados do input quando os botão for clicado
  [x] Ir até o servidor, e trazer os produtos
  [x] Colocar os produtos na tela 
  [x] Criar o gráfico na tela

*/

const searchform = document.querySelector('.search-form')
const productlist = document.querySelector('.product-list')
const priceChart = document.querySelector('.price-chart')

let myChart = ''

searchform.addEventListener('submit', async function (event) {
    event.preventDefault()
    const inputValue = event.target[0].value

    const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${inputValue}`)
    const products = (await data.json()).results.slice(0, 10)

    displayItens(products)
    updatePriceChart(products)
})

function displayItens(products) {
    console.log(products)
    productlist.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.thumbnail.replace(/\w\.jpg/gi, 'W.jpg')}" alt="${product.title}">
            <a href="${product.permalink}" <h3>${product.title}</h3></a>
            <p class="price">${product.price.toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</p>
            <p class="store">Loja: ${product.seller.nickname}</p>
        </div>




        `).join('')
}

function updatePriceChart(products) {
    const ctx = priceChart.getContext('2d');
    if (myChart) {
    myChart.destroy();
    }
    myChart = new Chart(ctx, {
    type: 'bar',
    data: {
    labels: products.map(p => p.title.substring(0, 20) + '...'),
    datasets: [{
    label: 'Preço (R$)',
    data: products.map(p => p.price),
    backgroundColor: 'rgba(46, 204, 113, 0.6)',
    borderColor: 'rgba(46, 204, 113, 1)',
    borderWidth: 1
    }]
    },
    options: {
    responsive: true,
    scales: {
    y: {
    beginAtZero: true,
    ticks: {
    callback: function(value) {
    console.log(value)
    
    return 'R$ ' + value.toFixed(2);
    }
    }
    }
    },
    plugins: {
    legend: {
    display: false
    },
    title: {
    display: true,
    text: 'Comparação de Preços',
    font: {
    size: 18
    }
    }
    }
    }
    });
    }