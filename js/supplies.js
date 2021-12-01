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

    getSupplyDemandRow: function (supply) {
        return `
           <tr>
                <td>${supply.department}</td>
                <td>${supply.supplyName}</td>
                <td>${supply.quantityPcsPckgs}</td>
                <td>${supply.supplyUnitPrice}</td>
                <td>${supply.valueRON}</td>
                <td>${supply.deliveryDate}</td>
                <td><input type="checkbox" class="mark-done" data-id=${supply.id}></td>
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
        })
    }
};
OfficeSupply.getSupplyDemands();
OfficeSupply.bindEvents();