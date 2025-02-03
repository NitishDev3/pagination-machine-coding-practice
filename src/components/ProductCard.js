const ProductCard = ({ productImage, productTitle }) => {
  return (
    <div className='product-card'>
      <img className='product-img' src={productImage} alt={productTitle} />
      <p className='product-name'>{productTitle}</p>
    </div>
  )
}

export default ProductCard;