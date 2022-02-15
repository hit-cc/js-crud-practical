const api_base_url = "https://fakestoreapi.com/";
let tableData = [];
const getProductList = new Promise((resolve, reject) => {
  fetch(api_base_url + `products`).then((res) => {
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

// get all product categories and bind in dropdown
getProductList
  .then((res) => res.json())
  .then((data) => {
    if (data && data.length) {
      var cols = [];
      data.forEach((elm, i) => {
        let obj = {
          id: elm.id,
          image: `<img class="prod-img" width="100%" height="100%" src=${elm.image} >`,
          title: elm.title,
          category: elm.category,
          price: elm.price,
          description: elm.description,
          action: ` <span class="mr-1" style="cursor: pointer" onclick="onClickEdit(${elm.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-pencil" viewBox="0 0 16 16">
                            <path
                                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                        </svg>
                    </span>
                    <span class="ml-1" style="cursor: pointer" onclick="onClickDelete(${elm.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-trash" viewBox="0 0 16 16">
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fill-rule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </span>`,
        };
        tableData.push(obj);
      });
      tableData.forEach((elm, i) => {
        for (let k in tableData[i]) {
          if (cols.indexOf(k) === -1) {
            cols.push(k);
          }
        }
      });
      const table = document.getElementById("product-table");
      table.border = "1";

      // create table header
      const tr = table.insertRow(-1);
      cols.forEach((element, index) => {
        var theader = document.createElement("th");
        theader.innerHTML = cols[index];
        tr.appendChild(theader);
      });

      // create table row
      tableData.forEach((el, i) => {
        let trow = table.insertRow(-1);
        cols.forEach((col, j) => {
          let cell = trow.insertCell(-1);
          cell.innerHTML = tableData[i][cols[j]];
        });
      });
    }
  });


const onDeleteProduct = async (id) => {
  try {
    if (id) {
      let prod = await fetch(api_base_url + `products/${id}`);
      let response = prod.json();
      return response;
    } else {
      console.warning("Id NOT FOUND");
    }
  } catch (error) {
    throw error;
  }
};
const onClickEdit = (id) => {
  window.location.href=`index.html?id=${id}`;
};
const onClickDelete = (id) => {
  onDeleteProduct(id).then((res) => {
    if (res && res.id) {
      alert("Product with id " + res.id + " deleted successfully");
    }
  });
};
