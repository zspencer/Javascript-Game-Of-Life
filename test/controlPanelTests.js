require.def(['views/ControlPanel', 'GameOfLife'], function(ControlPanel, GameOfLife){
    module("ControlPanel create");
    
    test("returns a control panel.", function(){
        var cp = ControlPanel.create();
        ok(cp, "Control Panel exists");
    });
    test('has a handlePauseEvent', function(){
        var game = GameOfLife.create('#asdf');
        var cp = ControlPanel.create(game);
        ok(cp.handlePauseEvent, "there is something that can handle a click event");
    });
    
    module('ControlPanel handlePauseEvent');
    test('calls game.pause', function(){
        var game = GameOfLife.create('#asdf');
        game.pause = function(){
            ok(true);
        }
        var cp = ControlPanel.create(game);
        expect(1);
        cp.handlePauseEvent();
    });
    module('ControlPanel handleResumeEvent');
    test('calls game.run', function(){
        var game = GameOfLife.create('#asdf');
        game.run = function(){
            ok(true);
        }
        var cp = ControlPanel.create(game);
        expect(1);
        cp.handleResumeEvent();
    });
    module('ControlPanel handleRestartEvent');
    test('restarts the game world', function(){
        var game = GameOfLife.create('#asdf');
        game.start = function(){
            ok(true);
        }
        var cp = ControlPanel.create(game);
        expect(1);
        cp.handleRestartEvent();
    });
    module('Control Panel bindEvents');
    test('binds an event to the pause button', function(){
    
        var cp = ControlPanel.create();
        cp.handlePauseEvent = function(){
            ok(true);
        }
        cp.bindEvents();
        expect(1);
        jQuery('#pause').click();
        unbindEvents();
        
    });
    test('binds an event to the resume button', function(){
        var cp = ControlPanel.create();
        cp.handleResumeEvent = function(){
            ok(true);
        }
        cp.bindEvents();
        expect(1);
        jQuery('#resume').click();
        unbindEvents();
    });
    test('binds an event to the restart button', function() {
        var cp = ControlPanel.create();
        cp.handleRestartEvent = function(){
            ok(true);
        }
        cp.bindEvents();
        expect(1);
        jQuery('#restart').click();
        unbindEvents();
    });
    function unbindEvents(){
        jQuery('#pause').unbind();
        jQuery('#restart').unbind();
        jQuery('#resume').unbind();
    }
    
});
