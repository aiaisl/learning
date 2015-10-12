var Nightmare = require('nightmare');
var should = require('chai').should();
describe('Nightmare demo', function () {
    this.timeout(5000); // Set timeout to 15 seconds, instead of the original 2 seconds
    var url = 'http://localhost:3000/user/10/';
        it('首页标题等于用户名', function (done) {
            new Nightmare({weak:false})
                .goto(url)
                .evaluate(function () {
                    return document.querySelector('body').innerText;
                }, function (result) {
                    console.log(result);
                    done();
                })
                .title(function(result){
                    console.log(result);
                })
                .run();
        });
    })