/*
* <license header>
*/

module.exports = {
  extensionId: 'cf-picker-ue',
  test:'three, four',
  products: {
    columns: [
      { name: '', id: 'imageUrl', width: 80 },
      { name: 'Product Name', id: 'name' },
      { name: 'Description', id: 'description' },
      { name: 'Price', id: 'price' },
      { name: 'Category', id: 'category' }
    ],
    rows: [
      {
        id: 'field-sneakers-1',
        name: 'Field Sneakers',
        description: 'A low-profile silhouette with an ultra-slim rubber sole.',
        price: 250,
        imageUrl: 'https://smartimaging.scene7.com/is/image/DynamicmediaNA1/field-sneaker',
        category: 'Shoes'
      },
      {
        id: 'field-sneakers-2',
        name: 'Field Sneakers',
        description: 'A low-profile silhouette with an ultra-slim rubber sole.',
        price: 250,
        imageUrl: 'https://smartimaging.scene7.com/is/image/DynamicmediaNA1/field-sneaker-angle.TB_176839_300_SLANG.pdp-750x853',
        category: 'Shoes'
      }
    ]

  }
}