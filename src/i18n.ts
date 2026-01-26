import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "softdo": "SoftDo",
      "slogan": "The Todo Widget That Breathes.",
      "hero": {
        "title1": "The Todo Widget",
        "title2": "That Breathes.",
        "subtitle": "In the quiet rhythm of work, we shape ideas into systems that speak with clarity.",
        "download": "Download for"
      },
      "download": {
        "title": "Download for Free",
        "windows": "Windows",
        "mac": "macOS",
        "linux": "Linux"
      },
      "features": {
        "title": "Features",
        "sectionTitle": "Built for Focus.",
        "sectionSubtitle": "Designed with intention.",
        "pin": "Always on Top",
        "pin_desc": "Pin your tasks above all windows. Stay focused, never miss a deadline.",
        "glass": "Glassmorphism UI",
        "glass_desc": "Beautiful frosted glass that blends with your desktop wallpaper seamlessly.",
        "privacy": "100% Offline",
        "privacy_desc": "No servers, no accounts. Your data lives only on your device."
      },
      "workflow": {
        "title": "Seamless Flow",
        "step1": "Capture",
        "step1_desc": "Quick input, zero friction.",
        "step2": "Organize",
        "step2_desc": "Pin it anywhere.",
        "step3": "Complete",
        "step3_desc": "Check off and breathe."
      },
      "showcase": {
        "badge": "See It In Action",
        "title": "Your Tasks, Always Visible.",
        "description": "SoftDo floats elegantly above your work, keeping your priorities in sight without disrupting your flow."
      },
      "cta": {
        "title": "Ready to organize your life?",
        "subtitle": "Join users who have switched to a calmer, cleaner way of getting things done.",
        "button": "Download SoftDo",
        "note": "Free and open source."
      },
      "footer": {
        "rights": "© 2026 SoftDo Team. All rights reserved.",
        "github": "GitHub"
      }
    }
  },
  cn: {
    translation: {
      "softdo": "SoftDo",
      "slogan": "会呼吸的待办清单。",
      "hero": {
        "title1": "会呼吸的",
        "title2": "桌面待办。",
        "subtitle": "在工作的宁静韵律中，将想法塑造成清晰的行动。",
        "download": "下载"
      },
      "download": {
        "title": "免费下载",
        "windows": "Windows",
        "mac": "macOS",
        "linux": "Linux"
      },
      "features": {
        "title": "核心特性",
        "sectionTitle": "为专注而生。",
        "sectionSubtitle": "每一个细节都经过深思熟虑。",
        "pin": "窗口置顶",
        "pin_desc": "将待办固定在所有窗口之上。保持专注，不错过任何截止日期。",
        "glass": "毛玻璃美学",
        "glass_desc": "精美的磨砂玻璃效果，与桌面壁纸完美融合。",
        "privacy": "完全离线",
        "privacy_desc": "无服务器，无账户。你的数据只存在于你的设备上。"
      },
      "workflow": {
        "title": "极致心流",
        "step1": "捕捉",
        "step1_desc": "快速输入，零摩擦。",
        "step2": "整理",
        "step2_desc": "固定在任意位置。",
        "step3": "完成",
        "step3_desc": "划掉它，深呼吸。"
      },
      "showcase": {
        "badge": "预览效果",
        "title": "任务，始终可见。",
        "description": "SoftDo 优雅地悬浮在你的工作之上，让你的待办事项始终在视野内，同时不打断你的心流。"
      },
      "cta": {
        "title": "准备好整理你的生活了吗？",
        "subtitle": "加入那些选择更平静、更简洁方式完成任务的用户。",
        "button": "下载 SoftDo",
        "note": "免费且开源。"
      },
      "footer": {
        "rights": "© 2026 SoftDo Team. 保留所有权利。",
        "github": "GitHub"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default to English
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
