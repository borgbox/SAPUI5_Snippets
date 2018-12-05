							var oi18n = this.getView().getModel("i18n");
							var msg = oi18n.getProperty("msg_buscando_modelos");
							var oThis = this;
							
							var param = ""; 
							
							//if(mEvent){
								//param = mEvent.oSource.mProperties.value;
							//}else{
								param = this.getView().byId("ipSearch").mProperties.value;
							//}
							
							var cboxTipo = this.getView().byId("cboxTipo");
							var ipCodModelo = this.getView().byId("ipCodModelo");
							
							var bd = new sap.m.BusyDialog();
							bd.setText(msg);
							bd.open();
							debugger;
							var chkAtivos = this.getView().byId("chkAtivos");
							
							var aUrl = "";
							var codModelo = "&cod=" + ipCodModelo.getValue();
							if(chkAtivos.getSelected()){
								var aUrl = '../../../../services/modelos_services.xsjs?cmd=select&nomeModelo=' + param + '&tipoModelo='+cboxTipo.mProperties.selectedKey + '&ativos=X' + codModelo;	
							}else{
								var aUrl = '../../../../services/modelos_services.xsjs?cmd=select&nomeModelo=' + param + '&tipoModelo='+cboxTipo.mProperties.selectedKey + codModelo;
							}
							

							jQuery.ajax({
								url: aUrl,
								method: 'GET',
								dataType: 'json',
								success: function (res) {
									var oModel = new sap.ui.model.json.JSONModel();
									for (var i = 0; i < res.results.length; i++) {
										res.results[i].DESC_MODELO  = decodeURI(res.results[i].DESC_MODELO);
									}
									
									oModel.setData(res);
									oThis.getView().setModel(oModel);
									bd.close();
									console.log(res);
								}, //this.onCompleteSearch,
								error: function (jqXHR, textStatus, errorThrown) {
									bd.close();
									oThis.mostrarToast("Erro ao buscar modelos - " + "Http:" + jqXHR.status);
									return;
								}
							});
						}