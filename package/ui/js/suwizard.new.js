require([
    "dojo/text!./js/user.json",
    "dojox/mvc/at",
    "dojox/mvc/getStateful",
    "dijit/registry",
    "aps/load",
    "aps/ready!"
], function (newUser, at, getStateful, registry, load) {

    var user = getStateful(JSON.parse(newUser));

    // information about service user is available in aps.context.param
    user.set("username", aps.context.params.user.login);

    var widgets =
        ["aps/PageContainer", [
            ["aps/Output", {
                id: "description",
                value: "Here you can create a user in MyWeatherDemo."
            }],
            ["aps/FieldSet", {title: true}, [
                ["aps/Output", {id: "username", label: "Username", value: at(user, "username")}],
                ["aps/Password", {id: "password", label: "Password", value: at(user, "password"), required: true}],
                ["aps/TextBox", {id: "city", label: "City", value: at(user, "city"), required: true}],
                ["aps/TextBox", {id: "country", label: "Country", value: at(user, "country"), required: true}],
                ["aps/Select", {
                    id: "units",
                    title: "System of measurement",
                    value: at(user, "units"),
                    options: [
                        { label: "Fahrenheit", value: "fahrenheit"},
                        { label: "Celsius", value: "celsius", selected: true}
                    ]
                }],
                ["aps/CheckBox", {id: "include_humidity", label: "Do you want to see humidity?", checked: at(user, "include_humidity")}]
            ]]
        ]];
    load(widgets);

    aps.app.onNext = function() {
        var page = registry.byId("apsPageContainer");
            if (!page.validate()) {
                aps.apsc.cancelProcessing();
                return;
            }
        // we need to pass the model constructed from widgets + name of the link to service user defined in user.php as userAttr
        aps.apsc.next({ objects: [(user)], userAttr: "service_user" });
    };
});