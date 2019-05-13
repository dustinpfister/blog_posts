// open the current file
Menu.Open();
Menu.List();

get('text_open').addEventListener('click', function (e) {
    Menu.Open({
        fn: get('text_fn').value,
        dir: get('text_dir').value
    });
});

get('text_save').addEventListener('click', function (e) {
    Menu.Save({
        fn: get('text_fn').value
    });
});

get('text_list').addEventListener('click', function (e) {
    Menu.List({
        dir: get('text_dir').value
    });
});
