window.OfficeSupply = {

    API_URL: "http://localhost:8082/demands",

    createSupplyDemand: function () {

        const department = $('#supply-department').val();
        const descriptionValue = $('#supply-name').val();
        const quantity = $('#quantity-pcs-pcks').val();
        const unitPrice = $('#supply-unit-price').val();
        const value = $('#value-RON').val();
        const dateOfDelivery = $('#delivery-date').val();

        let body = {
            "department": department,
            "supplyName": descriptionValue,
            "quantityPcsPckgs": quantity,
            "supplyUnitPrice": unitPrice,
            "valueRON": value,
            "deliveryDate": dateOfDelivery
        }

        $.ajax({
            url: OfficeSupply.API_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(body)
        }).done(function () {
            OfficeSupply.getSupplyDemands();
            // console.log('success');
        });
    },

    getSupplyDemands: function () {
        $.ajax({
            url: OfficeSupply.API_URL,
            method: "GET",
        }).done(function (response) {
            OfficeSupply.displaySupplyDemands(JSON.parse(response));
        })
    },


    updateSupplyDemand: function (id, completed) {
        let body = {
            "completed": completed
        };

        $.ajax({
            url: OfficeSupply.API_URL + '?id=' + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(body)
        }).done(function () {
            OfficeSupply.getSupplyDemands();
        })
    },

    deleteSupplyDemand: function (id) {

        $.ajax({
            url: OfficeSupply.API_URL + '?id=' + id,
            method: "DELETE"
        }).done(function () {
            OfficeSupply.getSupplyDemands();
        })

    },

    getSupplyDemandRow: function (supply) {
        let formattedDeliveryDate = new Date(...supply.deliveryDate).toLocaleDateString("ro");
        //ternary operator
        let checkedAttribute = supply.completed ? "checked" : "";

        // if (supply.completed) {
        //     checkedAttribute = "checked";
        //     }else {
        //     checkedAttribute = "";
        // }

        return `
           <tr>
                <td>${supply.department}</td>
                <td>${supply.supplyName}</td>
                <td>${supply.quantityPcsPckgs}</td>
                <td>${supply.supplyUnitPrice}</td>
                <td>${supply.valueRON}</td>
                <td>${formattedDeliveryDate}</td>
                <td><input type="checkbox" class="mark-done" data-id=${supply.id} ${checkedAttribute}></td>
                <td><a href="#" class="delete-link" data-id=${supply.id}><i class="fas fa-trash-alt"></i></a></td>
            </tr>
        `
    },

    displaySupplyDemands: function (supplies) {
        let suppliesHtml = '';
        supplies.forEach(supply => suppliesHtml += OfficeSupply.getSupplyDemandRow(supply));

        $('#supplies tbody').html(suppliesHtml);
    },

    bindEvents: function () {
        $('#create-supply-form').submit(function (event) {
            event.preventDefault();

            OfficeSupply.createSupplyDemand();

        });

            $('#supplies').delegate('.mark-done', 'change', function (event) {
                event.preventDefault();
                const id = $(this).data('id');
                const checkboxChecked = $(this).is(':checked');
                OfficeSupply.updateSupplyDemand(id, checkboxChecked);
            });

            $('#supplies').delegate('.delete-link', 'click', function (event) {
                event.preventDefault();
                const id = $(this).data("id");

                OfficeSupply.deleteSupplyDemand(id);
            })
    }
};
OfficeSupply.getSupplyDemands();
OfficeSupply.bindEvents();