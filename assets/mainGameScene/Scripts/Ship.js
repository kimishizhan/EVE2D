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
        ShipSpeed: 500,
        MainCanvas: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    shipMove: function (moveTarget){

        //停止未完成的action
        this.node.stopAllActions();

        //移动至目标位置
        var moveVector = moveTarget.sub(this.node.position);
        var movement = cc.moveBy(moveVector.mag()/this.ShipSpeed, moveVector);
        this.node.runAction(movement);

        //转向目标位置
        var rotation = cc.rotateTo(0,moveVector.signAngle(cc.v2(0,-1))*180/Math.PI);
        this.node.runAction(rotation);

    },
    mining: function (targetOre){
        //console.log(targetOre);

        //停止未完成的action
        this.node.stopAllActions();

        //移动至剧矿石100个单位的位置，到位后执行回调方法
        var moveVectorFull = targetOre.position.sub(this.node.position);
        var moveVector = moveVectorFull.sub(moveVectorFull.normalize().mul(200));
        var movement = cc.moveBy(moveVector.mag()/this.ShipSpeed, moveVector);
        var miningLaser = cc.callFunc(function () {
            var miningLaserAnimation= this.node.getChildByName("MiningLaser").getComponent(cc.Animation);
            miningLaserAnimation.play();
        }, this);
        var miningAction = cc.sequence(movement, miningLaser);
        this.node.runAction(miningAction);
        this.scheduleOnce(function() {
            this.node.getChildByName("MiningLaser").height = 50;
            targetOre.destroy();
            this.MainCanvas.getComponent("MainCanvas").minedOre();
            console.log("采矿结束");
        }, 2);

        //转向矿石位置
        var rotation = cc.rotateTo(0,moveVectorFull.signAngle(cc.v2(0,-1))*180/Math.PI);
        this.node.runAction(rotation);

    },
});
