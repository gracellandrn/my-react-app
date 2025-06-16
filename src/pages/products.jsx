import CardProduct from "../components/Fragments/CardProduct";
import { useContext, useEffect, useState } from "react";
import { getProduct } from "../services/productService";
import { getUsername } from "../services/authService";
import { useLogin } from "../hooks/useLogin";
import TableCart from "../components/Fragments/TableCart";
import Navbar from "../components/Layouts/Navbar";
import { DarkMode } from "../context/DarkMode";

// const products = [
//     {
//         id: 1,
//         image: "./images/shoes.jpg",
//         name: "Sepatu Baru",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus animi ab molestiae nisi et corporis eaque illum labore corrupti ullam. Dolores in eveniet obcaecati doloribus voluptatibus consequatur ab cupiditate fugiat?",
//         price: 1000000
//     },
//     {
//         id: 2,
//         image: "./images/shoes.jpg",
//         name: "Sepatu Lama",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
//         price: 700000
//     },
//     {
//         id: 3,
//         image: "./images/shoes.jpg",
//         name: "Sepatu Adadong",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus animi ab molestiae nisi et corporis eaque illum labore corrupti ullam.",
//         price: 2000000
//     },

// ]

const email = localStorage.getItem("email");

const ProductsPage = () => {
  // ! darkMode
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  // const [cart, setCart] = useState([
  //     {
  //         id: 1,
  //         qty: 1
  //     }
  // ]);

  //! state cart dan total price ga dipake karna udh nyimpan di redux
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [products, setProducts] = useState([]);
  // const [username, setUsername] = useState("");
  const username = useLogin();

  //!useEffect set cart jg ga pake karna dah pake redux
  //useEffect pertama = mounting
  useEffect(() => {
    // setCart([{ id: 1, qty: 1 }]);
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);
  //[] = apa yg akan diupdate

  // useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //         setUsername(getUsername(token));
  //     } else {
  //         window.location.href = "/login";
  //     }
  // }, []);

  useEffect(() => {
    getProduct((datau) => {
      console.log(datau);
      setProducts(datau);
    });
  }, []);

  //! useEffect total price ga dipake karna dah nyimpan di redux
  //useEffect kedua = updating
  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        //Mencari data lengkap products berdasarkan item.id (karena cart hanya menyimpan id dan qty).
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      // 0 artinya initial valuenya
      setTotalPrice(sum);
      //stringify utk ubah ke dlm string karena local storage ga bisa nyimpan object
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);
  //[cart] artinya apa yg diupdate
  //[products] artinya krn diawal ngecek ada produk ga brrti cek ada perubahan, baru total price jalan

  const handleAddToCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id, qty: 1 }]);
    }
    // setCart([
    //     ...cart,
    //     {
    //         id,
    //         qty: 1
    //     }
    // ])
  };

  const handleLogout = () => {
    // localStorage.removeItem("email");
    // localStorage.removeItem("password");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* {email} */}
      {/* <div className="flex justify-end bg-blue-400 text-white items-center px-10 h-20">
        {username}
        <Button variant="ml-5 bg-black" onClick={handleLogout}>
          Logout
        </Button>
      </div> */}
      <Navbar />
      <div
        className={`flex justify-center py-5 ${isDarkMode && "bg-slate-900"}`}
      >
        {/* <CardProduct>Text</CardProduct> */}

        {/* <CardProduct>
                <CardProduct.Header image="./images/shoes.jpg"></CardProduct.Header>
                <CardProduct.Body name="Sepatu Lama">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </CardProduct.Body>
                <CardProduct.Footer price="Rp 700.000"></CardProduct.Footer>
                </CardProduct> */}

        <div className="flex flex-wrap w-4/6">
          {products.length > 0 &&
            products.map((product) => (
              <CardProduct key={product.id}>
                <CardProduct.Header
                  image={product.image}
                  id={product.id}
                ></CardProduct.Header>
                <CardProduct.Body name={product.title}>
                  {product.description}
                </CardProduct.Body>
                {/* <CardProduct.Footer price={product.price} id={product.id} handleAddToCart={handleAddToCart}></CardProduct.Footer> */}
                <CardProduct.Footer
                  price={product.price}
                  id={product.id}
                ></CardProduct.Footer>
              </CardProduct>
            ))}
        </div>

        <div className="w-2/6">
          <h1 className="text-3xl font-bold text-blue-600 ml-5 mb-2">Cart</h1>
          {/* <ul>
                        {cart.map((item) => (
                            <li key={item}>{cart.name}{item.id}</li>
                        ))}
                    </ul> */}
          <TableCart products={products}></TableCart>
        </div>
      </div>
    </>
  );
};
export default ProductsPage;
