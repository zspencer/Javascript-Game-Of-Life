require({
    baseUrl: "js/",
    waitSeconds: 0
}, ['GameOfLife','views/ControlPanel'], function(Game, ControlPanel){
    require.ready(function(){
        var game = Game.create('#gameBoard',100,100);
        game.start();
		var controlPanel = ControlPanel.create(game);
		controlPanel.bindEvents();
		
    });
});
