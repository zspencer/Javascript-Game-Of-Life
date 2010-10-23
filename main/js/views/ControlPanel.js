require.def(function(){
    var ControlPanel = function(){
    }
    var prototype = {
        bindEvents: function(){
            var self = this;
            jQuery('#pause').click(function(){
                self.handlePauseEvent();
            });
            jQuery('#resume').click(function(){
                self.handleResumeEvent();
            });
        },
        handlePauseEvent: function(){
            this.game.pause();
        },
        handleResumeEvent: function(){
            this.game.run();
        },
        handleRestartEvent: function(){
            this.game.restart();
        }
    };
    ControlPanel.prototype = prototype;
    return {
        create: function(game){
            var controlPanel = new ControlPanel();
            controlPanel.game = game;
            return controlPanel;
        }
    }
});
