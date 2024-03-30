import React, { useEffect, useState } from "react";
import "../assets/Default.scss";
import { client } from "../Api/cardAPI";
import Loading from "./Loading";
import useSelector from "../core/hook";
import CardProduct from "./CardProduct";
import { useDispatch } from "../core/hook";
import { toast } from "react-toastify";

export default function DefaultFage() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState("true");
  const { card } = useSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getQuanTity() {
      try {
        const { response, data } = await client.get("/products?limit=8");
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong!");
          ``;
        }
        const ProductList = data.data.listProduct;

        setProduct(ProductList);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }
    getQuanTity();
  }, []);

  const handleAddCard = ({ id, name, price, quantity }) => {
    const existingProduct = card.find((product) => product.id === id);
    if (existingProduct) {
      dispatch({
        type: "card/add",
        payload: {
          id: id,
          name: name,
          price: price,
          quantity: quantity,
          quantum: existingProduct.quantum + 1, 
        },
      });
    } else {
      dispatch({
        type: "card/add",
        payload: {
          id: id,
          name: name,
          price: price,
          quantity: quantity,
          quantum: 1,
        },
      });
    }
    toast("Đã thêm sản phẩm vào giỏ hàng ", {
      autoClose: 800,
    });
  };

  return (
    <div className="quantity-container">
      <div className="box-quantity">
        <h3 className="title"> WELCOME TO SHOP</h3>

        {loading && <Loading />}
        <div className="quantity-List">
          <ul>
            {product.map(({ image, name, price, _id: id, quantity }) => (
              <li key={id}>
                <img src={image} alt={name} />
                <p className="nameProduct">{name}</p>
                <div className="bottom">
                  <div className="price">{price}$</div>
                  <button
                    className="cta"
                    onClick={() => {
                      handleAddCard({ id, name, price, quantity });
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {Object.entries(card).length === 0 ? (
          <h3> Giỏ hàng chưa có sp nào </h3>
        ) : (
          <CardProduct />
        )}
      </div>
    </div>
  );
}
