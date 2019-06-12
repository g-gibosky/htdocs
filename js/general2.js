// ------------------------------ WARNING - AVISO--------------------------------
// ------------------------ WHOLE SYSTEM ACTION TRIGGERS ------------------------

// ******************************************************************************
// IF the trigger is a click on the html use this function to prevent conflit.
// Try to control the usage on a defined page as done below. Gibosky 07/2017
// ******************************************************************************

// TODO: CHECK FIRST THE PATHNAME ON LOAD FUNCTION THEN DO THE CLICK MAGIC - GIBOSKY 12/17
// Hide all popovers on click in the html - Only work on the selected views. 
// Adapted from http://jsfiddle.net/guya/6YCjW/
$('html').on('click', function(e) {
	var local = window.location.pathname;
	if (local.split('/')['2'] == 'base-salary-new' || local.split('/')['2'] == 'export-lines-not' || local.split('/')['2'] == 'export-lines') {
		if (typeof $(e.target).data('original-title') == 'undefined' &&
   		!$(e.target).parents().is('.popover.in')) {
  		$('[data-original-title]').popover('hide');
		}
	}
});

// ************************************************************************************************
// IF $( document ).ready or his allias $(function() , HAS TO BE USED, CHANGE THE FUNCTION BELOW, 
// DON'T CREATE ANOTHER, AND DON'T MESS TO MUCH WITH IT, BECAUSE IT WILL FUCK UP THE WHOLE SYSTEM.
// ALSO USE WITHIN A DEFINED VIEW USING THE PATHNAME VAR TO PREVENT ERROS - Gibosky 07/2017
// ************************************************************************************************

$(function(){
 	var pathname = window.location.pathname.split("/");
	// Get the data for the Load Qh file to run add and/or remove hours and days
	if (pathname['2'] == 'new-qh') {
		//get deleted elements
		var id_error = $('.has-error').prop('id');
		var children_error = $('.has-error').children();
		var flag_error = 0;
		var remove = [];
		$.each(children_error, function(index,item) {
			if (flag_error == 0) {
				remove.push({id: item.parentElement.id});
				flag_error++;
			}else{
				flag_error = 0;
			}
		});
		$('#remove_qh').val(JSON.stringify(remove));
		// get added elements
		var id = $('.has-success').prop('id');
		var children = $('.has-success').children();
		var flag = 0;
		var add = [];
		$.each(children, function(index,item) {
			if (flag == 0) {
				add.push({id: item.parentElement.id, hour:item.value, journey:item.nextElementSibling.innerHTML});
				flag++;
			}else{
				flag = 0;
			}
		});
		console.log(add);
		$('#add_qh').val(JSON.stringify(add));
		// var serialize = $('input[name="serializedQh"]').val();
		// console.log(serialize);
		// //ajax to generate the historic message and show as an alert
		// $.ajax({
		// 	url: '/api/alert-qh-historic',
		// 	type: 'POST',
		// 	data: { data: serialize },
		// 	success: function(data){
				
		// 	}
		// });
	}else if (pathname['2'] == 'export-lines-not' || pathname['2'] == 'export-lines') {
		if (pathname['2'] == 'export-lines-not') {
			var rits = $('.r_rit_total_td');
			$('#t_r_export_not_line').append("<hr>");
			$.each(rits, function(index,item) {
				var total = item.nextElementSibling.innerHTML;
				$('#t_r_export_not_line').append('<button class ="btn btn-info t_rit_r"'+
					'value ="'+total+'">RIT '+item.innerHTML.split(" ")[5]+'</button>');
			});
			$('.t_rit_r').popover({
					placement: 'bottom',
					html: "true",
					trigger: "click",
					title: "Total",
					content: function(){
						return $(this).val();
					},
			})
		}else{
			var rits = $('.r_rit_total_td');
			$('#t_r_export_line').append("<hr>");
			$.each(rits, function(index,item) {
				var total = item.nextElementSibling.innerHTML;
				$('#t_r_export_line').append('<button class ="btn btn-info t_rit_r"'+
					'value ="'+total+'">RIT '+item.innerHTML.split(" ")[5]+'</button>');
			});
			$('.t_rit_r').popover({
					placement: 'bottom',
					html: "true",
					trigger: "click",
					title: "Total",
					content: function(){
						return $(this).val();
					},
			})
		}
	}else if (pathname['1'] == 'rate-calculation' && pathname['2'] == 'print') {
		id = pathname['4'];
		var w = 350;
		var h = 200;
		getPrintRateVariable(w, h, id);
		getPrintRateFix(w, h, id);
		getPrintRateTotal(w, h, id);	
	}else if (pathname['1'] == "finance-analysis" && pathname['2'] == "view") {
		var current_month = moment().format("M");
		var current_year = moment().format("Y");
		// var current_month = 3;
		// var current_year = 2016;
		var w = $("svg").prop('width').baseVal.value;
		var h = $("svg").prop('height').baseVal.value;
		var type = 'ps'; // default when load the page
		var range = 0; // default when load the page
		var ord = 'sum DESC'; // default when load the page
		getPrintGraph(w, h, current_month, current_year, type, range, ord);
	}
});

// ------------------------END WHOLE SYSTEM ACTION TRIGGERS ------------------------

$('#paralysed').submit(function (e){
	var ini = $('#ini_date_paralysed').val();
	var end = $('#end_date_paralysed').val();
		if (Date.parse(ini) > Date.parse(end)){
			$('#end_date_paralysed').popover({
				title : 'Erro: Data de fim anterior a de inicio',
				placement: 'bottom',
			});
			$('#end_date_paralysed').on('shown.bs.popover', function(){
				setTimeout(function(){
					$('#end_date_paralysed').popover('hide');
				}, 3000);
				})
			$('#end_date_paralysed').popover('show');
			e.preventDefault();	// previne que seja submetido os dados
			}else{
				var diff = (((Date.parse(end)-(Date.parse(ini)))/(24*60*60*1000)).toFixed(0));
				$('#diff_period').val(diff);
				// $('#diff_period').prop('type', 'text');
				// $('#l_diff_period').show();
		return true;
		}
});

$('#myTab a').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
});

$(document).ready(function(){
	$(window).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});
	$('#plate').mask("aaa 9999");
		$('.datepicker').datepicker({
		language: 'pt-BR',
		autoclose: true,
		format: 'dd/mm/yyyy'
	});
	$(".dateMask").mask("99/99/9999");
	$("#phone").mask("(99) 9999-9999"); 
	$(".hour").mask("99:99"); 
	$('.help').tooltip();
});

$('.consortium').change(function(){
	$.getJSON('/api/consortium-companies/id/'+this.value, { }, function(data){
		$('.consortium_company').empty();
		$('.consortium_company').append("<option value='0'> -- Selecione uma célula operacional -- </option>");
		$.each(data, function(index,item) {
			$('.consortium_company').append("<option value=" + item.id + ">" + item.name + "</option>");
		});
	});
});

$('#consortiumTransfer').change(function(){
	// console.log($('#cuconscomp').val());
	$.getJSON('/api/consortium-companies-name/id/'+this.value, { }, function(data){
		$('.consortium_company').empty();
		$('.consortium_company').append("<option value=''> -- Selecione uma empresa -- </option>");
		$.each(data, function(index,item) {
			if($('#cuconscomp').val() != item.id){ 
			$('.consortium_company').append("<option value=" + item.id + ">" + item.name + "</option>");
				}
		});
	});
});

$('#consotiumOption').change(function(){
	$.getJSON('/api/consortium-companies/id/'+this.value, { }, function(data){
		$('#cellOption').empty();
		$('#cellOption').append("<option value=''> -- Selecione uma célula operacional -- </option>");
		$.each(data, function(index,item) {
			$('#cellOption').append("<option value=" + item.id + ">" + item.name + "</option>");
		});
	});
});

$("#consotiumOption").focusout(function(){
var teste2 = $("#consotiumOption option:selected").text(); 	
$('#consotiumName').val(teste2);	
})

$("#cellOption").focusout(function(){
var teste = $("#cellOption option:selected").text(); 	
$('#cellOptionName').val(teste);	
})

$('#submitMCO').click(function(){
	$("#barProgressMCO").show();
	$("#formMCO").hide();
});

/**  Message Module Functions **/


	/**
		 * Typeahead que retorna o usuario da mensagem
		 * @author Guilherme Gibosky <guilherme.gibosky@gmail.com>
		 * @date 2014
		*/

	$("#receiver").typeahead({

	source:function(query,process){
		var objects=[];
		map={};
		$.getJSON("/api/return-user", {query:query},function(data){
			$.each(data,function(i, object){
				map[object.label]=object;
				objects.push(object.label);
		});
			process(objects);
	});	

	},
	updater:function(item){

		$("#receiver_id").val(map[item].id);
		$('#receiver').attr('disabled',true);
				$('#removeReceiverNew').css('display','');
		return item;

	},

	matcher: function(item){

		if(item===null)
			return false;
		return ~item.toLowerCase().indexOf(this.query.toLowerCase());
	}	
}).on('typeahead:opened', function() {
		$(this).closest('.panel-body').css('overflow','visible');
}).on('typeahead:closed', function() {
		$(this).closest('.panel-body').css('overflow','hidden');
}); 

$('#removeReceiverNew').click(function(){
	$('#receiver_id').val('');
	$('#receiver').attr('disabled',false);
	$('#receiver').val('');
	$('#removeReceiverNew').hide();
});

	/**
		 * Typeahead que retorna o usuario da mensagem de encaminhamento
		 * @author Guilherme Gibosky <guilherme.gibosky@gmail.com>
		 * @date 2014
	*/

$("#receiver_forw").typeahead({

	source:function(query,process){
		var objects=[];
		map={};
		$.getJSON("/api/return-user", {query:query},function(data){
			$.each(data,function(i, object){
				map[object.label]=object;
				objects.push(object.label);
		});
			process(objects);
	});	

	},
	updater:function(item){

		$("#receiver_id_forw").val(map[item].id);
		$('#receiver_forw').attr('disabled',true);
				$('#removeReceiverForw').css('display','');
		return item;

	},

	matcher: function(item){

		if(item===null)
			return false;
		return ~item.toLowerCase().indexOf(this.query.toLowerCase());
	}	
}).on('typeahead:opened', function() {
		$(this).closest('.panel-body').css('overflow','visible');
}).on('typeahead:closed', function() {
		$(this).closest('.panel-body').css('overflow','hidden');
}); 

$('#removeReceiverForw').click(function(){
	$('#receiver_id_forw').val('');
	$('#receiver_forw').attr('disabled',false);
	$('#receiver_forw').val('');
	$('#removeReceiverForw').hide();
});

	/**
		 * @author Guilherme Gibosky <guilherme.gibosky@gmail.com>
		 * @date 2014
	*/





	$("#myModal_1").on('shown.bs.modal', function(){ // Coloca o foco no Destinatario do modal 1
		$("#receiver").focus();
	});

	$("#myModal_4").on('shown.bs.modal', function(){ // Coloca o foco no Destinatario do modal 4
		$("#receiver_forw").focus();
	});

$('#receiver_forw').keyup(function(){
	if(($('#body_forw').val().length == 0) || ($('#title_forw').val().length == 0) || ($('#receiver_forw').val().length == 0))
		{
			$("#submit_forw").attr('disabled','disabled');
		}
		else
		{
			$("#submit_forw").removeAttr('disabled');	
		}
});


$('.resp').keyup(function(){
if(($('#body_resp').val().length == 0) || ($('#title_ref').val().length == 0))
		{
			$("#submit").attr('disabled','disabled');
		}
		else
		{
			$("#submit").removeAttr('disabled');	
		}
});

$('.new').keyup(function(){
if(($('#body').val().length == 0) || ($('#title').val().length == 0) || ($('#receiver').val().length == 0))
		{
			$("#submit_new").attr('disabled','disabled');
		}
		else
		{
			$("#submit_new").removeAttr('disabled');	
		}
});


$('#annex_btn').click(function(){
	$('#annex_btn').hide('slow');
	$('#cancel_btn').show('slow');
});

$('#cancel_btn').click(function(){
	$('#annex_btn').show('slow');
});

// Mail Especific Functions

/**
		 * @author Guilherme Gibosky <guilherme.gibosky@gmail.com>
		 * @date 2014
	*/


function aux_resp_inbox(id,name){ 
	$('#aux').html(''); // limpa o modal
	$('#name_child').hide(); // esconde o nome do remetente
	// $('#loadingmessage').show(); // mostra a figura do load enquanto carrega o ajax
	$('#resp').attr('disabled', true);
	if($('#row_'+id).hasClass('clida') == false || $("#collum_"+id).hasClass('lida') == false || $("#data_"+id).hasClass('lida') == false || $("#dat_"+id).hasClass('lida') == false )
	{
	window.parent.document.getElementById("row_"+id).setAttribute("class","clida");
	window.parent.document.getElementById("collum_"+id).setAttribute("class","lida");
	window.parent.document.getElementById("data_"+id).setAttribute("class","lida");
	window.parent.document.getElementById("dat_"+id).setAttribute("class","lida");
	}
	$.ajax({
		url: '/mail/parent',
		type: 'POST',
		data: { parent: id },
		success: function(data){
			var foo = $.parseJSON(data);
			var aux_date = [];
			$( document ).ready(function() {
			$.each(foo, function(i, aux){ 
			if(aux.date_received_aux != null){
			aux_date.push(aux.date_received_aux);
			}
			else aux_date.push("Mensagem não foi lida");
			$("<div class='panel-group' id='accordion'>" +
					"<div class='panel panel-default'>" +
						"<div class='panel-heading' " +
							"<a id='title_message_"+foo[i].id+"'class='panel-title' data-toggle='collapse' data-parent='#accordion'" + 
								"href='#body_resp_"+foo[i].id +"'>"+ foo[i].title +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ foo[i].name +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+aux_date[i]+"" +
							"</a>" +
						"</div>" +
					"</div>" + 
					"<div id='body_resp_"+foo[i].id +"' class='panel-collapse collapse'>" +
						"<div id='child_body' class='panel-body'>"+
							"<div class='col-md-8'>"+
								foo[i].body+
							"</div>"+
							"<div class='col-md-4'>"+	
								"<button onclick=\"forwarding("+"'"+ foo[i].body+"','"+foo[i].title+"','"+name+"','"+foo[i].date+"','"+foo[i].id+"','"+
										foo[i].annex+"','"+foo[i].sender+"')\" type='button' class='btn btn-danger btn-xs conteiner'"+
									"href='#myModal_4' id='message_"+foo[i].id +"'data-toggle='modal'>Encaminhar</button>"+	
							"</div>" +
						"</div>" +
						(foo[i].annex !== null ? "<hr>Anexo:   <a id='get_annex_"+foo[i].id+
										"' target='_blank' href='/mail/download/id/"+
										foo[i].id+"/name/"+foo[i].annex+"'"+">"+foo[i].annex+"</a><hr>" : '') +
					"</div>" +
				"</div>").hide().appendTo('#aux').show('slow');
			var tut = foo[i].parent;   // manda pro footer do modal as informações necessarias para responder a mensagem.
			var tot = foo[i].id;
			var tit = foo[i].sender;
			var tet = foo[0].date;
			$('#parent_id_aux').val(tut);
			$('#last_child_id').val(tot);
			$('#sender_id_resp').val(tit);
			$('#name_child').html(name +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ tet);
			$('#name_child_resp').html(name);
			$('#title_message_aux').val(foo[i].title);
			// $('#loadingmessage').hide(); // esconde a figura do load
			$('#name_child').show(); //mostra o nome do remetente
			$('#resp').attr('disabled', false); // ativa o botão de resposta
			})});
		}

	});
	
};


	/**
		 * @author Guilherme Gibosky <guilherme.gibosky@gmail.com>
		 * @date 2014
	*/

function aux_resp_outbox(id,name){ 
$('#aux').html(''); // limpa o modal
	$('#name_child').hide(); // esconde o nome do remetente
	// $('#loadingmessage').show(); // mostra a figura do load enquanto carrega o ajax
	$('#resp').attr('disabled', true);
	$.ajax({
		url: '/mail/parent-out',
		type: 'POST',
		data: { parent: id },
		success: function(data){
			var foo = $.parseJSON(data);
			var aux_date = [];
			$( document ).ready(function() {
			$.each(foo, function(i, aux){ 
			if(aux.date_received_aux != null){
			aux_date.push(aux.date_received_aux);
			}
			else aux_date.push("Mensagem não foi lida");
			$("<div class='panel-group' id='accordion'>" +
					"<div class='panel panel-default'>" +
						"<div class='panel-heading' " +
							"<a id='title_message_"+foo[i].id+"'class='panel-title' data-toggle='collapse' data-parent='#accordion'" + 
								"href='#body_resp_"+foo[i].id +"'>"+ foo[i].title +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ foo[i].name +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+aux_date[i]+"" +
							"</a>" +
						"</div>" +
					"</div>" + 
					"<div id='body_resp_"+foo[i].id +"' class='panel-collapse collapse'>" +
						"<div id='child_body' class='panel-body'>"+
							"<div class='col-md-8'>"+
								foo[i].body+
							"</div>"+
							"<div class='col-md-4'>"+	
								"<button onclick=\"forwarding("+"'"+ foo[i].body+"','"+foo[i].title+"','"+name+"','"+foo[i].date+"','"+foo[i].id+"','"+
										foo[i].annex+"','"+foo[i].sender+"')\" type='button' class='btn btn-danger btn-xs conteiner'"+
									"href='#myModal_4' id='message_"+foo[i].id +"'data-toggle='modal'>Encaminhar</button>"+	
							"</div>" +
						"</div>" +
						(foo[i].annex !== null ? "<hr>Anexo:   <a id='get_annex_"+foo[i].id+
										"' target='_blank' href='/mail/download/id/"+
										foo[i].id+"/name/"+foo[i].annex+"'"+">"+foo[i].annex+"</a><hr>" : '') +
					"</div>" +
				"</div>").hide().appendTo('#aux').show('slow');
			var tut = foo[i].parent;   // manda pro footer do modal as informações necessarias para responder a mensagem.
			var tot = foo[i].id;
			var tit = foo[i].sender;
			var tet = foo[0].date;
			$('#parent_id_aux').val(tut);
			$('#last_child_id').val(tot);
			$('#sender_id_resp').val(tit);
			$('#name_child').html(name +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ tet);
			$('#name_child_resp').html(name);
			$('#title_message_aux').val(foo[i].title);
			// $('#loadingmessage').hide(); // esconde a figura do load
			$('#name_child').show(); //mostra o nome do remetente
			$('#resp').attr('disabled', false); // ativa o botão de resposta
			})});
		}

	});
	
};

	/**
		 * @author Guilherme Gibosky <guilherme.gibosky@gmail.com>
		 * @date 2014
	*/

function fetch_resp(){
		var name = $('#name_child_resp').text();
		var title = $('#title_message_aux').val()
		var parent_id = $('#parent_id_aux').val()
		var last_child_id = $('#last_child_id').val()
		var sender_id_resp = $('#sender_id_resp').val()
		$('#sender').val(name);
		$('#title_ref').val('Re: '+ title);
		$('#sender').attr('disabled',true);
		$('#receiver_id_answer').val(sender_id_resp);
		if (parent_id == '')
		{
			$("#parent_id").val(last_child_id);
		}
		else
		{
			$("#parent_id").val(parent_id);
		}
};

function forwarding(body, title, name, date, id, annex){
		$('#message_forw').html("");
		$('#title_forw').val('Fwd: '+title);
		$('#body_forw').val("\n\n\n"+"----------------------"+
			"Mensagem Encaminhada"+"-----------------------"+"\n"+"Usuário da mensagem: "+name+"\n"+
			"Enviado na data: "+date+"\n"+"Mensagem original: "+body+"\n");
		if (annex !=  'null')
		{ 
			$('#message_forw').append("<a id='get_annex_forw"+id+"' href='/mail/download/id/"+id+"/name/"+annex+"'"+">"+annex+"</a>")
		}
		if (annex !=  'null')
		{  
		$('#annex_forw').val(annex);
		}
		else
		{
			$('#annex_forw').val(null);
		}
		$('#forwarded_message_id').val(id);
		$('#parent_null').val('');

};
	
// End of mail module



$('#delete').click(function(){
	$('#deleteMCO').hide();
	$('#statusDelete').css('display','block');
});

$('#delete_calendar').click(function(){
	$('#deleteCalendar').hide();
	$('#statusDelete').css('display','block');
});

/**  VALIDATING VEHICLE FORM **/
$('#service').change(function(){
	if(this.value > 0) {
		$('#form-service').addClass('has-success');
		$('#form-service').addClass('has-feedback');
	} else {
		$('#form-service').removeClass('has-success');
		$('#form-service').removeClass('has-feedback');
	}
});

$('#plate').keyup(function(){
	$('#feedback-success-plate').css('color','#468847');
	$('#feedback-error-plate').css('color','#b94a48');
	if(this.value.indexOf('_') === -1) {
		$('#form-plate').addClass('has-success');
		$('#form-plate').addClass('has-feedback');
		$('#form-plate').removeClass('has-error');
		$('#feedback-success-plate').removeClass('hide');
		$('#feedback-error-plate').addClass('hide');
	} else if(this.value.indexOf('_')) {
		$('#form-plate').addClass('has-error');
		$('#form-plate').addClass('has-feedback');
		$('#form-plate').removeClass('has-success');
		$('#feedback-success-plate').addClass('hide');
		$('#feedback-error-plate').removeClass('hide');
	} else {
		$('#form-plate').removeClass('has-success');
		$('#form-plate').removeClass('has-feedback');
		$('#form-plate').removeClass('has-error');
		$('#feedback-success-plate').addClass('hide');
		$('#feedback-error-plate').addClass('hide');
	}
});


$('#renavam').keyup(function(){
	$('#feedback-success-renavam').css('color','#468847');
	$('#feedback-error-renavam').css('color','#b94a48');
	if(this.value.length > 7 && $.isNumeric(this.value)) {
		$('#form-renavam').addClass('has-success');
		$('#form-renavam').addClass('has-feedback');
		$('#form-renavam').removeClass('has-error');
		$('#feedback-success-renavam').removeClass('hide');
		$('#feedback-error-renavam').addClass('hide');
	} else if( (this.value.length > 1 && this.value.length < 8) || (!$.isNumeric(this.value))) {
		$('#form-renavam').addClass('has-error');
		$('#form-renavam').addClass('has-feedback');
		$('#form-renavam').removeClass('has-success');
		$('#feedback-success-renavam').addClass('hide');
		$('#feedback-error-renavam').removeClass('hide');
	} else {
		$('#form-renavam').removeClass('has-error');
		$('#form-renavam').removeClass('has-success');
		$('#form-renavam').removeClass('has-feedback');
		$('#feedback-success-renavam').addClass('hide');
		$('#feedback-error-renavam').addClass('hide');
	}
});


