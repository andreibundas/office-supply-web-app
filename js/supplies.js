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
            console.log('success');
        });
    },

    bindEvents: function () {
        $('#create-supply-form').submit(function (event) {
            event.preventDefault();

            OfficeSupply.createSupplyDemand();

        })
    }
};

OfficeSupply.bindEvents();