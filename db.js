db = {};

db.init = function(callback) {
    $.getJSON('db.json', function(data) {
        db.data = data;
        if(callback) {
            callback();
        }
    });
}
function initSelect() {
    var select = $('#slc-topicos');
    $.each(db.data, function(index, item) {
        select.append($('<option>', {
            value: item.id,
            text: item.titulo
        }));
    });
}
$(document).ready(function() {
    // Carregar o JSON e preencher o combobox
    $.getJSON('db.json', function(data) {
        $.each(data, function(index, item) {
            $('#slc-topicos').append($('<option>', {
                value: item.id,
                text: item.titulo
            }));
        });
    });

    // Evento de mudança no combobox
    $('#slc-topicos').change(function() {
        var selectedId = $(this).val();
        if (selectedId !== '') {
            // Buscar dados no JSON com base no ID selecionado
            $.getJSON('db.json', function(data) {
                var selectedItem = data.find(function(item) {
                    return item.id == selectedId;
                });
                if (selectedItem) {
                    // Exibir descrição no campo de texto
                    $('#displayText').val(selectedItem.descricao);
                }
            });
        } else {
            // Limpar campo de texto se nenhuma opção for selecionada
            $('#displayText').val('');
        }
    });
});

    db.init(initSelect);