$('#external-number').keyup(function(){
	$('#feedback-success-external-number').css('color','#468847');
	$('#feedback-error-external-number').css('color','#b94a48');
	if(this.value.length > 4 && $.isNumeric(this.value)) {
		$('#form-external-number').addClass('has-success');
		$('#form-external-number').addClass('has-feedback');
		$('#form-external-number').removeClass('has-error');
		$('#feedback-success-external-number').removeClass('hide');
		$('#feedback-error-external-number').addClass('hide');
	} else if( (this.value.length > 1 && this.value.length < 5) || (!$.isNumeric(this.value))) {
		$('#form-external-number').addClass('has-error');
		$('#form-external-number').addClass('has-feedback');
		$('#form-external-number').removeClass('has-success');
		$('#feedback-success-external-number').addClass('hide');
		$('#feedback-error-external-number').removeClass('hide');
	} else {
		$('#form-external-number').removeClass('has-error');
		$('#form-external-number').removeClass('has-success');
		$('#form-external-number').removeClass('has-feedback');
		$('#feedback-success-external-number').addClass('hide');
		$('#feedback-error-external-number').addClass('hide');
	}
});

$('#consortium').change(function(){
	if(this.value > 0) {
		$('#form-consortium').addClass('has-success');
		$('#form-consortium').addClass('has-feedback');
	} else {
		$('#form-consortium').removeClass('has-success');
		$('#form-consortium').removeClass('has-feedback');
	}
});

$('#pattern').change(function(){
	if(this.value > 0) {
		$('#form-pattern').addClass('has-success');
		$('#form-pattern').addClass('has-feedback');
	} else {
		$('#form-pattern').removeClass('has-success');
		$('#form-pattern').removeClass('has-feedback');
	}
});

$('#color').change(function(){
	if(this.value > 0) {
		$('#form-color').addClass('has-success');
		$('#form-color').addClass('has-feedback');
	} else {
		$('#form-color').removeClass('has-success');
		$('#form-color').removeClass('has-feedback');
	}
});

$('#type').change(function(){
	if(this.value > 0) {
		$('#form-type').addClass('has-success');
		$('#form-type').addClass('has-feedback');
	} else {
		$('#form-type').removeClass('has-success');
		$('#form-type').removeClass('has-feedback');
	}
});


$('#line').keyup(function(){
	$('#feedback-success-line').css('color','#468847');
	$('#feedback-error-line').css('color','#b94a48');
	if(this.value.length == 4 && $.isNumeric(this.value)) {
		$('#form-line').addClass('has-success');
		$('#form-line').addClass('has-feedback');
		$('#form-line').removeClass('has-error');
		$('#feedback-success-line').removeClass('hide');
		$('#feedback-error-line').addClass('hide');
	} else{
		$('#form-line').addClass('has-error');
		$('#form-line').addClass('has-feedback');
		$('#form-line').removeClass('has-success');
		$('#feedback-success-line').addClass('hide');
		$('#feedback-error-line').removeClass('hide');
	} 
});

$('#craft').keyup(function(){
	$('#feedback-success-craft').css('color','#468847');
	$('#feedback-error-craft').css('color','#b94a48');
	if(this.value.length > 6) {
		$('#form-craft').addClass('has-success');
		$('#form-craft').addClass('has-feedback');
		$('#form-craft').removeClass('has-error');
		$('#feedback-success-craft').removeClass('hide');
		$('#feedback-error-craft').addClass('hide');
	} else{
		$('#form-craft').addClass('has-error');
		$('#form-craft').addClass('has-feedback');
		$('#form-craft').removeClass('has-success');
		$('#feedback-success-craft').addClass('hide');
		$('#feedback-error-craft').removeClass('hide');
	} 
});

$('#vehicle_number').keyup(function(){
	$('#feedback-success-vehicle-number').css('color','#468847');
	$('#feedback-error-vehicle-number').css('color','#b94a48');
	if(this.value.length > 4 && $.isNumeric(this.value)) {
		$('#form-vehicle-number').addClass('has-success');
		$('#form-vehicle-number').addClass('has-feedback');
		$('#form-vehicle-number').removeClass('has-error');
		$('#feedback-success-vehicle-number').removeClass('hide');
		$('#feedback-error-vehicle-number').addClass('hide');
	} else if( (this.value.length > 0 && this.value.length < 5) || (!$.isNumeric(this.value))) {
		$('#form-vehicle-number').addClass('has-error');
		$('#form-vehicle-number').addClass('has-feedback');
		$('#form-vehicle-number').removeClass('has-success');
		$('#feedback-success-vehicle-number').addClass('hide');
		$('#feedback-error-vehicle-number').removeClass('hide');
	} else {
		$('#form-vehicle-number').removeClass('has-error');
		$('#form-vehicle-number').removeClass('has-success');
		$('#form-vehicle-number').removeClass('has-feedback');
		$('#feedback-success-vehicle-number').addClass('hide');
		$('#feedback-error-vehicle-number').addClass('hide');
	}
});

$('#start_roulette').keyup(function(){
	$('#feedback-success-start-roulette').css('color','#468847');
	$('#feedback-error-start-roulette').css('color','#b94a48');
	if(this.value.length == 5 && $.isNumeric(this.value)) {
		$('#form-start-roulette').addClass('has-success');
		$('#form-start-roulette').addClass('has-feedback');
		$('#form-start-roulette').removeClass('has-error');
		$('#feedback-success-start-roulette').removeClass('hide');
		$('#feedback-error-start-roulette').addClass('hide');
	} else {
		$('#form-start-roulette').addClass('has-error');
		$('#form-start-roulette').addClass('has-feedback');
		$('#form-start-roulette').removeClass('has-success');
		$('#feedback-success-start-roulette').addClass('hide');
		$('#feedback-error-start-roulette').removeClass('hide');
	}
});

$('#mid_roulette').keyup(function(){
	$('#feedback-success-mid-roulette').css('color','#468847');
	$('#feedback-error-mid-roulette').css('color','#b94a48');
	if(this.value.length == 5 && $.isNumeric(this.value)) {
		$('#form-mid-roulette').addClass('has-success');
		$('#form-mid-roulette').addClass('has-feedback');
		$('#form-mid-roulette').removeClass('has-error');
		$('#feedback-success-mid-roulette').removeClass('hide');
		$('#feedback-error-mid-roulette').addClass('hide');
	} else{
		$('#form-mid-roulette').addClass('has-error');
		$('#form-mid-roulette').addClass('has-feedback');
		$('#form-mid-roulette').removeClass('has-success');
		$('#feedback-success-mid-roulette').addClass('hide');
		$('#feedback-error-mid-roulette').removeClass('hide');
	}
});

$('#end_roulette').keyup(function(){
	$('#feedback-success-end-roulette').css('color','#468847');
	$('#feedback-error-end-roulette').css('color','#b94a48');
	if(this.value.length == 5 && $.isNumeric(this.value)) {
		$('#form-end-roulette').addClass('has-success');
		$('#form-end-roulette').addClass('has-feedback');
		$('#form-end-roulette').removeClass('has-error');
		$('#feedback-success-end-roulette').removeClass('hide');
		$('#feedback-error-end-roulette').addClass('hide');
	} else{
		$('#form-end-roulette').addClass('has-error');
		$('#form-end-roulette').addClass('has-feedback');
		$('#form-end-roulette').removeClass('has-success');
		$('#feedback-success-end-roulette').addClass('hide');
		$('#feedback-error-end-roulette').removeClass('hide');
	}
});

$('#start_hour').keyup(function(){
	$('#feedback-success-start-hour').css('color','#468847');
	$('#feedback-error-start-hour').css('color','#b94a48');
	if(this.value.indexOf('_') == -1) {
		$('#form-start-hour').addClass('has-success');
		$('#form-start-hour').addClass('has-feedback');
		$('#form-start-hour').removeClass('has-error');
		$('#feedback-success-start-hour').removeClass('hide');
		$('#feedback-error-start-hour').addClass('hide');
	} else if(this.value.indexOf('_')) {
		$('#form-start-hour').addClass('has-error');
		$('#form-start-hour').addClass('has-feedback');
		$('#form-start-hour').removeClass('has-success');
		$('#feedback-success-start-hour').addClass('hide');
		$('#feedback-error-start-hour').removeClass('hide');
	} else {
		$('#form-start-hour').removeClass('has-success');
		$('#form-start-hour').removeClass('has-feedback');
		$('#form-start-hour').removeClass('has-error');
		$('#feedback-success-start-hour').addClass('hide');
		$('#feedback-error-start-hour').addClass('hide');
	}
});

$('#mid_hour').keyup(function(){
	$('#feedback-success-mid-hour').css('color','#468847');
	$('#feedback-error-mid-hour').css('color','#b94a48');
	if(this.value.indexOf('_') == -1) {
		$('#form-mid-hour').addClass('has-success');
		$('#form-mid-hour').addClass('has-feedback');
		$('#form-mid-hour').removeClass('has-error');
		$('#feedback-success-mid-hour').removeClass('hide');
		$('#feedback-error-mid-hour').addClass('hide');
	} else if(this.value.indexOf('_')) {
		$('#form-mid-hour').addClass('has-error');
		$('#form-mid-hour').addClass('has-feedback');
		$('#form-mid-hour').removeClass('has-success');
		$('#feedback-success-mid-hour').addClass('hide');
		$('#feedback-error-mid-hour').removeClass('hide');
	} else {
		$('#form-mid-hour').removeClass('has-success');
		$('#form-mid-hour').removeClass('has-feedback');
		$('#form-mid-hour').removeClass('has-error');
		$('#feedback-success-mid-hour').addClass('hide');
		$('#feedback-error-mid-hour').addClass('hide');
	}
});

$('#end_hour').keyup(function(){
	$('#feedback-success-end-hour').css('color','#468847');
	$('#feedback-error-end-hour').css('color','#b94a48');
	if(this.value.indexOf('_') == -1) {
		$('#form-end-hour').addClass('has-success');
		$('#form-end-hour').addClass('has-feedback');
		$('#form-end-hour').removeClass('has-error');
		$('#feedback-success-end-hour').removeClass('hide');
		$('#feedback-error-end-hour').addClass('hide');
	} else if(this.value.indexOf('_')) {
		$('#form-end-hour').addClass('has-error');
		$('#form-end-hour').addClass('has-feedback');
		$('#form-end-hour').removeClass('has-success');
		$('#feedback-success-end-hour').addClass('hide');
		$('#feedback-error-end-hour').removeClass('hide');
	} else {
		$('#form-end-hour').removeClass('has-success');
		$('#form-end-hour').removeClass('has-feedback');
		$('#form-end-hour').removeClass('has-error');
		$('#feedback-success-end-hour').addClass('hide');
		$('#feedback-error-end-hour').addClass('hide');
	}
});

$('#start_date').keyup(function(){
	$('#feedback-success-start-date').css('color','#468847');
	$('#feedback-error-start-date').css('color','#b94a48');
	if(this.value.indexOf('_') == -1) {
		$('#form-start-date').addClass('has-success');
		$('#form-start-date').addClass('has-feedback');
		$('#form-start-date').removeClass('has-error');
		$('#feedback-success-start-date').removeClass('hide');
		$('#feedback-error-start-date').addClass('hide');
	} else if(this.value.indexOf('_')) {
		$('#form-start-date').addClass('has-error');
		$('#form-start-date').addClass('has-feedback');
		$('#form-start-date').removeClass('has-success');
		$('#feedback-success-start-date').addClass('hide');
		$('#feedback-error-start-date').removeClass('hide');
	} else {
		$('#form-start-date').removeClass('has-success');
		$('#form-start-date').removeClass('has-feedback');
		$('#form-start-date').removeClass('has-error');
		$('#feedback-success-start-date').addClass('hide');
		$('#feedback-error-start-date').addClass('hide');
	}
});

$('#mid_date').keyup(function(){
	$('#feedback-success-mid-date').css('color','#468847');
	$('#feedback-error-mid-date').css('color','#b94a48');
	if(this.value.indexOf('_') == -1) {
		$('#form-mid-date').addClass('has-success');
		$('#form-mid-date').addClass('has-feedback');
		$('#form-mid-date').removeClass('has-error');
		$('#feedback-success-mid-date').removeClass('hide');
		$('#feedback-error-mid-date').addClass('hide');
	} else if(this.value.indexOf('_')) {
		$('#form-mid-date').addClass('has-error');
		$('#form-mid-date').addClass('has-feedback');
		$('#form-mid-date').removeClass('has-success');
		$('#feedback-success-mid-date').addClass('hide');
		$('#feedback-error-mid-date').removeClass('hide');
	} else {
		$('#form-mid-date').removeClass('has-success');
		$('#form-mid-date').removeClass('has-feedback');
		$('#form-mid-date').removeClass('has-error');
		$('#feedback-success-mid-date').addClass('hide');
		$('#feedback-error-mid-date').addClass('hide');
	}
});

$('#end_date').keyup(function(){
	$('#feedback-success-end-date').css('color','#468847');
	$('#feedback-error-end-date').css('color','#b94a48');
	if(this.value.indexOf('_') == -1) {
		$('#form-end-date').addClass('has-success');
		$('#form-end-date').addClass('has-feedback');
		$('#form-end-date').removeClass('has-error');
		$('#feedback-success-end-date').removeClass('hide');
		$('#feedback-error-end-date').addClass('hide');
	} else if(this.value.indexOf('_')) {
		$('#form-end-date').addClass('has-error');
		$('#form-end-date').addClass('has-feedback');
		$('#form-end-date').removeClass('has-success');
		$('#feedback-success-end-date').addClass('hide');
		$('#feedback-error-end-date').removeClass('hide');
	} else {
		$('#form-end-date').removeClass('has-success');
		$('#form-end-date').removeClass('has-feedback');
		$('#form-end-date').removeClass('has-error');
		$('#feedback-success-end-date').addClass('hide');
		$('#feedback-error-end-date').addClass('hide');
	}
});

	/**
		* Handler the selection on Travel Occupancy
		* @author Guilherme Gibosky <guilherme.gibosky@gmail.com>
		* @date 2016-05-10
	*/

	$('#occupancyOption').on('change',function(){
		var option = $('#occupancyOption').val();
		if (option == 3){
			$('#occupancy_form').attr('action','/mco/report-travel-occupancy-line');
			$('#cell_choice').hide("slow");
			$( ".myBrCell" ).remove();
				if ($('#line_choice').length) {
					$('#line_choice').slideDown("slow");
				}else{
					$('#line_choice').slideDown("slow");
				}
		}else if (option == 4){
			$('#occupancy_form').attr('action','/mco/report-travel-occupancy-cell');
			$('#line_choice').hide("slow");
			$( ".myBrLine" ).remove();
			if ($('#cell_choice').length) {
					$('#cell_choice').slideDown("slow");
				}else{
					$('#cell_choice').slideDown("slow");
				}
		}else{
			$( ".myBrLine" ).remove();
			$( ".myBrCell" ).remove();
			if (($('#line_choice').length) || $('#cell_choice').length) {
				$('#line_choice').hide("slow");
				$('#cell_choice').hide("slow");
			}
				switch(option) {
				case "0":
				$('#occupancy_form').attr('action','/mco/report-travel-occupancy'); 
						break;
				case "1":
						$('#occupancy_form').attr('action','/mco/report-travel-occupancy');
						break;
				case "2":
					 $('#occupancy_form').attr('action','/mco/report-travel-occupancy-delegatee');
					 break;
				}
		}
	});

/**
		* Handler the selection on Travel Report
		* @author Guilherme Gibosky <guilherme.gibosky@gmail.com>
		* @date 2016-06-23
*/

	$('#travelOption').on('change',function(){
		var option = $('#travelOption').val();

		// HTML snippet code template to be added

		var input = '<div id="travel_line_div" hidden="true">'+
							'<label class="control-label" id ="line_label" for="line_travel">'+
							'Linha</label><input class="form-control" id ="line_travel"'+
							 'name="line_travel" type="text"'+
							 'placeholder="Digite a Linha escolhida" type="text">'+
							'</div><br id="br_fim"/>';
		var b_line = '<br id="br_fim"/>';

		// Function that find and replace all the occurences of a string

		function escapeRegExp(string) {
			 return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}

		function replaceAll(string, find, replace) {
			return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
		}

		// Auxiliar Function to hide not selected elements and clean the value field

		function hideText(){
			$('#travel_line_div').fadeOut();
			$('#travel_ali_div').fadeOut();
			$('#travel_ter_div').fadeOut();
			$('#travel_tron_div').fadeOut();
			$('#travel_com_div').fadeOut();
			$('#travel_line_div').val("");
			$('#travel_ali_div').val("");
			$('#travel_ter_div').val("");
			$('#travel_tron_div').val("");
			$('#travel_com_div').val("");
			$('#br_fim').remove();
		}

		// check the type selected and do the show animation

		if (option == 2){
			$('#travel_rep_form').attr('action','/mco/report-travel-by-common');
			hideText();
			if (document.getElementById("travel_com_div") !== null) {
				$('#travel_com_div').slideDown("slow");
				$('#travel_com_div').after(b_line);
			}else{
				var aux = replaceAll(input, "line", "com"); // change the div id to travel_com_div
				var com = replaceAll(aux, "Linha", "Convencional"); // change the placeholder text
				$('#fim_br').after(com);
				$('#travel_com_div').slideDown("slow");
			}
		}else if(option == 3){
			$('#travel_rep_form').attr('action','/mco/report-travel-by-line');
			hideText();
			if (document.getElementById("travel_line_div") !== null) {
				$('#travel_line_div').slideDown("slow");
				$('#travel_line_div').after(b_line);
				$('#travel_line_div').prop('type','number');
			}else{
				$('#fim_br').after(input);
				$('#travel_line_div').slideDown("slow");
				$('#travel_line_div').prop('type','number');
			}
		}else if(option == 4){
			$('#travel_rep_form').attr('action','/mco/report-travel-by-alimentadora');
			hideText();
			if (document.getElementById("travel_ali_div") !== null) {
				$('#travel_ali_div').slideDown("slow");
				$('#travel_ali_div').after(b_line);
			}else{
				var aux = replaceAll(input, "line", "ali"); // change the div for travel_ali_div
				var ali = replaceAll(aux, "Linha", "Alimentadora"); // change the placeholder text
				$('#fim_br').after(ali);
				$('#travel_ali_div').slideDown("slow");
			}
		}else if(option == 5){
			$('#travel_rep_form').attr('action','/mco/report-travel-by-terminal');
			hideText();
			if (document.getElementById("travel_ter_div") !== null) {
				$('#travel_ter_div').slideDown("slow");
				$('#travel_ter_div').after(b_line);
			}else{
				var aux = replaceAll(input, "line", "ter"); // change the div for travel_ter_div
				var ter = replaceAll(aux, "Linha", "Terminal"); // change the placeholder text
				$('#fim_br').after(ter);
				$('#travel_ter_div').slideDown("slow");
			}
		}else if(option == 6){
			$('#travel_rep_form').attr('action','/mco/report-travel-by-troncal');
			hideText();
			if (document.getElementById("travel_tron_div") !== null) {
				$('#travel_tron_div').slideDown("slow");
				$('#travel_tron_div').after(b_line);
			}else{
				var aux = replaceAll(input, "line", "tron"); // change the div for travel_tron_div
				var tron = replaceAll(aux, "Linha", "Troncal"); // change the placeholder text
				$('#fim_br').after(tron);
				$('#travel_tron_div').slideDown("slow");
			}
		}else{
			hideText();
			$('#travel_rep_form').attr('action','/mco/report-travel');
		}
	});

/**
		* Input Validation of Justify Roullete
		* @author Guilherme Gibosky <guilherme.gibosky@gmail.com>
		* @date 2016-05-23
*/

	$(".accept_jus").on('click', function(){
		// get id value from link text

		var aux = $(this).attr('href');
		id = aux.substring(8);
		
		//validate justification input - Textarea

		$('#justify_accept'+id).keyup(function(){
		var value = $('#justify_accept'+id).val();
		if(value.length != 0) {
			$("#justify_accept"+id).css('border','solid 2px #468847');
		}else{
			$("#justify_accept"+id).css('border','solid 2px #b94a48');
		}
	})

	//validate accredit_passenger input to prevent forbidden or empty values  - Numeric

	$('#accredit_passenger'+id).keypress(function(event) {
			var accr = $('#accredit_passenger'+id).val();
			if (event.charCode == 45) {
				$("#accredit_passenger"+id).css('border','solid 2px #FFF000');
			}else if(event.charCode < 48 ||  event.charCode > 57){
				event.preventDefault();
				$("#accredit_passenger"+id).css('border','solid 2px #b94a48');
			}else{
				$("#accredit_passenger"+id).css('border','solid 2px #468847');
			}
	})

	$('#btn_accept'+id).on("click", function(event){
		var jus = $('#justify_accept'+id).val();
		var accr = $('#accredit_passenger'+id).val();
		if(accr.length == 0 || jus.length == 0){
			event.preventDefault();
			if (accr.length == 0) {
				$("#accredit_passenger"+id).css('border','solid 2px #b94a48');
			}
			else if (jus.length == 0) {
				$("#justify_accept"+id).css('border','solid 2px #b94a48');
			}
		}else if(accr == "-") {
			event.preventDefault();
		}else{

		}
	})
});

$(".denial_jus").on('click', function(){
		var aux = $(this).attr('href');
		id = aux.substring(8);
		
		$('#justify_denial'+id).keyup(function(){
		var value = $('#justify_denial'+id).val();
		if(value.length != 0) {
			$("#justify_denial"+id).css('border','solid 2px #468847');
		}else{
			$("#justify_denial"+id).css('border','solid 2px #b94a48');
		}
	})

	$('#btn_denial'+id).on("click", function(event){
		var jus = $('#justify_denial'+id).val();
		if(jus.length == 0){
			event.preventDefault();
		}else{
		}
	})
});

