require.def(['GameOfLife'], function(Game){
    test('run tick 1000 times on a 100 by 100 grid', function(){
        var game = Game.create('#asdf');
        game.settings.height = 100;
        game.settings.width = 100;
        game.world.randomize();
        var startTime = new Date;
        for (var x = 0; x < 1000; x++) {
            game.tick();
        }
        var endTime = new Date;
        var duration = endTime - startTime;
        ok(duration < 1000 * 10, duration + 'ms');
    });
    test('run tick 1000 times on a 100 by 100 grid without rendering it', function(){
        var game = Game.create('#asdf');
        game.settings.height = 100;
        game.settings.width = 100;
        game.world.randomize();
        var startTime = new Date;
        
        game.view = {
            render: jQuery.noop
        };
        for (var x = 0; x < 1000; x++) {
            game.tick();
        }
        var endTime = new Date;
        var duration = endTime - startTime;
        ok(duration < 1000 * 10, duration + 'ms');
    });
});
