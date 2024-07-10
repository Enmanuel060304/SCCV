

$(document).ready(function () {
    activarMenu("Reportes");

    //OBTENER TIENDAS
    jQuery.ajax({
        url: $.MisUrls.url._ObtenerTiendas,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            $("#cboTienda").LoadingOverlay("hide");
            $("#cboTienda").html("");

            $("<option>").attr({ "value": 0 }).text("-- Seleccionar todas--").appendTo("#cboTienda");
            if (data.data != null)
                $.each(data.data, function (i, item) {

                    if (item.Activo == true) {
                        $("<option>").attr({ "value": item.IdTienda }).text(item.Nombre).appendTo("#cboTienda");
                    }
                })
        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {
            $("#cboTienda").LoadingOverlay("show");
        },
    });

})


$('#btnBuscar').on('click', function () {

    jQuery.ajax({
        url: $.MisUrls.url._ObtenerReporteProducto + "?idtienda=" + $("#cboTienda").val() + "&codigoproducto=" + $("#txtCodigoProducto").val(),
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data != undefined && data != null) {
                
                $("#tbReporte tbody").html("");

                
                $.each(data, function (i, row) {

                    $("<tr>").append(
                        $("<td>").text(row["RucTienda"]),
                        $("<td>").text(row["NombreTienda"]),
                        $("<td>").text(row["DireccionTienda"]),
                        $("<td>").text(row["CodigoProducto"]),
                        $("<td>").text(row["NombreProducto"]),
                        $("<td>").text(row["DescripcionProducto"]),
                        $("<td>").text(row["StockenTienda"]),
                        $("<td>").text(row["PrecioCompra"]),
                        $("<td>").text(row["PrecioVenta"])

                    ).appendTo("#tbReporte tbody");

                })

            }
            
        },
        error: function (error) {
            console.log(error)
        },
        beforeSend: function () {
        },
    });

})

function printData() {

    if ($('#tbReporte tbody tr').length == 0) {
        swal("Mensaje", "No existen datos para imprimir", "warning")
        return;
    }

    var divToPrint = document.getElementById("tbReporte");

    var style = "<style>";
    style = style + "body {font-family: Arial, Helvetica, sans-serif;}";
    style = style + "h3 {text-align: center; color: #333;}";
    style = style + "table {width: 100%; border-collapse: collapse; margin: 0 auto;}";
    style = style + "th, td {border: 1px solid #ddd; padding: 8px;}";
    style = style + "th {padding-top: 12px; padding-bottom: 12px; text-align: center; background-color: #4CAF50; color: white;}";
    style = style + "</style>";

    newWin = window.open("");


    newWin.document.write(style);
    newWin.document.write("<h3>Reporte de productos por tienda</h3>");
    newWin.document.write("<br>");
    
    
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
    
    /*
    * imprimir en excell
    *  if ($('#tbReporte tbody tr').length == 0) {
        swal("Mensaje", "No existen datos para exportar", "warning")
        return;
    }

    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "Reporte de productos por tienda",
        Subject: "Reporte",
        Author: "VentasWeb",
        CreatedDate: new Date()
    };
    wb.SheetNames.push("Reporte");

    var ws_data = [['ID Tienda', 'Nombre Tienda', 'Direccion Tienda', 'Codigo Producto', 'Nombre Producto', 'Descripcion Producto', 'Stock en tienda', 'Precio Compra', 'Precio Venta']];  //aqui van los titulos de las columnas

    $('#tbReporte tbody tr').each(function() {
        var rowData = [];
        $(this).find('td').each(function() {
            rowData.push(" " + $(this).text() + " ");
        });
        ws_data.push(rowData);
    });

    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Reporte"] = ws;
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'reporte.xlsx');
*/
}