/**
		* Handler the selection on Overcrowd Report
		* @author Guilherme Gibosky <guilherme.gibosky@gmail.com>
		* @date 2016-07-14
*/

	$('#overOption').on('change',function(){

		// Auxiliar Function to hide not selected elements and clean the value field

		function hideDivs(){
			$('#line_travel_over').fadeOut();
			$('#vehicle_travel_over').fadeOut();
			$('#day_travel_over').fadeOut();
			$('#delegatee_choice').fadeOut();
			$('#cell_choice').fadeOut();
			$('#line_input_over').val("");
			$('#vehicle_input_over').val("");
			$('#dayOption').val("");
			$('#delegateeOver').val("");
			$('#cellOver').val("");
			$('#br_over').remove();
		}

		

		$('#over_pdf').removeAttr("disabled"); // Enable the submit button
		$('#over_csv').removeAttr("disabled"); // Enable the submit button
		var option = $('#overOption').val(); //get the code of the user selection
		var b_line = "<br id='br_over'/>"; // HTML snippet code template for break line
		hideDivs();
		
		// check the type selected and do the show animation
		if (option == 1){
			$('#over_form').attr('action','/mco/report-overcrowded-all');
		}else if (option == 2){
			$('#over_form').attr('action','/mco/report-overcrowded');
		}else if(option == 3){
			$('#over_form').attr('action','/mco/report-over-line'); 
			$('#line_travel_over').slideDown("slow");
			$('#line_travel_over').after(b_line);
		}else if(option == 4){
			$('#over_form').attr('action','/mco/report-over-vehicle');
			$('#vehicle_travel_over').slideDown("slow");
			$('#vehicle_travel_over').after(b_line);
		}else if(option == 5){
			$('#over_form').attr('action','/mco/report-over-day');
			$('#day_travel_over').slideDown("slow");
			$('#day_travel_over').after(b_line);
		}else if(option == 6){
			$('#over_form').attr('action','/mco/report-over-delegatee');
			$('#delegatee_choice').slideDown("slow");
			$('#delegatee_choice').after(b_line);
		}else if(option == 7){
			$('#over_form').attr('action','/mco/report-over-cell');
			$('#cell_choice').slideDown("slow");
			$('#cell_choice').after(b_line);
		}else{
			$('#over_pdf').attr('disabled','true');
			$('#over_csv').attr('disabled','true');
		}
	});

	/**
		* Input Validator of Overcrowd Report
		* @author Guilherme Gibosky <guilherme.gibosky@gmail.com>
		* @date 2016-07-29
*/

	$("#over_pdf").on('click', function(){
		var option = $('#overOption').val();
		var v_ini = $('#data_ini_over').val();
		var v_end = $('#data_end_over').val();
		if (option == 3) {
			var line = $('#line_input_over').val();
			if(v_ini.length < 10 || v_end.length < 10 || line.length < 0) {
				event.preventDefault();
				if (v_ini.length < 10) {
					$('#data_ini_over').css('border','solid 2px #b94a48');
				}else if (v_end.length < 10) {
					$('#data_end_over').css('border','solid 2px #b94a48');
				}else if (line.length < 0) {
					$('#line_input_over').css('border','solid 2px #b94a48');
				}
			}	
		}else if (option == 4) {
			var vehicle = $('#vehicle_input_over').val();
			if(v_ini.length < 10 || v_end.length < 10 || vehicle.length < 0) {
				event.preventDefault();
				if (v_ini.length < 10) {
					$('#data_ini_over').css('border','solid 2px #b94a48');
				}else if (v_end.length < 10) {
					$('#data_end_over').css('border','solid 2px #b94a48');
				}else if (vehicle.length < 0) {
					$('#vehicle_input_over').css('border','solid 2px #b94a48');
				}
			}	
		}else{
			if(v_ini.length < 10 || v_end.length < 10 ) {
				event.preventDefault();
				if (v_ini.length < 10) {
					$('#data_ini_over').css('border','solid 2px #b94a48');
				}else if (v_end.length < 10) {
					$('#data_end_over').css('border','solid 2px #b94a48');
				}
			}	
		}
	});

	$("#print_modal").on('click', function(){
		var line = $('#line_input_over').val();
		$("#print_extract").printElement({ printMode: 'popup'});
	});	


// Get the communication numbers of the selected contract - Gibosky
	
$('#contract').change(function(){
	$('#contract').css('border-color','green').popover('destroy')
	$('#start_validity_date').attr("disabled", true);
	$('#number_communication').val("");
	$('#consortium').val("");
	$('#consortium_companies').val("");
	$('#op_type').val("");
	$('#serv_sd').val("");
	$('#city_ori').val("");
	$('#city_des').val("");
	$('#new_qco').attr("disabled", "disabled");
	$.getJSON('/qco/get-communication/id/'+this.value, { }, function(data){
		$('#number_communication').empty();
		if (data.length == 0) {
			$('#number_communication').append("<option value='-1'> -- Contrato não possui atendimentos ativos -- </option>");	
		}else{
			$('#number_communication').append("<option value='0'> -- Selecione um atendimento -- </option>");
		}
		$.each(data, function(index,item) {
				$('#number_communication').append("<option value=" + item.id + ">" + item.communication +" - "+ item.name +"</option>");
		});
	});
});

// Get the date of the active QCO - Gibosky

$('#number_communication').change(function(){
	var aux = $('#number_communication option:selected').text();
	var result = aux.split('-')[0];
	$.getJSON('/qco/get-communication-data', { number : result }, function(data){
		$('#consortium').val(data.consortium_name);
		$('#consortium_companies').val(data.cell_name);
		$('#op_type').val(data.op_name);
		$('#serv_sd').val(data.sd_name);
		$('#city_ori').val(data.city_ori);
		$('#city_des').val(data.city_des);
		$('#start_validity_date').attr("disabled", false);
	});
});

/**
		Check if the vality date is older than today or the most, not future, recent QCO. 
		For that, the moment plugin is necessary, since javascript doesn't have native date format.
		Documentation in the link: http://momentjs.com/docs (version used is 2.17.1 at this moment).
		@author Guilherme Gibosky <guilherme.gibosky@gmail.com>
		@date 11/01/2017
*/

$('#start_validity_date').change(function(){
	var number = $('#number_communication option:selected').text().split('-')['0'];
	var today = moment().format("YYYY-MM-DD");
	var aux1 = $('#start_validity_date').val().split('/');
	aux1 = aux1['2']+'-'+aux1['1']+'-'+aux1['0'];
	var new_date = moment(aux1,"YYYY-MM-DD");
	$.getJSON('/api/validity-duplicate/date/'+aux1+'/number/'+number, { }, function(data){
		if (new_date.isBefore(today) == true || new_date.isSame(today) == true) {
				$('#start_validity_date').css('border-color','red');
				$('#start_validity_date').popover({title: "Inválido.", content: "Data igual ou inferior a hoje.", trigger: "hover"});
				$('#new_qco').prop("disabled",true);
		}else{
			if (data == true){
			$('#start_validity_date').css('border-color','red');
			$('#start_validity_date').popover({title: "Inválido.", content: "Existe QCO para essa data.", trigger: "hover"});
			$('#new_qco').prop("disabled",true);
			}else{
				$('#new_qco').prop("disabled",false);
				$('#start_validity_date').css('border-color','green').popover("destroy");
			}	
		}
	});		
});

$('#ini_date_paralyse').change(function(){
	var number = $('#paralyse_communication').val();
	var today = moment().format("YYYY-MM-DD");
	var aux1 = $('#ini_date_paralyse').val().split('/');
	aux1 = aux1['2']+'-'+aux1['1']+'-'+aux1['0'];
	var new_date = moment(aux1,"YYYY-MM-DD");
	$.getJSON('/api/validity-duplicate/date/'+aux1+'/number/'+number, { }, function(data){
		if (new_date.isBefore(today) == true || new_date.isSame(today) == true) {
				$('#ini_date_paralyse').css('border-color','red');
				$('#ini_date_paralyse').popover({title: "Inválido.", content: "Data igual ou inferior a hoje.", trigger: "hover"});
				$('#paralyse_btn').prop("disabled",true);
				$('#paralyse_justify').prop("disabled",true);
		}else{
			if (data == true){
			$('#ini_date_paralyse').css('border-color','red');
			$('#ini_date_paralyse').popover({title: "Inválido.", content: "Existe QCO para essa data.", trigger: "hover"});
			$('#paralyse_btn').prop("disabled",true);
			$('#paralyse_justify').prop("disabled",true);
			}else{
				$('#paralyse_btn').prop("disabled",false);
				$('#paralyse_justify').prop("disabled",false);
				$('#ini_date_paralyse').css('border-color','green').popover("destroy");
			}	
		}
	});		
});

$('#start_validity_date_edit').change(function(){
	var number = $('#hidden_number').val();
	var today = moment().format("YYYY-MM-DD");
	var aux1 = $('#start_validity_date_edit').val().split('/');
	aux1 = aux1['2']+'-'+aux1['1']+'-'+aux1['0'];
	var new_date = moment(aux1,"YYYY-MM-DD");
	$.getJSON('/api/validity-duplicate/date/'+aux1+'/number/'+number, { }, function(data){
		if (new_date.isBefore(today) == true || new_date.isSame(today) == true) {
				$('#start_validity_date_edit').css('border-color','red');
				$('#start_validity_date_edit').popover({title: "Inválido.", content: "Data igual ou inferior a hoje.", trigger: "hover"});
				$('#btn1').prop("disabled",true);
				$('#historic_justify').prop("disabled",true);
		}else{
			if (data == true){
			$('#start_validity_date_edit').css('border-color','red');
			$('#start_validity_date_edit').popover({title: "Inválido.", content: "Existe QCO para essa data.", trigger: "hover"});
			$('#btn1').prop("disabled",true);
			$('#historic_justify').prop("disabled",true);
			}else{
				$('#btn1').prop("disabled",false);
				$('#historic_justify').prop("disabled",false);
				$('#start_validity_date_edit').css('border-color','green').popover("destroy");
			}	
		}
	});		
});

$("#financial_fare_edit").change(function(){
	var option = $("#financial_fare_edit").val();
	var date_color = $('#start_validity_date_edit').css('border-color');
	if (option != 0 && (date_color == 'rgb(0, 128, 0)' || date_color == "rgb(204, 204, 204)")) {
		$('#btn1').prop("disabled",false);
		$('#historic_justify').prop("disabled",false);
	}else{
		$('#btn1').prop("disabled",true);
		$('#historic_justify').prop("disabled",true);
	}
});	

$('#clone_validity_date').on('change', function(e){
	$('#clone_validity_date').popover("destroy");
	var number = $('#hidden_number').val();
	var today = moment().format("YYYY-MM-DD");
	var aux1 = $('#clone_validity_date').val().split('/');
	aux1 = aux1['2']+'-'+aux1['1']+'-'+aux1['0'];
	var new_date = moment(aux1,"YYYY-MM-DD");
	$.getJSON('/api/validity-duplicate/date/'+aux1+'/number/'+number, { }, function(data){
		if (new_date.isBefore(today) == true || new_date.isSame(today) == true) {
			$('#clone_qco').prop("disabled",true);
			$('#clone_validity_date').css('border-color','red');
			$('#clone_validity_date').popover({title: "Inválido.", content: "Data igual ou inferior a hoje.", trigger: "hover"});	
		}else if (data == true){
			$('#clone_qco').prop("disabled",true);
			$('#clone_validity_date').css('border-color','red');
			$('#clone_validity_date').popover({title: "Inválido.", content: "Existe QCO para essa data.", trigger: "hover"});
		}
		else{
			$('#clone_qco').prop("disabled",false);
			$('#clone_validity_date').css('border-color','green');
		}
	});		
});

$(document).on('click','#new_qco', function(e){
	if ($('#contract').val() == 0) {
		$('html, body').animate({
				scrollTop: $("#contract")[0].scrollHeight
		}, 1000);
		$('#contract').css('border-color','red').popover({title: "Inválido.", content: "Campo Obrigatório.", trigger: 'hover'});
		return false;
	}
	this.disabled=true;
	this.value='Aguarde, enviando formulário...';
	this.form.submit();
});

// ******************************************************************************
// Handle the removal of Schedule hours from QCO EDIT
// Author: Guilherme Gibosky
// Date: 11/01/2017
// ******************************************************************************

// TODO: CHECK IF THE LAST ONE IS REMOVED. IF YES PREVENT REMOVAL
$(document).on('click','.remove_hour', function(){
	if (this.id.split("_")['1'] == 'new') {
		var ids = [];
		$('.remove_hour').each(function() {
			ids.push(this.id.split("_")["2"]);
		});
		var id = this.id.split("_")["2"];
		$("#handle_new_"+id).remove();
	}else{
		var qco = this.id.split("_")["1"];
		var id = this.id.split("_")["2"];
		var remove = $("#hidden_remove_"+qco).val();
		var remove_id = $("#hidden_hour_"+qco+"_"+id).val();
		var teste = $('#qcoHour_'+qco).children().find('.schedule_hour');
		if (teste.length > 1 && remove_id != "") {
			if (remove == " ") {
				$("#hidden_remove_"+qco).val('_'+remove_id);
			}else{
				$("#hidden_remove_"+qco).val(remove+'_'+remove_id);
			}
			$("#handle_"+qco+"_"+id).remove();
		}else{
			call_toastr("Use o botão remover para apagar um dia completamente", 1);
			$('#justify_'+qco).css('border-color','red');
		}
	}
});

// ******************************************************************************
// Handle the addition of Schedule hours from QCO EDIT
// Author: Guilherme Gibosky
// Date: 12/01/2017
// ******************************************************************************

$(document).on('click','.add_hour', function(){
	$(".add_hour").prop( "disabled", true );

		setTimeout(function() {
			$(".add_hour").prop( "disabled", false );
		}, 2000);
	$(".schedule_hour").mask("99:99"); // Quick fix for hour mask on schedule hour manual edit
	if (this.id.split("_")['1'] == 'new') {
		var id = this.id.split("_")["2"];
		var sum = Number($("#count_hours_new").val());
		sum = sum +1;
		$("#count_hours_new").val(sum);
		$("#handle_new_"+id).after('<div id = "handle_new_'+sum+'" class="input-group col-xs-2 form-group'+
			'style="margin-right: 1px;">');
		$("#handle_new_"+sum).append('<i id="add_new_'+sum+'" class="add_hour fa fa-plus-circle fa-lg"'+
				'aria-hidden="true" style="color:green"></i>');
		$("#add_new_"+sum).after('<i id="remove_new_'+sum+'" class="remove_hour fa fa-times fa-lg"'+
				'aria-hidden="true" style="color:red"></i>');
		$("#remove_new_"+sum).after('<input id="edit_hour_new_'+sum+'" name="edit_hour_new_'+sum+
			'" type="text" class="form-control schedule_hour" value="" '+
			'pattern="([0-2]{1})([0-9]{1}):([0-5]{1})([0-9]{1})">');
		$.getJSON('/qco/get-journey',{},function(data){
			$("#edit_hour_new_"+sum).after('<select id="edit_journey_new_'+sum+
				'" name="edit_journey_new_'+sum+'" class="form-control">');
			for (var i = 0; i <= data.length -1; i++) {	
				$("#edit_journey_new_"+sum).append('<option value="'+data[i]["id"]+
					'">'+data[i]["abrev"]+'</option>');
			}
			$("#edit_journey_new_"+sum).after('</select></div>');
		});	
	}else{
		var qco = this.id.split("_")["1"];
		var id = this.id.split("_")["2"];
		var sum = Number($("#count_hours_"+qco).val());
		$("#handle_"+qco+"_"+id).after('<div id = "handle_'+qco+'_'+sum+
			'" class="input-group col-xs-2 form-group'+'style="margin-right: 1px;">');
		$("#handle_"+qco+"_"+sum).append('<i id="add_'+qco+'_'+sum+
			'" class="add_hour fa fa-plus-circle fa-lg"'+'aria-hidden="true" style="color:green"></i>');
		$("#add_"+qco+"_"+sum).after('<i id="remove_'+qco+'_'+sum+
			'" class="remove_hour fa fa-times fa-lg"'+'aria-hidden="true" style="color:red"></i>');
		$("#remove_"+qco+"_"+sum).after('<input id="edit_hour_'+qco+'_'+sum+
			'" name="edit_hour_'+qco+'_'+sum+'" type="text" class="form-control schedule_hour" '+
			'pattern="([0-2]{1})([0-9]{1}):([0-5]{1})([0-9]{1})">');
		$("#edit_hour_"+qco+"_"+sum).after('<input id="hidden_hour_'+qco+'_'+sum+
			'" name="hidden_hour_'+qco+'_'+sum+'" type="text" hidden>');
		$.getJSON('/qco/get-journey',{},function(data){
			$("#hidden_hour_"+qco+"_"+sum).after('<select id="edit_journey_'+qco+'_'+sum+
				'" name="edit_journey_'+qco+'_'+sum+'" class="form-control">');
			for (var i = 0; i <= data.length -1; i++) {	
				$("#edit_journey_"+qco+"_"+sum).append('<option value="'+data[i]["id"]+
					'">'+data[i]["abrev"]+'</option>');
			}
			$("#edit_journey_"+qco+"_"+sum).after('</select></div>');
			sum++;
			$("#count_hours_"+qco).val(sum);
		});	
	}
});

// ******************************************************************************
// Validate empty fields of Schedule hours from QCO EDIT
// Author: Guilherme Gibosky
// Date: 22/01/2017
// ******************************************************************************

$(document).on('click','#edit_hour', function(e){
		var button = this;
		var qco = button.value;
		$("#qcoHour_"+qco).find('.schedule_hour').each(function( index, aux ) {
			if ($(aux).val() == "") {
				e.preventDefault();
				$(aux).css('border-color','red');
				$(aux).popover({title: "Inválido", content: "Campo Vazio", trigger: "hover"});
			}else{
				$(aux).css('border-color','green').popover("destroy");
				if ( $("#justify_"+qco).val() != "") {
					if (check_empty_schedule_hour(qco) == false){
						$("#remove_day_hidden_"+qco).val('');
						$(button).hide();
						$("#remove_day[value='"+qco+"']").remove();
						// $("#edit_hour[value='"+qco+"']").remove();
						$("#remove_day_hidden_"+qco).after('<button class="btn btn-danger" disabled>Remover</button>');
						$("#remove_day_hidden_"+qco).after('<button class="btn btn-primary" disabled>Enviando, aguarde...</button>');
						$("#remove_day_hidden_"+qco).remove();
					}
				}
			}
		});
	});

$(document).on('click','.paralyse_link', function(){
	var number = this.name;
	$("#paralyse_communication").val(number);
});

$(document).on('click','#close_paralyse', function(){
	$("#ini_date_paralyse").val('');
	$("#paralyse_communication").val('');
});

$(document).on('click','.clone_qco', function(){
	var id = this.name.split('_');
	$("#hidden_id").val(id['0']);
	$("#status").val(id['1']);
});

$(document).on('click','#btnAddLine', function(e){
	e.preventDefault();
	var number = $('#number_field').val();
	if ($('#station_number').val() == "") {
		var stations = 0;
	}else{
		var stations = $('#station_number').val();		
	}
	$.getJSON('/terminal/get-station',{},function(data){
		var select_option ='<option value="0">-- Selecione uma Estação --</option>\n';
		$.each(data, function( i, n ) {
			select_option = select_option+'<option value="'+n.id+'">'+n.name+
			'</option>\n';
		});
		for (var i = 1; i <= number; i++) {
		$("#terminal_select").append('<select id="station_new_'
			+stations+'" name="station_new_'+stations+'" class="form-control">'+select_option+'</select>');
		$("#terminal_select").append('<i id="remove_new_'+stations+
			'" class="remove_station fa fa-times fa-lg" aria-hidden="true" style="color:red"></i>');
		stations = parseInt(stations)+1;
	}
	$('#station_number').val(stations);
	});	
	
});

$(document).on('click','.remove_station', function(e){
	var id = this.id.split('_');
	if (id["1"] == "new") {
		$("#station_new_"+id["2"]).remove();
		$("#remove_new_"+id["2"]).remove();
		$("#station_br"+id["2"]).remove();
	}else{
		var remove = $("#station_remove").val();
		$("#station_remove").val(remove+'_'+id["1"]);
		$("#station_"+id["1"]).remove();
		$("#station_id_"+id["1"]).remove();
		$("#remove_"+id["1"]).remove();
		$("#station_br"+id["1"]).remove();
}
});

// Field to tell how many station to add only accept numeric characteres
$(document).on('keypress','#number_field', function(event){
	if(event.which != 8 && isNaN(String.fromCharCode(event.which))){
		event.preventDefault(); 
	}
});

$(document).on('click','.cancel_link', function(event){
	var aux = this.name;
	$("#line_cancel_id").val(aux);
});

$(document).on('click','#close_cancel', function(){
	$("#line_cancel_id").val('');
});

$('#renavam').change(function(event){

	// inicialize required fields

	var renavam = $('#renavam').val();
	$.ajax({
		type: "POST",
		url: "/fleet/check-renavam",
		data: {renavam : renavam}
	}).done(function (data){
		var renavam = data;
		if (renavam == 1) {
			$('#renavam').css('border-color','red');
			$('#renavam').popover({title: "Inválido", content: "Já existe no sistema", trigger: "hover"});
			$('.submit_new_vehicle').prop("disabled",true);
			$('#check_renav').val("1");
		}else{
			$('#renavam').css('border-color','green').popover("destroy");
			$('#check_renav').val("0");
			checkSuccess();
		};
	});
});


$('#plate').change(function(event){

	// inicialize required fields
	var plate = $('#plate').val();
	$.ajax({
		type: "POST",
		url: "/fleet/check-plate",
		data: {plate : plate}
	}).done(function (data){
		var plate = data;
		if (plate == 1) {
			$('#plate').css('border-color','red');
			$('#plate').popover({title: "Inválido", content: "Já existe no sistema", trigger: "hover"});
			$('.submit_new_vehicle').prop("disabled",true);
			$('#check_plate').val("1");
		}else{
			$('#plate').css('border-color','green').popover("destroy");
			$('#check_plate').val("0");
			checkSuccess();
		}
	});
});

$(document).on('change','#external-number', function(event){
	var number = $('#external-number').val();
	if (number.length > 8) {
		$('#external-number').css('border-color','red');
		$('#external-number').popover({title: "Inválido", content: "Número maior que o permitido", trigger: "hover"});
		$('.submit_new_vehicle').prop("disabled",true);
		$('#check_ext').val("1");
	}else{
		$.getJSON('/fleet/check-external',{external : number},function(data){
			if (data == 1) {
				$('#external-number').css('border-color','red');
				$('#external-number').popover({title: "Inválido", content: "Já existe no sistema", trigger: "hover"});
				$('.submit_new_vehicle').prop("disabled",true);
				$('#check_ext').val("1");
			}else{
				$('#external-number').css('border-color','green').popover("destroy");
				$('#check_ext').val("0");
				checkSuccess();
			}
		});
	};
});


$(document).on('change','#chassi_number', function(event){
	var number = $('#chassi_number').val();
	if (number.length > 20) {
		$('#chassi_number').css('border-color','red');
		$('#chassi_number').popover({title: "Inválido", content: "Número maior que o permitido", trigger: "hover"});
		$('#edit_mechanics').prop("disabled",true);
	}else{
		$.getJSON('/fleet/check-chassi',{chassi : number},function(data){
			if (data == 1) {
				$('#chassi_number').css('border-color','red');
				$('#chassi_number').popover({title: "Inválido", content: "Já existe no sistema", trigger: "hover"});
				$('#edit_mechanics').prop("disabled",true);
			}else{
				$('#chassi_number').css('border-color','green').popover("destroy");
				$('#edit_mechanics').prop("disabled",false);
			}
		});
	};
});


