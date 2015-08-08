var path = require('path');
var Nightmare = require('nightmare');
var should = require('chai').should();
describe('Nightmare demo', function () {
    this.timeout(15000); // Set timeout to 15 seconds, instead of the original 2 seconds
    var url = 'http://localhost:8080/Learning-jQuery/chapter10/';
        it('首页标题等于用户名', function (done) {
            new Nightmare({weak:false})
                .on('alert', function(msg){
                    console.log(msg);
                    done();
                })
                .goto(url)
                .evaluate(function () {
                    return $('h1').text();
                }, function (result) {
                    result.should.equal("Photo Gallery");
                })
                .title(function(result){
                    console.log(result);
                })
                .run();
        });
});