module.exports = function(app) {
    
    app.route("/").get(function(req, res) {
        console.log(req.rawHeaders);
        var obj = new Object();
        obj.ipaddress = req.headers["x-forwarded-for"];
        var langs = req.headers["accept-language"];
        var langArr = langs.split(",");
        obj.language = langArr[0];
        
        var soft = req.headers["user-agent"];
        var indexOfMoz = soft.indexOf("Mozilla");
        var indexFirstPar = indexOfMoz;
        for(var i=indexOfMoz; i<soft.length; i++) {
            if(soft[i]=='(') {
                indexFirstPar = i;
                break;
            }
        }
        var software = "";
        for(var i=indexFirstPar+1 ; i<soft.length;i++) {
            if(soft[i]==')') {
                break;
            }
            software = software + soft[i];
            
        }
        obj.software = software;
        res.send(JSON.stringify(obj));
       //res.sendFile(process.cwd() + "/public/index.html");
    });
};