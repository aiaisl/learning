var Nightmare = require('nightmare');
<<<<<<< HEAD
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
=======
var expect = require('chai').expect; // jshint ignore:line

describe('test yahoo search results', function() {
  this.timeout(30000);

  it('should find the nightmare github link first', function(done) {
    new Nightmare()
      .goto('http://yahoo.com')
        .type('input[title="Search"]', 'github nightmare')
        .click('.searchsubmit')
        .wait('.url.breadcrumb')
        .evaluate(function () {
          return document.querySelector('.url.breadcrumb').innerText;
        }, function (breadcrumb) {
          expect(breadcrumb).to.equal('github.com');
        })
        .run(done);
  });
>>>>>>> 356ff2f93527f8c4f2774fb91b7e9ee7f2d3b30a
});