// ******************************************************************************
// Generate the dynamic fields for the all qco report on QCO REPORT VIEW
// Author: Guilherme Gibosky
// Date: 22/01/2017
// ******************************************************************************
$(document).on('change','#line_report_qco', function(){
	var option = $('#line_report_qco').val();
	$('#report_stations').remove();
	$('#report_terminals').remove();
	if (option == 3) {
		$('#line_report_pdf').prop('disabled', true);
		$('#line_report_csv').prop('disabled', true);
		$.getJSON('/api/get-terminals',{},function(terminals){
			$('#line_report_qco').after('<select id="report_terminals" name="report_terminals" '+
				'class="form-control">');
			$('#report_terminals').append('<option value="0">-- Selecione um Terminal --</option>');
			$.each(terminals, function(e, d){
				$('#report_terminals').append('<option value="'+d.id+'">'+d.initials+' - '+d.name+'</option>');
			})
			$('#line_report_qco').after('</select>');
		});
	}else if(option == 4){
		$('#line_report_pdf').prop('disabled', true);
		$('#line_report_csv').prop('disabled', true);
		$.getJSON('/api/get-stations',{},function(stations){
			$('#line_report_qco').after('<select id="report_stations" name="report_stations" '+
				'class="form-control">');
			$('#report_stations').append('<option value="0">-- Selecione uma Estação --</option>');
			$.each(stations, function(e, d){
				$('#report_stations').append('<option value="'+d.id+'">'+d.initials+' - '+d.name+'</option>');
			})
			$('#line_report_qco').after('</select>');
		});
	}else{
		$('#line_report_pdf').prop('disabled', false);
		$('#line_report_csv').prop('disabled', false);
	}
});

// *********************************************************************************
// Generate the dynamic fields for the communication report on the  QCO REPORT VIEW
// Author: Guilherme Gibosky
// Date: 22/01/2017
// *********************************************************************************
$(document).on('change','#report_qco', function(){
	$('#report_rit').remove();
	$('#report_cell').remove();
	var option = $('#report_qco').val();
	if (option == 1) {
		$('#qco_report_pdf').prop('disabled', true);
		$('#qco_report_csv').prop('disabled', true);
		$.getJSON('/api/get-rit',{},function(rit){
			$('#report_qco').after('<select id="report_rit" name="report_rit" '+
				'class="form-control" required="">');
			$('#report_rit').append('<option value="">-- Escolha uma Rit --</option>');
			$.each(rit, function(e, d){
				$('#report_rit').append('<option value="'+d.id+'">'+d.name+'</option>');
			})
			$('#report_qco').after('</select>');
		});
	}else if(option == 2){
		$('#qco_report_pdf').prop('disabled', true);
		$('#qco_report_csv').prop('disabled', true);
		var flag;
		$.getJSON('/api/get-cell',{},function(cell){
			$('#report_qco').after('<select id="report_cell" name="report_cell" '+
				'class="form-control">');
			$('#report_cell').append('<option value="0"> -- Escolha uma célula --</option>');
			$.each(cell, function(e, d){
			if (flag == "") {
				flag = d.consortium_name;
			}
			if (flag != d.consortium_name) {
				$('#report_cell').append('</optgroup>');	
				$('#report_cell').append('<optgroup label="'+d.consortium_name+'">');	
			}
			$('#report_cell').append('<option value="'+d.id+'">'+d.name+'</option>');
			flag = d.consortium_name;
			})
			$('#report_qco').after('</select>');
		});
	}else{
		$('#qco_report_pdf').prop('disabled', false);
		$('#qco_report_csv').prop('disabled', false);
	}
});

// *********************************************************************************
// Generate the dynamic fields for the view search on the QCO VIEW
// Author: Guilherme Gibosky
// Date: 22/01/2017
// *********************************************************************************
$(document).on('change','#qco_view_search', function(){
	$('#qco_search_input_div').remove();
	$('#qco_search_select_rit_div').remove();
	$('#qco_search_select_cell_div').remove();
	$('#qco_search_date_div').remove();
	var option = $('#qco_view_search').val();
	if (option == 1) {
		$.getJSON('/api/get-rit',{},function(rit){
			$('#qco_search_container').prepend('<div id="qco_search_select_rit_div" class="col-md-5"'+
				' style="margin-right: -10px; margin-left: -10px;">');
			$('#qco_search_select_rit_div').append('<select id="qco_search_rit" name="qco_search_rit" '+
				'class="form-control" required="">');
			$('#qco_search_rit').append('<option value="">-- Escolha uma Rit --</option>');
			$.each(rit, function(e, d){
				$('#qco_search_rit').append('<option value="'+d.id+'">'+d.name+'</option>');
			})
			$('#qco_search_select_rit_div').after('</div>');
		});
	}else if(option == 2){
		var flag;
		$.getJSON('/api/get-cell',{},function(cell){
			$('#qco_search_container').prepend('<div id="qco_search_select_cell_div" class="col-md-5"'+
				' style="margin-right: -10px; margin-left: -10px;">');
			$('#qco_search_select_cell_div').append('<select id="qco_search_cell" name="qco_search_cell" '+
				'class="form-control">');
			$('#qco_search_cell').append('<option value="0"> -- Escolha uma célula --</option>');
			$.each(cell, function(e, d){
			if (flag == "") {
				flag = d.consortium_name;
			}
			if (flag != d.consortium_name) {
				$('#qco_search_cell').append('</optgroup>');	
				$('#qco_search_cell').append('<optgroup label="'+d.consortium_name+'">');	
			}
			$('#qco_search_cell').append('<option value="'+d.id+'">'+d.name+'</option>');
			flag = d.consortium_name;
			})
			$('#qco_search_select_cell_div').after('</div>');
		});
	}else if(option == 3){
		var html_div = '<div id="qco_search_date_div" class="col-md-5"'+
		' style="margin-right: -10px; margin-left: -10px;">';
		var html_input = '<input id="qco_search_date" type="date" class="dateMask form-control"'+
		' name="validility_date"></div>';
		$('#qco_search_container').prepend(html_div);
		$('#qco_search_date_div').append(html_input);
	}else{
		var html_div = '<div id="qco_search_input_div" class="col-md-5"'+
		' style="margin-right: -10px; margin-left: -10px;">';
		var html_input = '<input id="qco_search_input" type="text" class="form-control"'+
		' placeholder="Atendimento" name="field"></div>';
		$('#qco_search_container').prepend(html_div);
		$('#qco_search_input_div').append(html_input);
	}
});

// *********************************************************************************
// Validate the fields and turn on/off the submit buttons on the QCO REPORT VIEW
// Author: Guilherme Gibosky
// Date: 22/01/2017
// *********************************************************************************
$(document).on('change','#report_rit', function(){
	var option = $('#report_rit').val();
	if (option == 0) {
		$('#qco_report_pdf').prop('disabled', true);
		$('#qco_report_csv').prop('disabled', true);
	}else{
		$('#qco_report_pdf').prop('disabled', false);
		$('#qco_report_csv').prop('disabled', false);
	}
});

$(document).on('change','#report_cell', function(){
	var option = $('#report_cell').val();
	if (option == 0) {
		$('#qco_report_pdf').prop('disabled', true);
		$('#qco_report_csv').prop('disabled', true);
	}else{
		$('#qco_report_pdf').prop('disabled', false);
		$('#qco_report_csv').prop('disabled', false);
	}
});

$(document).on('change','#report_terminals', function(){
	var option = $('#report_terminals').val();
	if (option == 0) {
		$('#line_report_pdf').prop('disabled', true);
		$('#line_report_csv').prop('disabled', true);
	}else{
		$('#line_report_pdf').prop('disabled', false);
		$('#line_report_csv').prop('disabled', false);
	}
});

$(document).on('change','#report_stations', function(){
	var option = $('#report_stations').val();
	if (option == 0) {
		$('#line_report_pdf').prop('disabled', true);
		$('#line_report_csv').prop('disabled', true);
	}else{
		$('#line_report_pdf').prop('disabled', false);
		$('#line_report_csv').prop('disabled', false);
	}
});

// $(document).on('click','#qco_report_pdf_all', function(e){
// 	var option = $('#report_qco').val();
// 	var counter = $('#counter_alert').val();
// 	if (option == 0) {
// 		if (counter == 0) {
// 			alert("Esse relatório é extremamente custoso."+
// 			" O tempo para ser gerado é grande e trava todo o sistema durante sua execução.\n\n"+
// 			"Apesar disso, para continuar a gerar o relatório, completo clique no botão \"OK\""+
// 			" e depois clique no botão \"Emitir Relatório\" novamente.");
// 		e.preventDefault();
// 		$('#counter_alert').val('1');
// 		}
// 	}
// });

// $(document).on('click','#qco_report_csv_all', function(e){
// 	var option = $('#report_qco').val();
// 	var counter = $('#counter_alert').val();
// 	if (option == 0) {
// 		if (counter == 0) {
// 			alert("Esse relatório é extremamente custoso."+
// 			" O tempo para ser gerado é grande e trava todo o sistema durante sua execução.\n\n"+
// 			"Apesar disso, para continuar a gerar o relatório completo, clique no botão \"OK\""+
// 			" e depois clique no botão \"Emitir Excel\" novamente.");
// 		e.preventDefault();
// 		$('#counter_alert').val('1');
// 		}
// 	}
// });

// *********************************************************************************
// End of validate the fields and turn on/off the submit buttons on the QCO REPORT VIEW
// *********************************************************************************


// ******************************************************************************
// End of QCO REPORT
// ******************************************************************************


// ******************************************************************************
// This part create the Modal Historic Vehicle
// ******************************************************************************
// $(document).on('click','.historicModal', function(e){
// 	var id = this.id.split('_')['2'];
// 	var aux = "";
// 	var BRdate;
// 	$('#infoArea_'+id).val("Carregando as informações... aguarde!");
// 	$.getJSON('/api/get-historic-vehicle',{id : id},function(data){
// 		$.each(data, function(k, v){
// 			BRdate = moment(v.date).format("DD/MM/YY HH:mm:ss");
// 			aux = aux + v.name_status +" (" + v.name_user +") " + BRdate +"\n";
// 		})
// 		$('#infoArea_'+id).val(aux);
// 	});
// });
// ******************************************************************************
// End of Modal Historic Vehicle
// ******************************************************************************
// End of QCO REPORT

// ******************************************************************************
// This part create and validate FLEET REPORT VIEW
// ******************************************************************************

$(document).on('change','#line_report_fleet', function(){
	$('#report_rit').remove();
	$('#report_cell').remove();
	$('#report_day').remove();
	var option = $('#line_report_fleet').val();
	if (option == 1) {
		$('#line_report_pdf').prop('disabled', true);
		$('#line_report_csv').prop('disabled', true);
		$.getJSON('/api/get-rit',{},function(rit){
			$('#line_report_fleet').after('<select id="report_rit" name="report_rit" '+
				'class="form-control" required="">');
			$('#report_rit').append('<option value="">-- Escolha uma Rit --</option>');
			$.each(rit, function(e, d){
				$('#report_rit').append('<option value="'+d.id+'">'+d.name+'</option>');
			})
			$('#line_report_fleet').after('</select>');
		});
	}else if(option == 2){
		$('#line_report_pdf').prop('disabled', true);
		$('#line_report_csv').prop('disabled', true);
		var flag;
		$.getJSON('/api/get-cell',{},function(cell){
			$('#line_report_fleet').after('<select id="report_cell" name="report_cell" '+
				'class="form-control">');
			$('#report_cell').append('<option value="0"> -- Escolha uma célula --</option>');
			$.each(cell, function(e, d){
			if (flag == "") {
				flag = d.consortium_name;
			}
			if (flag != d.consortium_name) {
				$('#report_cell').append('</optgroup>');	
				$('#report_cell').append('<optgroup label="'+d.consortium_name+'">');	
			}
			$('#report_cell').append('<option value="'+d.id+'">'+d.name+'</option>');
			flag = d.consortium_name;
			})
			$('#line_report_fleet').after('</select>');
		});
	}else if(option == 10){
		$('#line_report_pdf').prop('disabled', true);
		$('#line_report_csv').prop('disabled', true);
		$('#line_report_fleet').after('<input type="date" id="report_day" name="report_day" '+
				'class="form-control" value = "">');
		$('#report_day').change(function(){
			console.log($('#report_day').val());
			if ($('#report_day').val() != "") {
				$('#line_report_pdf').prop('disabled', false);
				$('#line_report_csv').prop('disabled', false);
			}else{
				$('#line_report_pdf').prop('disabled', true);
				$('#line_report_csv').prop('disabled', true);
			}
		});
	}else{
		$('#line_report_pdf').prop('disabled', false);
		$('#line_report_csv').prop('disabled', false);
	}
});

$(document).on('change','#report_rit', function(){
	var option = $('#report_rit').val();
	if (option == 0) {
		$('#line_report_pdf').prop('disabled', true);
		$('#line_report_csv').prop('disabled', true);
	}else{
		$('#line_report_pdf').prop('disabled', false);
		$('#line_report_csv').prop('disabled', false);
	}
});

$(document).on('change','#report_cell', function(){
	var option = $('#report_cell').val();
	if (option == 0) {
		$('#line_report_pdf').prop('disabled', true);
		$('#line_report_csv').prop('disabled', true);
	}else{
		$('#line_report_pdf').prop('disabled', false);
		$('#line_report_csv').prop('disabled', false);
	}
});

// End of FLEET REPORT

// ******************************************************************************
// This part create the Modal Historic Vehicle
//Author: Ivan Araújo
// Date: 05/02/2017
// ******************************************************************************
$(document).on('click','.historicModal', function(e){
	var id = this.id.split('_')['2'];
	var aux = "";
	$('#infoArea_'+id).val("Carregando as informações... aguarde!");
	$.getJSON('/api/get-historic-vehicle',{id : id},function(data){
		console.log(data);
		$.each(data, function(k, v){
			console.log(v.date);
			aux = aux + v.name_status +" (" + v.name_user +") " + v.date +"\n";
		})
		$('#infoArea_'+id).val(aux);
	});
});
// ******************************************************************************
// End of Modal Historic Vehicle
// ******************************************************************************

// *********************************************************************************
// Validate and logic for the fields from Financial Rate Module
// Author: Guilherme Gibosky
// Date: 10/03/2017
// *********************************************************************************

$("#btn_del_depre").on("click", function(e){
	var id = $("#btn_del_depre").val();
	console.log(id);
	$("#id_del_depre").val(id);
})

$("#btn_del_remu").on("click", function(e){
	var id = $("#btn_del_remu").val();
	console.log(id);
	$("#id_del_remu").val(id);
})

$("#lifespan").mask("999.999");

// Check if the tread item have protector and camara. If yes load the input fields.
// Author: Guilherme Gibosky
// Date: 10/03/2017

$(document).on('change', '#vehicle_pattern_tread', function(){
	var option = $('#vehicle_pattern_tread').val();
	var camara = '<div id="camara_div" class="form-group">'+
							'<label for="price_cam" class="col-lg-3 control-label '+
							'optional">Custo Camara (R$ - Un)</label><div class="col-lg-7">'+
							'<input type="number" min="0" step="0.0001" required" name="price_cam" id="price_cam" value=""'+
							' placeholder="Preço Câmara" class="form-control"></div></div>';
	var protetor = '<div id="prot_div" class="form-group">'+
							'<label for="price_prot" class="col-lg-3 control-label'+
							' optional">Custo Protetor (R$ - Un)</label><div class="col-lg-7">'+
							'<input type="number" min="0" step="0.0001" required name="price_prot" id="price_prot" value=""'+
							' placeholder="Preço Protetor" class="form-control"></div></div>';
	var value = this.value;
	var tds = $("#price_tread").find("tr#" + value).children("td");
	$.getJSON('/api/get-itens', {type: option}, function(data){
		$('#tread_item_id').children().remove();
		$('#tread_item_id').append('<option value="'+data.tread_item_id+'">'+data.name+'</option>');
		if (data.tread_item_id == 1) {
			$("#camara_div").remove();
			$("#prot_div").remove();
		}else if(data.tread_item_id == 2) {
			$("#camara_div").remove();
			$("#prot_div").remove();
		}else if (data.tread_item_id == 3){
			$("#camara_div").remove();
			$("#prot_div").remove();
			$("#recap_div").after(camara);
			$("#camara_div").after(protetor);
		}else if (data.tread_item_id == 4){
			$("#camara_div").remove();
			$("#prot_div").remove();
		}
		if (tds.length > 0) {
			$("#quantity").val(tds[2].innerText);
			$("#lifespan").val(tds[3].innerText);
			$("#price_v_tread").val( convertValueFloat(tds[4].innerText) );
			$("#price_recap").val( convertValueFloat(tds[5].innerText) );
			if (data.tread_item_id == 3) {
				$("#price_cam").val( convertValueFloat(tds[6].innerText) );
				$("#price_prot").val( convertValueFloat(tds[7].innerText) );
			}
			$("#submit_tread").val("Atualizar");
		}else{
			$("#quantity").val("");
			$("#lifespan").val("");
			$("#price_v_tread").val("");
			$("#price_recap").val("");
			if (data.tread_item_id == 3) {
				$("#price_cam").val("");
				$("#price_prot").val("");
			}
			$("#submit_tread").val("Salvar");
		}
	});
})


// Check if the tread info is complete for the selected pattern
// Author: Guilherme Gibosky
// Date: 22/01/2017

$(document).on('change', '#vehicle_pattern_acessories', function(){
	var option = $('#vehicle_pattern_acessories').val();
	var pattern = $('#vehicle_pattern_acessories option:selected').text();
	var id = $('#hidden_id').val();
	if (option != "0") {
		var value = this.value;
		var id_name = this.id.split("_");
		id_name = id_name[id_name.length-1];
		var tds = $("#t_"+id_name).find("tr#" + value).children("td");
		$.getJSON('/api/check-tread-vpattern', {type: option, id: id}, function(data){
			if(data == 1){
				$('#submit_acessories').prop('disabled', false);
				$('#submit_acessories').val("Atualizar");
				$('#acessories_body').prop('disabled', false);
				$('#acessories_chassi').prop('disabled', false);
				$('#acessories_body').val(tds[1].innerText);
				$('#acessories_chassi').val(tds[2].innerText);
			}else{
				$('#submit_acessories').prop('disabled', true);
				$('#submit_acessories').val("Salvar");
				$('#acessories_modal').modal();
				$('#modal_header_ev').text("Padrão "+pattern+" - Dados Incompletos");
				$('#acessories_body').prop('disabled', true);
				$('#acessories_chassi').prop('disabled', true);
			}
		});
	}else{
		$('#acessories_body').prop('disabled', false);
		$('#acessories_chassi').prop('disabled', false);
	}
})

// Create the Variable Chart in Print on the Finance Module
// Author: Guilherme Gibosky
// Date: 10/03/2017

function getPrintRateVariable(w, h, id){
	$.getJSON("/api/get-print-data-variable", {id:id}, function(data){
		console.log(data);
		var vis = d3.select('#visualisation_variable'),
		WIDTH = w,
		HEIGHT = h,
		MARGINS = {
			top: 20,
			right: 20,
			bottom: 20,
			left: 50
		},

		xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1)
		.domain(data.map(function(d) {return d.x;}));

		yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom])
		.domain([0,d3.max(data, function(d) {return d.y;})]);

		xAxis = d3.svg.axis()
			.scale(xRange)
			.tickSize(5)
			.tickSubdivide(true);

		yAxis = d3.svg.axis()
			.scale(yRange)
			.tickSize(5)
			.orient("left")
			.tickSubdivide(true);

		vis.append('svg:g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
			.call(xAxis);

		vis.append('svg:g')
			.attr('class', 'y axis')
			.attr('transform', 'translate(' + (MARGINS.left) + ',0)')
			.call(yAxis);

		vis.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('x', function(d) {
			return xRange(d.x);
		})
		.attr('y', function(d) {
			return yRange(d.y);
		})
		.attr('width', xRange.rangeBand())
		.attr('height', function(d) {
			return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
		})
		.attr('fill', 'grey')
		.on('mouseover', function(d) {
			d3.select(this)
				.attr('fill', 'blue');
		})
		.on('mouseout', function(d) {
			d3.select(this)
				.attr('fill', 'grey');
		});

		vis.append("text")
		.attr("x", (WIDTH / 2))             
		.attr("y", 0 - (MARGINS.top / 2) +25)
		.attr("text-anchor", "middle")  
		.style("font-size", "15px") 
		.style("text-decoration", "underline")  
		.text("Variável");
	})	
}

// Create the Fixed Rate Chart in Print on the Finance Module
// Author: Guilherme Gibosky
// Date: 10/03/2017
function getPrintRateFix(w, h, id){
	$.getJSON("/api/get-print-data-variable", {id:id}, function(data){	
		var vis = d3.select('#visualisation_fix'),
		WIDTH = w,
		HEIGHT = h,
		MARGINS = {
			top: 20,
			right: 20,
			bottom: 20,
			left: 50
		},

		xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1)
		.domain(data.map(function(d) {return d.x;}));

		yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom])
		.domain([0,d3.max(data, function(d) {return d.y;})]);

		xAxis = d3.svg.axis()
			.scale(xRange)
			.tickSize(5)
			.tickSubdivide(true);

		yAxis = d3.svg.axis()
			.scale(yRange)
			.tickSize(5)
			.orient("left")
			.tickSubdivide(true);

		vis.append('svg:g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
			.call(xAxis);

		vis.append('svg:g')
			.attr('class', 'y axis')
			.attr('transform', 'translate(' + (MARGINS.left) + ',0)')
			.call(yAxis);

	 
		vis.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('x', function(d) {
			return xRange(d.x);
		})
		.attr('y', function(d) {
			return yRange(d.y);
		})
		.attr('width', xRange.rangeBand())
		.attr('height', function(d) {
			return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
		})
		.attr('fill', 'grey')
		.on('mouseover', function(d) {
			d3.select(this)
				.attr('fill', 'blue');
		})
		.on('mouseout', function(d) {
			d3.select(this)
				.attr('fill', 'grey');
		});

	 vis.append("text")
		.attr("x", (WIDTH / 2))             
		.attr("y", 0 - (MARGINS.top / 2) +25)
		.attr("text-anchor", "middle")  
		.style("font-size", "15px") 
		.style("text-decoration", "underline")  
		.text("Fixo");
	})	
}

