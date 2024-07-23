let currentProductId = null;
const categoryList = [
  {
    id: 1,
    value: "Điện thoại",
  },
  {

    id: 2,
    valiue: "Tablet",
  }, {
    id: 3,
    valiue: "Laptop",
  }
]
$(document).ready(function () {
  function getProducts() {
    ajaxRequest({
      url: "http://localhost:8080/api/v1/products",
      success: function (response) {
        if (response) {
          const products = response?.content;
          renderListProduct(products);
        }
      },
      error: function (error) {
        console.log("error 11111", error);
      },
    });
  };


  function getCategories() {
    ajaxRequest({
      url: "http://localhost:8080/api/v1/categorys",
      success: function (response) {
        if (response) {
          const categories = response?.content;
          renderListCategory(categories);
        }
      },
      error: function (error) {
        console.log("error 11111", error);
      },
    })
  }

  function manufactures() {
    ajaxRequest({
      url: "http://localhost:8080/api/v1/manufacturers",
      success: function (response) {
        if (response) {
          const manufactures = response?.content;
          renderListManufacture(manufactures);
        }
      },
      error: function (error) {
        console.log("error 11111", error);
      },
    })
  };
  getProducts();
  manufactures();
  getCategories();
  function resetForm() {
    $("#productForm")[0].reset();
    $("#id").prop("disabled", false);
  }

  $("#addProductButton").click(function () {
    $("#modalTitle").text("Add New Product");
    $("#saveChanges").text("Save changes");
    resetForm();
    $("#productModal").modal("show");
  });
  $('.btnClass').click(function () {
    var buttonValue = $(this).text();
    console.log('buttonValue', buttonValue);
    var products = JSON.parse(localStorage.getItem("products")) || [];
    var productFilters = products.filter(function (product) {
      return product.manufacture.toUpperCase() === buttonValue.toUpperCase();
    })
    console.log('productFilters', productFilters);
    // localStorage.setItem("products", JSON.stringify(productFilters));
    renderListProduct(productFilters);
  });

  $('#categorySearch').on('change', function () {
    const selectedValue = $(this).val();
    console.log('selectedValue', selectedValue);
    var product = JSON.parse(localStorage.getItem("products")) || [];
    var productFilters = product.filter(function (product) {
      return product.categories.toUpperCase() === selectedValue.toUpperCase();
    })
    renderListProduct(productFilters);
  });

  $('#image').change(function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $('#imagePreview').attr('src', e.target.result).show();
      }
      reader.readAsDataURL(file);
    } else {
      $('#imagePreview').hide();
    }
  });

  $("#saveChanges").click(function () {
    const imageInput = $("#image")[0];

    const product = {
      id: $("#id").val(),
      name: $("#name").val(),
      price: $("#price").val(),
      info: $("#info").val(),
      detail: $("#detail").val(),
      star: $("#star").val(),
      image: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : $('#imagePreview').attr('src'),
      manufacture: $("#manufacture").val(),
      categories: $("#categories").val(),
    };

    if (product.image) {
      $('#imagePreview').attr('src', product.image).show();
    } else {
      $('#imagePreview').hide();
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const isEditMode = localStorage.getItem("isEditMode") === "1";
    if (isEditMode) {
      const productIndex = products.findIndex(
        (p) => parseInt(p.id) === parseInt(currentProductId)
      );
      if (productIndex !== -1) {
        products[productIndex] = product;
      }

      localStorage.removeItem("isEditMode");
    } else {
      products.push(product);
    }

    localStorage.setItem("products", JSON.stringify(products));
    $("#productModal").modal("hide");
    renderListProduct(products);
  });

  const products = JSON.parse(localStorage.getItem("products")) || [];
  renderListProduct(products);
  $("#productModal").modal("hide");
});

function populateForm(product) {
  $("#id").val(product.id).prop("disabled", true);
  $("#name").val(product.name);
  $("#price").val(product.price);
  $("#info").val(product.info);
  $("#detail").val(product.detail);
  $("#star").val(product.star);
  $("#manufacture").val(product.manufacture);
  $("#categories").val(product.categories);
}
function editProduct(id) {
  currentProductId = id;
  if (!id) return;
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find(
    (product) => parseInt(product.id) === parseInt(id)
  );
  if (!product) {
    alert("Product not found!");
    return;
  }
  localStorage.setItem("isEditMode", 1);
  $("#modalTitle").text("Edit Product");
  $("#saveChanges").text("Edit");
  populateForm(product);
  $("#productModal").modal("show");
}

function deleteProduct(id) {
  var products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.filter((product) => parseInt(product.id) !== parseInt(id));
  localStorage.setItem("products", JSON.stringify(products));
  renderListProduct(products);
}

function renderListProduct(products) {
  var tbody = $("#tbody");
  tbody.empty();
  console.log("products", products);
  $.each(products, function (index, item) {
    var row = `<tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.info}</td>
                        <td>${item.detail}</td>
                        <td>${item.ratingStar}</td>
                        <td>${item.imageName}</td>
                        <td>${item.manufacturerName}</td>
                        <td>${item.categoryName}</td>
                        <td><button type="button" class="btn btn-warning" onclick="editProduct(${item.id})">Edit</button></td>
                        <td><button type="button" class="btn btn-danger" onclick="deleteProduct(${item.id})">Delete</button></td>
                    </tr>`;
    tbody.append(row);
  });
}
