import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  const handleAddToCart = () => {
    const existingItem = cartItems.find(item => item.id === product.id);
    const availableQuantity = product.quantity;
    const quantityInCart = existingItem ? existingItem.quantity : 0;

    if (quantityInCart < availableQuantity) {
      dispatch(addToCart(product));
    } 
    else {
      alert('нельзя добавить больше товара, чем есть в наличии');
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 3 }}>
        <motion.div
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.2 }}
        >
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.title}
            sx={{ objectFit: 'contain' }}
          />
        </motion.div>
        <CardContent>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="body2">{product.description}</Typography>
          <Typography variant="h5">{product.price}$</Typography>
          <Typography variant="body2" color="text.secondary">
            В наличии: {product.quantity} шт.
          </Typography>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{ mt: 2 }}
          >
            Добавить в корзину
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default ProductCard;