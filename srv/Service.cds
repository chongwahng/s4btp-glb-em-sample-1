service MsgService @(path : '/api') {
    function publish(topic : String, message : String) returns String;
}

annotate MsgService with @(requires : 'authenticated-user');