// Create the Total Rate Chart in Print on the Finance Module
// Author: Guilherme Gibosky
// Date: 10/03/2017
function getPrintRateTotal(w, h, id){
	$.getJSON("/api/get-print-data-variable", {id: id}, function(data){	
		var vis = d3.select('#visualisation'),
		WIDTH = w,
		HEIGHT = h,
		MARGINS = {
			top: 20,
			right: 20,
			bottom: 20,
			left: 50
		},

		xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1)
		.domain(data.map(function(d) {return d.x;}));

		yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom])
		.domain([0,d3.max(data, function(d) {return d.y;})]);

		xAxis = d3.svg.axis()
			.scale(xRange)
			.tickSize(5)
			.tickSubdivide(true);

		yAxis = d3.svg.axis()
			.scale(yRange)
			.tickSize(5)
			.orient("left")
			.tickSubdivide(true);

		vis.append('svg:g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
			.call(xAxis);

		vis.append('svg:g')
			.attr('class', 'y axis')
			.attr('transform', 'translate(' + (MARGINS.left) + ',0)')
			.call(yAxis);

		vis.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('x', function(d) {
			return xRange(d.x);
		})
		.attr('y', function(d) {
			return yRange(d.y);
		})
		.attr('width', xRange.rangeBand())
		.attr('height', function(d) {
			return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
		})
		.attr('fill', 'grey')
		.on('mouseover', function(d) {
			d3.select(this)
				.attr('fill', 'blue');
		})
		.on('mouseout', function(d) {
			d3.select(this)
				.attr('fill', 'grey');
		});

		vis.append("text")
		.attr("x", (WIDTH / 2))             
		.attr("y", 0 - (MARGINS.top / 2) +25)
		.attr("text-anchor", "middle")  
		.style("font-size", "15px") 
		.style("text-decoration", "underline")  
		.text("Total");
	})	
}

$("input[name=if_clone]").on('click', function(e){
	var value = $("input[name=if_clone]:radio:checked").attr('value');
	if (value == 1) {
		$("#form_system_year").slideDown( "slow" );
		$("#year_system").prop('disabled', false);
		$("#year").prop('disabled', false);
		$("#form-year").slideUp( "slow" );
	}else{
		$("#year").prop('disabled', false);
		$("#submit").prop('disabled', false);
		$("#form-year").slideDown( "slow" );
		$("#form_system_year").slideUp( "slow" );
		$("#year_system").val('0');
		$("#year_clone").prop('disabled', true);
		$("#arrow_clone_year").css('color','#0a0a0a');

	}
})

$("#year_system").on('change', function(e){
	var value = $("#year_system").val();
	if (value != 0){
		$("#year_clone").prop('disabled', false);
		$("#submit").prop('disabled', false);
		$("#arrow_clone_year").css('color','#468847');
	}else{
		$("#arrow_clone_year").css('color','#0a0a0a');
		$("#year_clone").prop('disabled', true)
		$("#submit").prop('disabled', true)
	}
})



// Enabler and changer of forms on Financial Rate Fixed Cost - Social
// Author: Guilherme Gibosky
// Date: 10/03/2017
$("#group_social").on('change', function(e){
	var value = $("#group_social").val();
	showAndEnable(value);
})


$(".social_header").popover({
	placement : 'top',
	trigger : 'hover',
	title : $(this).attr("data-title"),
	content : $(this).attr("data-content")
})

$(".dimension_header").popover({
	placement : 'top',
	trigger : 'hover',
	title : $(this).attr("data-title"),
	content : $(this).attr("data-content")
})

// ****Are not used anymore since the coefficients are grouped at one tab. Gibosky 07/2017 

// Function to save a information on the database using JS. Also customized alert info with toastr API

// function saveData(tax, year){
// 	toastr.options = {
// 				"closeButton": true,
// 				"debug": false,
// 				"newestOnTop": false,
// 				"progressBar": true,
// 				"positionClass": "toast-top-right",
// 				"preventDuplicates": false,
// 				"onclick": null,
// 				"showDuration": "500",
// 				"hideDuration": "1000",
// 				"timeOut": "3000",
// 				"extendedTimeOut": "1000",
// 				"showEasing": "swing",
// 				"hideEasing": "linear",
// 				"showMethod": "fadeIn",
// 				"hideMethod": "fadeOut"
// 	};
// 	$.ajax({
// 		type: "POST",
// 		url: "/api/save-capital-tax-correction",
// 		data: { tax: tax, year: year},
// 		success:function( msg ) {
// 			if (msg == 0) {
// 				toastr.warning('Erro. Confira os dados preenchido e tente novamente');
// 			}else{
// 			 toastr.success('Dados Salvo com Sucesso');
// 			 $('.cap_correction').text(tax.replace('.', ','));
// 			}
// 		},
// 		error:function(msg){
// 			toastr.warning('Erro. Confira os dados preenchido e tente novamente');
// 		}
// 	});
// }

// $("#btn_cap_correction_tax").on('click', function(e){
// 	$("#btn_cap_correction_tax").prop('disabled', 'true');
// 	setTimeout(function(){
// 		$('#btn_cap_correction_tax').removeAttr('disabled');;
// 	}, 3000);
// 	var tax = $("#cap_correction_tax").val();
// 	var year = window.location.pathname.split("/")['4'];
// 	saveData(tax, year);

// })



// $(document).on('keyup', '#price', function(price, e, field){
// 	var counter = ($(this).val().length);
// 	$(this).mask('999,99');
// 	if (counter > 5)
// 		$(this).mask('9.999,99');
// })

// ******************************************************************************
// Administration module - Lucas Naves
// ******************************************************************************
$('#consId').change(function(){
	$('#consId').css('border-color','green').popover('destroy')

	$('#consortiumCom').val("");
	$.getJSON('/administration/get-communication/id/'+this.value, { }, function(data){
	$('#consortiumCom').empty();
		if (data.length == 0) {
			$('#consortiumCom').append("<option value=''> -- Não possui nenhuma célula -- </option>"); 
		}else{
			$('#consortiumCom').append("<option value=''> -- Selecione uma célula -- </option>");
		}
		$.each(data, function(index,item) {
				$('#consortiumCom').append("<option value=" + item.id + ">" + item.celula +" - "+ item.name +"</option>");
		});
	});
});

$('#institution').change(function(){
	if($('#institution').val() == 3){
		$('#consortium').prop('disabled', false);
	}else{
		$('#consortium').val(0);
		$('#company_id').val(0);
		$('#consortium').prop('disabled', true);
		$('#company_id').prop('disabled', true);
	}
});

$(function(){
	if($('#consortium').val() != 0){
		$('#consortium').prop('disabled', false);
	}else{
		$('#consortium').prop('disabled', true);
	}
});

$('#consortium').change(function(){
	$('#consortium').css('border-color','green').popover('destroy')
	$('#company_id').val("");
	$.getJSON('/administration/get-user-company/id/'+this.value, { }, function(data){
	$('#company_id').empty();
		if (data.length == 0) {
			$('#company_id').append("<option value=''> -- Não possui nenhuma Empresa -- </option>"); 
		}else{
			$('#company_id').prop('disabled', false);
			$('#company_id').append("<option value=''> -- Selecione uma Empresa -- </option>");
		}
		$.each(data, function(index,item) {
				$('#company_id').append("<option value=" + item.id + ">" + item.company + "</option>");
		});
	});
});

// conferir se a senha e o confirmar senha sao iguais no cadastro e no editar usuario Lucas Naves
$('#confirm_password').change(function(){
	if($('#password').val() != $('#confirm_password').val()){
    $('#confirm_password').css('border-color','red').popover('destroy')
    $('#password').css('border-color','red').popover('destroy')
    $('#submit').prop('disabled', true);
	}else{
		$('#confirm_password').css('border-color','green').popover('destroy')
    $('#password').css('border-color','green').popover('destroy')
    $('#submit').prop('disabled', false);
	}	
});
$('#password').change(function(){
	if($('#password').val() != $('#confirm_password').val()){
    $('#confirm_password').css('border-color','red').popover('destroy')
    $('#password').css('border-color','red').popover('destroy')
    $('#submit').prop('disabled', true);
	}else{
		$('#confirm_password').css('border-color','green').popover('destroy')
    $('#password').css('border-color','green').popover('destroy')
    $('#submit').prop('disabled', false);
	}	
});

// permission sub modules 
$('#module').change(function(){
	var local = window.location.pathname.split("/");
	console.log(local);
	if (local[2] === "add-feature") {
		$("#feature_controller option").each(function()
		{
			$(this).remove();
		});
	}
	$('#module').css('border-color','green').popover('destroy')
	var mod = this.value;
	$('#sub_module').val("");
	$('#sub_module').prop('disabled', false);
	$.ajax({
		url:'/administration/get-permission/id/'+mod,
		method: 'get',
		success: function(result){
		 permission(JSON.parse(result), mod);
		}
	});
});


function permission(result, mod){
	$('#sub_module').empty();
			$('#sub_module').append("<option value=''>Selecione um sub Modulo</option>");
			$.each(result, function(index,item) {;
				$('#sub_module').append("<option value=" + item.id + ">" + item.desc +"</option>");
			 });

		$.ajax({
				url: '/administration/check-permission/id/'+$('#user_id').val()+'/mod/'+mod,
				method: 'get',
				success: function(result) {console.log(result)
						$.each(JSON.parse(result), function(error, data) {
							$("select#sub_module option").filter("[value='"+data.id+"']").remove();   
						});
					}
		});
}

// Funcionalidades 

$('#sub_module').change(function(){
	var local = window.location.pathname.split("/");
	console.log(local);
	if (local[2] === "user-permission") {
		$('#sub_module').css('border-color','green').popover('destroy')
		var mod = this.value;
		$('#action').val("");
		$.ajax({
			url:'/administration/get-permission-func/id/'+mod,
			method: 'get',
			success: function(result){
			 permissionfunc(JSON.parse(result), mod);
			}
		});
	}else{
		$('#sub_module').css('border-color','green').popover('destroy')
		$('#feature_controller').val("");
		$('#feature_controller').prop('disabled', false);
		var module_id = $('#module').val();
		$.ajax({
			type: "POST",
			url: "/api/get-controller",
		 	dataType: "json",
			data: {module_id : module_id},
			success: function(result){
				$("#feature_controller option").each(function()
				{
					$(this).remove();
				});
				$.each(result, function(index,item) {
					$('#feature_controller').append("<option value=" + item.controller + ">" + item.controller+"</option>");
				})
				$('#feature_controller').slideDown('slow');
				$('#action').prop('disabled', false);
				$('#view').slideDown('slow');
			}
		});
	}
});

function permissionfunc(result, mod){
	var text;
	if (result != "") {
		$('#action').prop('disabled', false);
		$('#view').slideDown('slow');
	}else{
		$('#action').prop('disabled', true);
		$('#view').slideUp('slow');
	}
	$('#action').empty();
			$('#action').append("<option value=''>Selecione uma funcionalidade</option>");
			$.each(result, function(index,item) {;
				text = "";
				if (item.id == item.sub_modules) {
					text = " (Todas as Permissões abaixo)"
				}
				$('#action').append("<option value=" + item.id + ">" + item.desc + text +"</option>");
			 });
		$.ajax({
				url: '/administration/check-permission-func/id/'+$('#user_id').val()+'/mod/'+mod,
				method: 'get',
				success: function(result) {console.log(result)
						$.each(JSON.parse(result), function(error, data) {
							$("select#action option").filter("[value='"+data.id+"']").remove();   
						});
					}
		});
}


// ******************************************************************************
// Testes de mascaras - Lucas Naves - 30/03/2017
// ******************************************************************************

	function mascara(o,f){
		v_obj=o
		v_fun=f
		setTimeout("execmascara()",1)
	}

	function execmascara(){
		v_obj.value=v_fun(v_obj.value)
	}

	function cnpjMask(v){
		v=v.replace(/\D/g,"")                           //Remove tudo o que não é dígito
		v=v.replace(/^(\d{2})(\d)/,"$1.$2")             //Coloca ponto entre o segundo e o terceiro dígitos
		v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
		v=v.replace(/\.(\d{3})(\d)/,".$1/$2")           //Coloca uma barra entre o oitavo e o nono dígitos
		v=v.replace(/(\d{4})(\d)/,"$1-$2")              //Coloca um hífen depois do bloco de quatro dígitos
		return v
	}

	function inscriçãoEsta(v){
		v=v.replace(/\D/g,"")                           //Remove tudo o que não é dígito
		v=v.replace(/^(\d{3})(\d)/,"$1.$2")             //Coloca ponto entre o terceiro e o quarto dígitos
		v=v.replace(/^(\d{3})\.(\d{3})(\d)/,"$1.$2.$3") //Coloca ponto entre o sexto e o setimo dígitos
		v=v.replace(/\.(\d{3})(\d)/,".$1/$2")           //Coloca uma barra entre o oitavo e o nono dígitos
		return v
	}

	function cepMask(v){
		v=v.replace(/\D/g,"")                           //Remove tudo o que não é dígito
		v=v.replace(/(\d{5})(\d)/,"$1-$2")          //Coloca um traço entre o quinto e o sexto dígitos
		return v
	}
	function soNumber(v){
		v=v.replace(/\D/g,"")                           //Remove tudo o que não é dígito
		return v
	}


// **************************************************************************************************
// Função que ao clicar na linha de uma tabela direciona para outa pagina - Lucas Naves - 11/04/2017
// **************************************************************************************************
	$(document).ready(function(){
		$('#clickLine').click(function(){
				window.location = $(this).data('url');
				returnfalse;
		});
	});

// verificar se já existe um atendimento. Lucas Naves 


$('#communication').change(function(event){
	var communication = $('#communication').val();
		$.ajax({
			type: "POST",
			url: "/administration/check-attendance",
			data: {communication : communication}
		}).done(function (data){
			var communication = data;
			if (communication == 1) {
				$('#communication').css('border-color','red');
				$('#communication').popover({title: "Inválido", content: "Já existe no sistema", trigger: "hover"});
				$('#submit_attendance').prop("disabled",true);
				$('#check_communication').val("1");
			}else{
				$('#communication').css('border-color','green').popover("destroy");
				$('#check_communication').val("0");
				checkAttendanceSucesso();
			};
		});
});

function checkAttendanceSucesso(){
	var communication = $('#check_communication').val();
	if (communication == "0") {
		$('#submit_attendance').prop("disabled",false);
	};
}

// Put the placeholder on input if is empty, and show h4 if input is filled
// Author: Guilherme Gibosky
// Date: 23/05/2017

$('#block_justify').on('keyup', function(e){
	var text = $('#block_justify').val();
	if (text != "") {
		$("#h4_block").slideDown('slow');
		$('#block_justify').prop('placeholder', '');
		$('#btn_block_vis').prop('disabled', false);
	}else{
		$("#h4_block").slideUp('slow');
		$('#block_justify').prop('placeholder', 'Tem certeza que deseja bloquear o veículo'+
			'(seja por reprovação do laudo de vistoria ou alguma iregularidade de vistória em campo)'+
			' e enviá-lo para a SETOP?');
		$('#btn_block_vis').prop('disabled', true);
	}
})

$(".lock_msg_modal").on('click', function(e){
	var id = $(".lock_msg_modal").val();
	$.ajax({
			type: "POST",
			url: "/api/get-just-block",
			data: {id : id}
	}).done(function (data){
		$('#jus_block_textarea').val(data);	
		$('#jus_block_textarea').prop('disabled', true);	
	});
})

// Check if vehicle is from that company or consortium
// Author: Guilherme Gibosky
// Date: 30/05/2017

$("#vehicle_number").on('change', function(e){
	var consortium = $("#c_hidden").val();
	var company = $("#cp_hidden").val();
	var vehicle = $("#vehicle_number").val();
	$.ajax({
			type: "POST",
			url: "/api/get-company-consortium-vehicles",
			data: {consortium : consortium, company : company, vehicle : vehicle}
	}).done(function (data){
		$('#feedback-error-vehicle-number').css('color','#b94a48');
		$('#feedback-success-vehicle-number').css('color','#468847');
		if (data == 0) {
			$('#vehicle_number').popover({
				title : 'Erro',
				content: "Veículo não pertence a essa empresa e/ou consórcio",
				placement: 'bottom',
				trigger: "hover",
			});
			$('#main_lost_log_submit').prop('disabled', true);
			$('#form-vehicle-number').removeClass('has-success');
			$('#form-vehicle-number').removeClass('has-feedback');
			$('#form-vehicle-number').addClass('has-error');
			$('#form-vehicle-number').addClass('has-feedback');
		}else{
			$('#form-vehicle-number').removeClass('has-error');
			$('#form-vehicle-number').removeClass('has-feedback');
			$('#form-vehicle-number').addClass('has-success');
			$('#form-vehicle-number').addClass('has-feedback');
			$('#main_lost_log_submit').prop('disabled', false);
			$('#vehicle_number').popover("destroy");
		}
	});
})

$('#new_lost_log_form').submit(function(e){
	e.preventDefault();
	var form = this;
	var end_hour = $("#end_hour").val();
	var start_hour = $("#start_hour").val();
	var end_date = $("#end_date").val();
	var start_date = $("#start_date").val();
	var vehicle_number = $("#vehicle_number").val();
	var consortium = $("#c_hidden").val();
	var company = $("#cp_hidden").val();
	$.ajax({
		type:"POST",
		url: "/api/verify-mco-lost-log",
		data: {end_hour : end_hour, start_hour : start_hour, end_date : end_date,
			start_date : start_date, vehicle_number : vehicle_number, 
			consortium : consortium, company: company}
	}).done(function(data){
		$('#feedback-error-vehicle-number').css('color','#b94a48');
		$('#feedback-success-vehicle-number').css('color','#468847');
		if (data == false) {
			$('html, body').animate({ scrollTop: $('#start_hour').offset().top }, 'slow');
			$('#start_hour').popover({
				title : 'Horário Inválido',
				content: "Já existe uma viagem nesse período",
				placement: 'bottom',
				trigger: "hover",
			});
			$('#end_hour').popover({
				title : 'Horário Inválido',
				content: "Já existe uma viagem nesse período",
				placement: 'bottom',
				trigger: "hover",
			});
			$('#start_hour').css('border','solid 2px #b94a48');
			$('#end_hour').css('border','solid 2px #b94a48');
		}else{
			form.submit();
		}
	});
})

$(document).on('click','#clone_qco', function(e){
	this.innerHTML='Aguarde, enviando formulário...';
	this.disabled=true;
	this.form.submit();
});

$(".direct_personal").popover({
	title : 'Atenção',
	content: "Valor do salário ou encargo",
	placement: 'right',
	trigger: "hover",
});

$(".multi").popover({
	title : 'Área de Atuação',
	content: function(){
		var placeholder = $(this).attr('placeholder');
		return placeholder;
	},
	placement: 'right',
	trigger: "hover",
});

$(".s_base_input").on('change', function (e){
 	$(this).popover('destroy');
	var sal = $(this).val();
	if (sal.length > 5) {
		$(this).popover({
			content: function(){
				return "R$ "+sal;
			},
			placement: 'top auto',
			animation: 'true',
		}).popover('show');
	}
})

// check active tab and submit only the visible form

$("#submit_base_salary").on('click', function(e){
	var tab = $("#base_salary_tabs").find('li.active').children().html();	
	switch(tab) {
    case "Diretoria e Gerência":
     	$("#form_ceo_base").submit();
      break;
	  case "Administração":
      $("#form_admin_base").submit();
      break;
    case "Manutenção":
      $("#form_mainte_base").submit();
      break;
    case "Terceirizado":
      $("#form_outsorced_base").submit();
      break;
    default:
	}
})


// ***************************************************************************************
//  Financial Analisys Graphs - 28/07/2017
// ***************************************************************************************

// Format interger to string and show the numeral equivalent
// based on http://jsfiddle.net/hAfMM/ and 
// https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript

function format1(n) {
	n = n.toString(); // needed because input is interger
  return n.replace(/./g, function(c, i, a) {
    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
  });
}


// Create the Initial Chart in Finance Analysis Module
// Author: Guilherme Gibosky
// Date: 28/07/2017

function getPrintGraph(w, h, month, year, type, range, ord){
	
	$.getJSON("/api/financial-analisys-graph", 
	{month: month, year: year, type: type, range: range, ord: ord}, 
	function(data){	
		console.log(data);
		var  WIDTH = w,
		HEIGHT = h,
		MARGINS = {
			top: 20,
			right: 20,
			bottom: 20,
			left: 60
		},
		vis = d3.select('#visualisation_km');

// Definir um grafico padrão inicial

		if (type == "km") {
			var desc = "Produção Quilométrica",
			desc_y = desc_tip = "KM";
		}else if (type == "ps") {
			var desc = desc_tip = "Passageiros",
			desc_y = "Quantidade";
		}else{
			var desc = desc_y = "Frota",
			desc_tip = "Veículos";
		}

//	Fase de definição de escopo (grafico) e dominio (Dado => Grafico)

		xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - 40], .1).domain(data.map(function(d) {return d.line;}));
		yRange = d3.scale.linear().rangeRound([HEIGHT - MARGINS.top, MARGINS.bottom])
		.domain([0,d3.max(data, function(d) {return d.sum;})]);

// Preenche o eixo X

		xAxis = d3.svg.axis()
			.scale(xRange);

// Preenche o eixo Y

		yAxis = d3.svg.axis()
			.scale(yRange)
			.tickSize(5)
			.orient("left")
			.tickSubdivide(true);

// Fase que define o tooltip do grafico

		d3.select('.d3-tip').remove();

		var tip = d3.tip()
		  .attr('class', 'd3-tip')
		  .offset([-10, 0])
		  .html(function(d) {
	  		return "<span style='color:red'>"+format1(d.sum)+ " "+desc_tip+"</span>";
	  })

// Chamada do eixo x e suas caracteristicas
		vis.append('svg:g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
			.call(xAxis)
		.append("text")
			.attr("x", WIDTH - 25)             
			.attr("y", 19)
			.attr("text-anchor", "middle")  
			.attr("id", "desc_chart")  
			.style("font-size", "15px") 
			.style("text-decoration", "underline")  
			.text("Linhas");

// Chamada do eixo y e suas caracteristicas

		vis.append('svg:g')
			.attr('class', 'y axis')
			.attr('transform', 'translate(' + (MARGINS.left) + ',0)')
			.call(yAxis)
		.append("text")
			.attr("x", - 5)             
			.attr("y", 0 - (MARGINS.top / 2) + 20)
			.attr("text-anchor", "middle")  
			.style("font-size", "14px") 
			.style("text-decoration", "underline")  
			.text(desc_y);

// Chamada do tooltip

		vis.call(tip);

// Construção das barras do grafico

		var bar = vis.selectAll('rect').data(data);

		bar.enter()
		.append('rect')
		.attr('x', function(d) {
			return xRange(d.line);
		})
		.attr('y', function(d) {
			return yRange(d.sum);
		})
		.attr('width', xRange.rangeBand())
		.attr('height', function(d) {
			return ((HEIGHT - MARGINS.bottom) - yRange(d.sum));
		})
		.attr('fill', 'steelblue')
		.on('mouseover', function(d) {
			tip.show(d);
			d3.select(this)
				.attr('fill', 'DarkBlue');
		})
		.on('mouseout',  function(d) {
			tip.hide(d);
			d3.select(this)
				.attr('fill', 'steelblue');
		});

// legenda grafico

		vis.append("text")
		.attr("x", (WIDTH / 2) - 22)             
		.attr("y", 0 - (MARGINS.top / 2) + 25)
		.attr("text-anchor", "middle")  
		.style("font-size", "15px") 
		.style("text-decoration", "underline")  
		.text(desc);
	})
}

