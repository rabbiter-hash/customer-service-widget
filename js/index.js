

document.addEventListener('DOMContentLoaded', ()=>{

    // 第一种解决方案
    /*
    if(typeof CustomerServiceWidget === 'function') {
        console.log('【index.js】' + true);
        new CustomerServiceWidget();
    }

    if(typeof comeBackTips === 'function') {
        console.log('【index.js】' + true);
        new comeBackTips();
    } */


    // 第二种解决办法，组件工程化
    const ComponentsRegistry = {
        CustomerServiceWidget,
        comeBackTips,
    }

    // console.log(Object.values(ComponentsRegistry));
    // 循环
    Object.values(ComponentsRegistry).forEach((obj)=>{
        // console.log(obj);
        if(typeof obj === 'function'){
            new obj();
        }
    })
});

