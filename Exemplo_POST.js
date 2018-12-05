var bd = new sap.m.BusyDialog();
bd.setText(msg_ativando);
bd.open();

var path = evt.getSource().getBindingContext().sPath;
//Recuperar objetos
var oModeloObj = this.getView().getModel().getProperty(path);
oModeloObj.COD_MODELO = parseInt(oModeloObj.COD_MODELO);
oModeloObj = JSON.stringify(oModeloObj);

var aUrl = '../../../../services/modelos_services.xsjs?cmd=ativarModelo';	
var metodoHttp = 'PUT';

jQuery.ajax({
    url: aUrl,
    method: metodoHttp,
    data: oModeloObj,
    dataType: 'json',
    contentType: 'application/json',
    success: function (res, textStatus, XMLHttpRequest) {
        debugger;
        bd.close();
        if(XMLHttpRequest.status === 202){
            oThis.mostrarToast(msg_sucesso);
            oThis.getView().getModel().refresh(true);
            oThis.onSearchServer();
        }else{
            oThis.modeloObj = null;
            oThis.mostrarToast(msg_erro + ' - ' + XMLHttpRequest.status + ' ' + XMLHttpRequest.responseText);
        }
        
    }, 
    error: function (jqXHR, textStatus, errorThrown) {
        debugger;
        bd.close();
        oThis.modeloObj = null;
        oThis.mostrarToast(msg_erro + ' - ' + jqXHR.status + ' ' + jqXHR.responseText);
    }
});
}