// Update the chart in Finance Analysis Module
// Author: Guilherme Gibosky
// Date: 07/07/2017

function redraw(w, h, month, year, type, range, ord, lines){
	$("#chart_date_selector").prop("disabled", true);
	type = "ps";
	$.getJSON("/api/financial-analisys-graph", 
	{month: month, year: year, type: type, range: range, ord: ord, lines}, 
	function(data){	
		$("#chart_date_selector").prop("disabled", false);
		var vis = d3.select("body").select('#visualisation_km'),
			WIDTH = w,
			HEIGHT = h,
			MARGINS = {
				top: 20,
				right: 20,
				bottom: 20,
				left: 60
			},
			rect = vis.selectAll("rect").data(data),
			x_axis = vis.select(".x.axis").data(data),
			y_axis = vis.select(".y.axis").data(data);

		if (data.length > 0) {
			if (type == "km") {
				var desc = "Produção Quilométrica",
				desc_y = desc_tip = "KM";
			}else if (type == "ps") {
				var desc = desc_tip = "Passageiros",
				desc_y = "Quantidade";
			}else{
				var desc = desc_y = "Frota",
				desc_tip = "Veículos";
			}

			xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - 40], .1).domain(data.map(function(d) {return d.line;}));
			yRange = d3.scale.linear().rangeRound([HEIGHT - MARGINS.top, MARGINS.bottom])
			.domain([0,d3.max(data, function(d) {return d.sum;})]);

			xAxis = d3.svg.axis()
				.scale(xRange)
				.tickSubdivide(true);

			yAxis = d3.svg.axis()
				.scale(yRange)
				.tickSize(5)
				.orient("left")
				.tickSubdivide(true);

		 	x_axis
		 	.transition()
	    .duration(800)
				.call(xAxis)

			y_axis
			.transition()
	    .duration(800)
				.call(yAxis)
		// d3.select('.d3-tip').remove();
	 	var tip = d3.tip()
			  .attr('class', 'd3-tip')
			  .offset([-10, 0])
			  .html(function(d) {
		  		return "<span style='color:red'>"+format1(d.sum)+ " "+desc_tip+"</span>";
		  	})
		  
  	vis.call(tip);

	 	
// TODO : DOCUMENT THE CORRECT STAGE

// Add - When there are less rows from flux than bars

			rect
		  .enter()
		  	.append("svg:rect")
		    .attr('x', function(d) {
					return xRange(d.line);
				})
				.attr('y', function(d) {
					return yRange(d.sum);
				})
				.attr('width', xRange.rangeBand())
				.attr('height', function(d) {
					return ((HEIGHT - MARGINS.bottom) - yRange(d.sum));
				})
				.attr('fill', 'steelblue')
				.on('mouseover', function(d) {
					tip.show(d);
					d3.select(this)
						.attr('fill', 'DarkBlue');
				})
				.on('mouseout',  function(d) {
					tip.hide(d);
					d3.select(this)
						.attr('fill', 'steelblue');
				})
		    .transition()
		      .duration(800);

// update - When there are the same number of bars and rows from flux 

		  rect
		  .transition()
	    	.duration(800)
		  	.attr('x', function(d) {
					return xRange(d.line);
				})
				.attr('y', function(d) {
					return yRange(d.sum);
				})
				.attr('width', xRange.rangeBand())
				.attr('height', function(d) {
					return ((HEIGHT - MARGINS.bottom) - yRange(d.sum));
				})
				.attr('fill', 'steelblue');

// remove - When there are less rows from flux than bars
			
		  rect
		  .exit()
		  .transition()
		  .duration(800)
	    .remove();
	    // $("#forward_f_chart").prop('disabled', true);

		}else{

// exit in all elements, except the svg

			rect
		  .exit()
		  .transition()
		  .duration(800)
	    .remove();

			$("#forward_f_chart").prop('disabled', true);
			$("#back_f_chart").prop('disabled', true);
			$("#up_chart").prop('disabled', true);
			$("#down_chart").prop('disabled', true);
		}
	})
}


// Logic for the buttons that control amount lines and order displayed on 
// the chart
// Author: Guilherme Gibosky
// Date: 07/07/2017

$(".chart_button").on('click', function(e){
	console.log("TEste");
	var date = $("#chart_date_selector").val().split("-");
	var current_month = date[1];
	var current_year = date[0];
	var w = $("svg").prop('width').baseVal.value;
	var h = $("svg").prop('height').baseVal.value;
	var id = $(this).prop("id");
	console.log(id);
	var chart_name = $("li.disabled").innerHTML;
	if (chart_name == "Passageiros") {
		var type = "ps";
	}else if(chart_name == "Produção Quilométrica"){
		var type = "km";
	}else{
		var type = "fr";
	}
	var up_state = $("#up_chart").prop("disabled");
	if (up_state == true) {
		var ord = "sum ASC"
	}else{
		var ord = "sum DESC"
	}

	switch(id) {
		case "forward_f_chart":
			var f_c_value = $("#forward_f_chart").val();
			var b_c_value = $("#back_f_chart").val();
			redraw(w, h, current_month, current_year, type, f_c_value, ord);
			var f_n_value = parseInt(f_c_value) + 35;
			var b_n_value = parseInt(b_c_value) + 35;	
			$("#forward_f_chart").val(f_n_value);
			$("#back_f_chart").val(b_n_value);
			$("#back_f_chart").prop("disabled", false);
			break;
		case "back_f_chart":
			var f_c_value = $("#forward_f_chart").val();
			var b_c_value = $("#back_f_chart").val();
			if (b_c_value != 0 && f_c_value != 35) {
				var f_n_value = parseInt(f_c_value) - 35;	
				var b_n_value = parseInt(b_c_value) - 35;	
			}
			if (b_n_value == 0) {
				$("#back_f_chart").prop("disabled", true);
			}
			if ($("#forward_f_chart").prop("disabled") == true) {
				$("#forward_f_chart").prop("disabled", false);
			}
			redraw(w, h, current_month, current_year, type, b_n_value, ord);
			$("#forward_f_chart").val(f_n_value);
			$("#back_f_chart").val(b_n_value);
			break;
		case "down_chart":
			redraw(w, h, current_month, current_year, type, 0, "sum DESC");
			$("#forward_f_chart").val(35);
			$("#back_f_chart").val(0);
			$("#back_f_chart").prop("disabled", true);
			$("#down_chart").prop("disabled", true);
			$("#up_chart").prop("disabled", false);
			break;
	 	case "up_chart":
	 		redraw(w, h, current_month, current_year, type, 0, "sum ASC");
			$("#forward_f_chart").val(35);
			$("#back_f_chart").val(0);
			$("#back_f_chart").prop("disabled", true);
			$("#down_chart").prop("disabled", false);
			$("#up_chart").prop("disabled", true);
			break;
	}
})

// Logic for date input that select the month to be displayed on the chart
// Author: Guilherme Gibosky
// Date: 07/07/2017

$("#chart_date_selector").on('change', function(e){
	var date = $("#chart_date_selector").val().split("-");
	var current_month = date[1];
	var current_year = date[0];
	var w = $("svg").prop('width').baseVal.value;
	var h = $("svg").prop('height').baseVal.value;
	var ord = 'sum DESC'; // default when load the page
	var f_c_value = $("#forward_f_chart").val();
	var b_c_value = $("#back_f_chart").val();
	var chart_name = $("#desc_chart").innerHTML;
	var checked = $(".line_selector:checkbox:checked");
	var chart_name = $("li.disabled").innerHTML;
	if (chart_name == "Passageiros") {
		var type = "ps";
	}else if(chart_name == "Produção Quilométrica"){
		var type = "km";
	}else{
		var type = "fr";
	}
	if ($("#all_lines_c_selector").prop("checked") == true || checked.length == 0) {
		redraw(w, h, current_month, current_year, type, 0, ord);
		$("#forward_f_chart").val(35);
		$("#back_f_chart").val(0);
		$("#back_f_chart").prop("disabled", true);
		$("#forward_f_chart").prop("disabled", false);
		$("#up_chart").prop("disabled", false);
		$("#down_chart").prop("disabled", true);
		// getAndAddLinesChart(current_month, current_year);
	}else{
		if (checked.length >= 1 && checked.length < 26){
			var lines = [];
			$.each(checked, function (k, v){
				lines.push(v.id);
			})
			redraw(w, h, current_month, current_year, type, 0, ord, lines);
			$('#chart_s_lines').modal('hide');
			$("#forward_f_chart").val(35);
			$("#back_f_chart").val(0);
			$("#forward_f_chart").prop("disabled", true);
			$("#back_f_chart").prop("disabled", true);
			$("#up_chart").prop("disabled", true);
			$("#down_chart").prop("disabled", true);
			// getAndAddLinesChart(current_month, current_year);
		}else{
			e.preventDefault();
			toastr.options = {
				"closeButton": true,
				"debug": false,
				"newestOnTop": false,
				"progressBar": true,
				"positionClass": "toast-top-right",
				"preventDuplicates": false,
				"onclick": null,
				"showDuration": "500",
				"hideDuration": "3000",
				"timeOut": "5000",
				"extendedTimeOut": "1000",
				"showEasing": "swing",
				"hideEasing": "linear",
				"showMethod": "fadeIn",
				"hideMethod": "fadeOut"
			};
		toastr.warning("O número de linhas tem que ser de 1 até 35.");
		toastr.warning("Nº de linhas selecionadas: "+checked.length);
		}	
	}
})

// Control the collapse button and trigger the chart construction
// Author: Guilherme Gibosky
// Date: 14/08/2017

$("#demo").on("hide.bs.collapse", function(e){
	var checked = $("#lines_chart_textarea").val().split(",");
	var date = $("#chart_date_selector").val().split("-");
	var current_month = date[1];
	var current_year = date[0];
	var w = $("svg").prop('width').baseVal.value;
	var h = $("svg").prop('height').baseVal.value;
	var up_state = $("#up_chart").prop("disabled");
	if (up_state == true) {
		var ord = "sum ASC"
	}else{
		var ord = "sum DESC"
	}
	var f_c_value = $("#forward_f_chart").val();
	var b_c_value = $("#back_f_chart").val();
	var chart_name = $("li.disabled").innerHTML;
	if (chart_name == "Passageiros") {
		var type = "ps";
	}else if(chart_name == "Produção Quilométrica"){
		var type = "km";
	}else{
		var type = "fr";
	}
	if ($("#all_lines_c_selector").prop("checked") == true){
		$('#chart_s_lines').modal('hide');
		redraw(w, h, current_month, current_year, type, 0, ord);
		$("#forward_f_chart").val(35);
		$("#back_f_chart").val(0);
		$("#forward_f_chart").prop("disabled", false);
		$("#back_f_chart").prop("disabled", true);
		if (up_state == true) {
			$("#down_chart").prop("disabled", false);	
		}else{
			$("#down_chart").prop("disabled", true);	
		}
		
	}else{
		var lines = [];
		if (checked.length > 0 && checked.length < 36){
			var current_lines = $(".x.axis").children('g');

			if (current_lines.length == checked.length){

				// TODO: Change the check block into a boolean function
				// Check if the lines were change, if not don't go to server

					var change_outside = false;
					var change_inside = false;
					$.each(checked, function (k, v){
						console.log(k);
						console.log(v);
						lines.push(v);
						$.each(current_lines, function(i,l){
							change_inside = false;
							if (change_outside == false) {
								if ($(l).children().text() == v) {
									change_inside = true;
									return false;
								}	
							}	
						})
						if (change_inside == false) {
							change_outside = true;
						}
					})
					if (change_outside == true) {
						redraw(w, h, current_month, current_year, type, 0, ord, lines);
						$('#chart_s_lines').modal('hide');
						$("#forward_f_chart").val(35);
						$("#back_f_chart").val(0);
						$("#forward_f_chart").prop("disabled", true);
						$("#back_f_chart").prop("disabled", true);
						$("#up_chart").prop("disabled", true);
						$("#down_chart").prop("disabled", true);			
					}
			}else{
				$.each(checked, function (k, v){
						lines.push(v);
				})
				redraw(w, h, current_month, current_year, type, 0, ord, lines);
				$('#chart_s_lines').modal('hide');
				$("#forward_f_chart").val(35);
				$("#back_f_chart").val(0);
				$("#forward_f_chart").prop("disabled", true);
				$("#back_f_chart").prop("disabled", true);
				$("#up_chart").prop("disabled", true);
				$("#down_chart").prop("disabled", true);	
			}

		}else{
			$("#demo").show();
			toastr.options = {
				"closeButton": true,
				"debug": false,
				"newestOnTop": false,
				"progressBar": true,
				"positionClass": "toast-top-right",
				"preventDuplicates": false,
				"onclick": null,
				"showDuration": "500",
				"hideDuration": "3000",
				"timeOut": "5000",
				"extendedTimeOut": "1500",
				"showEasing": "swing",
				"hideEasing": "linear",
				"showMethod": "fadeIn",
				"hideMethod": "fadeOut"
			};
		toastr.warning("Selecione entre 1 e 35 linhas.");
		toastr.warning("Nº de linhas selecionadas: "+checked.length);
		}	
	}
})

$("#all_lines_c_selector").on("click", function(e){
	if ($("#all_lines_c_selector").prop("checked") == false) {
		$(".line_selector").bootstrapSwitch("disabled", false);
		$("#rit_pass").prop("disabled", false);
	}else{
		$('.line_selector').bootstrapSwitch("state", false);
		$(".line_selector").bootstrapSwitch("disabled", true);
		$("#rit_pass").prop("disabled", true);
		$("#lines_chart_textarea").val("");
		$("#badge_lines_finance").text(0);
	}
})



// Lesson here folks, if you want to bind events to dynamic created elements
// use the f****ing $(document).on() handler. In this case .line_selector
// was created at the ritpass function. Hope this same time for someone
// 
// Responsable for add or remove lines to the textbox 
// and also control the number o elements that can be selected
// Gibosky
// Date: 20/10/2017

$(document).on('switchChange.bootstrapSwitch','.line_selector', function(event, state){
	var line = $(this).parent().find("span.bootstrap-switch-label").text();
	var current_val = $("#lines_chart_textarea").val();
	var all = current_val.split(",");
	var size = current_val.split(",").length;
	if (state == true) {
		if (size < 35) {
			addLineTextArea(line,current_val,all,size);
		}else{
			call_toastr('Limite de linhas já foi atingido', '0');
			$(this).bootstrapSwitch("state", !state, false);
		}
	}else{
		removeLineTextArea(line, current_val);
	}
})


// Add the selected line to the text area on the financial analysis 
// chart. The bagde adder is not the best solution
// Gibosky
// Date: 20/10/2017
function addLineTextArea(line,current,all,size){
	if (current == "") {
		$("#lines_chart_textarea").val(line);
		$("#badge_lines_finance").text(parseInt(all.length));
	}else{
		var flag = false;
		$.each(all, function(a,b){
			if (line == b){
				flag = true;
				return false;
			}
		})
		if (flag == false) {
			$("#lines_chart_textarea").val(current+","+line);
			$("#badge_lines_finance").text(parseInt($("#lines_chart_textarea").val().split(",").length));
		}
	}
}

// remove the selected line to the text area on the financial 
// analysis chart. the bagde adder is not the best solution
// Gibosky
// Date: 20/10/2017
function removeLineTextArea(line, current_val){
	var all = current_val.split(",");
	var size = current_val.split(",").length;
	var flag =  false;
	if (current_val != "") {
		$.each(all, function(a,b){
			if (line == b){
				all.splice(a,1);
				flag = true; // achou
				return false; // sai do laço
			}
		})
		if (flag == true) {
			$("#lines_chart_textarea").val(all);
			if ($("#lines_chart_textarea").val().split(",") == "") {
				$("#badge_lines_finance").text(0);
			}else{
				$("#badge_lines_finance").text(parseInt($("#lines_chart_textarea").val().split(",").length));	
			}
		}
	}
}

// Don't allow the user to change the textbox content by typing
// or cut or paste. The user can only copy the text
// Gibosky
// Date: 21/10/2017
$("#lines_chart_textarea").on("keypress keydown cut paste", function (e){
	e.preventDefault();
	if (e.ctrlKey == true || e.type == "cut" || e.type == "paste") {
		if ($(".toast-message").length < 1) { // prevent multiple toast
			call_toastr('Não é possivel alterar o conteudo do campo manualmente', '1');
			call_toastr('Só é permitido copiar o texto', '1');	
		};
	}
})

// Linhas por rit Lucas Naves
$('#rit_pass').change(function(){
	$('#rit_pass').css('border-color','green').popover('destroy')
	var mod = this.value;
	$('.cheLines').val("");
	var monthyear = $('#chart_date_selector').val().split("-");
	$.ajax({
		url:'/finance-analysis/get-passenger/month/'+monthyear[1]+'/year/'+monthyear[0]+'/id/'+mod,
		method: 'get',
		success: function(result){
		 ritpass(JSON.parse(result), mod);
		}
	});
});

function ritpass(result){
	if (result == "0") {
		$('.cheLines').slideUp('slow');
	}else{
		$('.cheLines').slideDown('slow');
	}
	$('.cheLines').empty("slow");
		var current = $("#lines_chart_textarea").val().split(",");
		$.each(result, function(index,item) {
			// $('.cheLines').append('<input type="checkbox" class="line_selector checkbox-inline" value= '+ item.line +' >'+ item.line +'');
			$('.cheLines').append('<input '+
				'type="checkbox" class="line_selector" data-label-text="'
				+item.line +'" data-on-color="success" data-size="mini">');
				$(".line_selector").bootstrapSwitch("state", false);
	 	});
	 	if (current != "") {
		 	var switchs = $('.line_selector');
		 	$.each(switchs, function(index,item) {
		 		if ($.inArray($(item).attr("data-label-text"), current) != -1) {
		 			$(item).bootstrapSwitch("state", true);
		 		}
			});	
	 	}
}

$('#chart_date_selector').change(function(){
	$('#chart_date_selector').css('border-color','green').popover('destroy')
	$('#rit_pass').val("0");
	$('.cheLines').slideUp('slow'); 
});

//Script para a parte da pesquisa. inicio. Lucas Morais 
$(document).on('click','#btnAddPergunta', function(e){
	e.preventDefault();
	var number = $('#pergunta_nun').val();
		for (var i = 1; i <= number; i++) {
			$('#perguntaId').append('<label for="name" class="col-lg-3 control-label optional">Pergunta '+i+'</label>');
			$('#perguntaId').append('<div class="col-lg-7"><input type="text" name="pergunta_'+i+'" id="pergunta_'+i+'" placeholder="Digite sua pergunta" required=""  class="form-control"><br></div>');

		}
			$('#quantRes').append('<label for="name" id="laComp" class="col-lg-3 control-label optional">Quantidade de Resposta pode Selecionar</label>');
			$('#quantRes').append('<div class="col-lg-4"><select class="form-control text-center" name="tipoQuant" id="tipoQuant" required=""><option value="0">Fixo</option><option value="1">Até</option><option value="2">Texto</option></div>');
			$('#quantRes').append('<div class="col-lg-3" id="aa"><input type="number" name="quant" id="quant" placeholder="Digite uma Quantidade" required=""  class="form-control"><br></div>');
			$('#pergIni').append('<label for="name" class="col-lg-3 control-label optional">Essa pergunta é uma pergunta inicial?</label>');
			$('#pergIni').append('<div class="col-lg-7"> <select class="form-control text-center" name="perg_ini" id="perg_ini" required=""><option value="1">-- Não --</option><option value="2">-- Sim --</option></select><br></div>');
			
	$('#tipoQuant').change(function(){
		var x = $('#tipoQuant').val();
		console.log(x);
		if (x == 2) {
			$("#aa").remove();
		}else {
			$('#quantRes').append('<div class="col-lg-3"><input type="number" name="quant" id="quant" placeholder="Digite uma Quantidade" required=""  class="form-control"><br></div>');
			
		}
	});	
			
});

$(document).on('click','#btnAddResposta', function(e){
	e.preventDefault();
	var number = $('#resposta_nun').val();
		for (var i = 1; i <= number; i++) {
			$('#respostaId').append('<label for="name" class="col-lg-3 control-label optional">Resposta</label>');
			$('#respostaId').append('<div class="col-lg-7"><input type="text" name="resposta_'+i+'" id="resposta_'+i+'" placeholder="Digite uma Resposta" class="form-control"></div>');
			$('#respostaId').append('<label for="name" class="col-lg-3 control-label optional">Tipo Resposta</label>');
			$('#respostaId').append('<div class="col-lg-7"><label class="radio-inline"><input type="radio" name="optradio_'+i+'" value="1">checkbox</label><label class="radio-inline"><input type="radio" name="optradio_'+i+'" value="2">texto</label><label class="radio-inline"><input type="radio" name="optradio_'+i+'" value="3">Select</label><label class="radio-inline"><input type="radio" name="optradio_'+i+'" value="4">Radio</label></div>');
	}

});

$(document).on('click','#btnAddRespComp', function(e){
	e.preventDefault();
	var number = $('#respComp_nun').val();
		for (var i = 1; i <= number; i++) {
			$('#respCompId').append('<label for="name" id="laComp" class="col-lg-3 control-label optional">Resposta Composta</label>');
			$('#respCompId').append('<div class="col-lg-7"><input type="text" name="respostaComposta_'+i+'" id="respostaComposta_'+i+'" placeholder="Digite uma Resposta" required=""  class="form-control"></div>');
			$('#respCompId').append('<label for="name" class="col-lg-3 control-label optional">Tipo Resposta</label>');
			$('#respCompId').append('<div class="col-lg-7"><label class="radio-inline"><input type="radio" name="tipoComposta_'+i+'" value="1">checkbox</label><label class="radio-inline"><input type="radio" name="tipoComposta_'+i+'" value="2">texto</label><label class="radio-inline"><input type="radio" name="tipoComposta_'+i+'" value="3">Select</label><label class="radio-inline"><input type="radio" name="tipoComposta_'+i+'" value="4">Radio</label></div>');
			
		}
			$('#quantResComp').append('<label for="name" id="laComp" class="col-lg-3 control-label optional">Quantidade</label>');
			$('#quantResComp').append('<div class="col-lg-4"><select class="form-control text-center" name="tipoQuant" id="tipoQuant" required=""><option value="0">Fixo</option><option value="1">Até</option></div>');
			$('#quantResComp').append('<div class="col-lg-3"><input type="number" name="quant" id="quant" placeholder="Digite uma Quantidade" required=""  class="form-control"></div>');
			
});


