const api_base_url = "https://fakestoreapi.com/";
const tableData = [];
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
      var cols = [];
      data.forEach((elm, i) => {
        let obj = {
          "Category Name": elm,
          Action: ` <a class="btn btn-primary" onclick="viewCategory()">View</a>`,
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
      const table = document.getElementById("category-table");
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

const viewCategory = () => {
    window.location.href=`product.html`;
};
