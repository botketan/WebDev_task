const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let products = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  products.forEach(product => {
    const isVisible =
      product.name.toLowerCase().includes(value) || product.description.toLowerCase().includes(value)
    product.element.classList.toggle("hide", !isVisible)
  })
})

fetch("product_dummy_data.json")
  .then(res => res.json())
  .then(data => {
    products = data['products'].map(products => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      const img = card.querySelector("[data-img]")
      const price = card.querySelector("[data-price]")
      header.textContent = products.title
      body.textContent = products.description
      img.src = products.thumbnail
      price.textContent = "Price - $ "+ products.price 
      userCardContainer.append(card)
      return { name: products.title, description: products.description,price: products.price, element: card }
    })
  })