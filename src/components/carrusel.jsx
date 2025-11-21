import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const getItemsPerView = (width) => {
	if (width < 600) return 1;
	if (width < 1000) return 2;
	return 3;
};

const Carrusel = ({ products }) => {
	const [current, setCurrent] = useState(0);
	const [itemsPerView, setItemsPerView] = useState(getItemsPerView(typeof window !== 'undefined' ? window.innerWidth : 1200));

	useEffect(() => {
		const handleResize = () => {
			const newCount = getItemsPerView(window.innerWidth);
			setItemsPerView((prev) => {
				if (prev !== newCount) return newCount;
				return prev;
			});
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Ensure current is within bounds when itemsPerView or products change
	useEffect(() => {
		const total = products.length;
		const maxIndex = Math.max(0, total - itemsPerView);
		if (current > maxIndex) setCurrent(0);
	}, [itemsPerView, products, current]);

	const total = products.length;
	const maxIndex = Math.max(0, total - itemsPerView);

	const next = () => {
		setCurrent((prev) => (prev + itemsPerView > maxIndex ? 0 : prev + itemsPerView));
	};

	const prev = () => {
		setCurrent((prev) => (prev - itemsPerView < 0 ? maxIndex : prev - itemsPerView));
	};

	let visibleProducts = products.slice(current, current + itemsPerView);
	if (visibleProducts.length < itemsPerView && products.length > 0) {
		visibleProducts = visibleProducts.concat(products.slice(0, itemsPerView - visibleProducts.length));
	}

	const pages = Math.max(1, Math.ceil(total / itemsPerView));

	return (
		<div className="carrusel-container" style={{ textAlign: "center", margin: "2rem 0" }}>
			<h2>Productos Destacados</h2>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
				<button onClick={prev} aria-label="Anterior" className="carousel-btn">&lt;</button>
				<div style={{ display: "flex", gap: "1rem", alignItems: 'stretch' }}>
					{visibleProducts.map((product, idx) => (
						<div key={idx} style={{ minWidth: 0, flex: `0 0 ${Math.min(350, 1000 / itemsPerView)}px`, maxWidth: `${Math.min(350, 1000 / itemsPerView)}px` }}>
							<ProductCard product={product} />
						</div>
					))}
				</div>
				<button onClick={next} aria-label="Siguiente" className="carousel-btn">&gt;</button>
			</div>
			<div style={{ marginTop: "1rem" }}>
				{Array.from({ length: pages }).map((_, idx) => (
					<span key={idx} style={{
						display: "inline-block",
						width: "10px",
						height: "10px",
						borderRadius: "50%",
						background: Math.floor(current / itemsPerView) === idx ? "#333" : "#ccc",
						margin: "0 4px"
					}} />
				))}
			</div>
		</div>
	);
};

export default Carrusel;
