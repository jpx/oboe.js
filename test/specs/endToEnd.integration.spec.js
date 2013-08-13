
describe("end to end integration test of while library", function(){

   it('GetsJsonPathCallbacksBeforeRequestFinishes',  function() {
       
      var asserter = givenAnOboeInstance('/static/json/firstTenNaturalNumbers.json')
         .andWeAreListeningForNodes('![*]');         
      
      waitsFor( asserter.toComplete(), 'the request to complete', ASYNC_TEST_TIMEOUT);

      runs(function(){
               
         asserter.thenTheInstance(
             matched(0).atPath([0])
         ,   matched(1).atPath([1])
         ,   matched(2).atPath([2])
         ,   matched(3).atPath([3])
         ,   matched(4).atPath([4])
         ,   matched(5).atPath([5])
         ,   matched(6).atPath([6])
         ,   matched(7).atPath([7])
         ,   matched(8).atPath([8])
         ,   matched(9).atPath([9])
         );        
      });
   })
   
   xit('GetsJsonPathCallbacksBeforeRequestFinishesWhenStartedViaOboeFetch',  function( queue ) {
      // the above test uses oboe.parser().get(), whereas this one uses oboe.get()
      // otherwise they are the same.
   
      var asserter;

      queue.call("request the numbers json", function(jstdCallbacks){
      
         asserter = givenAnOboeInstanceGetting('/static/json/firstTenNaturalNumbers.json', syncingWith(jstdCallbacks))
            .andWeAreListeningForNodes('![*]');         
      });

      queue.call("should have gotten all the numbers", function( _queue ){
               
         asserter.thenTheInstance(
             matched(0).atPath([0])
         ,   matched(1).atPath([1])
         ,   matched(2).atPath([2])
         ,   matched(3).atPath([3])
         ,   matched(4).atPath([4])
         ,   matched(5).atPath([5])
         ,   matched(6).atPath([6])
         ,   matched(7).atPath([7])
         ,   matched(8).atPath([8])
         ,   matched(9).atPath([9])
         );         
      });
   })      
   
   xit('ProvidesFullJsonWhenRequestFinishes',  function( queue ) {
         
      queue.call("request the numbers json", function(jstdCallbacks){
               
         givenAnOboeInstance(
                       
            '/static/json/firstTenNaturalNumbers.json',
            syncingWith(jstdCallbacks),
            function ajaxFinished(wholeJsonFromOboe) {
                                 
               assertEquals([0,1,2,3,4,5,6,7,8,9], wholeJsonFromOboe);
            }
         );
      });         
   })
     
});  



