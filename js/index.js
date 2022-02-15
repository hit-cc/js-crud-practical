const api_base_url = "https://fakestoreapi.com/";
let url = new URL(window.location.href);
let prod_id = url.searchParams.get("id");
let isEdit = false;
prod_id ? (isEdit = true) : (isEdit = false);

if (prod_id !== null && isEdit) {
  const getProductById = new Promise((resolve, reject) => {
    fetch(api_base_url + `products/${prod_id}`).then((res) => {
      if (res && res.status) {
        let resStatus = res.status;
        switch (resStatus) {
          case 200:
            resolve(res);
            break;
          case 401:
            throw Error(`Unauthorized Request`);
          default:
            throw Error(`Invalid Request`);
        }
      } else {
        throw Error("Invalid Request");
      }
    });
  });

  //get category list
  getProductById
    .then((res) => res.json())
    .then((data) => {
      if (data && data.id) {
        document.forms["productform"]["title"].value = data?.title;
        document.forms["productform"]["description"].value = data?.description;
        document.forms["productform"]["price"].value = data?.price;
        document.forms["productform"]["category"].value = data?.category;
        // document.forms["productform"]["files"].value = data?.image;
      }
    });
}

const onSubmitProductForm = async () => {
  let title = document.forms["productform"]["title"].value;
  let description = document.forms["productform"]["description"].value;
  let price = document.forms["productform"]["price"].value;
  let category = document.forms["productform"]["category"].value;
  let img = document.forms["productform"]["files"].value;

  let obj = {
    title: title,
    description: description,
    price: price,
    category: category,
    img: img,
  };
  await checkFormValidation(obj);
};

const checkFormValidation = (value) => {
  const isFormValid = Object.values(value).every((val) => {
    if (val === "" || val === null) {
      return false;
    }
    return true;
  });
  if (!isFormValid) {
    value.title == ""
      ? (document.getElementById("title-err").innerHTML = "Please enter title.")
      : (document.getElementById("title-err").innerHTML = "");
    value.price == ""
      ? (document.getElementById("price-err").innerHTML = "Please enter price")
      : (document.getElementById("price-err").innerHTML = "");
    value.description == ""
      ? (document.getElementById("description-err").innerHTML =
          "Please add description of product.")
      : (document.getElementById("description-err").innerHTML = "");
    value.category == ""
      ? (document.getElementById("category-err").innerHTML =
          "Please select category")
      : (document.getElementById("category-err").innerHTML = "");
    value.img == ""
      ? (document.getElementById("img-err").innerHTML =
          "Please select image for product.")
      : (document.getElementById("img-err").innerHTML = "");
  } else {
    addProduct(value)
      .then((res) => {
        if (res && res.id) {
          alert(`product ${res?.id} added successfully !`);
          let form = document.forms["productform"];
          form.reset();
          window.location.replace("product.html");
        }
      })
      .catch((err) => {
        console.log("on add prod err:", err);
      });
  }
};

const addProduct = async (prod) => {
  let newProd = await fetch(api_base_url + `products`, {
    method: "POST",
    body: JSON.stringify(prod),
  });
  let newProdResponse = await newProd.json();
  return newProdResponse;
};

const getCategoryList = new Promise((resolve, reject) => {
  fetch(api_base_url + `products/categories`).then((res) => {
    if (res && res.status) {
      let resStatus = res.status;
      switch (resStatus) {
        case 200:
          resolve(res);
          break;
        case 401:
          throw Error(`Unauthorized Request`);
        default:
          throw Error(`Invalid Request`);
      }
    } else {
      throw Error("Invalid Request");
    }
  });
});

//get category list
getCategoryList
  .then((res) => res.json())
  .then((data) => {
    if (data && data.length) {
      var select = document.getElementById("category");
      data.forEach((el) => {
        var option = document.createElement("option");
        var text = document.createTextNode(el);
        option.appendChild(text);
        option.setAttribute("value", el);
        select.insertBefore(option, select.lastChild);
      });
    }
  });
