// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        Ship: cc.Node,
        CargoUI: cc.Node,
        OreCargoPrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    start () {

    },

    // update (dt) {},

    onTouchStart: function(event){
        var touch = event.getLocation();
        var touchInMap = this.node.getChildByName("Map").convertToNodeSpaceAR(touch);
        var shipPosition = this.Ship.position;
        console.log("Touch in Map:" + touchInMap);
        console.log("Ship Position:" + shipPosition);

        this.Ship.getComponent("Ship").shipMove(touchInMap);
    },

    onKeyDown: function(event){
        switch(event.keyCode) {
            case cc.macro.KEY.b:
                console.log('Press B key');
                this.CargoUI.active=!this.CargoUI.active;
                break;
        }
    },

    minedOre: function(){
        console.log('装进货仓');
        var newMinedOre = cc.instantiate(this.OreCargoPrefab);
        //this.CargoUI.addChild(newMinedOre);
        //console.log(this.CargoUI.getChildByName("layout"));
        this.CargoUI.getChildByName("layout").addChild(newMinedOre);
    },

});
