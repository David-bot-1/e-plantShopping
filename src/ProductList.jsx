import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" },
            ]
        },
        // ...other categories
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    const isInCart = (plantName) => {
        return cartItems.some(item => item.name === plantName);
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    // Total quantity in cart
    const totalCartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div>
            <div className="navbar">
                <div className="luxury">
                    <a href="/" onClick={handleHomeClick}>
                        <h3>Paradise Nursery</h3>
                    </a>
                </div>
                <div>
                    <button onClick={handleCartClick}>Cart ({totalCartQuantity})</button>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map(category =>
                        category.plants.map(plant => (
                            <div key={plant.name} className="product-card">
                                <img src={plant.image} alt={plant.name} />
                                <h3>{plant.name}</h3>
                                <p>{plant.description}</p>
                                <h4>{plant.cost}</h4>
                                <button
                                    onClick={() => handleAddToCart(plant)}
                                    disabled={isInCart(plant.name)}
                                >
                                    {isInCart(plant.name) ? 'Added' : 'Add to Cart'}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;

