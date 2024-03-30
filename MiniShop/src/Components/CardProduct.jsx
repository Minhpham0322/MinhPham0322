import React, { Fragment, useEffect, useState } from "react";
import "../assets/CardProduct.scss";
import useSelector from "../core/hook";
import { client } from "../Api/cardAPI";
import { toast } from "react-toastify";
import { useDispatch } from "../core/hook";
import Loading from "./Loading";
function CardProduct() {
  const { card } = useSelector();
  const [productOrder, setProductOrder] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const transformedCard = card.map((item) => {
      return {
        productId: item.id,
        quantity: item.quantum,
      };
    });
    const products = transformedCard;
    setProductOrder(products);

    const totalPrice = card.reduce((acc, item) => acc + item.total, 0);
    setTotalPrice(totalPrice);
  }, [card]);

  const handleOrder = async () => {
    setLoading("true");
    if (productOrder.length > 0) {
      try {
        const { response } = await client.post(`/order/${productOrder}`);
        if (response.ok) {
          setLoading(false);
          toast("Cảm ơn bạn đã đặt hàng", {
            autoClose: 1000,
          });
          dispatch({
            type: "card/reset",
          });
        }
      } catch (error) {
        toast(`${error.message}`);
      }
    }
  };

  return (
    <Fragment>
      {loading && <Loading />}
      <table className="product-table">
        <thead>
          <tr>
            <th>TÊN SẢN PHẨM</th>
            <th>SỐ LƯỢNG</th>
            <th>CÒN LẠI</th>
            <th>TỔNG TIỀN</th>
          </tr>
        </thead>
        <tbody>
          {card.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td> {item.quantum}</td>
              <td>{item.quantity}</td>
              <td>
                <b>{item.total.toLocaleString()} $</b>
              </td>
            </tr>
          ))}
          <tr>
            {" "}
            {/* Hàng ngang mới để hiển thị tổng số tiền */}
            <td colSpan="3"></td>
            <td>
              <b>Total: {totalPrice.toLocaleString()} $ </b>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="payment-button" onClick={handleOrder}>
        Order
      </button>
    </Fragment>
  );
}

export default CardProduct;
