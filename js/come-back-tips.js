
class comeBackTips {

    constructor() {
        this.originalTitle = document.title;
        this.animationTexts = ['Come back', '↩️ Come back', '👋 Come back', '⭐ Come back'];
        this.animationIndex = 0;
        this.animationInterval = null;

        this.init();
    }

    init(){
        // 调试信息
        console.log('【init】Initilization...');
        this.bindEvents();
    }

    bindEvents(){
        console.log('【binEvents】bind events start..');
        // 一开始是undefined
        if(comeBackTips._initialized) return;
        comeBackTips._initialized = true;

        document.addEventListener('visibilitychange', ()=>{
            this.handleVisibilityChange();
        });
    }

    handleVisibilityChange(){
        if(document.hidden) {
            console.log('【handleVisibilityChange】start animation...');
            this.startAnimation();
        } else {
            console.log('【handleVisibilityChange】stop animation...');
            this.stopAnimation();
        }
    }

    startAnimation(){
        // 判定是否有动画，有动画就不需要启动了
        if(this.animationInterval) return;
        this.animationInterval = setInterval(()=>{
            document.title = this.animationTexts[this.animationIndex];
            this.animationIndex = (this.animationIndex + 1) % this.animationTexts.length;
        }, 500)
    }

    stopAnimation(){
        if(!this.animationInterval) return;
        clearInterval(this.animationInterval);
        this.animationInterval = null;
        document.title = '欢迎回来！';
        // 返还标题
        setTimeout(()=>{
            document.title = this.originalTitle;
        }, 1500)
    }
}