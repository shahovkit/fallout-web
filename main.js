// $(document).keypress( e => {
//     if(e.which == 13 && $('textarea:focus').length > 0) {
//         e.preventDefault();
//         socket.emit('message', $('textarea:focus').val());
//         $('textarea:focus').html($('textarea:focus').val()+'\n');
//         $('textarea:focus').val(null);
//     }
// });
//
// var socket = io('http://'+IP);
//
//     socket.on('connect', ()=>{
//         console.log('connect')
//     });
//
//     socket.on('disconnect', (player)=>{
//         $('#'+player.name).remove();
//     });
//
//     socket.on('new_player', (obj)=>{
//         $( "body" ).append( '<div class="player" style="background: #'+obj.new_player.color+'; top:'+obj.new_player.coords.top+'px;left:'+obj.new_player.coords.left+'px;" id="'+obj.new_player.name+'"></div>' );
//         $.each( obj.players, function( index, player ){
//             if($('#'+player.name).length === 0){
//                 $( "body" ).append( '<div class="player" style="background: #'+player.color+'; top:'+player.coords.top+'px;left:'+player.coords.left+'px;" id="'+player.name+'"></div>' );
//             }
//
//         });
//
//     });
//
// socket.on('change_player', (player)=>{
//     $('#'+player.name).css({top:player.coords.top,left:player.coords.left});
// });
//
// let W=false,
//     A=false,
//     S=false,
//     D=false;
//
// $( window ).keydown(function( event ) {
//
//         switch (event.which) {
//             case 87://W
//                 event.preventDefault();
//                 if(!W){
//                     W=true;
//                     console.log(event.which+' keydown');
//                     socket.emit('keydown', event.which)
//                 }
//                 break;
//             case 68://D
//                 event.preventDefault();
//                 if(!D) {
//                     D = true;
//                     console.log(event.which + ' keydown');
//                     socket.emit('keydown', event.which)
//                 }
//                 break;
//             case 83://S
//                 event.preventDefault();
//                 if(!S) {
//                     S = true;
//                     console.log(event.which + ' keydown');
//                     socket.emit('keydown', event.which)
//                 }
//                 break;
//             case 65://A
//                 event.preventDefault();
//                 if(!A) {
//                     A = true;
//                     console.log(event.which + ' keydown');
//                     socket.emit('keydown', event.which)
//                 }
//                 break;
//         }
// });
//
// $( window ).keyup(function( event ) {
//     switch (event.which) {
//         case 87://W
//             event.preventDefault();
//             W=false;
//             console.log(event.which+' keyup');
//             socket.emit('keyup', event.which)
//             break;
//         case 68://D
//             event.preventDefault();
//             D = false;
//             console.log(event.which + ' keyup');
//             socket.emit('keyup', event.which)
//             break;
//         case 83://S
//             event.preventDefault();
//             S = false;
//             console.log(event.which + ' keyup');
//             socket.emit('keyup', event.which)
//             break;
//         case 65://A
//             event.preventDefault();
//             A = false;
//             console.log(event.which + ' keyup');
//             socket.emit('keyup', event.which)
//             break;
//     }
// });