$('#questSegundo').change(function(){
		var x = $('#questSegundo').val();
		if (x == 1) {
			$('#ca2Nivel').append('<label for="name" class="col-lg-3 control-label optional">Cabeçalho de Questionario 2 Nivel</label>');
 			$('#ca2Nivel').append('<div class="col-lg-7"><input type="number" name="cabecalho_quest2N" id="cabecalho_quest2N" value="" placeholder="" required=""  class="form-control"></div>');
			$('#2Nivel').append('<label for="name" id="laQuest" class="col-lg-3 control-label optional">Quantidade de resposta</label>');
 			$('#2Nivel').append('<div class="col-lg-2"><input type="number" name="addQuest" id="addQuest" value="" placeholder="" required=""  class="form-control"></div>');
 			$('#2Nivel').append('<div class="col-lg-1"><button id="btnAddQuest" class="btn btn-default btn-primary">Adicionar</button></div>');
		}else {
			$("#laQuest").remove();
			$("#addQuest").remove();
			$("#btnAddQuest").remove();
			// $("#quest2").remove();
			// $("#radioQuest").remove();
			// $("#resmovquest").remove();
			// $("#resmovquest2").remove();
		}

		$(document).on('click','#btnAddQuest', function(e){
			e.preventDefault();
			var numberQeust = $('#addQuest').val();
			for (var i = 1; i <= numberQeust; i++){
				$('#qeustId').append('<label for="name" id="resmovquest" class="col-lg-3 control-label optional">Segundo nivel questionario</label>');
				$('#qeustId').append('<div class="col-lg-7" id="quest2"><input type="text" name="nivel2_'+i+'" id="nivel2_'+i+'" placeholder="Digite uma Resposta" required=""  class="form-control"></div>');
				$('#qeustId').append('<label for="name" id="resmovquest2" class="col-lg-3 control-label optional">Tipo questionario</label>');
				$('#qeustId').append('<div class="col-lg-7" id="radioQuest"><label class="radio-inline"><input type="radio" name="optradio_'+i+'" value="1">checkbox</label><label class="radio-inline"><input type="radio" name="optradio_'+i+'" value="2">texto</label><label class="radio-inline"><input type="radio" name="optradio_'+i+'" value="3">Select</label></div>');
			}
		});
	});

$('#pergunta_respComp').change(function(){
	$('#pergunta_respComp').css('border-color','green').popover('destroy')

	$('#resposta_select').val("");
	// console.log('aqui');
	$.getJSON('/pesquisa/get-resposta/id/'+this.value, { }, function(data){
	$('#resposta_select').empty();
		if (data.length == 0) {
			$('#resposta_select').append("<option value=''> -- Essa pergunta não possui resposta -- </option>"); 
		}else{
			$('#resposta_select').append("<option value=''> -- Selecione uma resposta -- </option>");
		}
		$.each(data, function(index,item) {
				$('#resposta_select').append("<option value=" + item.id + ">" + item.texto +"</option>");
		});
	});
});

$('#pergunta_respComp1').change(function(){
	$('#pergunta_respComp1').css('border-color','green').popover('destroy')

	$('#resposta_select1').val("");
	// console.log('aqui');
	$.getJSON('/pesquisa/get-resposta/id/'+this.value, { }, function(data){
	$('#resposta_select1').empty();
		if (data.length == 0) {
			$('#resposta_select1').append("<option value=''> -- Essa pergunta não possui resposta -- </option>"); 
		}else{
			$('#resposta_select1').append("<option value=''> -- Selecione uma resposta -- </option>");
		}
		$.each(data, function(index,item) {
				$('#resposta_select1').append("<option value=" + item.id + ">" + item.texto +"</option>");
		});
	});
});

$('#resposta_select1').change(function(){
	$('#resposta_select1').css('border-color','green').popover('destroy')

	$('#cabecalho_select').val("");
	// console.log('aqui');
	$.getJSON('/pesquisa/get-resposta-comp/id/'+this.value, { }, function(data){
	$('#cabecalho_select').empty();
		if (data.length == 0) {
			$('#cabecalho_select').append("<option value=''> -- Essa pergunta não possui resposta -- </option>"); 
		}else{
			$('#cabecalho_select').append("<option value=''> -- Selecione uma resposta -- </option>");
		}
		$.each(data, function(index,item) {
				$('#cabecalho_select').append("<option value=" + item.id + ">" + item.texto +"</option>");
		});
	});
});

$(document).on('click','#btnAddRespComp2', function(e){
	e.preventDefault();
	var number = $('#respComp2_nun').val();	
		for (var i = 1; i <= number; i++) {
			$('#ResComp2').append('<label for="name" id="laComp" class="col-lg-3 control-label optional">Resposta Composta</label>');
			$('#ResComp2').append('<div class="col-lg-7"><input type="text" name="rComposta2Nivel_'+i+'" id="rComposta2Nivel_'+i+'" placeholder="Digite uma Resposta" required=""  class="form-control"></div>');
			$('#ResComp2').append('<label for="name" class="col-lg-3 control-label optional">Tipo Resposta</label>');
			$('#ResComp2').append('<div class="col-lg-7"><label class="radio-inline"><input type="radio" name="tipoComposta2_'+i+'" value="1">checkbox</label><label class="radio-inline"><input type="radio" name="tipoComposta2_'+i+'" value="2">texto</label><label class="radio-inline"><input type="radio" name="tipoComposta2_'+i+'" value="3">Select</label><label class="radio-inline"><input type="radio" name="tipoComposta2_'+i+'" value="4">Radio</label></div>');
			
		}
		$('#qant2nivel').append('<label for="name" id="laComp" class="col-lg-3 control-label optional">Quantidade</label>');
		$('#qant2nivel').append('<div class="col-lg-4"><select class="form-control text-center" name="tipoQuant" id="tipoQuant" required=""><option value="0">Fixo</option><option value="1">Até</option></div>');
		$('#qant2nivel').append('<div class="col-lg-3"><input type="number" name="quant" id="quant" placeholder="Digite uma Quantidade" required=""  class="form-control"></div>');
});

$('#escolha').change(function(){
		var x = $('#escolha').val();
		if (x == 1) {
			$('#pergunta1').prop('hidden', false);
			$('#pergunta2').prop('hidden', true);
		}else if(x == 2){
			$('#pergunta1').prop('hidden', true);
			$('#pergunta2').prop('hidden', false);
		}else{
			$('#pergunta1').prop('hidden', true);
			$('#pergunta2').prop('hidden', true);
		}
});

$(document).on("change","#pergunta_select", function(e){
	$(this).val();
})


$(document).on("change","#resp_nivel", function(e){
	if ($(this).val() != 1) {
		$("#resp_v").prop("disabled", false);
		$("#p2_v_r").show("slow");
	}else{
		$("#resp_v").prop("disabled", true);
		$("#p2_v_r").hide("slow");
	}
})

$(document).on("change","#type_resp", function(e){
	if($(this).val() == 1){
		console.log($("#checkbox_quantity").length);
		if ($("#checkbox_quantity").length < 1){
			$(this).closest('div[class^="form-group"]').after('<div class="form-group">'+
			'<label for="name" class="col-lg-3 control-label optional">Quantidade de Respostas</label>'+
			'<div class="col-lg-7">'+
			'<div class="input-group">'+
			'<span class="input-group-addon">'+
			'<label><input type="radio" id="type_checkbox" name="tipo_quantidade" value="0">Até</label>'+
			'<label><input type="radio" id="type_checkbox" name="tipo_quantidade" value="1">Exatamente</label></span>'+
			'<input id="checkbox_quantity" name="quantidade" min="0" class="form_control" type="number">'+
			'</div>'+
			'</div>');	
			$("#checkbox_quantity").prop("disabled", false);
		}else{
			$("#checkbox_quantity").prop("disabled", false);
			$("#checkbox_quantity").closest('div[class^="form-group"]').show("slow");
		}
	}else{
		$("#checkbox_quantity").prop("disabled", true);
		$("#checkbox_quantity").closest('div[class^="form-group"]').hide("slow");
	}
})

//Script para a parte da pesquisa. Fim  Lucas Morais


$(".btn_del_multi").on("click", function(e){
	var id = $(this).prop('id').split('_');
	if (id[2] == "op") {
		var type = id[3];
		$("#del_op_type").val(type);
	}else{

	}
})

// remove the selected line to the text area on the financial 
// analysis chart. the bagde adder is not the best solution
// Gibosky
// Date: 20/10/2017
$(".down_photos").on("click", function(e){
	var id = $(this).prop('id').split('_')[1];
	$("#vehicle_down_photos").val(id);
})

// Check if the user have already uploaded photos before 
// schedule a date
// Gibosky
// Date: 13/09/2017
$(".vistoria").on("click", function(e){
	var path = $(this).prop('href');
	var id = path.split('/')[6]; // ele traz o endereço completo - Http://...
	e.preventDefault();
	toastr.options = {
				"newestOnTop": true,
				"closeButton": true,
				"debug": false,
				"progressBar": true,
				"positionClass": "toast-top-right",
				"preventDuplicates": true,
				"onclick": null,
				"showDuration": "1000",
				"hideDuration": "1000",
				"timeOut": "1500",
				"extendedTimeOut": "1500",
				"showEasing": "swing",
				"hideEasing": "linear",
				"showMethod": "fadeIn",
				"hideMethod": "fadeOut"
				};
				// toastr.info("Aguarde. Verificando pré-requisitos.");
	$.ajax({
		url: '/api/check-photos-down',
		type: 'POST',
		data: { id: id },
		success: function(data){
			if(data == 'false') {
				toastr.timeOut = "6000";
				toastr.warning("As fotos para a baixa não foram anexadas.");
			}else{
				window.location.href = path;
			}	
		}
	})
})

// Function that control the upload of photos for down vehicles
// for SETOP or Company
// Gibosky
// Date: 13/09/2017
$(".down_photos").on("click", function(e){
	var path = $(this).prop('id');
	var id = path.split('_')[1]; // ele traz o endereço completo - Http://...
	$.ajax({
		url: '/api/get-photos-down',
		type: 'POST',
		data: { id: id },
		success: function(data){
			var data = JSON.parse(data);

			// DEER

			if ($('#photos_der').length != 0) {
				if(data.size == 0) {
					$("#photos_der").empty();
					$("#photos_der").append("<h5> Não existem fotos cadastradas para esse veículo</h5>");
				}else{
					$("#photos_der").empty();
					$.each(data.photos, function(k,v){
						$("#photos_der").append('<a href="/upload/vehicle/'+id
							+'/down_photos/'+v.photo_name+'" class="btn btn-default"'+
							'target="_blank"><span class="glyphicon glyphicon-download"></'
							+'span> Download</a>');
					})
				}
			}

			// Empresa
			if ($('#photos').length != 0) {
				if(data.size == 0) {
					$("#photos").empty();
					$("#photos").append("<h5> Não existem fotos cadastradas para esse veículo</h5>");
					if ($('#down_photo_mutiple').length == 0) {
						$("#photos").before('<input id="down_photo_mutiple" type="file"'+
							' name="file[]" multiple accept="image"><br id="d_photos_space">');
					}
					$("#submit_down_photos").prop('disabled', false);
				}else{
					if (data.check == 0) {
						$("#down_photo_mutiple").remove();
						$("#d_photos_space").remove();
						$("#submit_down_photos").prop('disabled', true);
						call_toastr('Já existe agendamento de vistoria para esse veículo.', '0');
						call_toastr('Não é possível anexar mais fotos, aguarde resultado do DEER-MG','0');
					}else{
						if ($("#down_photo_mutiple").length == 0){
							$("#photos").before('<input id="down_photo_mutiple" type="file"'+
							' name="file[]" multiple accept="image"><br id="d_photos_space">');
							$("#submit_down_photos").prop('disabled', false);
						}
					}
					$("#photos").empty();
					$.each(data.photos, function(k,v){
						$("#photos").append('<a href="/upload/vehicle/'+id
							+'/down_photos/'+v.photo_name+'" class="btn btn-default"'+
							'target="_blank"><span class="glyphicon glyphicon-download"></'
							+'span> Download</a>');
					})
				}	
			}
		}
	})
})


// Stand Alone Functions - Code Organization - Gibosky 10/2017


function addHour(hour){
	$('#qhour_'+hour).append('<div class="row"><input type="text" class="hourMask" name="qh_'+hour+'[]" id="qh_'+hour+'" style="width: 25px; text-align: center;" maxlength="2"></div>');
	// $('#qh_'+hour).focus();
	return false;
}

function openData(vehicle){
	if($('#vehicle_'+vehicle).hasClass('hide')){
		$('#vehicle_'+vehicle).removeClass('hide');
		$('#icon_'+vehicle).removeClass('glyphicon-folder-close');
		$('#icon_'+vehicle).addClass('glyphicon-folder-open');
	}
	else{
		$('#vehicle_'+vehicle).addClass('hide');
		$('#icon_'+vehicle).removeClass('glyphicon-folder-open');
		$('#icon_'+vehicle).addClass('glyphicon-folder-close');
	}
}

function checkSuccess(){
	var ext = $('#check_ext').val();
	var plate = $('#check_plate').val();
	var renavam = $('#check_renav').val();
	if (renavam == "0" && plate == "0" && ext == "0") {
		$('.submit_new_vehicle').prop("disabled",false);
	};
}


// Enabler and changer of forms on Financial Rate Fixed Cost - Social
// Author: Guilherme Gibosky
// Date: 10/03/2017
function showAndEnable(letter){
	// var letters = ['a', 'b', 'c', 'd', 'p'];
	var letters = ['a', 'b', 'c'];
	var i = 0;
	for(i; i < letters.length; i++){
		if (letter == letters[i]){
			$("#group_"+letter).slideDown("slow");
			$(".group_"+letter).prop('disabled', false)
		}else{
			$("#group_"+letters[i]).slideUp("slow");
			$(".group_"+letters[i]).prop('disabled', true);
		}
	}
}

// Generic function for call a toastr.
// Param: String - Message to be displayed
// Param: String (INT) - Mode that show a different type of toastr
// Author: Guilherme Gibosky
// Date: 06/10/2017

function call_toastr(message, mode){
	toastr.options = {
				"newestOnTop": false,
				"closeButton": true,
				"debug": false,
				"progressBar": true,
				"positionClass": "toast-top-right",
				"preventDuplicates": true,
				"onclick": null,
				"showDuration": "1000",
				"hideDuration": "1000",
				"timeOut": "7000",
				"extendedTimeOut": "1500",
				"showEasing": "swing",
				"hideEasing": "linear",
				"showMethod": "fadeIn",
				"hideMethod": "fadeOut"
				};
	switch(mode) {
				case "0":
					toastr.warning(message);
					break;
				case "1":
					toastr.info(message);
					break;
				case "2":
					toastr.error(message);
					break;
				case "3":
					toastr.success(message);
					break;
				default:
					 toastr.warning(message);
					 break;
				}
}

// Function that lock a submit button so multiple submits are not send
// Use with caution, because it will only work with "submit objects"
// Gibosky - 09-10-2017

function lockSubmitButton(object){
	object.disabled=true;
	object.innerHTML='Aguarde, enviando...';
	object.form.submit();
}

// Group class (lock_submit) that is used to identify all submit buttons
$(".lock_submit").on("click", function(e){
	lockSubmitButton(this);
})

$("#deny_submit").on("click", function(e){
	var justify = $("#deny_down_justify").val();
	if (justify == " " || justify == "") {
		e.preventDefault();
		// $("#deny_down_justify").css('color','#b94a48');
	}else{
		lockSubmitButton(this);
	}
})

$('#geral').click(function(){
	$('#generalHidden').show('slow');
	$('#generalTrue').prop('hidden', true);

});

$('#geral2').click(function(){
    $('#generalHidden').hide('slow');
	$('#generalTrue').prop('hidden', false);

});

$('#sys_admin').click(function(){
	$('#system_admin').show('slow');
	$('#system_adminTrue').prop('hidden', true);

});
$('#sys_admin2').click(function(){
	$('#system_admin').hide('slow');
	$('#system_adminTrue').prop('hidden', false);

});

$('#frota').click(function(){
	$('#frotaHidden').show('slow');
	$('#frotaTrue').prop('hidden', true);

});

$('#frota2').click(function(){
    $('#frotaHidden').hide('slow');
	$('#frotaTrue').prop('hidden', false);

});

$('#qco').click(function(){
	$('#qcoHidden').show('slow');
	$('#qcoTrue').prop('hidden', true);

});

$('#qco2').click(function(){
    $('#qcoHidden').hide('slow');
	$('#qcoTrue').prop('hidden', false);

});

$('#finan').click(function(){
	$('#financeiroHidden').show('slow');
	$('#financeiroTrue').prop('hidden', true);

});

$('#finan2').click(function(){
    $('#financeiroHidden').hide('slow');
	$('#financeiroTrue').prop('hidden', false);

});

// Validator for number input in .qh file upload on fleet tab - Gibosky
$(document).on('input propertychange','.fleet_qh_number', function(e){
    var val = $(this).val();
    if ( (val[0] == "0" && val.length > 1)){
    	val = val.substr(1);
    	$(this).val(val);
    }else{
    	if (val == "") {
    		val = "0";
    		$(this).val(val);
    	}
    }
});


//Cadatros de seções 

$('#atendimento').change(function(){
	$('#atendimento').css('border-color','green').popover('destroy')

	$('#table').prop('hidden', false);
	$('#name').prop('disabled', false);
	$('#cod_secao').prop('disabled', false);
	$('#input').prop('hidden', false);
	$('#date_vigencia').prop('disabled', false);
	$('#date_end').prop('disabled', false);
	$('#financeFare').prop('disabled', false);
	$('#submit').prop('disabled', false);
	$('#tr').val("");
	$.getJSON('/administration/get-sections/id/'+this.value, { }, function(data){
	$('#tr').empty();
		$.each(data, function(index,item) {
				// $('#cod_secao').val(item.communication);
				$('#tr').append("<tr>");
				$('#tr').append("<td>" + item.cod_sections +"</td>");
				$('#tr').append("<td>" + item.name +"</td>");
				$('#tr').append("<td>" + item.communication +" - "+ item.nome_atd +"</td>");
				$('#tr').append("</tr>");
		});
	});
});

$('#atendimento').change(function(){
	$.getJSON('/administration/get-sections2/id/'+this.value, { }, function(data){
	
		$.each(data, function(index,item) {
				$('#cod_secao').val(item.communication + ' ');
		});
	});
});

$("#qh_submit_fleet").submit(function(e){
	$('#new_qg').prop('disabled', true);
  e.preventDefault();
	var numbers_fleet_new = $(".new_fleet");
	var parent;
	var children;
	var day_fleet = {};
	day_fleet["fleet"] = {};
	var counter2 = 0;
	$.each(numbers_fleet_new, function(index,item) {
		var array = {};
		var counter = 0;
		day_fleet['fleet'][counter2] = {};
		parent = $(item).closest('.panel-collapse').prop('id');
		parent = parent.split("_")[1];
		children = $(item).find('.fleet_qh_number').children().prevObject;
		day_fleet['fleet'][counter2]["type_day_id"] = parent;
		$.each(children, function(a,b) {
			if (counter < 10) {
				day_fleet['fleet'][counter2]["hour_0"+counter] = b.value;
			}else{
				day_fleet['fleet'][counter2]["hour_"+counter] = b.value;
			}
			counter++;
		})
		counter2++;
		// day_fleet["fleet"] = day_fleet["fleet"]+"["+day_fleet["fleet"]+"]";
	})
	// console.log(day_fleet.fleet);
	// console.log(JSON.stringify(day_fleet));
	// day_fleet = JSON.stringify(day_fleet);
	$('#qh_up_fleet').val(JSON.stringify(day_fleet));
	// console.log($('[name = serializedQh]').val());
	this.submit();
});

// <input type="submit" name="submit" id="submit" value="Salvar" buttons="danger info primary success warning inverse link" class="btn col-lg-offset-3 btn-primary">

$(document).on('click', '.clone_route', function(e){
	var form = $(this).parent("form").clone();
	form.find('#edit_route').remove();
	form.find('#remove').remove();
	form.find('button[name = clone]').remove();
	form.find('input[type = hidden]').val("");
	var selected = form.find('#type_journey').val();
	form.find('#type_journey').val(0)
	form.find('#route_justify').val("");
	form.append('<input type="submit" name="submit" id="submit_new_route" value="Salvar" buttons="danger info primary success warning inverse link" class="btn col-lg-offset-3 btn-primary">');
	$("#newRoute").find("form").remove();
	$("#newRoute").find("div[class= panel-body]").append(form);
	$("#newRoute").collapse('show');
 	$('html, body').animate({
  	scrollTop: $("#newRoute").offset().top - 100
  }, 1000);
})


$(document).on('change', '#new_schedule_day', function(e){
	$("#new_schedule_day_pc").val("0");
	var submit = $("#justify_new").next("#edit_hour_btn");
	submit.prop("disabled", true);
})

$(document).on('change', '#new_schedule_day_pc', function(e){
	var pc = $(this).val();
	var submit = $("#justify_new").next("#edit_hour_btn");
	if (pc != 0) {
		var value = $("#new_schedule_day").val();
		var qco_id = window.location.pathname.split("/")[4];
		$.ajax({
			url:'/api/check-valid-hour-day',
			type: "POST",
			data: {pc: pc, day_id: value, qco_id: qco_id},
			success: function(data){
				if (data == 1) {
					call_toastr("Já existe "+$("#new_schedule_day option:selected").text()+" - PC "+pc+" no sistema",2);
					$(new_schedule_day).css('border','solid 2px #b94a48');
					$(new_schedule_day_pc).css('border','solid 2px #b94a48');
					submit.prop("disabled", true);
				}else{
					$(new_schedule_day).removeAttr('style');
					$(new_schedule_day_pc).removeAttr('style');
					submit.prop("disabled", false);
				}
			}
		})
	}else{
		submit.prop("disabled", true);
	}
})


// $(document).on('click', '.remove_btn_save_sibling', function(e){
// 	e.preventDefault();
// 	$(".save_btn_remove_sibling").prop("disabled", true);
// })

