
class CustomerServiceWidget {
    constructor() {
        this.init();
    }

    loadAwesomeFonts(){
        return new Promise((resolve)=>{
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
            link.onload = ()=> {
                resolve();
            }
            document.head.appendChild(link);
        });
    }

    services(){
        return [
            {
                icon: 'fab fa-weixin',
                title: '微信',
                qrcode: './images/qrcode.png',  // 修正为正确的相对路径
                onClick: (button) => {
                    if (window.innerWidth <= 768) {
                        // 移动端点击切换显示/隐藏
                        const qrcodePopup = button.querySelector('.qrcode-popup');
                        const isVisible = qrcodePopup.style.visibility === 'visible';
                        qrcodePopup.style.opacity = isVisible ? '0' : '1';
                        qrcodePopup.style.visibility = isVisible ? 'hidden' : 'visible';
                    }
                }
            },
            {
                icon: 'fab fa-whatsapp',
                title: 'WhatsApp',
                onClick: () => {
                    window.open(`https://api.whatsapp.com/send?phone=8615375762055`, '_blank');
                }
            },
            {
                icon: 'fas fa-envelope',
                title: '邮箱',
                onClick: () => {
                    window.location.href = 'mailto:support@thehoemxtra.com?subject=咨询问题&body=您好，我想咨询一下...';
                }
            }
        ];
    }
    async init(){
        await this.loadAwesomeFonts();
        // 创建客服组件容器
        const container = document.createElement('div');
        container.className = 'customer-service-container';

        // 客服组件各个按钮

        const services = this.services();

        // 开始循环
        services.forEach((service)=>{
            // console.log(service);
            // 1. 创建每个组件的div
            const button = document.createElement('div');
            button.className = 'customer-service-btn';
            // 每个组件的html代码
            button.innerHTML = `<i class="${service.icon}"></i>`;
            button.title = service.title; // 每个按钮的title属性

            // 不考虑移动端的展示
            // 2. 先来处理第一个微信二维码
            if(service.qrcode) {
                // 首先要创建一个div容器
                const qrcodePopup = document.createElement('div');
                qrcodePopup.className = 'qrcode-popup';
                qrcodePopup.innerHTML = `<img src="${service.qrcode}" alt="${service.title}二维码"/>`;
                // 追加到button内
                button.appendChild(qrcodePopup);

                // 其次，要让初始隐藏
                let isVisible = false;
                const toggleQRCode = ()=>{
                    isVisible = !isVisible;
                    qrcodePopup.style.opacity = isVisible ? '1' : '0';
                    qrcodePopup.style.visibility = isVisible ? 'visible' : 'hidden';
                };
                // 事件绑定，包含点击，滑过
                // 首先是点击，让它toggle
                button.addEventListener('click', ()=>{
                    toggleQrCode();
                });
                // 滑过
                button.addEventListener('mouseenter', ()=>{
                    qrcodePopup.style.opacity = 1;
                    qrcodePopup.style.visibility = 'visible';
                });
                button.addEventListener('mouseleave', ()=>{
                    if(!isVisible) {
                        qrcodePopup.style.opacity = 0;
                        qrcodePopup.style.visibility = 'hidden';
                    }
                });
            } else {
                // 2. 处理其他组件
                const toolTip = document.createElement('div');
                toolTip.className = 'tooltip-popup';
                toolTip.textContent = `Contact By ${service.title}`;
                // 追加到button下
                button.appendChild(toolTip);

                button.addEventListener('mouseenter', ()=>{
                    toolTip.style.opacity = '1';
                    toolTip.style.visibility = 'visible';
                });
                button.addEventListener('mouseleave', ()=>{
                    toolTip.style.opacity = '0';
                    toolTip.style.visibility = 'hidden';
                });

                button.addEventListener('click', ()=>{
                    if(service.onClick) {
                        service.onClick();
                    }
                });
            }
            // 容器吸纳客服组件
            container.appendChild(button);
        });

        // 最后一步：将customer-service-container挂载到body
        document.body.appendChild(container);
    }
}