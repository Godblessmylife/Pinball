function CHelpPanel(){
    var _bExitPanel;
    
    var _oText1;
    var _oText2;

    var _oFade;
    var _oPanelContainer;
    var _oParent;

    var _pStartPanelPos;

    this._init = function(){
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 1;
        _oFade.on("mousedown",function(){_oParent._onExitHelp()});
        s_oStage.addChild(_oFade);
        
        new createjs.Tween.get(_oFade).to({alpha:0.7},500);
        
        _oPanelContainer = new createjs.Container();     
        _oPanelContainer.on("mousedown",function(){_oParent._onExitHelp()});
        s_oStage.addChild(_oPanelContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        var oPanel = createBitmap(oSprite);        
        oPanel.regX = oSprite.width/2;
        oPanel.regY = oSprite.height/2;
        _oPanelContainer.addChild(oPanel);
        
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = CANVAS_HEIGHT + oSprite.height/2;  
        _pStartPanelPos = {x: _oPanelContainer.x, y: _oPanelContainer.y};
        new createjs.Tween.get(_oPanelContainer).to({y:CANVAS_HEIGHT/2 - 40},500, createjs.Ease.cubicOut);

        if(s_bMobile){
            
            var oSprite = s_oSpriteLibrary.getSprite('flipper');
            var oRightFlipperSprite = createBitmap(oSprite);
            oRightFlipperSprite.x = 250;
            oRightFlipperSprite.y = -80;
            oRightFlipperSprite.regX = oSprite.width-7;
            oRightFlipperSprite.regY = 14;
            oRightFlipperSprite.scaleX = 0.5;
            oRightFlipperSprite.scaleY = 0.5;
            _oPanelContainer.addChild(oRightFlipperSprite);
            
            var oSprite = s_oSpriteLibrary.getSprite('flipper');
            var oLeftFlipperSprite = createBitmap(oSprite);
            oLeftFlipperSprite.x = -250;
            oLeftFlipperSprite.y = -80;
            oLeftFlipperSprite.regX = oSprite.width-7;
            oLeftFlipperSprite.regY = 14;
            oLeftFlipperSprite.scaleX = -0.5;
            oLeftFlipperSprite.scaleY = 0.5;
            _oPanelContainer.addChild(oLeftFlipperSprite);
            
            createjs.Tween.get(oLeftFlipperSprite, {loop:true}).to({rotation: -50}, 100, createjs.Ease.cubicIn).wait(Math.random()*500).to({rotation: 0}, 500, createjs.Ease.cubicIn);
            createjs.Tween.get(oRightFlipperSprite, {loop:true}).to({rotation: 50}, 100, createjs.Ease.cubicIn).wait(Math.random()*500).to({rotation: 0}, 500, createjs.Ease.cubicIn);
            
            var oText1Pos = {x: 0, y: -130};

            _oText1 = new createjs.Text(TEXT_HELP1_MOBILE," 20px "+PRIMARY_FONT, PRIMARY_FONT_COLOUR);
            _oText1.x = oText1Pos.x;
            _oText1.y = oText1Pos.y;
            _oText1.textAlign = "center";
            _oText1.textBaseline = "alphabetic";
            _oText1.lineWidth = 300;                
            _oPanelContainer.addChild(_oText1);

            
        }else {
            var oText1Pos = {x: -250, y: -130};


            _oText1 = new createjs.Text(TEXT_HELP1," 24px "+PRIMARY_FONT, PRIMARY_FONT_COLOUR);
            _oText1.x = oText1Pos.x;
            _oText1.y = oText1Pos.y;
            _oText1.textAlign = "left";
            _oText1.textBaseline = "alphabetic";
            _oText1.lineWidth = 300;                
            _oPanelContainer.addChild(_oText1);

            var oSprite = s_oSpriteLibrary.getSprite('keys');
            var oKeys = createBitmap(oSprite);
            oKeys.x = 130;
            oKeys.y = -100;
            oKeys.regX = oSprite.width/2;
            oKeys.regY = oSprite.height/2;
            _oPanelContainer.addChild(oKeys);
        }
        

        var oText2Pos = {x: 0, y:50};
  
        _oText2 = new createjs.Text(TEXT_HELP2," 24px "+PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        _oText2.x = oText2Pos.x;
        _oText2.y = oText2Pos.y;
        _oText2.textAlign = "center";
        _oText2.textBaseline = "alphabetic";
        _oText2.lineWidth = 400;        
        _oPanelContainer.addChild(_oText2);

        
        var oSprite = s_oSpriteLibrary.getSprite('star');
        var oStar = createBitmap(oSprite);
        oStar.regX = oSprite.width/2;
        oStar.regY = oSprite.height/2;
        oStar.y = 120;
        _oPanelContainer.addChild(oStar);
        
    };

    this.unload = function(){
        s_oStage.removeChild(_oFade);
        s_oStage.removeChild(_oPanelContainer);

        _oPanelContainer.off("mousedown",function(){_oParent._onExitHelp()});
        _oFade.off("mousedown",function(){_oParent._onExitHelp()});

    };

    this._onExitHelp = function(){
        if(_bExitPanel){
            return;
        }
        _bExitPanel = true;

        new createjs.Tween.get(_oFade).to({alpha:0},500);
        new createjs.Tween.get(_oPanelContainer).to({y:_pStartPanelPos.y},400, createjs.Ease.backIn).call(function(){

            _oParent.unload();
            s_oGame._onExitHelp();
        });
    };

    _oParent=this;
    this._init();

}
