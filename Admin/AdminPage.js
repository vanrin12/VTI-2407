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
          const $categories = $('#categories');
          populateManufactureSelect(response, $categories);
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
          const $manufactureSelect = $('#manufacture');

          populateManufactureSelect(response, $manufactureSelect);
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
      name: $("#name").val(),
      price: $("#price").val(),
      info: $("#info").val(),
      detail: $("#detail").val(),
      ratingStar: $("#star").val(),
      imageName: imageInput.files[0] ? imageInput.files[0].name : null,
      manufacturerId: $("#manufacture").val(),
      categoryId: $("#categories").val(),
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
      ajaxRequest({
        url: "http://localhost:8080/api/v1/products",
        method: "POST",
        data: product,
        success: function (response) {
          if (response) {
            $("#productModal").modal("hide");
            products.push(response);
            renderListProduct(products);
          }
        },
        error: function (error) {
          console.log("error 11111", error);
        },
      })
      products.push(product);
    }
    $("#productModal").modal("hide");
    renderListProduct(products);
  });

  const products = JSON.parse(localStorage.getItem("products")) || [];
  renderListProduct(products);
  $("#productModal").modal("hide");
});

function populateManufactureSelect(options, targetSelect) {

  // Clear existing options
  targetSelect.empty();

  // Iterate over the options array and create option elements
  options.forEach(option => {
    console.log('option', option);
    const $option = $('<option>', {
      value: option.id,
      text: option.name
    });
    targetSelect.append($option);
  });
}

function populateForm(product) {
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
  ajaxRequest({
    url: `http://localhost:8080/api/v1/products/${id}`,
    method: "GET",
    success: function (response) {
      if (response) {
        populateForm(response);
      }
    },
    error: function (error) {
      console.log("error 11111", error);
    },
  })
  localStorage.setItem("isEditMode", 1);
  $("#modalTitle").text("Edit Product");
  $("#saveChanges").text("Edit");
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
