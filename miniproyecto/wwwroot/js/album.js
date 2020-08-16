let jsonPhotos = "";
let jsonComments = "";

let datatable;


$.ajax({
    url: 'https://jsonplaceholder.typicode.com/albums',
    type: 'GET',
    success: function (albums) {
        let content = "";
        let n = albums.length;
        for (let i = 0; i < n; i++) {
            content += "<option value=" + albums[i].id + ">" + albums[i].title + "</option>";
        }
        document.getElementById("contentAlbum").innerHTML = content;

    }
});


function goToAlbum() {
    var albumId = $("#contentAlbum").val();

    jsonPhotos = "https://jsonplaceholder.typicode.com/photos?albumId=" + albumId;
    loadDataTable();
}



function loadDataTable() {
    datatable = $('#tblDatos').DataTable({ //DataTable es script que cargamos en _layout
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },
        "ajax": {
            "url": jsonPhotos,
            "dataSrc": ""

        },
        "columns": [
            { "data": "title", "width": "20%" },
            { "data": "url", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `

                    <div class="text-center">
                        <a id="commentsButtonId" class = "btn btn-success" onclick="getComments(${data})" style="cursor:pointer">
                            Ver comentarios
                        </a>
                    </div>                

                    `;
                }, "width": "20%"
            }
        ]
    });
}

function getComments(idC) {
    jsonComments = "https://jsonplaceholder.typicode.com/comments?postId=" + idC;

    $.ajax({
        url: jsonComments,
        type: 'GET',
        success: function (comments) {
            let contentComment = "";
            let n = comments.length;
            for (let i = 0; i < n; i++) {
                contentComment +="<div class='card card-white post'>"
                contentComment +="<div>"

                contentComment +="<div class='float-left meta'>"
                contentComment +="<div>"
                contentComment += "<strong>" + comments[i].email + "</strong>"
                contentComment +="</div>"
                contentComment +="</div>"
                contentComment +="</div>"
                contentComment +="<div>"
                contentComment += "<p>" + comments[i].body + "</p>"

                contentComment +="</div>"
                contentComment +="</div >"
            }
            document.getElementById("commentSection").innerHTML = contentComment;

        }
    });
}