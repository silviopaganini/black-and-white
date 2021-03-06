export function ajax(data) {

    /*
    data = {
        url : url,
        method : "POST" || "GET",
        data: query,
        done : function(){},
        fail : function(){}
    }
    */

    let X = function(){
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();  
        }
        let versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",   
            "MSXML2.XmlHttp.4.0",  
            "MSXML2.XmlHttp.3.0",   
            "MSXML2.XmlHttp.2.0",  
            "Microsoft.XmlHttp"
        ];

        let xhr;
        for(let i = 0; i < versions.length; i++) {  
            try {  
                xhr = new ActiveXObject(versions[i]);  
                break;  
            } catch (e) {
            }  
        }
        return xhr;
    }

    let xhr = X();
    let method = data.method || "GET";
    method = method.toUpperCase();

    let send = function(url, method, data, done, fail){
        console.log(url)
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE ) {
                if(xhr.status == 200){
                    done(xhr.responseText);
                }
                else if(xhr.status == 400) {
                    fail ? fail('There was an error 400') : console.warn('There was an error 400')
                }
                else {
                    fail ? fail('something else other than 200 was returned') : console.warn("something else other than 200 was returned");
                }
            }
        }

        xhr.open(method, url, true);

        if (method != "GET") {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        
        xhr.send(data);
    }

    let query = [];
    for (let key in data.data) query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data.data[key]));

    switch(method)
    {
        case "GET":
            send(data.url, method, (query.length ? '?' + query.join('&') : ''), data.done, data.fail)
            break;

        default:
            send(data.url, method, query.join('&'), data.done, data.fail)
            break;
    }
}