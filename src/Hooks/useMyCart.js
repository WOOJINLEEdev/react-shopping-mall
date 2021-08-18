import useSWR from "swr";
import axios from "axios";

export default function useMyCart() {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const cartUrl = "http://localhost:8282/v1/me/cart";
  const fetcher = (url) => {
    return axios
      .get(url, config)
      .then((res) => ({
        ...res.data,
        items: res.data.items.map((cartItem) => ({
          ...cartItem,
          checked: true,
        })),
      }))
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          return {
            items: [],
          };
        }
        console.error("cart e: ", error.response);
        throw error;
      });
  };
  const { data, error, mutate } = useSWR(cartUrl, fetcher);

  return {
    cart: data,
    loadingCart: !error && !data,
    cartError: error,
    mutateCart: mutate,
  };
}
