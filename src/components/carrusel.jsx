import React, { useState } from "react";
import ProductCard from "./ProductCard";


const Carrusel = ({ products }) => {
	const [current, setCurrent] = useState(0);
	const total = products.length;
	const itemsPerView = 3;
	const maxIndex = Math.max(0, total - itemsPerView);

	const next = () => {
		setCurrent((prev) => (prev + itemsPerView > maxIndex ? 0 : prev + itemsPerView));
	};

	const prev = () => {
		setCurrent((prev) => (prev - itemsPerView < 0 ? maxIndex : prev - itemsPerView));
	};

	const visibleProducts = products.slice(current, current + itemsPerView);
	
	if (visibleProducts.length < itemsPerView) {
		visibleProducts.push(...products.slice(0, itemsPerView - visibleProducts.length));
	}

	return (
		<div className="carrusel-container" style={{ textAlign: "center", margin: "2rem 0" }}>
			<h2>Productos Destacados</h2>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
				<button onClick={prev} style={{ fontSize: "2rem", marginRight: "1rem" }}>&lt;</button>
				<div style={{ display: "flex", gap: "1rem" }}>
					{visibleProducts.map((product, idx) => (
						<div key={idx} style={{ minWidth: "250px", maxWidth: "350px" }}>
							<ProductCard product={product} />
						</div>
					))}
				</div>
				<button onClick={next} style={{ fontSize: "2rem", marginLeft: "1rem" }}>&gt;</button>
			</div>
			<div style={{ marginTop: "1rem" }}>
				{Array.from({ length: Math.ceil(total / itemsPerView) }).map((_, idx) => (
					<span key={idx} style={{
						display: "inline-block",
						width: "10px",
						height: "10px",
						borderRadius: "50%",
						background: idx * itemsPerView === current ? "#333" : "#ccc",
						margin: "0 4px"
					}} />
				))}
			</div>
		</div>
	);
};

export default Carrusel;
