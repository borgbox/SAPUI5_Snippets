///// Chamada para obter token
$.ajax({
    async: true,
    crossDomain: true,
    type: "GET",
    url: "/sap/opu/odata/SAP/ZGRC_RELATORIO_MEDIDAS_SRV/?$format=json",
    dataType: "json",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/atom+xml",
        "DataServiceVersion": "2.0",
        "X-CSRF-Token": "Fetch"
    },
    beforeSend: function (xhr) {
        ajaxBeforeSend(xhr);
    },
    success: function (data, response, xhr) {
        //Armazena no model csrftoken model -> Acessado sap.ui.getCore().getModel("csrftoken")
        //ou pode colocar no localstorage também
        sap.ui.getCore().setModel(xhr.getResponseHeader('x-csrf-token'), "csrftoken");
    },
    error: function () {
        oBusyDialog.close();
    }
});

///// Chamada de requisição com o token obtido
        let token = sap.ui.getCore().getModel("csrftoken");
        var oJsonModel = new sap.ui.model.json.JSONModel();

$.ajax({
    url: urlPesquisa,
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    beforeSend:
    function (xhr) { xhr.setRequestHeader("x-CSRF-Token", token); },
    success: function (data) {
        //Format Data
        for (var i = 0; i < data.d.results.length; i++) {
            data.d.results[i].DateBegin = dateFormat(data.d.results[i].DateBegin);
            data.d.results[i].DateEnd = dateFormat(data.d.results[i].DateEnd);
            data.d.results[i].DueDate = dateFormat(data.d.results[i].DueDate);
            data.d.results[i].RespCost = formatarValorMoeda(data.d.results[i].RespCost, data.d.results[i].Currency);
        }
        oJsonModel.setData(data.d.results);
        var tabMedidas = sap.ui.getCore().byId("tabelaMedidas");
        tabMedidas.setModel(oJsonModel).bindRows({ path: "/", parameters: { select: "CodRisco" } });
        //sfRisco.setModel(oJsonModel);
        sap.ui.getCore().setModel(oJsonModel, "medidas");
        oBusyDialog.close();
    },
    error: function () {
        oBusyDialog.close();
    }
});
