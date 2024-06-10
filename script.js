const targetDate = new Date("2024-06-21T00:09:00");

// JSON 键值对映射数字到特定内容
const digitReplacements = {
    "0": "2-2",
    "1": "2/2",
    "2": "4-2",
    "3": "2/2+2",
    "4": "2*2",
	"5": "2/2+4",
	"6": "2+4",
	"7": "2+4+2/2",
	"8": "2*4",
	"9": "2*4+2/2",
	"10": "2*4+2",
    "11": "2/2+(2*4+2)",
    "12": "4-2+(2*4+2)",
    "13": "2/2+2+(2*4+2)",
    "14": "2*2+(2*4+2)",
	"15": "2/2+4+(2*4+2)",
	"16": "2+4+(2*4+2)",
	"17": "2+4+2/2+(2*4+2)",
	"18": "2*4+(2*4+2)",
	"19": "2*4+2/2+(2*4+2)",
	"20": "2*(2*4+2)",
    "21": "2/2+2*(2*4+2)",
    "22": "4-2+2*(2*4+2)",
    "23": "2/2+2+2*(2*4+2)",
    "24": "2*2+2*(2*4+2)",
	"25": "2/2+4+2*(2*4+2)",
	"26": "2+4+2*(2*4+2)",
	"27": "2+4+2/2+2*(2*4+2)",
	"28": "2*4+2*(2*4+2)",
	"29": "2*4+2/2+2*(2*4+2)",
	"30": "4*4*2-2",
    "31": "4*4*2-2+2/2",
    "32": "4*4*2-2+4-2",
    "33": "4*4*2-2+2/2+2",
    "34": "4*4*2-2+2*2",
	"35": "4*4*2-2+2/2+4",
	"36": "4*4*2-2+2+4",
	"37": "4*4*2-2+2+4+2/2",
	"38": "4*4*2-2+2*4",
	"39": "4*4*2-2+2*4+2/2",
	"40": "4*(2*4+2)",
    "41": "2/2+4*(2*4+2)",
    "42": "4-2+4*(2*4+2)",
    "43": "2/2+2+4*(2*4+2)",
    "44": "2*2+4*(2*4+2)",
	"45": "2/2+4+4*(2*4+2)",
	"46": "2+4+4*(2*4+2)",
	"47": "2+4+2/2+4*(2*4+2)",
	"48": "2*4+4*(2*4+2)",
	"49": "2*4+2/2+4*(2*4+2)",
	"50": "2*4*4+4*4+2",
	"51": "2*4*4+4*4+2+2/2",
    "52": "2*4*4+4*4+2+4-2",
    "53": "2*4*4+4*4+2+2/2+2",
    "54": "2*4*4+4*4+2+2*2",
	"55": "2*4*4+4*4+2+2/2+4",
	"56": "2*4*4+4*4+2+2+4",
	"57": "2*4*4+4*4+2+2+4+2/2",
	"58": "2*4*4+4*4+2+2*4",
	"59": "2*4*4+4*4+2+2*4+2/2",
	"60": "4*4*4-4"
};


function replaceWithImage(num, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // 清空原有内容

    num.toString().split('').forEach(digit => {
        let imgSrc = '';
        switch (digit) {
            case '2':
                imgSrc = 'a.png';
                break;
            case '4':
                imgSrc = 'b.png';
                break;
            default:
                container.appendChild(document.createTextNode(digit));
                return; // 直接添加非2/4的数字为文本
        }
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.classList.add('countdown-img'); // 应用图片样式
        container.appendChild(img);
    });
}

// 更新倒计时
function updateCountdown() {
    const now = new Date();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown-container').innerHTML = "考试已开始!";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // 替换数字为指定内容
    function replaceDigits(num) {
    	const strNum = num.toString();
    
    // 尝试两位数的整体替换
    	if (strNum.length === 2 && digitReplacements[strNum]) {
       	 return digitReplacements[strNum];
    }
    
    // 如果没有两位数映射，则逐位替换
   	 return strNum.split('').map(digit => digitReplacements[digit] || digit).join('');
    }

    
	replaceWithImage(replaceDigits(days), 'days');
    replaceWithImage(replaceDigits(hours), 'hours');
    replaceWithImage(replaceDigits(minutes), 'minutes');
    replaceWithImage(replaceDigits(seconds), 'seconds');
}

// 每秒更新一次倒计时
const countdownInterval = setInterval(updateCountdown, 1000);

// 初始化倒计时显示
updateCountdown();