$(document).on('click', '#submit_new_route', function(e){
	var form = $(this).closest('form');
	var pc_node = form.find("select[id = pc]");
	var j_node = form.find("select[id = type_journey]");
	var pc = $(pc_node).val();
	var journey = $(j_node).val();
	if (journey == 0) {
		$(j_node).css('border','solid 2px #b94a48');
		$('html, body').animate({
	  	scrollTop: $(j_node).offset().top - 100
	  }, 1000);
	  call_toastr('Tipo de Viagem Inválido', '2');
	  e.preventDefault();
	}
	// lockSubmitButton(this);

	// Parte que olha se já existe - Call back hell não consegui resolver e estamos sem tempo, 
	// foi realizado uma validação dupla no back-end - Guilherme Gibosky
	//
	// else{
	// 	var pathname = window.location.pathname.split("/");
	// 	var qco_id = pathname[4];
	// 	$.ajax({
	// 		url:'/api/check-route-duplicate',
	// 		type: "POST",
	// 		data: {pc: pc, type: journey, qco_id: qco_id},
	// 		success: function(data){
	// 			if (data == 1) {
	// 				$(pc_node).css('border','solid 2px #b94a48');
	// 				$(j_node).css('border','solid 2px #b94a48');
	// 				$('html, body').animate({
	// 			  	scrollTop: $(pc_node).offset().top - 100
	// 			  }, 1000);
	// 				// form.find("textarea[id = name_route]").focus();
	// 			  call_toastr('Itinerário '+j_node[0].selectedOptions[0].innerHTML+' - '+pc_node[0].selectedOptions[0].innerHTML+' já existe.', '2');
	// 			}else{
	// 				$("#submit_new_route").unbind("submit").submit();
	// 			}
	// 		}
	// 	})
	// }

})

// $("#qh_upload").submit(function (e) {
// 	var fileInput = $(this);
// 	var input = fileInput.get(0);
// 	console.log(input);
// 	var reader = new FileReader();
// 	var textFile = input.files[0];
// 	reader.readAsText(textFile);
// 	var file = e.target.result, results;
// 	console.log(file);
// 	results = file.split("\n");
// 	// console.log($("#qco_file").val());
// 	// var teste = this.files;
// 	// console.log(teste);
//   // var formData = new FormData();
//   e.preventDefault();	// previne que seja submetido os dados
//   // console.log(formData);
// });
// });

$(document).on('click', '#edit_hour_btn', function(e){
	var check_new_empty = false;
		$("#new_schedule").find('.schedule_hour').each(function( index, aux ) {
			if ($(aux).val() == "") {
				e.preventDefault();
				$(aux).css('border-color','red');
				$(aux).popover({title: "Inválido", content: "Campo Vazio", trigger: "hover"});
			}else{
				$(aux).css('border-color','green').popover("destroy");
				check_new_empty = false;
				$("#edit_hour_btn").html('Aguarde, enviando...');
				$("#edit_hour_btn").prop('disabled', true);
				this.form.submit();
			}
		});
		if (check_new_empty == true)
			e.preventDefault();
});

$(document).on('click', '#remove_day', function(e){
	var id = this.value;
	if ($("#justify_"+id).val() != "") {
		if (check_empty_schedule_hour(id) == false){
			$("#edit_hour[value='"+id+"']").remove();
			$("#remove_day_hidden_"+id).after('<button class="btn btn-danger" disabled>Enviando, aguarde...</button>');
			$("#remove_day_hidden_"+id).after('<button class="btn btn-primary" disabled>Salvar</button>');
			$(this).hide();
			$("#edit_hour_hidden_"+id).remove();
		}
	}
});

$(document).on('click', '#edit_fleet', function(e){
	// e.preventDefault();
	var id = this.value;
	$(this).hide();
	$("#remove_qco_fleet[value='"+id+"']").remove();
	$("#remove_qco_fleet_hidden_"+id).after('<button class="btn btn-danger" disabled>Enviando, aguarde...</button>');
	$("#remove_qco_fleet_hidden_"+id).after('<button class="btn btn-primary" disabled>Salvar</button>');
	$("#remove_qco_fleet_hidden_"+id).remove();
});

$(document).on('click', '#remove_qco_fleet', function(e){
	var id = this.value;
	$(this).hide();
	$("#remove_qco_fleet_hidden_"+id).after('<button class="btn btn-danger" disabled>Enviando, aguarde...</button>');
	$("#remove_qco_fleet_hidden_"+id).after('<button class="btn btn-primary" disabled>Salvar</button>');
	$("#edit_fleet[value='"+id+"']").remove();
	$("#edit_fleet_hidden_"+id).remove();
});

function check_empty_schedule_hour(qco){
	var hours = $('#qcoHour_'+qco).children().find('.schedule_hour');
	var check = false;
	$.each(hours, function(index,item) {
		if (item.value == null || item.value == "")
			check = true;
	});
	return check;
}

//Frota Empenhada deixar o usuario colocar um prazo de no maximo 15 dias na pesquisa. Lucas Naves
$('#dateFim').change(function(){
	var dateIni = $("#dateIni").val();
	var dataFim = $("#dateFim").val();
	var newDataFim = new Date(dataFim);
  var newDataIni = new Date(dateIni);
	var add = newDataIni;
	add.setDate(add.getDate()+15);
	console.log(newDataFim);
	if (newDataFim > add) {
		$('#submitFrotaEmp').prop('disabled', true);
		call_toastr('Prazo selecionado é invalido. Máximo de 15 dias', '2');
	  e.preventDefault();
	}else{
		$('#submitFrotaEmp').prop('disabled', false);
	}
});


// Função para o cadastro de impostos por comercial e convencional no financeiro - Lucas Naves
$('#vehicle_tipo').change(function(){
    console.log($('#vehicle_tipo').val());
    if ($('#vehicle_tipo').val() != 3 || $('#vehicle_tipo').val() != 4) {
      $('#comercial').prop('hidden', false);
    }else{
      $('#comercial').prop('hidden', true); 
      $('#convencional').prop('hidden', false);
      
    }
    if ($('#vehicle_tipo').val() == 3 || $('#vehicle_tipo').val() == 4) {
    	$('#comercial').prop('hidden', true);
      $('#convencional').prop('hidden', false);
    }else{
      $('#convencional').prop('hidden', true); 
    }
    if ($('#vehicle_tipo').val() == 0) {
    	$('#comercial').prop('hidden', true);
    	$('#convencional').prop('hidden', true);
    }
});

$('#comercial').keyup(function(){
    if($('#ipva').val() != "" & $('#licenciamento').val() != "" & $('#dpvat').val() != "" ) 
    {
        $('#submit_impostos').prop('disabled', false);
    }else if($('#ipva').val() == "" & $('#licenciamento').val() == "" & $('#dpvat').val() == "" ) {
        $('#submit_impostos').prop('disabled', true);
    }else{
        $('#submit_impostos').prop('disabled', true);
    }
  })
$('#convencional').keyup(function(){
    if($('#ipva_conv').val() != "") 
    {
        $('#submit_impostos2').prop('disabled', false);
    }else if($('#ipva_conv').val() == "") {
        $('#submit_impostos2').prop('disabled', true);
    }else{
        $('#submit_impostos2').prop('disabled', true);
    }
  })

// Generic function for call a toastr.
// Param: Date - Initial and Final to be compared 
// Author: Ivan Araújo
// Date: 24/05/2018
$('#data_fim').change(function(){
	var dateIni = $("#data_ini").val();
	var dataFim = $("#data_fim").val();
	var newDataFim = new Date(dataFim);
  var newDataIni = new Date(dateIni);
	var add = newDataIni;
	add.setDate(add.getDate()+31);
	console.log(newDataFim);
	if (newDataFim > add) {
		$('#btnTimeTravel').prop('disabled', true);
		$('#btnTimeTravelxls').prop('disabled', true);
		call_toastr('Prazo selecionado é invalido. Máximo de 31 dias', '2');
	  e.preventDefault();
	}else{
		$('#btnTimeTravel').prop('disabled', false);
		$('#btnTimeTravelxls').prop('disabled', false);
	}
});
//Fim
//Funções para alterar os valores dos cargos de acordo com o selecionado. financeiro. Lucas 

//Diretoria
$('#directorId').change(function(){
	var opt_id = $('#directorId').val();
	if(opt_id != "") {
		$('#director').slideDown('hidden', false);
		$(".dir_table_salary").hide();
	}else{
		$('#director').slideUp('slow');
		// $('#director_pay').val("");
	}
	$('#desp_fix_dir_'+opt_id).show();
	$.getJSON('/rate-calculation/get-director-id/year/'+$('#hidden_year').val()+'/id/'+this.value, { }, function(data){
		if (data.length == 0) {
			var limit = $('#director').children().length - 1;//tira a div do botão (provisorio)
			for (var i = 0; i <= limit; i++) {
				$('#director_'+i).val(0);
				$('#director_pay_'+item.rank_id).val(0);
			}
		}else{
			$.each(data, function(index,item) {
				$('#director_'+item.rank_id).val(item.val);
				$('#director_pay_'+item.rank_id).val(item.pay_val);
			});
		}
	});
});

// Cargo adm
$('#adminId').change(function(){
	if($('#adminId').val() != "") {
		$('#admin').slideDown('hidden', false);
	}else{
		$('#admin').slideUp('slow');
		$('#adm_pay').val("");
	}
	$.getJSON('/rate-calculation/get-adm-id/year/'+$('#hidden_year').val()+'/id/'+this.value, { }, function(data){
		if (data.length == 0) {
			var limit = $('#adminId').children().length - 1;//tira a div do botão (provisorio)
			for (var i = 0; i <= limit; i++) {
				$('#adm_'+i).val(0);
			}
			$('#adm_pay').val(0);
		}else{
			$.each(data, function(index,item) {
				$('#adm_'+item.rank_id).val(item.val);
			});
			$('#adm_pay').val(data[0].pay_val);
		}
	});
});

// cargo maintenance
$('#mainteId').change(function(){
	if($('#mainteId').val() != "") {
		$('#mainte').slideDown('hidden', false);
	}else{
		$('#mainte').slideUp('slow');
		$('#mainte_pay').val("");
	}
	$.getJSON('/rate-calculation/get-mainte-id/year/'+$('#hidden_year').val()+'/id/'+this.value, { }, function(data){
		var limit = $('#mainteId').children().length - 1;//tira a div do botão (provisorio)
		if (data.length == 0 || data.length < limit) {
			for (var i = data.length - limit; i < limit; i++) {
				$('#mainte_'+i).val(0);
				$('#mainte_pay_'+i).val(0);
			}
			$('#mainte_pay').val(0);
		}
		$.each(data, function(index,item) {
			$('#mainte_'+item.rank_id).val(item.val);
		});
		$('#mainte_pay').val(data[0].pay_val);
	});
});

$('#outsouId').change(function(){
	if ($('#outsouId').val() != "") {
			$('#outsou').slideDown('hidden', false);
		}else{
			$('#outsou').slideUp('slow');
			$('#outsou_pay').val("");
		}
	$.getJSON('/rate-calculation/get-outsou-id/year/'+$('#hidden_year').val()+'/id/'+this.value, { }, function(data){
		if (data.length == 0) {
			var limit = $('#outsouId').children().length - 1;//tira a div do botão (provisorio)
			for (var i = 1; i <= limit; i++) {
				$('#outsou_'+i).val(0);
			}
			$('#outsou_pay').val(0);
		}else{
			$.each(data, function(index,item) {
				$('#outsou_'+item.rank_id).val(item.val);
			});
			$('#outsou_pay').val(data[0].pay_val);
		}
	});
});

$('#generalCostId').change(function(){
		if ($('#generalCostId').val() != "") {
			$('#generalCost').slideDown('hidden', false);
		}else{
			$('#generalCost').slideUp('slow');
		}

	$.getJSON('/rate-calculation/get-generalcost-id/year/'+$('#hidden_year').val()+'/id/'+this.value, { }, function(data){
		if (data.length == 0) {
				$('#cost').val("0.00");
		}
		$.each(data, function(index,item) {
			$('#cost').val(item.val);
		});
	});
});

$('#taxId').change(function(){
		if ($('#taxId').val() != "") {
			$('#formtax').slideDown('hidden', false);
		}else{
			$('#formtax').slideUp('slow');
		}
	$.getJSON('/rate-calculation/get-tax-id/year/'+$('#hidden_year').val()+'/id/'+this.value, { }, function(data){
		console.log(data.length);
		if (data.length == 0) {
				$('#taxVal').val("0.00");
		}
		$.each(data, function(index,item) {
			$('#taxVal').val(item.val);
		});
	});
});

//Fim

// Function that lock the date of a input date, where max is the current year and
// min is the max minus 1 year.
// Gibosky - 26/06/2018


$(".calculate_rate_btn").on("click", function(e){
	$(".s_c_trigger").remove();
	var year_id = $(this).prop("name").split("_");
	var today_year = moment().format("YYYY");
	$("#rate_calculation_sub").val(year_id[0]);
	// $("#rate_calculation_sub").html("Calcular");
	if ( parseInt(year_id[1]) > parseInt(today_year) ) {
		var end_date = moment((year_id[1]- 1)+'-10-30',"YYYY-MM-DD");
		var ini_date = moment(end_date).subtract(1, 'y'); // clone and then subtract
	}else{ 
		// os dados daquele ano já foram consolidados, assim pode pegar o ano todo
		var end_date = moment((year_id[1]),"YYYY-MM-DD").endOf("year");
		var ini_date = moment(end_date).subtract(1,'year').startOf("year"); // clone and then subtract
	}
	$("#data_ini_calc").prop("min", ini_date.format("YYYY-MM-DD")).prop("max", end_date.format("YYYY-MM-DD"));
	$("#data_fim_calc").prop("min", ini_date.format("YYYY-MM-DD")).prop("max", end_date.format("YYYY-MM-DD"));
})


$(".data_ini_calc").on("change", function(e){
	var ini = moment($(this).val(),"YYYY-MM-DD");
	$("#data_fim_calc").prop("min", ini.format("YYYY-MM-DD"));
})

// TODO: Do the same for peak times of morning and afternoon
$(".data_fim_calc").on("change", function(e){
	var ini = moment($("#data_ini_calc").val(),"YYYY-MM-DD");
	var end = moment($(this).val(),"YYYY-MM-DD");
	if (end.isAfter(ini)) {
		// $("#rate_calculation_sub").prop("disabled", false);
		$(this).css('border-color','green');
	}else{
		// $("#rate_calculation_sub").prop("disabled", true);
		$(this).css('border-color','red');
		$(this).popover({title: "Inválido", content: "Fim anterior ao inicio", 
			trigger: "hover"});
	}
})

$("#pico_manha_ini").on("change", function(e){
	var ini = moment($(this).val(),"HH:mm");
	$("#pico_manha_fim").prop("min", ini.format("HH:mm"));
})

$("#pico_tarde_ini").on("change", function(e){
	var ini = moment($(this).val(),"HH:mm");
	$("#pico_tarde_fim").prop("min", ini.format("HH:mm"));
})

$('#vu').change(function(){
	console.log(this.value);
	$('#age').val("");
	$.getJSON('/api/get-faixa/range/'+this.value, { }, function(data){
		if (data.length == 0) {
			$('#age').append("<option value=''>Não contem faixa para essa vida util</option>"); 
		}else{
			$('#age').append("<option value=''> -- Selecione uma faixa -- </option>");
		}
		$.each(data, function(index,item){
			console.log(item.range);
				$('#age').append("<option value=" + item.id + ">" + item.range + "</option>");
		});
	});
});

$(document).on("change", ".pattern_v_select", function(e){
	var value = this.value;
	var id_name = this.id.split("_");
	id_name = id_name[id_name.length-1];
	var tds = $("#t_"+id_name).find("tr#" + value).children("td");
	if (tds.length > 1) { // where it not exists
		$("#consumption_"+id_name).val( convertValueFloat(tds[2].innerText) );
		$("#price_"+id_name).val( convertValueFloat(tds[1].innerText) );
		if (id_name == "s10") { // achar o botão do S10 pra mudar, não pode ser por id
			$("#submit_fuel").val("Atualizar");
		}else if (id_name == "parts") {
			$("#submit_acessories_"+id_name).val("Atualizar");
		}else{
			$("#submit_"+id_name).val("Atualizar");
		}
	}else{
		$("#consumption_"+id_name).val("");
		$("#price_"+id_name).val("");
		if (id_name == "s10") { // achar o botão do S10 pra mudar, não pode ser por id
			$("#submit_"+id_name).val("Salvar");
		}else if (id_name == "parts") {
			$("#submit_acessories_"+id_name).val("Salvar");
		}else{
			$("#submit_"+id_name).val("Salvar");
		}
	}
})

// split and join method to manipulate string to float
function convertValueFloat(s){
	s = s.split(",");
	var aux2 = s[0].split(".");
	var aux = "";
	for (var i = 0; i < aux2.length; i++) { // string not number !!!!
		aux += aux2[i];
	}
	aux += "."+s[1];
	return aux;
}

$('#simulation_selection').on('show', function () {
	$(this).find('.modal-body').css({
    width:'auto', //probably not needed
    height:'auto', //probably not needed 
    'max-height':'100%'
	});
});

$(document).on("click", "#simulation_bt", function(){
	var year_id = $("#rate_calculation_sub").val();
	var tb = $("#table_simulation");
	var tbody = tb.find("tbody");
	var tr = $(tbody).children("tr");
	// clean table
	$.each(tr, function(index,item){
		$(item).remove();
	})
	//fetch data
	$.ajax({
		type: "POST",
		url: "/api/get-simulations",
		data: {year_id : year_id},
		dataType:"json"
	}).done(function (data){
		$.each(data, function(index, item){
			var button = "<td><a href='/rate-calculation/edit-variable/id/"+item.id+"' class='btn btn-default btn-sm help' ";
			if (item.consolidate_date != null) {
				var struct = "<tr class='s_c_trigger' data-toggle='popover' data-placement='left' title='Data Consolidado' data-content='"+moment(item.consolidate_date).format("DD/MM/YYYY - kk:mm:ss")+"' data-trigger='hover' ";
				struct = struct + "style = 'background-color:#cccc00' ";
			}else{
				var struct = "<tr class='s_c_trigger'";
			}
			struct = struct +
					" > <td id='tag_id'>"+item.id+"</td>"+
					"<td>"+item.pessoa+"</td>"+
					"<td>"+moment(item.insert_date).format("DD/MM/YYYY - kk:mm:ss")+"</td>";
			
			if (item.consolidate_date == null) {
				struct = struct + button;
			}else{
				struct = struct + "<td></td>";
			}
			struct = struct +
					"title='Visualizar' target='_blank'>"+"<i class='fa fa-eye'></i></a></td>"+
					"</tr>";
			$(tbody).append(struct);
		})
	})
})

$(document).on("click", ".s_c_trigger", function(){
	var tr_selected = $("#table_simulation_selected").find("tbody").children("tr");
	if (tr_selected.length > 0) {
		$(tr_selected).remove();
	}
	var tr_copy = $(this).clone();
	$("#table_simulation_selected").find("tbody").append(tr_copy);
	$("#simulation_id_form").val($("#tag_id").html());
	closeModal($(this).closest("div.modal").attr("id"));
	$("#rate_calculation_sub").prop("disabled", false);
})

$(document).on("click", "#close_simulation_bt", function(){
	closeModal($(this).closest("div.modal").attr("id"));
})

$(document).on("click", "#close_modal_simulation", function(){
	closeModal($(this).closest("div.modal").attr("id"));
})

function closeModal(modal_id){
	$("#"+modal_id).modal('toggle');
}

$(document).on("change", "#type_id", function(){
	if (this.value == 2) {
		$("#cobrador").val("0");
		$("#cobrador").prop("disabled",true);
		$("#cobrador").hide("slow");
		console.log($("#cobrador").closest("div.form-group"))
		$("#cobrador").closest("div.form-group").hide("slow")
	}else{
		$("#cobrador").show("slow");
		$("#cobrador").val("");
		$("#cobrador").prop("disabled",false);
		$("#cobrador").closest("div.form-group").show("slow")
	}
})


$(document).on("click", ".calculate_rate_pdf_btn", function(){
	var aux = $(this).closest("tr").children("td")[0];
	aux = $(aux).children("a").attr("href").split("/");
	var year_id = aux[aux.length-1];
	console.log(aux);
	console.log(year_id);
	// console.log($(year_id).children("a").attr("href"));
	// console.log(year_id[0].children[0]);
	var tb = $("#table_document");
	var tbody = tb.find("tbody");
	var tr = $(tbody).children("tr");
	// clean table
	$.each(tr, function(index,item){
		$(item).remove();
	})
	//fetch data
	$.ajax({
		type: "POST",
		url: "/api/get-rate-pdf",
		data: {year_id : year_id},
		dataType:"json"
	}).done(function (data){
		$.each(data, function(index, item){
			if (item.type == 0) {
				var tipo = "Relatório";
				var path = "tarifa";
			}else{
				var tipo = "Metodológia";
				var path = "method";
			}
			$(tbody).append(
					"<tr>"+
						"<td id='tag_id'>"+item.pdf_name+"</td>"+
						"<td>"+moment(item.date).format("DD/MM/YYYY - kk:mm:ss")+"</td>"+
						"<td><a href='\\upload\\"+path+"\\"+item.pdf_name+".pdf' title='Visualizar' class='btn btn-default btn-sm help' target='_blank'>"+"<i class='fa fa-file-pdf-o' style='background-color:White; color:Red'></i></a></td>"+
					"<td>"+tipo+"</td></tr>");
		})
	})
})

$(document).on("change", "#year_km", function(){
		var year_id = $(this).val();
		if (year_id == 0) {
			$("#submit_quilometria").prop("disabled", true);
			$.each($(".km_input"),function(i, v){
				$(v).val("");
			})
		}else{
			$("#submit_quilometria").prop("disabled", false);
			$.ajax({
			type: "POST",
			url: "/api/get-production-km",
			data: {year_id : year_id},
			dataType:"json"
		}).done(function (data){
			if (data != null) {
				$.each(data,function(i, v){
					$(".km_input[name="+i+"]").val(v);
				})
			}else{
				$.each($(".km_input"),function(i, v){
					$(v).val("");
				})
			}
		})
		}
})

$(document).on("change", "#year_pass", function(){
		var year_id = $(this).val();
		if (year_id == 0) {
			$("#submit_pass").prop("disabled", true);
			$.each($(".pass_input"),function(i, v){
				$(v).val("");
			})
		}else{
			$("#submit_pass").prop("disabled", false);
			$.ajax({
			type: "POST",
			url: "/api/get-production-pass",
			data: {year_id : year_id},
			dataType:"json"
		}).done(function (data){
			if (data != null) {
				$.each(data,function(i, v){
					$(".pass_input[name="+i+"]").val(v);
				})
			}else{
				$.each($(".pass_input"),function(i, v){
					$(v).val("");
				})
			}
		})
	}
})


$(document).on("change",".pq_input_rate", function(i){
	if ($(this).val() == "production") {
		$("#pq_correction_div").show("slow");
		$("#correction_pq").prop("disabled", false);
		$("#correction_pq").prop("required", true);
	}else{
		$("#pq_correction_div").hide("slow");
		$("#correction_pq").prop("disabled", true);
	}
})